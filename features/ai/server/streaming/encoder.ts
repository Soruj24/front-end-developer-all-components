import { encodeSSE } from "../../utils";
import type { ChatEvent } from "../../types";
import { classifyError } from "../errors";

export function encodeChatEvent(event: ChatEvent): string {
  return encodeSSE(event.type, event);
}

export function chatEventStream(
  events: AsyncIterable<ChatEvent>
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of events) {
          controller.enqueue(encoder.encode(encodeChatEvent(event)));
        }
      } catch (error) {
        const classified = classifyError(error);
        const failed: ChatEvent = {
          type: "error",
          messageId: "",
          code: classified.code,
          message: classified.message,
        };
        controller.enqueue(encoder.encode(encodeChatEvent(failed)));
      }
      controller.close();
    },
  });
}
