import { MAX_GENERATION_ATTEMPTS, type GenerateState, type TestArtifact } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface TestOutput {
  source?: string;
  summary?: string;
}

/** Validates the testing agent output into a TestArtifact. */
export function parseTests(text: string): TestArtifact | null {
  const parsed = parseJsonObject<TestOutput>(text);
  if (parsed && typeof parsed.source === "string" && parsed.source.trim()) {
    return { source: parsed.source, summary: parsed.summary };
  }
  return null;
}

/**
 * Runs the Testing Agent against the artifact and stores generated test
 * source. Sandboxed execution is deferred to Phase 4; failures route back
 * into the refine loop (bounded) and otherwise save best-effort.
 */
export function makeTestingNode(deps: GenerateGraphDeps) {
  return async function testingNode(state: GenerateState): Promise<Partial<GenerateState>> {
    if (!state.artifact) return {};

    const text = await runAgent(deps, "testing", state.artifact.source, {
      context: `Request: ${state.request.prompt}`,
    });

    const tests = parseTests(text);
    if (!tests) return {};
    return { tests };
  };
}

/** Conditional-edge router: re-refine failing tests, otherwise proceed. */
export function routeFromTesting(state: GenerateState): "refactor" | "documentation" {
  if (state.tests?.source) return "documentation";
  return state.attempts < MAX_GENERATION_ATTEMPTS ? "refactor" : "documentation";
}
