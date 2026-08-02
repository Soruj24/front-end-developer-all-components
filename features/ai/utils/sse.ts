export type SSEInput = Record<string, unknown> | string;

export function encodeSSE(event: string, data: SSEInput): string {
  const payload = typeof data === "string" ? data : JSON.stringify(data);
  return `event: ${event}\ndata: ${payload}\n\n`;
}

export interface SSEEvent {
  event: string;
  data: unknown;
}

export async function readChatEventStream(
  stream: ReadableStream<Uint8Array>,
  onEvent: (event: SSEEvent) => void
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const { events, rest } = parseSSEBuffer(buffer);
    buffer = rest;
    for (const entry of events) {
      if (entry.event === "message") continue;
      onEvent(entry);
    }
  }
}

export function parseSSEBuffer(buffer: string): { events: SSEEvent[]; rest: string } {
  const events: SSEEvent[] = [];
  const lines = buffer.split("\n");
  let eventName = "message";
  const dataLines: string[] = [];
  let rest = "";
  let index = 0;

  for (; index < lines.length; index++) {
    const line = lines[index];
    if (line === "") {
      if (dataLines.length > 0) {
        const raw = dataLines.join("\n");
        let data: unknown = raw;
        try {
          data = JSON.parse(raw);
        } catch {
          data = raw;
        }
        events.push({ event: eventName, data });
      }
      eventName = "message";
      dataLines.length = 0;
      continue;
    }
    if (line.startsWith(":")) continue;
    if (line.startsWith("event:")) {
      eventName = line.slice("event:".length).trim();
      continue;
    }
    if (line.startsWith("data:")) {
      dataLines.push(line.slice("data:".length).trimStart());
      continue;
    }
  }

  if (dataLines.length > 0 || eventName !== "message") {
    rest = lines.slice(index - 1).join("\n");
  }
  return { events, rest };
}
