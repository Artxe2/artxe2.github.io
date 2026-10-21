// Drives the real pages in headless Chrome (fake microphone). Skipped when Chrome or the network is unavailable.
import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import {
	existsSync,
	mkdtempSync,
	rmSync,
	writeFileSync
} from "node:fs"
import { readFile } from "node:fs/promises"
import http from "node:http"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
	afterAll as after,
	beforeAll as before,
	test
} from "vitest"
const ROOT = fileURLToPath(new URL("..", import.meta.url))
const CHROME = [
	process.env["CHROME"],
	"C:/Program Files/Google/Chrome/Application/chrome.exe",
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/usr/bin/google-chrome",
	"/usr/bin/chromium"
]
	.find(p => p && existsSync(p))
const online = await fetch(
	"https://artxe.github.io/click-css/min.js"
).then(r => r.ok, () => false)
const skip = !CHROME || !online
/** @param {number} ms */
function sleep(ms) {
	return new Promise(r => setTimeout(r, ms))
}
/** @type {import("node:http").Server | undefined} */
let server
/** @type {import("node:child_process").ChildProcess | undefined} */
let chrome
/** @type {string | undefined} */
let profile
let base = ""
let port = 0
// A looping, voice-like C4 for Chrome's fake microphone, so a page that does not replace getUserMedia
// hears it through Chrome's own audio processing (echo cancellation, gain control).
/** @param {string} file */
function voice_wav(file) {
	const sr = 48000
	const n = sr * 4
	const wav = Buffer.alloc(44 + n * 2)
	wav.write("RIFF", 0)
	wav.writeUInt32LE(36 + n * 2, 4)
	wav.write("WAVEfmt ", 8)
	wav.writeUInt32LE(16, 16)
	wav.writeUInt16LE(1, 20)
	wav.writeUInt16LE(1, 22)
	wav.writeUInt32LE(sr, 24)
	wav.writeUInt32LE(sr * 2, 28)
	wav.writeUInt16LE(2, 32)
	wav.writeUInt16LE(16, 34)
	wav.write("data", 36)
	wav.writeUInt32LE(n * 2, 40)
	for (let i = 0; i < n; i++) {
		const v = [ 1, 0.6, 0.4, 0.2 ].reduce(
			(s, a, h) => s + a * Math.sin(
				2 * Math.PI * 261.63 * (h + 1) * i / sr
			),
			0
		)
		wav.writeInt16LE(
			Math.round(v * 0.03 * 32767),
			44 + i * 2
		)
	}
	writeFileSync(file, wav)
}
before(
	async () => {
		if (skip || !CHROME) {
			return
		}
		server = http.createServer(
			async (req, res) => {
				let p = decodeURIComponent(
					new URL(req.url ?? "", "http://x").pathname
				)
				if (p.endsWith("/")) {
					p += "index.html"
				}
				try {
					const body = await readFile(path.join(ROOT, p))
					res.writeHead(
						200,
						{
							"content-type": p.endsWith(".js") ? "text/javascript" : "text/html"
						}
					)
					res.end(body)
				} catch {
					res.writeHead(404)
					res.end()
				}
			}
		).listen(0)
		const address = server.address()
		assert.ok(
			address && typeof address === "object"
		)
		base = `http://127.0.0.1:${address.port}`
		profile = mkdtempSync(
			path.join(os.tmpdir(), "chrome-test-")
		)
		const wav = path.join(profile, "voice-c4.wav")
		voice_wav(wav)
		port = 9400 + Math.floor(Math.random() * 400)
		chrome = spawn(
			CHROME,
			[
				"--headless=new",
				`--remote-debugging-port=${port}`,
				`--user-data-dir=${profile}`,
				"--use-fake-ui-for-media-stream",
				"--use-fake-device-for-media-stream",
				`--use-file-for-fake-audio-capture=${wav.replace(/\\/g, "/")}`,
				"--autoplay-policy=no-user-gesture-required",
				"about:blank"
			]
		)
	}
)
after(
	() => {
		server?.close()
		chrome?.kill()
		if (profile) {
			try {
				rmSync(
					profile,
					{ force: true, recursive: true }
				)
			} catch {}
		}
	}
)
/**
 * @typedef {{
 * 	id: number,
 * 	result: {
 * 		exceptionDetails?: { exception?: { description?: string }, text: string },
 * 		result: { value: unknown }
 * 	}
 * }} Reply
 */
