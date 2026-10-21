/** @typedef {{ x: number, y: number }} Point */
/** @typedef {typeof drills} Drills */
// A classic script, not a module, so the page also runs opened from file://. It defines the global `Drills`.
const drills = (() => {
	/**
	 * @template T
	 * @param {T[]} a
	 * @param {number} i
	 * @returns {T}
	 */
	function at(a, i) {
		const v = a[i]
		if (v === undefined) {
			throw new RangeError(`No element at ${i}`)
		}
		return v
	}
	/** @param {number[]} a */
	function avg(a) {
		return a.reduce((u, v) => u + v, 0) / (a.length || 1)
	}
	/** @param {Point[]} q */
	function bbox(q) {
		const xs = q.map(p => p.x)
		const ys = q.map(p => p.y)
		const x = Math.min(...xs)
		const y = Math.min(...ys)
		return {
			h: Math.max(...ys) - y,
			w: Math.max(...xs) - x,
			x,
			y
		}
	}
	/**
	 * @param {Point} p
	 * @param {Point} q
	 */
	function dist(p, q) {
		return Math.hypot(p.x - q.x, p.y - q.y)
	}
	// Scales and shifts the guess onto the truth (no rotation), so only proportions differ.
	// x and y must share one unit. Errors are % of the truth's larger bounding-box side.
	/**
	 * @param {Point[]} g
	 * @param {Point[]} t
	 */
	function fit_proportion(g, t) {
		/** @param {Point[]} q */
		function cen(q) {
			return {
				x: avg(q.map(p => p.x)),
				y: avg(q.map(p => p.y))
			}
		}
		/**
		 * @param {Point[]} q
		 * @param {Point} c
		 */
		function rad(q, c) {
			return Math.sqrt(
				avg(
					q.map(
						p => (p.x - c.x) ** 2 + (p.y - c.y) ** 2
					)
				)
			)
		}
		const gc = cen(g)
		const tc = cen(t)
		const gr = rad(g, gc)
		const tr = rad(t, tc)
		if (gr < 1e-4 || tr < 1e-4) {
			return null
		}
		const s = tr / gr
		const aligned = g.map(
			p => ({
				x: tc.x + (p.x - gc.x) * s,
				y: tc.y + (p.y - gc.y) * s
			})
		)
		const tb = bbox(t)
		const size = Math.max(tb.w, tb.h)
		const errs = aligned.map(
			(p, i) => dist(p, at(t, i)) / size * 100
		)
		let worst = 0
		errs.forEach(
			(e, i) => {
				if (e > at(errs, worst)) {
					worst = i
				}
			}
		)
		return {
			aligned,
			errs,
			mean: avg(errs),
			raw: avg(
				g.map(
					(p, i) => dist(p, at(t, i)) / size * 100
				)
			),
			scale: gr / tr,
			worst
		}
	}
	// Wobble is the RMS distance from the ideal line, integrated along the stroke's length,
	// so slow, densely sampled parts weigh no more than fast ones.
	/**
	 * @param {Point} A
	 * @param {Point} B
	 * @param {Point[]} pts
	 */
	function line_stats(A, B, pts) {
		const len = dist(A, B)
		/** @param {Point} p */
		function off(p) {
			return ((B.x - A.x) * (p.y - A.y) - (B.y - A.y) * (p.x - A.x)) / len
		}
		let plen = 0
		let area = 0
		for (let i = 1; i < pts.length; i++) {
			const s = dist(at(pts, i), at(pts, i - 1))
			const a = off(at(pts, i - 1))
			const b = off(at(pts, i))
			area += s * (a * a + a * b + b * b) / 3
			plen += s
		}
		const p0 = at(pts, 0)
		const pn = at(pts, pts.length - 1)
		const end = Math.min(
			dist(p0, A) + dist(pn, B),
			dist(p0, B) + dist(pn, A)
		) / 2
		const dev = plen ? Math.sqrt(area / plen) / len * 100 : 0
		const end_p = end / len * 100
		return {
			dev,
			endP: end_p,
			plen,
			score: Math.max(
				0,
				Math.round(100 - dev * 8 - end_p * 2.5)
			)
		}
	}
	// A simple (star-shaped) polygon filling a unit square inside the margin, vertices far enough apart to tell apart.
	/**
	 * @param {number} n
	 * @param {() => number} [rand]
	 * @param {number} [margin]
	 * @param {number} [min_gap]
	 * @returns {Point[]}
	 */
	function random_shape(
		n,
		rand = Math.random,
		margin = 0.1,
		min_gap = 0.12
	) {
		const span = 1 - 2 * margin
		for (;;) {
			const base = rand() * 2 * Math.PI
			/** @type {Point[]} */
			const raw = []
			for (let i = 0; i < n; i++) {
				const a = base + (i + 0.15 + rand() * 0.7) * 2 * Math.PI / n
				const r = 0.35 + rand() * 0.65
				raw.push(
					{
						x: Math.cos(a) * r,
						y: Math.sin(a) * r
					}
				)
			}
			const b = bbox(raw)
			const s = span / Math.max(b.w, b.h)
			const pts = raw.map(
				p => ({
					x: margin + (p.x - b.x) * s + (span - b.w * s) / 2,
					y: margin + (p.y - b.y) * s + (span - b.h * s) / 2
				})
			)
			if (pts.every(
				(p, i) => pts.every(
					(q, j) => j <= i || dist(p, q) >= min_gap
				)
			)) {
				return pts
			}
		}
	}
	return {
		avg,
		fitProportion: fit_proportion,
		lineStats: line_stats,
		randomShape: random_shape
	}
})()
globalThis.Drills = drills