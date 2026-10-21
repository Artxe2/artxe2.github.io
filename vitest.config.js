import { defineConfig } from "vitest/config"
export default defineConfig(
	{
		test: {
			coverage: {
				include: [
					"drawing-drills/*.js",
					"pitch-trace/*.js"
				],
				thresholds: { 100: true }
			},
			hookTimeout: 60000,
			testTimeout: 60000
		}
	}
)