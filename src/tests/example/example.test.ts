import { describe, expect, it } from "vitest";
// import { callWorkflow, toSnapshot } from "../../client.ts";

const SKIP = !process.env.RUN_N8N_TESTS;

// Example test structure - uncomment and modify for your workflows
describe.skipIf(SKIP)("Example Workflow", () => {
	it.skip("example test", async () => {
		// const res = await callWorkflow("my-workflow", {
		// 	param1: "value1",
		// 	param2: "value2",
		// });
		// expect(toSnapshot(res)).toMatchSnapshot();
		expect(true).toBe(true);
	});
});
