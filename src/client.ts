import config from "../n8n.config.ts";

export type WorkflowKey = keyof typeof config.workflows;

export interface CallResult<T = unknown> {
	status: number;
	body: T | null;
}

/**
 * Call a workflow via the test harness
 */
export async function callWorkflow<T = unknown>(
	workflowKey: WorkflowKey,
	data: Record<string, unknown>,
): Promise<CallResult<T>> {
	const workflow =
		config.workflows[workflowKey as keyof typeof config.workflows];
	if (!workflow) {
		throw new Error(`Unknown workflow: ${workflowKey}`);
	}

	const res = await fetch(config.testHarnessUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			workflow_id: workflow.id,
			data,
		}),
	});

	const body = await res.json().catch(() => null);
	return { status: res.status, body: body as T };
}

/**
 * Convert response to snapshot-friendly format
 */
export function toSnapshot(res: CallResult): { status: number; body: unknown } {
	return { status: res.status, body: res.body };
}
