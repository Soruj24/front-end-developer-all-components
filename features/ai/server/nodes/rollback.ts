import { deleteComponent } from "@/features/registry/server/service";
import type { AutonomousState } from "../state/autonomous";

export function makeRollbackNode() {
  return async function rollbackNode(
    state: AutonomousState
  ): Promise<Partial<AutonomousState>> {
    if (!state.published) {
      return { error: undefined, steps: ["rollback: nothing to roll back"] };
    }
    try {
      await deleteComponent(state.published.componentId);
      return {
        published: undefined,
        error: undefined,
        steps: ["rollback: deleted published component"],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { error: `Rollback failed: ${message}` };
    }
  };
}
