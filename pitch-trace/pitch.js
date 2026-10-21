/** @typedef {typeof pitch} Pitch */
/** @typedef {{ midi: number | null, t: number }} Reading */
/** @typedef {{ midi: number | null, target?: number | null | undefined }} Sample */
// A classic script, not a module, so the page also runs opened from file://. It defines the global `Pitch`.
const pitch = (() => {
	const RANGES = [
		{ hi: 60, label: "C3–C4", lo: 48 },
		{ hi: 72, label: "C4–C5", lo: 60 },
		{ hi: 84, label: "C5–C6", lo: 72 }
	]
	const NAMES = [
		"C",
		"C♯",
		"D",
		"E♭",
		"E",
		"F",
		"F♯",
		"G",
		"A♭",
		"A",
		"B♭",
		"B"
	]
	const SOLFA = [
		"Do",
		"",
		"Re",
		"",
		"Mi",
		"Fa",
		"",
		"Sol",
		"",
		"La",
		"",
		"Ti"
	]
	const MAJOR = [ 0, 2, 4, 5, 7, 9, 11, 12 ]
	// YIN pitch detection. Returns { freq, clarity } or null when there is no clear pitch.
	// Of the dips under the threshold it takes the first one about as deep as the deepest: an earlier,
	// clearly shallower dip is the period of a loud second harmonic, which plain YIN reads an octave up.
	// The level gate only drops near-silence (-60 dBFS): noise is told apart by having no dip under the threshold.
	/**
	 * @param {ArrayLike<number>} buf
	 * @param {number} sample_rate
	 * @param {{ maxFreq?: number, minFreq?: number, minRms?: number, threshold?: number }} [options]
	 * @returns {{ clarity: number, freq: number } | null}
	 */
	function detect_pitch(
		buf,
		sample_rate,
		{
			maxFreq = 1600,
			minFreq = 60,
			minRms = 0.001,
			threshold = 0.2
		} = {}
	) {
		let rms = 0
		for (let i = 0; i < buf.length; i++) {
			rms += /** @type {number} */(buf[i])/**/ ** 2
		}
		if (Math.sqrt(rms / buf.length) < minRms) {
			return null
		}
		const tau_min = Math.max(
			2,
			Math.floor(sample_rate / maxFreq)
		)
		const tau_max = Math.min(
			Math.floor(sample_rate / minFreq),
			Math.floor(buf.length / 2)
		)
		const w = buf.length - tau_max
		const d = new Float32Array(tau_max + 2)
		for (let tau = 1; tau <= tau_max + 1; tau++) {
			let sum = 0
			for (let j = 0; j < w; j++) {
				// buf[j + tau] is past the end for the last j of the last tau: NaN, which the next step turns into 1.
				const diff = /** @type {number} */(buf[j])/**/ - (buf[j + tau] ?? NaN)
				sum += diff * diff
			}
			d[tau] = sum
		}
		d[0] = 1
		let running = 0
		for (let tau = 1; tau <= tau_max + 1; tau++) {
			const v = /** @type {number} */(d[tau])/**/
			running += v
			d[tau] = running ? v * tau / running : 1
		}
		/** @type {number[]} */
		const dips = []
		let deepest = Infinity
		for (let t = tau_min; t <= tau_max; t++) {
			const v = /** @type {number} */(d[t])/**/
			if (v < threshold && v <= /** @type {number} */(d[t - 1])/**/ && v < /** @type {number} */(d[t + 1])/**/) {
				dips.push(t)
				deepest = Math.min(deepest, v)
			}
		}
		if (!dips.length) {
			return null
		}
		// The deepest dip always qualifies, so a dip is found.
		const tau = /** @type {number} */(dips.find(
			t => /** @type {number} */(d[t])/**/ <= deepest * 2 + 0.01
		))/**/
		const a = /** @type {number} */(d[tau - 1])/**/
		const b = /** @type {number} */(d[tau])/**/
		const c = /** @type {number} */(d[tau + 1])/**/
		// b is at most a and below c, so the denominator is positive.
		const shift = (a - c) / (2 * (a - 2 * b + c))
		return {
			clarity: 1 - b,
			freq: sample_rate / (tau + shift)
		}
	}
	/** @param {number} freq */
	function freq_to_midi(freq) {
		return 69 + 12 * Math.log2(freq / 440)
	}
	/**
	 * @param {number} elapsed
	 * @param {number} step_dur
	 * @param {number} lo
	 */
	function guide_target(elapsed, step_dur, lo) {
		if (elapsed < 0) {
			return null
		}
		const p = scale_pattern(lo)
		return p[Math.floor(elapsed / step_dur) % p.length]
	}
	/** @param {number} midi */
	function midi_to_freq(midi) {
		return 440 * 2 ** ((midi - 69) / 12)
	}
	/** @param {number} midi */
	function note_name(midi) {
		const m = Math.round(midi)
		return `${NAMES[((m % 12) + 12) % 12]}${Math.floor(m / 12) - 1}`
	}
	// Steadies raw readings ((time in s, midi or null) => midi or null). The trace starts, or moves more than
	// `jump` semitones, only once `agree` readings within `within` s lie within a semitone of each other, so a
	// stray octave never shows while a voice heard in only some frames still does. Readings within `snap` are
	// eased in over `ease` s, and gaps up to `hold` s keep the last pitch.
	/**
	 * @param {{ agree?: number, ease?: number, hold?: number, jump?: number, snap?: number, within?: number }} [options]
	 * @returns {(t: number, midi: number | null | undefined) => number | null}
	 */
	function pitch_tracker(
		{
			agree = 3,
			ease = 0.035,
			hold = 0.1,
			jump = 2.5,
			snap = 0.6,
			within = 0.15
		} = {}
	) {
		/** @type {number | null} */
		let shown = null
		let seen = -Infinity
		/** @type {{ midi: number, t: number }[]} */
		const recent = []
		/** @param {number} t */
		function held(t) {
			return t - seen <= hold ? shown : (shown = null)
		}
		return (t, midi) => {
			while ((recent[0]?.t ?? Infinity) < t - within) {
				recent.shift()
			}
			if (midi == null) {
				return held(t)
			}
			recent.push({ midi, t })
			if (shown != null && Math.abs(midi - shown) <= jump) {
				const d = midi - shown
				shown = Math.abs(d) > snap ? midi : shown + d * (1 - Math.exp(-(t - seen) / ease))
				seen = t
				return shown
			}
			if (recent.filter(
				r => Math.abs(r.midi - midi) <= 1
			).length >= agree) {
				shown = midi
				seen = t
				return shown
			}
			return held(t)
		}
	}
	// Up the major scale from `lo` to its octave, then back down (the top and bottom are not repeated).
	/** @param {number} lo */
	function scale_pattern(lo) {
		const up = MAJOR.map(s => lo + s)
		return up.concat(up.slice(1, -1).reverse())
	}
	/** @param {number} midi */
	function solfa(midi) {
		return SOLFA[((Math.round(midi) % 12) + 12) % 12]
	}
	// The note to name for a pitch: it changes only once the voice is clearly nearer another note.
	/**
	 * @param {number | null | undefined} midi
	 * @param {number | null | undefined} prev
	 */
	function steady_note(midi, prev) {
		if (midi == null) {
			return null
		}
		return prev == null || Math.abs(midi - prev) > 0.6 ? Math.round(midi) : prev
	}
	/**
	 * @param {Date} date
	 * @param {string} mime
	 */
	function take_file_name(date, mime) {
		/** @param {number} n */
		function p(n) {
			return String(n).padStart(2, "0")
		}
		const ext = /mp4|aac|m4a/.test(mime)
			? "m4a"
			: /ogg/.test(mime)
				? "ogg"
				: "webm"
		return `pitch-trace-${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}-${p(date.getHours())}${p(date.getMinutes())}${p(date.getSeconds())}.${ext}`
	}
	// Share of voiced samples within `tolerance` cents of their target, and the mean distance in cents.
	/**
	 * @param {Sample[]} samples
	 * @param {number} [tolerance]
	 */
	function take_stats(samples, tolerance = 30) {
		let voiced = 0
		let scored = 0
		let hit = 0
		let sum = 0
		for (const s of samples) {
			if (s.midi == null) {
				continue
			}
			voiced++
			if (s.target == null) {
				continue
			}
			const c = Math.abs(s.midi - s.target) * 100
			scored++
			sum += c
			if (c <= tolerance + 1e-9) {
				hit++
			}
		}
		return {
			inTune: scored ? hit / scored : null,
			meanCents: scored ? sum / scored : null,
			scored,
			voiced
		}
	}
	// The pitch span to show: the guide's octave with a semitone either side, stretched to where the voice
	// went between `from` and `to` (s). The outer 2% of readings are left out, so a stray one does not stretch it.
	/**
	 * @param {Reading[]} samples
	 * @param {number} lo
	 * @param {number} from
	 * @param {number} to
	 */
	function view_range(samples, lo, from, to) {
		/** @type {number[]} */
		const v = []
		for (const s of samples) {
			if (s.midi != null && s.t >= from && s.t <= to) {
				v.push(s.midi)
			}
		}
		let low = lo - 1
		let high = lo + 13
		if (v.length) {
			v.sort((a, b) => a - b)
			const k = Math.floor(v.length * 0.02)
			low = Math.min(
				low,
				Math.round(
					/** @type {number} */(v[k])/**/
				) - 1
			)
			high = Math.max(
				high,
				Math.round(
					/** @type {number} */(v[v.length - 1 - k])/**/
				) + 1
			)
		}
		return { high, low }
	}
	return {
		RANGES,
		detectPitch: detect_pitch,
		freqToMidi: freq_to_midi,
		guideTarget: guide_target,
		midiToFreq: midi_to_freq,
		noteName: note_name,
		pitchTracker: pitch_tracker,
		scalePattern: scale_pattern,
		solfa,
		steadyNote: steady_note,
		takeFileName: take_file_name,
		takeStats: take_stats,
		viewRange: view_range
	}
})()
globalThis.Pitch = pitch