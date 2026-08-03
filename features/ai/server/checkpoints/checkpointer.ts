import { MemorySaver, type BaseCheckpointSaver } from "@langchain/langgraph";

/**
 * Returns the checkpointer for a pipeline thread. Phase 0 uses an in-memory
 * saver; Phase 4 swaps in a Mongo/Postgres saver so threads survive restarts.
 */
export function createCheckpointer(): BaseCheckpointSaver {
  return new MemorySaver();
}
