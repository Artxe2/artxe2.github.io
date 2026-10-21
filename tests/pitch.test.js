import assert from "node:assert/strict"
import { test } from "vitest"
import "../pitch-trace/pitch.js"
const {
	RANGES,
	detectPitch,
	freqToMidi,
	guideTarget,
	midiToFreq,
	noteName,
	pitchTracker,
	scalePattern,
	solfa,
	steadyNote,
	takeFileName,
	takeStats,
	viewRange
} = globalThis.Pitch
const SR = 48000
/**
 * @param {number} a
 * @param {number} b
 */
function cents(a, b) {
	return 1200 * Math.log2(a / b)
}
/**
 * @param {number} freq
 * @param {{ amp?: number, harmonics?: number[], n?: number, sr?: number }} [options]
 */
function wave(
	freq,
	{
		amp = 0.5,
		harmonics = [ 1 ],
		n = 2048,
		sr = SR
	} = {}
) {
	const buf = new Float32Array(n)
	for (let i = 0; i < n; i++) {
		let v = 0
		harmonics.forEach(
			(a, h) => {
				v += a * Math.sin(
					2 * Math.PI * freq * (h + 1) * i / sr
				)
			}
		)
		buf[i] = amp * v / harmonics.length
	}
	return buf
}
test(
	"detectPitch finds sine tones across all ranges",
	() => {
		for (const midi of [ 48, 52, 55, 60, 64, 67, 72, 77, 84 ]) {
			const f = midiToFreq(midi)
			const got = detectPitch(wave(f), SR)
			assert.ok(got, `no pitch for ${f}`)
			assert.ok(
				Math.abs(cents(got.freq, f)) < 5,
				`${got.freq} vs ${f}`
			)
		}
	}
)
test(
	"detectPitch finds the fundamental of a harmonic-rich voice-like tone",
	() => {
		const f = midiToFreq(62)
		const got = detectPitch(
			wave(
				f,
				{
					harmonics: [ 0.6, 1, 0.8, 0.4, 0.2 ]
				}
			),
			SR
		)
		assert.ok(got)
		assert.ok(
			Math.abs(cents(got.freq, f)) < 5,
			`${got.freq} vs ${f}`
		)
	}
)
test(
	"detectPitch hears a quiet voice over room noise",
	() => {
		let seed = 5
		function noise() {
			return ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5) * 0.0014
		}
		/** @type {[number, number][]} */
		const voices = [
			[ 60, 0.03 ],
			[ 48, 0.008 ],
			[ 67, 0.008 ]
		]
		for (const [ midi, amp ] of voices) {
			const f = midiToFreq(midi)
			// amp 0.008 is about -56 dBFS, 12 dB over the noise.
			const buf = wave(
				f,
				{
					amp,
					harmonics: [ 0.6, 1, 0.8, 0.4, 0.2 ]
				}
			).map(v => v + noise())
			const got = detectPitch(buf, SR)
			assert.ok(
				got && Math.abs(cents(got.freq, f)) < 10,
				`${midi}: ${got && got.freq} vs ${f}`
			)
		}
	}
)
test(
	"detectPitch keeps the fundamental when the second harmonic is louder",
	() => {
		for (const midi of [ 57, 60, 67, 69, 72 ]) {
			const f = midiToFreq(midi)
			const got = detectPitch(
				wave(
					f,
					{ harmonics: [ 0.1, 1, 0.15 ] }
				),
				SR
			)
			assert.ok(
				got && Math.abs(cents(got.freq, f)) < 5,
				`${got && got.freq} vs ${f}`
			)
		}
	}
)
test(
	"detectPitch returns null for silence and noise",
	() => {
		assert.equal(
			detectPitch(new Float32Array(2048), SR),
			null
		)
		let seed = 1
		const noise = new Float32Array(2048).map(
			() => ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5)
		)
		assert.equal(detectPitch(noise, SR), null)
	}
)
test(
	"detectPitch works at 44.1 kHz",
	() => {
		const f = midiToFreq(69)
		const got = detectPitch(wave(f, { sr: 44100 }), 44100)
		assert.ok(got)
		assert.ok(
			Math.abs(cents(got.freq, f)) < 5
		)
	}
)
test(
	"guideTarget steps through the pattern and loops",
	() => {
		assert.equal(guideTarget(-0.1, 1, 60), null)
		assert.equal(guideTarget(0, 1, 60), 60)
		assert.equal(guideTarget(0.99, 1, 60), 60)
		assert.equal(guideTarget(7.5, 1, 60), 72)
		assert.equal(guideTarget(13.2, 1, 60), 62)
		assert.equal(guideTarget(14, 1, 60), 60)
		assert.equal(guideTarget(3, 0.5, 72), 83)
	}
)
test(
	"midi and frequency conversions",
	() => {
		assert.equal(freqToMidi(440), 69)
		assert.ok(
			Math.abs(midiToFreq(60) - 261.6256) < 0.001
		)
		assert.ok(
			Math.abs(
				freqToMidi(midiToFreq(72.3)) - 72.3
			) < 1e-9
		)
	}
)
test(
	"note names and solfa",
	() => {
		assert.equal(noteName(60), "C4")
		assert.equal(noteName(61), "C♯4")
		assert.equal(noteName(71.6), "C5")
		assert.equal(noteName(84), "C6")
		assert.deepEqual(
			[ 60, 62, 64, 65, 67, 69, 71, 72 ].map(solfa),
			[
				"Do",
				"Re",
				"Mi",
				"Fa",
				"Sol",
				"La",
				"Ti",
				"Do"
			]
		)
		assert.equal(solfa(61), "")
	}
)
test(
	"ranges are C3-C4, C4-C5 and C5-C6",
	() => {
		assert.deepEqual(
			RANGES.map(r => [ r.lo, r.hi, r.label ]),
			[
				[ 48, 60, "C3–C4" ],
				[ 60, 72, "C4–C5" ],
				[ 72, 84, "C5–C6" ]
			]
		)
	}
)
test(
	"scalePattern goes up the major scale and back down",
	() => {
		assert.deepEqual(
			scalePattern(60),
			[ 60, 62, 64, 65, 67, 69, 71, 72, 71, 69, 67, 65, 64, 62 ]
		)
		assert.deepEqual(
			scalePattern(72).slice(0, 8),
			[ 72, 74, 76, 77, 79, 81, 83, 84 ]
		)
	}
)
test(
	"takeStats scores voiced samples against their targets",
	() => {
		const s = [
			{ midi: 60.1, t: 0, target: 60 },
			{ midi: 59.5, t: 0.1, target: 60 },
			{ midi: null, t: 0.2, target: 62 },
			{ midi: 64, t: 0.3, target: null },
			{ midi: 62.2, t: 0.4, target: 62 }
		]
		const st = takeStats(s, 30)
		assert.equal(st.voiced, 4)
		assert.equal(st.scored, 3)
		assert.ok(st.inTune !== null)
		assert.ok(
			Math.abs(st.inTune - 2 / 3) < 1e-9
		)
		assert.ok(st.meanCents !== null)
		assert.ok(
			Math.abs(
				st.meanCents - (10 + 50 + 20) / 3
			) < 1e-9
		)
		assert.deepEqual(
			takeStats([]),
			{
				inTune: null,
				meanCents: null,
				scored: 0,
				voiced: 0
			}
		)
	}
)
// Feeds readings at 60 frames a second from `start` seconds and returns what the tracker shows.
/**
 * @param {ReturnType<typeof pitchTracker>} track
 * @param {(number | null)[]} readings
 * @param {number} [start]
 */
