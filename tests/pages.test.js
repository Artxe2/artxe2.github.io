import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "vitest"
const CLICK = "<script src=\"https://artxe.github.io/click-css/min.js\"></script>"
const PAGES = [
	"pitch-trace/index.html",
	"drawing-drills/index.html"
]
for (const page of PAGES) {
	const html = readFileSync(
		new URL("../" + page, import.meta.url),
		"utf8"
	)
	test(
		`${page} loads Click CSS first in head`,
		() => {
			const head = html.slice(0, html.indexOf("</head>"))
			assert.ok(head.includes(CLICK))
			assert.equal(
				head.search(
					/<script|<link rel="stylesheet"/
				),
				head.indexOf(CLICK)
			)
		}
	)
	test(
		`${page} is styled only with Click CSS tokens`,
		() => {
			assert.doesNotMatch(html, /<style[\s>]/)
			assert.doesNotMatch(html, /\sstyle="/)
		}
	)
	test(
		`${page} is in English`,
		() => {
			assert.match(html, /<html lang="en"/)
			assert.doesNotMatch(html, /[ㄱ-ㆎ가-힣]/)
		}
	)
}