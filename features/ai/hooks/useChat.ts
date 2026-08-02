"use client";

import { useCallback, useRef, useState } from "react";
import { sendChatMessageAction } from "../actions";
import type { AiMessage } from "../types";
import { readChatEventStream, uid } from "../utils";

export interface UseChatOptions {
  stream?: boolean;
  endpoint?: string;
  modelId?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: string[];
}

export interface UseChatResult {
  messages: AiMessage[];
  send: (content: string) => Promise<void>;
  clear: () => void;
  stop: () => void;
  isStreaming: boolean;
  error?: string;
}

export function useChat(options: UseChatOptions = {}): UseChatResult {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>();
  const messagesRef = useRef<AiMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const updateMessages = useCallback((updater: (prev: AiMessage[]) => AiMessage[]) => {
    setMessages((prev) => {
      const next = updater(prev);
      messagesRef.current = next;
      return next;
    });
  }, []);

  const send = useCallback(
    async (content: string) => {
      const text = content.trim();
      if (!text || isStreaming) return;

      const userMessage: AiMessage = {
        id: uid("msg"),
        role: "user",
        content: text,
        createdAt: Date.now(),
      };
      const input = {
        messages: [...messagesRef.current, userMessage],
        modelId: options.modelId,
        systemPrompt: options.systemPrompt,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        tools: options.tools,
      };

      updateMessages(() => [...messagesRef.current, userMessage]);
      setError(undefined);
      setIsStreaming(true);

      try {
        if (options.stream) {
          const controller = new AbortController();
          abortRef.current = controller;
          const response = await fetch(options.endpoint ?? "/api/ai/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...input, stream: true }),
            signal: controller.signal,
          });
          if (!response.ok || !response.body) {
            throw new Error(`Chat request failed (${response.status})`);
          }
          await readChatEventStream(response.body, (entry) => {
            const event = entry.data as {
              type: string;
              messageId?: string;
              delta?: string;
              message?: string;
            };
            if (event.type === "delta") {
              const messageId = event.messageId;
              const delta = event.delta ?? "";
              if (!messageId) return;
              updateMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.role === "assistant" && last.id === messageId) {
                  return prev.map((m) =>
                    m.id === messageId ? { ...m, content: m.content + delta } : m
                  );
                }
                return [
                  ...prev,
                  { id: messageId, role: "assistant" as const, content: delta, createdAt: Date.now() },
                ];
              });
            } else if (event.type === "error") {
              setError(event.message ?? "Unexpected stream error.");
            }
          });
        } else {
          const result = await sendChatMessageAction(input);
          if (result.ok) {
            updateMessages((prev) => [...prev, result.data.message]);
          } else {
            setError(result.error);
          }
        }
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Unexpected chat error.");
      } finally {
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [isStreaming, options, updateMessages]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clear = useCallback(() => {
    updateMessages(() => []);
    setError(undefined);
  }, [updateMessages]);

  return { messages, send, clear, stop, isStreaming, error };
}
