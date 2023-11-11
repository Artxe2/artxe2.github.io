const TICK = 5000
const common_script = `const root = document.querySelector("#root")
			const json = await fetch("https://jsonplaceholder.typicode.com/photos")
				.then(response => response.json())
			for (let i = 0; i < 50; i++) {
				JSON.stringify(json)
			}
			const template_div = document.createElement("div")
			const template_span = document.createElement("span")
			template_div.append(template_span)
			const h1 = 16
			const h2 = 16 ** 2
			const h3 = 16 ** 3
			const h4 = 16 ** 4
			const h5 = 16 ** 5
			const h6 = 16 ** 6
			const chars = '0123456789abcdef'
			const background = []

			for (let i = 0; i < h6; i += ${TICK}) {
				background.push(
					\`\${chars[Math.trunc(i / h5)]
					}\${chars[Math.trunc(i % h5 / h4)]
					}\${chars[Math.trunc(i % h4 / h3)]
					}\${chars[Math.trunc(i % h3 / h2)]
					}\${chars[Math.trunc(i % h2 / h1)]
					}\${chars[Math.trunc(i % h1)]}\`
				)
			}`
const h1 = 16
const h2 = 16 ** 2
const h3 = 16 ** 3
const h4 = 16 ** 4
const h5 = 16 ** 5
const h6 = 16 ** 6
const chars = '0123456789abcdef'
const background = []

for (let i = 0; i < h6; i += TICK) {
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
	'atomic-css.css'
	, `.Ft\\(invert\\(1\\)\\){filter:invert(1)}${background.map(v=>`.Bg\\(\\#${v}\\){background:#${v}}.C\\(\\#${v}\\){color:#${v}}`).join("")}`
	,'utf8'
	, function(error){console.log('atomic-css.css end')}
)
fs.writeFile(
	'atomic-css.html'
	, `<!DOCTYPE html>
<html>
	<head>
		<title>Atomic CSS Performance Test</title>
		<link rel="stylesheet" href="./atomic-css.css"/>
	</head>
	<body>
		<div id="root">
			${background.map(bg => `<div class="Bg(#${bg})">
				<span class="C(#${bg}) Ft(invert(1))">${bg}</span>
			</div>`).join(`
			`)}
		</div>
		<script type="module">
			${common_script}
			root.innerHTML = ""
			for (const bg of background) {
				template_div.className = \`Bg(#\${bg})\`
				template_span.className = \`C(#\${bg}) Ft(invert(1))\`
				template_span.textContent = bg
				root.append(template_div.cloneNode(true))
			}
		</script>
	</body>
</html>`
	,'utf8'
	, function(error){console.log('atomic-css.html end')}
)
fs.writeFile(
	'css-lube.html'
	, `<!DOCTYPE html>
<html>
	<head>
		<title>CSS Lube Performance Test</title>
		<script src="https://artxe2.github.io/css-lube/css-lube.min.js"></script>
	</head>
	<body>
		<div id="root">
			${background.map(bg => `<div class="bg=#${bg}">
				<span class="c=#${bg} ft=invert(1)">${bg}</span>
			</div>`).join(`
			`)}
		</div>
		<script type="module">
			${common_script}
			for (const bg of background) {
				template_div.className = \`bg=#\${bg}\`
				template_span.className = \`c=#\${bg} ft=invert(1)\`
				template_span.textContent = bg
				root.append(template_div.cloneNode(true))
			}
		</script>
	</body>
</html>`
	,'utf8'
	, function(error){console.log('css-lube.html end')}
)
fs.writeFile(
	'css-lube-test.html'
	, `<!DOCTYPE html>
<html>
	<head>
		<title>CSS Lube Performance Test</title>
		<script src="../../css-lube/packages/lib/css-lube.js"></script>
	</head>
	<body>
		<div id="root">
			${background.map(bg => `<div class="bg=#${bg}">
				<span class="c=#${bg} ft=invert(1)">${bg}</span>
			</div>`).join(`
			`)}
		</div>
		<script type="module">
			${common_script}
			for (const bg of background) {
				template_div.className = \`bg=#\${bg}\`
				template_span.className = \`c=#\${bg} ft=invert(1)\`
				template_span.textContent = bg
				root.append(template_div.cloneNode(true))
			}
		</script>
	</body>
</html>`
	,'utf8'
	, function(error){console.log('css-lube.html end')}
)
fs.writeFile(
	'inline-style.html'
	, `<!DOCTYPE html>
<html>
	<head>
		<title>Inline Style Performance Test</title>
	</head>
	<body>
		<div id="root">
			${background.map(bg => `<div style="background:#${bg};">
				<span style="color:#${bg};filter:invert(1);">${bg}</span>
			</div>`).join(`
			`)}
		</div>
		<script type="module">
			${common_script}
			for (const bg of background) {
				template_div.style.cssText = \`background:#\${bg};\`
				template_span.style.cssText = \`color:#\${bg};filter:invert(1);\`
				template_span.textContent = bg
				root.append(template_div.cloneNode(true))
			}
		</script>
	</body>
</html>`
	,'utf8'
	, function(error){console.log('inline-style.html end')}
)
fs.writeFile(
	'tailwind-cdn.html'
	, `<!DOCTYPE html>
<html>
	<head>
		<title>Tailwind CDN Performance Test</title>
		<script src="https://cdn.tailwindcss.com"></script>
	</head>
	<body>
		<div id="root">
			${background.map(bg => `<div class="bg-[#${bg}]">
				<span class="text-[color:#${bg}] invert">${bg}</span>
			</div>`).join(`
			`)}
		</div>
		<script type="module">
			${common_script}
			for (const bg of background) {
				template_div.className = \`bg-[#\${bg}]\`
				template_span.className = \`text-[color:#\${bg}] invert\`
				template_span.textContent = bg
				root.append(template_div.cloneNode(true))
			}
		</script>
	</body>
</html>`
	,'utf8'
	, function(error){console.log('tailwind-cdn.html end')}
)