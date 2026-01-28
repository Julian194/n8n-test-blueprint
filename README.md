# n8n Workflow Test Blueprint

A TypeScript testing framework for n8n subworkflows using Vitest.

## Features

- Test n8n subworkflows via webhook
- Snapshot testing for API responses
- TypeScript with strict type checking
- Biome for linting and formatting
- Pre-commit hooks for code quality
- Dry-run mode support for non-destructive testing

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/kaiserlich/n8n-test-blueprint.git my-n8n-tests
cd my-n8n-tests
npm install
```

### 2. Deploy the Test Harness

Import `workflows/test-harness.json` into your n8n instance:

1. Open n8n
2. Create new workflow
3. Import from file: `workflows/test-harness.json`
4. Activate the workflow
5. Copy the webhook URL

### 3. Configure

Edit `n8n.config.ts`:

```typescript
export default {
  workspace: "your-workspace",
  testHarnessUrl: "https://your-instance.app.n8n.cloud/webhook/xxx",
  workflows: {
    "my-workflow": {
      id: "abc123",
      name: "My Workflow",
    },
  },
} as const;
```

### 4. Write Tests

Create a test file in `src/tests/`:

```typescript
import { describe, expect, it } from "vitest";
import { callWorkflow, toSnapshot } from "../../client.ts";

describe("My Workflow", () => {
  it("returns expected output", async () => {
    const res = await callWorkflow("my-workflow", {
      input: "value",
    });
    expect(toSnapshot(res)).toMatchSnapshot();
  });
});
```

### 5. Run Tests

```bash
# Run all tests
npm test

# Update snapshots
npm run test:update
```

## Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:update` | Update snapshots |
| `npm run test:watch` | Watch mode |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | Biome linting |
| `npm run format` | Auto-fix formatting |
| `npm run precommit` | Run typecheck + lint |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `RUN_PAID_API_TESTS=1` | Enable tests that hit paid external APIs |

## Project Structure

```
├── n8n.config.ts         # Workspace and workflow configuration
├── src/
│   ├── client.ts         # Test client for calling workflows
│   └── tests/            # Test files
│       └── example/
│           └── example.test.ts
├── workflows/
│   └── test-harness.json # Deploy this to n8n first
└── .githooks/
    └── pre-commit        # Runs typecheck + lint
```

## Pre-commit Hooks

Enable git hooks after cloning:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

## Testing Patterns

### Validation Tests (No External API)

Test input validation without hitting external APIs:

```typescript
it("rejects invalid input", async () => {
  const res = await callWorkflow("my-workflow", { invalid: true });
  expect(res.body).toEqual({ error: "Invalid input" });
});
```

### Dry-Run Mode

For workflows with side effects, implement a `dry_run` flag:

```typescript
it("validates without side effects", async () => {
  const res = await callWorkflow("my-workflow", {
    data: "test",
    dry_run: true,
  });
  expect(res.body.dry_run).toBe(true);
  expect(res.body.would_create).toBe(true);
});
```

### Paid API Tests

Skip expensive tests by default:

```typescript
const SKIP = !process.env.RUN_PAID_API_TESTS;

describe.skipIf(SKIP)("Paid API", () => {
  it("calls external API", async () => {
    // Only runs with RUN_PAID_API_TESTS=1
  });
});
```

## License

MIT
