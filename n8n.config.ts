// Configure your n8n workspace here
export default {
	// Your n8n workspace name (used with n8ncli)
	workspace: "your-workspace",

	// Test Harness webhook URL - deploy workflows/test-harness.json first
	testHarnessUrl: "https://your-instance.app.n8n.cloud/webhook/your-webhook-id",

	// Register your subworkflows here
	workflows: {
		// Example:
		// "my-workflow": {
		// 	id: "abc123",
		// 	name: "My Workflow",
		// },
	},
} as const;
