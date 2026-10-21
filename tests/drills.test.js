import assert from "node:assert/strict"
import { test } from "vitest"
import "../drawing-drills/drills.js"
const {
	avg,
	fitProportion,
	lineStats,
	randomShape
} = globalThis.Drills
/**
 * @param {number} x
 * @param {number} y
 */
function P(x, y) {
	return { x, y }
}
/**
 * @template T
 * @param {T[]} a
 * @param {number} i
 * @returns {T}
 */
function at(a, i) {
	const v = a[i]
	assert.ok(v !== undefined)
	return v
}
/** @param {number} seed */
function lcg(seed) {
	return () => (seed = (seed * 16807) % 2147483647) / 2147483647
}
test(
	"avg is the mean and 0 for no values",
	() => {
		assert.equal(avg([ 1, 2, 6 ]), 3)
		assert.equal(avg([]), 0)
	}
)
test(
	"fitProportion ignores size and position but not proportion",
	() => {
		const t = [ P(0, 0), P(1, 0), P(1, 2), P(0, 2) ]
		const same = fitProportion(
			t.map(
				p => P(5 + p.x * 3, 1 + p.y * 3)
			),
			t
		)
		assert.ok(same)
		assert.ok(same.mean < 1e-9)
		assert.ok(same.raw > 100)
		assert.ok(
			Math.abs(same.scale - 3) < 1e-9
		)
		const wide = fitProportion(
			[ P(0, 0), P(2, 0), P(2, 2), P(0, 2) ],
			t
		)
		assert.ok(wide)
		assert.ok(wide.mean > 5)
		assert.equal(
			fitProportion(t.map(() => P(1, 1)), t),
			null
		)
	}
)
test(
	"fitProportion reports the worst point",
	() => {
		const t = [ P(0, 0), P(1, 0), P(1, 1), P(0, 1) ]
		const r = fitProportion(
			[
				P(0, 0),
				P(1, 0),
				P(1.6, 1.6),
				P(0, 1)
			],
			t
		)
		assert.ok(r)
		assert.equal(r.worst, 2)
	}
)
test(
	"fitProportion throws when the guess has more points than the truth",
	() => {
		const t = [ P(0, 0), P(1, 0), P(1, 1) ]
		assert.throws(
			() => fitProportion([ ...t, P(0, 1) ], t),
			RangeError
		)
	}
)
test(
	"lineStats measures a constant offset as that offset",
	() => {
		const r = lineStats(
			P(0, 0),
			P(200, 0),
			[ P(0, 4), P(100, 4), P(200, 4) ]
		)
		assert.ok(Math.abs(r.dev - 2) < 1e-9)
		assert.ok(Math.abs(r.endP - 2) < 1e-9)
	}
)
test(
	"lineStats of a single point has no wobble and no length",
	() => {
		const r = lineStats(P(0, 0), P(100, 0), [ P(0, 0) ])
		assert.equal(r.dev, 0)
		assert.equal(r.plen, 0)
	}
)
test(
	"lineStats scores a perfect stroke 100 in either direction",
	() => {
		const A = P(0, 0)
		const B = P(300, 400)
		assert.deepEqual(
			lineStats(A, B, [ A, P(150, 200), B ]),
			{
				dev: 0,
				endP: 0,
				plen: 500,
				score: 100
			}
		)
		assert.equal(
			lineStats(A, B, [ B, A ]).score,
			100
		)
	}
)
test(
	"lineStats throws for a stroke without points",
	() => {
		assert.throws(
			() => lineStats(P(0, 0), P(100, 0), []),
			RangeError
		)
	}
)
test(
	"lineStats wobble does not depend on sampling density",
	() => {
		const A = P(0, 0)
		const B = P(400, 0)
		const path = [ P(0, 0), P(200, 20), P(400, 0) ]
		const dense = [ P(0, 0) ]
		for (let i = 1; i <= 100; i++) {
			dense.push(P(2 * i, 0.2 * i))
		}
		dense.push(P(400, 0))
		assert.ok(
			Math.abs(
				lineStats(A, B, path).dev - lineStats(A, B, dense).dev
			) < 1e-9
		)
	}
)
/**
 * @param {{ x: number, y: number }} a
 * @param {{ x: number, y: number }} b
 * @param {{ x: number, y: number }} c
 * @param {{ x: number, y: number }} d
 */
function cross(a, b, c, d) {
	/**
	 * @param {{ x: number, y: number }} p
	 * @param {{ x: number, y: number }} q
	 * @param {{ x: number, y: number }} r
	 */
	function o(p, q, r) {
		return Math.sign(
			(q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x)
		)
	}
	return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0
}
test(
	"randomShape is a simple polygon that fills the margin box",
	() => {
		const rand = lcg(7)
		for (const n of [ 4, 8, 15 ]) {
			for (let k = 0; k < 20; k++) {
				const s = randomShape(n, rand)
				assert.equal(s.length, n)
				const xs = s.map(p => p.x)
				const ys = s.map(p => p.y)
				assert.ok(
					Math.min(...xs, ...ys) >= 0.1 - 1e-9 && Math.max(...xs, ...ys) <= 0.9 + 1e-9
				)
				assert.ok(
					Math.abs(
						Math.max(
							Math.max(...xs) - Math.min(...xs),
							Math.max(...ys) - Math.min(...ys)
						) - 0.8
					) < 1e-9
				)
				for (let i = 0; i < n; i++) {
					for (let j = i + 1; j < n; j++) {
						assert.ok(
							Math.hypot(
								at(s, i).x - at(s, j).x,
								at(s, i).y - at(s, j).y
							) >= 0.12
						)
						if (j == i + 1 || (i == 0 && j == n - 1)) {
							continue
						}
						assert.ok(
							!cross(
								at(s, i),
								at(s, (i + 1) % n),
								at(s, j),
								at(s, (j + 1) % n)
							),
							"edges cross"
						)
					}
				}
			}
		}
	}
)