/**
 * @param {string} url
 * @param {number} [width]
 * @param {number} [height]
 */
async function open(url, width = 1200, height = 900) {
	/** @type {{ id: string, webSocketDebuggerUrl: string } | undefined} */
	let opened
	for (let i = 0; i < 50 && !opened; i++) {
		try {
			opened = await (await fetch(
				`http://127.0.0.1:${port}/json/new?about:blank`,
				{ method: "PUT" }
			)).json()
		} catch {
			await sleep(200)
		}
	}
	assert.ok(opened, "Chrome opened no tab")
	const target = opened
	const ws = new WebSocket(target.webSocketDebuggerUrl)
	await new Promise(
		r => {
			ws.onopen = r
		}
	)
	let id = 0
	/** @type {Record<number, (m: Reply) => void>} */
	const pending = {}
	ws.onmessage = e => {
		const m = JSON.parse(e.data)
		if (m.id) {
			pending[m.id]?.(m)
		}
	}
	/**
	 * @param {string} method
	 * @param {object} [params]
	 * @returns {Promise<Reply>}
	 */
	function send(method, params = {}) {
		return new Promise(
			r => {
				const i = ++id
				pending[i] = r
				ws.send(
					JSON.stringify({ id: i, method, params })
				)
			}
		)
	}
	const page = {
		close: () => {
			ws.close()
			return fetch(
				`http://127.0.0.1:${port}/json/close/${target.id}`
			)
		},
		/**
		 * @template [T=unknown]
		 * @param {string} expression
		 * @returns {Promise<T>}
		 */
		async eval(expression) {
			const r = await send(
				"Runtime.evaluate",
				{
					awaitPromise: true,
					expression,
					returnByValue: true,
					userGesture: true
				}
			)
			if (r.result.exceptionDetails) {
				throw new Error(
					r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text
				)
			}
			return /** @type {T} */(r.result.result.value)/**/
		}
	}
	await send("Page.bringToFront")
	await send(
		"Emulation.setDeviceMetricsOverride",
		{
			deviceScaleFactor: 1,
			height,
			mobile: width < 700,
			width
		}
	)
	await send(
		"Page.navigate",
		{
			url: /^[a-z]+:/.test(url) ? url : base + url
		}
	)
	for (let i = 0; i < 50; i++) {
		if (await page.eval(
			"document.readyState === 'complete' && !!document.querySelector('style[click]')"
		).catch(() => false)) {
			break
		}
		await sleep(100)
	}
	await sleep(300)
	return page
}
// Opened by double-click, a page is a file:// URL, where Chrome refuses module imports.
/** @type {[string, string][]} */
const LOCAL_PAGES = [
	[
		"pitch-trace",
		"document.querySelector('#guideBtn').click(); document.querySelector('#guideBtn').getAttribute('aria-pressed') === 'true'"
	],
	[
		"drawing-drills",
		"document.querySelector('#dShape').click(); document.querySelector('#tab-dots [data-empty]').hidden"
	]
]
for (const [ dir, works ] of LOCAL_PAGES) {
	test(
		`${dir} works when opened as a local file`,
		{ skip },
		async () => {
			const page = await open(
				new URL(
					`../${dir}/index.html`,
					import.meta.url
				).href
			)
			assert.equal(await page.eval(works), true)
			await page.close()
		}
	)
}
const DROP_FIGURE = `(async () => {
	const c = document.createElement('canvas'); c.width = 300; c.height = 500;
	const x = c.getContext('2d'); x.fillStyle = '#9bc'; x.fillRect(0, 0, 300, 500); x.fillStyle = '#345'; x.fillRect(90, 60, 120, 400);
	const blob = await new Promise(r => c.toBlob(r)), dt = new DataTransfer();
	dt.items.add(new File([blob], 'figure.png', { type: 'image/png' }));
	document.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
	await new Promise(r => setTimeout(r, 500));
})()`
/** @type {[string, number][]} */
const WIDTHS = [
	[ "/pitch-trace/", 320 ],
	[ "/pitch-trace/", 390 ],
	[ "/pitch-trace/", 1200 ],
	[ "/drawing-drills/", 320 ],
	[ "/drawing-drills/", 390 ],
	[ "/drawing-drills/", 1200 ]
]
for (const [ url, width ] of WIDTHS) {
	test(
		`${url} at ${width}px is styled by Click CSS without horizontal overflow`,
		{ skip },
		async () => {
			const page = await open(url, width)
			if (url.includes("drawing")) {
				await page.eval(DROP_FIGURE)
			}
			/** @type {[string, number]} */
			const [ bg, scroll_w ] = await page.eval(
				"[getComputedStyle(document.body).backgroundColor, document.documentElement.scrollWidth]"
			)
			assert.notEqual(bg, "rgba(0, 0, 0, 0)")
			assert.ok(
				scroll_w <= width,
				`scrollWidth ${scroll_w} > ${width}`
			)
			await page.close()
		}
	)
}
test("drawing-drills keeps guessed landmarks where they were placed on the result", { skip }, async () => {
	const page = await open("/drawing-drills/")
	await page.eval(DROP_FIGURE)
	/** @type {{ blue: string, cssW: number, fitted: string, raw: string, shown: boolean, w: number }} */
	const r = await page.eval(`(() => {
		const tap = (id, fx, fy) => { const c = document.getElementById(id), b = c.getBoundingClientRect(); c.dispatchEvent(new PointerEvent('pointerdown', { clientX: b.left + fx * b.width, clientY: b.top + fy * b.height, bubbles: true })); };
		const G = [[.5,.05],[.5,.3],[.2,.3],[.75,.3],[.5,.6],[.35,.75],[.65,.75],[.3,.95],[.7,.95]];
		const T = [[.5,.12],[.5,.3],[.3,.33],[.7,.33],[.5,.62],[.4,.8],[.6,.8],[.4,.92],[.6,.92]];
		G.forEach(p => tap('dDraw', ...p)); T.forEach(p => tap('dRef', ...p));
		const c = document.getElementById('dDraw'), x = c.getContext('2d'), d = c.width / c._w;
		const at = (fx, fy) => [...x.getImageData(Math.round(fx * c.width), Math.round(fy * c.height), 1, 1).data].slice(0, 3).join(',');
		const blue = getComputedStyle(document.documentElement).getPropertyValue('--blue').trim().slice(1).match(/../g).map(h => parseInt(h, 16)).join(',');
		const raw = at(.2, .3);
		document.getElementById('dFit').click();
		return { shown: !document.getElementById('dResult').hidden, blue, raw, fitted: at(.2, .3), cssW: c.getBoundingClientRect().width, w: c._w };
	})()`)
	assert.ok(r.shown)
	assert.equal(
		r.raw,
		r.blue,
		"guess dot not drawn where it was placed"
	)
	assert.notEqual(
		r.fitted,
		r.blue,
		"fit toggle should move the dots"
	)
	assert.equal(
		r.cssW,
		r.w,
		"canvas box and drawing size differ"
	)
	await page.close()
})
const PIXEL = "const px = (id, fx, fy) => { const c = document.getElementById(id); return [...c.getContext('2d').getImageData(Math.round(fx * c.width), Math.round(fy * c.height), 1, 1).data].slice(0, 3).join(','); };"
test("drawing-drills flash hides the photo while placing guesses", { skip }, async () => {
	const page = await open("/drawing-drills/")
	await page.eval(DROP_FIGURE)
	await page.eval(
		"(() => { const s = document.getElementById('dFlash'); s.value = '1500'; s.dispatchEvent(new Event('change')); })()"
	)
	const shown = await page.eval(
		`(() => { ${PIXEL} return px('dRef', .1, .1); })()`
	)
	await sleep(1800)
	/** @type {{ hidden: string, truth: string }} */
	const r = await page.eval(`(() => { ${PIXEL}
		const hidden = px('dRef', .1, .1), c = document.getElementById('dDraw'), b = c.getBoundingClientRect();
		for (let i = 0; i < 9; i++) c.dispatchEvent(new PointerEvent('pointerdown', { clientX: b.left + (.2 + i * .07) * b.width, clientY: b.top + (.1 + i * .09) * b.height, bubbles: true }));
		return { hidden, truth: px('dRef', .1, .1) };
	})()`)
	assert.equal(shown, "153,187,204")
	assert.notEqual(r.hidden, shown)
	assert.equal(
		r.truth,
		shown,
		"photo comes back to mark the true points"
	)
	await page.close()
})
test("drawing-drills mirror view keeps the hidden-photo label readable", { skip }, async () => {
	const page = await open("/drawing-drills/")
	await page.eval(DROP_FIGURE)
	/** @type {{ bad: number, ink: number }} */
	const diff = await page.eval(`(() => {
		document.querySelector('[data-tab=draw]').click();
		document.getElementById('oHide').click();
		const c = document.getElementById('oRef'), W = c.width, H = c.height, x = c.getContext('2d');
		const plain = x.getImageData(0, 0, W, H).data;
		document.getElementById('oMirror').click();
		const mir = x.getImageData(0, 0, W, H).data;
		let bad = 0, ink = 0;
		for (let y = 0; y < H; y++) for (let i = 0; i < W; i++) {
			const a = (y * W + i) * 4, b = (y * W + W - 1 - i) * 4;
			if (plain[a] < 200) ink++;
			if (Math.abs(plain[a] - mir[b]) > 80) bad++;
		}
		return { bad, ink };
	})()`)
	assert.ok(diff.ink > 50, "label drawn")
	assert.ok(
		diff.bad < diff.ink * 0.2,
		JSON.stringify(diff)
	)
	await page.close()
})
test("drawing-drills random shape drill works without a photo", { skip }, async () => {
	const page = await open("/drawing-drills/")
	/** @type {{ h: number, needs: boolean, photos: number, result: string, w: number }} */
	const r = await page.eval(`(() => {
		document.getElementById('dShape').click();
		const c = document.getElementById('dDraw'), b = c.getBoundingClientRect(), n = +document.getElementById('freeN').value;
		for (let i = 0; i < n; i++) {
			const a = i / n * 2 * Math.PI;
			c.dispatchEvent(new PointerEvent('pointerdown', { clientX: b.left + (.5 + .35 * Math.cos(a)) * b.width, clientY: b.top + (.5 + .35 * Math.sin(a)) * b.height, bubbles: true }));
		}
		const res = document.getElementById('dResult');
		return { photos: document.getElementById('thumbs').children.length, needs: !document.querySelector('#tab-dots [data-needs]').hidden, w: c._w, h: c._h, result: res.hidden ? '' : res.innerText };
	})()`)
	assert.equal(r.photos, 0)
	assert.ok(r.needs)
	assert.equal(r.w, r.h)
	assert.match(r.result, /\d+\.\d%/)
	await page.close()
})
// Opens the Overlay tab and gives helpers to draw on its paper and set its controls.
const OVERLAY = `${PIXEL}
	document.querySelector('[data-tab=draw]').click();
	const c = document.getElementById('oDraw');
	const at = (fx, fy) => { const b = c.getBoundingClientRect(); return { clientX: b.left + fx * b.width, clientY: b.top + fy * b.height, pointerId: 1, bubbles: true }; };
	const stroke = (...pts) => {
		c.dispatchEvent(new PointerEvent('pointerdown', at(...pts[0])));
		for (const p of pts.slice(1)) c.dispatchEvent(new PointerEvent('pointermove', at(...p)));
		c.dispatchEvent(new PointerEvent('pointerup', at(...pts.at(-1))));
	};
	const set = (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); };
	const layer = i => document.querySelector('#oLayers [data-layer="' + i + '"]');
	const ink = (fx, fy) => px('oDraw', fx, fy) !== px('oDraw', .02, .02);`
