import type { Citation, DemoStreamOptions, StreamChunk } from "../StreamingResponse";

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Replays a markdown string as a realistic stream of chunks: optional
 * thinking phase, tool calls, tokenized text, citations, then done.
 */
export async function* createDemoStream(
  content: string,
  options: DemoStreamOptions = {}
): AsyncGenerator<StreamChunk> {
  const {
    thinking,
    tools,
    citations,
    tokenDelay = 18,
    charMode = false,
    startDelay = 700,
  } = options;

  if (startDelay > 0) await sleep(startDelay);

  if (thinking) {
    yield { type: "thinking", content: thinking };
    await sleep(420);
  }

  if (tools) {
    for (const tool of tools) {
      yield { type: "tool", tool: { ...tool, status: "running" } };
      await sleep(140);
      yield { type: "tool", tool: { ...tool, status: "success" } };
      await sleep(60);
    }
  }

  if (charMode) {
    for (const char of content) {
      yield { type: "text", content: char };
      await sleep(tokenDelay);
    }
  } else {
    for (const word of content.match(/\S+\s*/g) ?? []) {
      yield { type: "text", content: word };
      await sleep(tokenDelay);
    }
  }

  if (citations) {
    for (const citation of citations) {
      yield { type: "citation", citation };
    }
  }

  yield { type: "done" };
}
