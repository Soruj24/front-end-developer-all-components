"use server";

import type { ZodError } from "zod";
import { chatRequestSchema } from "../schemas";
import { createChatService } from "../server";
import { classifyError } from "../server/errors";
import type { ChatResponse } from "../types";

export type ChatActionResult =
  | { ok: true; data: ChatResponse }
  | { ok: false; error: string; code?: string };

export async function sendChatMessageAction(input: unknown): Promise<ChatActionResult> {
  const parsed = chatRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: firstIssue(parsed.error), code: "invalid_request" };
  }
  const service = createChatService();
  try {
    const response = await service.invoke(parsed.data);
    return { ok: true, data: response };
  } catch (error) {
    const classified = classifyError(error);
    return { ok: false, error: classified.message, code: classified.code };
  }
}

function firstIssue(error: ZodError): string {
  return error.issues[0]?.message ?? "Invalid input.";
}