test("drawing-drills overlay has three layers, each with its own opacity", { skip }, async () => {
	const page = await open("/drawing-drills/")
	await page.eval(DROP_FIGURE)
	/** @type {{ both: boolean[], cross: string, full: string, hidden: boolean[], layers: number, line: string }} */
	const r = await page.eval(`(() => { ${OVERLAY}
		set(document.getElementById('oWidth'), 8);
		stroke([.1, .3], [.9, .3]);
		layer(1).querySelector('button').click();
		stroke([.1, .6], [.9, .6]);
		const both = [ink(.5, .3), ink(.5, .6)];
		set(layer(0).querySelector('input'), 0);
		const hidden = [ink(.5, .3), ink(.5, .6)];
		set(layer(0).querySelector('input'), 50);
		layer(0).querySelector('button').click();
		stroke([.5, .1], [.5, .5]);
		return { layers: document.querySelectorAll('#oLayers [data-layer]').length, both, hidden, cross: px('oDraw', .5, .3), line: px('oDraw', .3, .3), full: px('oDraw', .5, .6) };
	})()`)
	assert.equal(r.layers, 3)
	assert.deepEqual(r.both, [ true, true ])
	assert.deepEqual(
		r.hidden,
		[ false, true ],
		"layer 1 at 0% hides only its own strokes"
	)
	assert.equal(
		r.cross,
		r.line,
		"opacity applies to the layer as a whole, so crossing strokes do not darken"
	)
	assert.notEqual(
		r.line,
		r.full,
		"a half-transparent layer looks lighter"
	)
	await page.close()
})
test("drawing-drills overlay line width applies to the next strokes", { skip }, async () => {
	const page = await open("/drawing-drills/")
	await page.eval(DROP_FIGURE)
	/** @type {boolean[]} */
	const r = await page.eval(`(() => { ${OVERLAY}
		const below = fy => ink(.5, fy + 4 / c.height);
		set(document.getElementById('oWidth'), 12);
		stroke([.1, .3], [.9, .3]);
		set(document.getElementById('oWidth'), 2);
		stroke([.1, .6], [.9, .6]);
		return [below(.3), below(.6), ink(.5, .6)];
	})()`)
	assert.deepEqual(r, [ true, false, true ])
	await page.close()
})
test(
	"drawing-drills overlay tools fit a phone screen",
	{ skip },
	async () => {
		const page = await open("/drawing-drills/", 390)
		await page.eval(DROP_FIGURE)
		/** @type {number} */
		const scroll_w = await page.eval(
			"document.querySelector('[data-tab=draw]').click(); document.documentElement.scrollWidth"
		)
		assert.ok(
			scroll_w <= 390,
			`scrollWidth ${scroll_w} > 390`
		)
		await page.close()
	}
)
test("drawing-drills overlay undo takes back the last stroke on any layer, clear empties the active layer", { skip }, async () => {
	const page = await open("/drawing-drills/")
	await page.eval(DROP_FIGURE)
	/** @type {{ cleared: boolean[], undone: boolean[] }} */
	const r = await page.eval(`(() => { ${OVERLAY}
		stroke([.1, .3], [.9, .3]);
		layer(1).querySelector('button').click();
		stroke([.1, .6], [.9, .6]);
		layer(0).querySelector('button').click();
		document.getElementById('oUndo').click();
		const undone = [ink(.5, .3), ink(.5, .6)];
		layer(1).querySelector('button').click();
		stroke([.1, .6], [.9, .6]);
		layer(0).querySelector('button').click();
		document.getElementById('oClear').click();
		return { undone, cleared: [ink(.5, .3), ink(.5, .6)] };
	})()`)
	assert.deepEqual(r.undone, [ true, false ])
	assert.deepEqual(r.cleared, [ false, true ])
	await page.close()
})
test("pitch-trace records a take with a pitch trace and can replay it", { skip }, async () => {
	const page = await open("/pitch-trace/")
	// Sing a steady C4 into the mic: in tune with the first guide step (Do) only.
	await page.eval(`navigator.mediaDevices.getUserMedia = async () => {
		const ctx = new AudioContext(), o = ctx.createOscillator(), d = ctx.createMediaStreamDestination();
		o.frequency.value = 261.63; o.connect(d); o.start(); return d.stream;
	}`)
	await page.eval(
		"document.querySelector('#guideBtn').click(); document.querySelector('#recBtn').click()"
	)
	await sleep(2500)
	await page.eval(
		"document.querySelector('#recBtn').click(); document.querySelector('#guideBtn').click()"
	)
	await sleep(800)
	/** @type {string[]} */
	const takes = await page.eval(
		"[...document.querySelectorAll('#takes li')].map(li => li.innerText)"
	)
	assert.equal(takes.length, 1)
	const take = takes[0] ?? ""
	assert.match(take, /Take 1 · C4–C5/)
	const pct = Number(
		(take.match(/(\d+)%\s+in tune/) || [])[1]
	)
	assert.ok(
		pct > 15 && pct < 70,
		JSON.stringify(take)
	)
	await page.eval(
		"document.querySelector('#takes .play').click()"
	)
	await sleep(500)
	assert.equal(
		await page.eval(
			"document.querySelector('#takes li').classList.contains('playing')"
		),
		true
	)
	await page.eval(
		"document.querySelector('#guideBtn').click()"
	)
	assert.equal(
		await page.eval(
			"document.querySelector('#takes li').classList.contains('playing')"
		),
		false,
		"starting the guide ends the replay"
	)
	await page.close()
})
const FAKE_MIC = `window.asked = 0; navigator.mediaDevices.getUserMedia = async () => {
	asked++;
	const ctx = new AudioContext(), o = ctx.createOscillator(), d = ctx.createMediaStreamDestination();
	o.connect(d); o.start(); return d.stream;
}`
test(
	"pitch-trace asks for the microphone once when Record is pressed twice quickly",
	{ skip },
	async () => {
		const page = await open("/pitch-trace/")
		await page.eval(FAKE_MIC)
		await page.eval(
			"document.querySelector('#recBtn').click(); document.querySelector('#recBtn').click()"
		)
		await sleep(300)
		assert.equal(await page.eval("asked"), 1)
		assert.equal(
			await page.eval(
				"document.querySelector('#recBtn').getAttribute('aria-pressed')"
			),
			"true"
		)
		await page.close()
	}
)
test(
	"pitch-trace mic button ends a replay",
	{ skip },
	async () => {
		const page = await open("/pitch-trace/")
		await page.eval(FAKE_MIC)
		await page.eval(
			"document.querySelector('#recBtn').click()"
		)
		await sleep(1200)
		await page.eval(
			"document.querySelector('#recBtn').click()"
		)
		await sleep(500)
		await page.eval(
			"document.querySelector('#takes .play').click()"
		)
		await sleep(300)
		await page.eval(
			"document.querySelector('#micBtn').click()"
		)
		await sleep(300)
		assert.equal(
			await page.eval(
				"document.querySelector('#takes li').classList.contains('playing')"
			),
			false
		)
		assert.equal(
			await page.eval(
				"document.querySelector('#micBtn').getAttribute('aria-pressed')"
			),
			"true"
		)
		await page.close()
	}
)
// A fake mic voice: one oscillator per harmonic of `freq`, at the given gains.
/**
 * @param {number} freq
 * @param {number[]} gains
 */
