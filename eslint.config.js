import parser from "@typescript-eslint/parser"
import lube from "eslint-plugin-lube"
/** @type {import("eslint").Linter.Config[]} */
export default [
	{
		ignores: [
			".claude/settings*.json",
			".tmp/**",
			"coverage/**"
		]
	},
	{
		files: [ "**/*.js", "**/*.json", "**/*.ts" ],
		languageOptions: {
			ecmaVersion: "latest",
			parser,
			sourceType: "module"
		},
		plugins: lube.configs.strict.plugins,
		rules: { ...lube.configs.strict.rules }
	}
]