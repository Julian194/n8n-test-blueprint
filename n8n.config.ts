// Configure your n8n workspace here

interface WorkflowConfig {
	id: string;
	name: string;
}

interface Config {
	workspace: string;
	testHarnessUrl: string;
	workflows: Record<string, WorkflowConfig>;
}

const config: Config = {
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
};

export default config;