function feed(track, readings, start = 0) {
	return readings.map(
		(m, i) => track(start + i / 60, m)
	)
}
test(
	"pitchTracker follows scale steps at once and smooths small wobble",
	() => {
		const track = pitchTracker()
		feed(track, Array(10).fill(60))
		assert.equal(track(10 / 60, 62), 62)
		const wobble = feed(
			track,
			Array.from(
				{ length: 60 },
				(_, i) => 62 + (i % 2 ? 0.3 : -0.3)
			),
			11 / 60
		).slice(20)
			.map(v => v ?? 0)
		assert.ok(
			Math.max(...wobble) - Math.min(...wobble) < 0.3,
			"a 0.6 swing is shown at less than half"
		)
	}
)
test(
	"pitchTracker ignores a stray octave and follows a held jump",
	() => {
		const raw = Array.from(
			{ length: 60 },
			(_, i) => i === 20
				? 72
				: i < 40
					? 60
					: 67
		)
		const out = feed(pitchTracker(), raw)
		assert.ok(
			out.slice(5, 40).every(m => m === 60),
			JSON.stringify(out.slice(5, 40))
		)
		assert.equal(
			out[47],
			67,
			"a jump held for a few frames is followed"
		)
	}
)
test(
	"pitchTracker needs a few frames to start, bridges a dropped frame and ends on silence",
	() => {
		const track = pitchTracker()
		assert.deepEqual(
			feed(track, [ 64, null, null ]),
			[ null, null, null ],
			"one stray reading starts nothing"
		)
		const out = feed(
			track,
			[
				...Array(10).fill(64),
				null,
				64,
				...Array(15).fill(null)
			],
			1
		)
		assert.equal(out[0], null)
		assert.equal(out[9], 64)
		assert.equal(
			out[10],
			64,
			"a single dropout is bridged"
		)
		assert.equal(out.at(-1), null)
	}
)
test(
	"pitchTracker starts and stays on a voice that is only heard in some frames",
	() => {
		/** @type {((i: number) => boolean)[]} */
		const patterns = [
			i => i % 3 !== 2,
			i => i % 2 === 0,
			i => i % 3 === 0
		]
		for (const heard of patterns) {
			const out = feed(
				pitchTracker(),
				Array.from(
					{ length: 40 },
					(_, i) => heard(i) ? 64 : null
				)
			)
			assert.ok(
				out.slice(8).every(m => m === 64),
				JSON.stringify(out)
			)
		}
	}
)
test(
	"steadyNote changes only once the voice is clearly nearer another note",
	() => {
		assert.equal(steadyNote(60.4, null), 60)
		assert.equal(steadyNote(60.55, 60), 60)
		assert.equal(steadyNote(60.7, 60), 61)
		assert.equal(steadyNote(59.45, 60), 60)
		assert.equal(steadyNote(null, 60), null)
	}
)
test(
	"takeFileName uses a sortable timestamp and the recording format",
	() => {
		const d = new Date(2026, 8, 23, 7, 5, 9)
		assert.equal(
			takeFileName(d, "audio/webm;codecs=opus"),
			"pitch-trace-2026-09-23-070509.webm"
		)
		assert.equal(
			takeFileName(d, "audio/mp4"),
			"pitch-trace-2026-09-23-070509.m4a"
		)
		assert.equal(
			takeFileName(d, "audio/ogg"),
			"pitch-trace-2026-09-23-070509.ogg"
		)
	}
)
test(
	"viewRange shows the guide octave and stretches to where the voice went",
	() => {
		/**
		 * @param {number | null | ((i: number) => number)} midi
		 * @param {number} [n]
		 */
		function at(midi, n = 100) {
			return Array.from(
				{ length: n },
				(_, i) => ({
					midi: typeof midi === "function" ? midi(i) : midi,
					t: i * 0.05
				})
			)
		}
		assert.deepEqual(
			viewRange([], 60, 0, 8),
			{ high: 73, low: 59 }
		)
		assert.deepEqual(
			viewRange(at(48.3), 60, 0, 8),
			{ high: 73, low: 47 }
		)
		assert.deepEqual(
			viewRange(at(47.99), 60, 0, 8),
			{ high: 73, low: 47 },
			"a slightly flat C3 keeps a semitone below C3"
		)
		assert.deepEqual(
			viewRange(at(79.6), 60, 0, 8),
			{ high: 81, low: 59 }
		)
		assert.deepEqual(
			viewRange(
				at(i => i === 50 ? 40 : 62),
				60,
				0,
				8
			),
			{ high: 73, low: 59 },
			"a stray reading is ignored"
		)
		assert.deepEqual(
			viewRange(at(48.3), 60, 6, 8),
			{ high: 73, low: 59 },
			"only the shown time span counts"
		)
		assert.deepEqual(
			viewRange(at(null), 60, 0, 8),
			{ high: 73, low: 59 }
		)
	}
)