function VOICE(freq, gains) {
	return `navigator.mediaDevices.getUserMedia = async constraints => {
	window.constraints = constraints;
	const ctx = new AudioContext(), d = ctx.createMediaStreamDestination();
	${JSON.stringify(gains)}.forEach((g, h) => { const o = ctx.createOscillator(), v = ctx.createGain(); o.frequency.value = ${freq} * (h + 1); v.gain.value = g * 0.3; o.connect(v).connect(d); o.start(); });
	return d.stream;
}`
}
test(
	"pitch-trace changing the range just after the guide starts never schedules an inaudible tone",
	{ skip },
	async () => {
		const page = await open("/pitch-trace/")
		/** @type {number[]} */
		const freqs = await page.eval(`(() => {
			const seen = [], make = AudioContext.prototype.createOscillator;
			AudioContext.prototype.createOscillator = function () {
				const o = make.call(this), f = o.frequency, set = f.setTargetAtTime;
				f.setTargetAtTime = function (v, ...rest) { seen.push(v); return set.call(this, v, ...rest); };
				return o;
			};
			document.querySelector('#guideBtn').click();
			document.querySelector('#ranges button').click();
			return seen;
		})()`)
		assert.ok(freqs.length > 0)
		assert.ok(
			freqs.every(f => f > 100),
			JSON.stringify(freqs)
		)
		await page.close()
	}
)
// Echo cancellation takes a voice singing the guide's note for an echo of it and wipes the pitch out,
// a third of the frames at the default volume and nearly all of them with the guide turned up.
test("pitch-trace hears a voice singing the same note as a loud guide", { skip }, async () => {
	const page = await open("/pitch-trace/")
	await page.eval(
		"document.querySelector('#micBtn').click()"
	)
	await sleep(1500)
	/** @type {string[]} */
	const notes = await page.eval(`(async () => {
		document.querySelector('#vol').value = 80;
		document.querySelector('#guideBtn').click();
		const seen = [];
		for (let i = 0; i < 9; i++) { await new Promise(r => setTimeout(r, 100)); seen.push(document.querySelector('#note').textContent); }
		return seen;
	})()`)
	assert.ok(
		notes.filter(n => n === "C4").length >= 6,
		JSON.stringify(notes)
	)
	await page.close()
})
test(
	"pitch-trace hears quiet singing and asks the browser to level the mic",
	{ skip },
	async () => {
		const page = await open("/pitch-trace/")
		// About -57 dBFS.
		await page.eval(
			VOICE(261.63, [ 0.006, 0.003 ])
		)
		await page.eval(
			"document.querySelector('#micBtn').click()"
		)
		await sleep(800)
		assert.equal(
			await page.eval(
				"document.querySelector('#note').textContent"
			),
			"C4"
		)
		assert.equal(
			await page.eval(
				"constraints.audio.autoGainControl"
			),
			true
		)
		await page.close()
	}
)
test("pitch-trace ignores a held-down shortcut key", { skip }, async () => {
	const page = await open("/pitch-trace/")
	const pressed = await page.eval(`(() => {
		const key = repeat => document.body.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', repeat, bubbles: true, cancelable: true }));
		key(false); key(true); key(true); key(true);
		return document.querySelector('#guideBtn').getAttribute('aria-pressed');
	})()`)
	assert.equal(pressed, "true")
	await page.close()
})
test("pitch-trace offers C3-C4, C4-C5 and C5-C6 and guides the one chosen", { skip }, async () => {
	const page = await open("/pitch-trace/")
	/** @type {{ checked: string[], labels: string[], target: string }} */
	const r = await page.eval(`(async () => {
		const ranges = [...document.querySelectorAll('#ranges button')];
		const first = { labels: ranges.map(b => b.textContent), checked: ranges.map(b => b.getAttribute('aria-checked')) };
		ranges[0].click();
		document.querySelector('#guideBtn').click();
		await new Promise(r => setTimeout(r, 400));
		return { ...first, target: document.querySelector('#targetName').textContent };
	})()`)
	assert.deepEqual(
		r.labels,
		[ "C3–C4", "C4–C5", "C5–C6" ]
	)
	assert.deepEqual(
		r.checked,
		[ "false", "true", "false" ],
		"C4-C5 stays the default"
	)
	assert.equal(r.target, "C3 · Do")
	await page.close()
})
test(
	"pitch-trace reads C4 as C4 when its second harmonic is louder",
	{ skip },
	async () => {
		const page = await open("/pitch-trace/")
		await page.eval(
			VOICE(261.63, [ 0.1, 1, 0.15 ])
		)
		await page.eval(
			"document.querySelector('#micBtn').click()"
		)
		await sleep(800)
		assert.equal(
			await page.eval(
				"document.querySelector('#note').textContent"
			),
			"C4"
		)
		await page.close()
	}
)
test(
	"pitch-trace roll follows a voice sung below the range",
	{ skip },
	async () => {
		const page = await open("/pitch-trace/")
		await page.eval(VOICE(130.81, [ 1, 0.5 ]))
		await page.eval(
			"document.querySelector('#micBtn').click()"
		)
		await sleep(2000)
		assert.equal(
			await page.eval(
				"document.querySelector('#note').textContent"
			),
			"C3"
		)
		assert.match(
			await page.eval(
				"document.querySelector('#roll').getAttribute('aria-label')"
			),
			/from B2 to C♯5/
		)
		await page.close()
	}
)