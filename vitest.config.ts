import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		testTimeout: 15000,
		fileParallelism: false, // n8n webhooks get rate limited with parallel requests
	},
});
