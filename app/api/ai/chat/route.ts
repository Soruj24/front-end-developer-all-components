import { chatRequestSchema } from "@/features/ai/schemas";
import { createChatService } from "@/features/ai/server";
import { chatEventStream } from "@/features/ai/server/streaming";
import { classifyError } from "@/features/ai/server/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
} as const;

/**
 * Chat endpoint consumed by `useChat({ stream: true })`.
 * `stream: true`  → SSE stream of ChatEvents.
 * `stream: false` → JSON `{ ok, data | error }`.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input.", code: "invalid_request" },
      { status: 400 }
    );
  }

  const service = createChatService();

  if (parsed.data.stream) {
    return new Response(chatEventStream(service.stream(parsed.data)), { headers: HEADERS });
  }

  try {
    const data = await service.invoke(parsed.data);
    return Response.json({ ok: true, data });
  } catch (error) {
    const classified = classifyError(error);
    return Response.json({ ok: false, error: classified.message, code: classified.code });
  }
}
