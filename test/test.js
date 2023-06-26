const h1 = 16
const h2 = 16 ** 2
const h3 = 16 ** 3
const h4 = 16 ** 4
const h5 = 16 ** 5
const h6 = 16 ** 6
const chars = '0123456789abcdef'
const background = []

for (let i = 0; i < h6; i += 1000) {
	background.push(
		`${chars[Math.trunc(i / h5)]
		}${chars[Math.trunc(i % h5 / h4)]
		}${chars[Math.trunc(i % h4 / h3)]
		}${chars[Math.trunc(i % h3 / h2)]
		}${chars[Math.trunc(i % h2 / h1)]
		}${chars[Math.trunc(i % h1)]}`
	)
}
var fs = require('fs')

fs.writeFile(
	'inline-style.html'
	, `<html><head><title>Inline Style Performance Test</title></head><body>${background.map(v=>`<div style="background:#${v};"><span style="color:#${v};filter:invert(1);">${v}</span></div>`).join("")}</body></html>`
	,'utf8'
	, function(error){console.log('inline-style.html end')}
)
fs.writeFile(
	'css-lube.html'
	, `<html><head><title>CSS Lube Performance Test</title><script src="https://artxe2.github.io/css-lube/css-lube.min.js"></script></head><body>${background.map(v=>`<div class="bg=#${v}"><span class="c=#${v} ft=invert(1)">${v}</span></div>`).join("")}</body></html>`
	,'utf8'
	, function(error){console.log('css-lube.html end')}
)
fs.writeFile(
	'tailwind-jit.html'
	, `<html><head><title>Tailwind JIT Performance Test</title><script src="https://unpkg.com/tailwindcss-jit-cdn"></script></head><body>${background.map(v=>`<div class="bg-[#${v}]"><span class="c-[#${v}] invert">${v}</span></div>`).join("")}</body></html>`
	,'utf8'
	, function(error){console.log('tailwind-jit.html end')}
)
fs.writeFile(
	'atomic-css.html'
	, `<html><head><title>Atomic CSS Performance Test</title><link rel="stylesheet" href="./atomic-css.css"/></head><body>${background.map(v=>`<div class="Bg(#${v})"><span class="C(#${v}) Ft(invert(1))">${v}</span></div>`).join("")}</body></html>`
	,'utf8'
	, function(error){console.log('atomic-css.html end')}
)
fs.writeFile(
	'atomic-css.css'
	, `.Ft\\(invert\\(1\\)\\){filter:invert(1)}${background.map(v=>`.Bg\\(\\#${v}\\){background:#${v}}.C\\(\\#${v}\\){color:#${v}}`).join("")}`
	,'utf8'
	, function(error){console.log('atomic-css.css end')}
)