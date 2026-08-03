"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat, uid, type AiMessage } from "@/features/ai";
import { defaultSettings } from "../constants";
import { buildSystemPrompt, buildUserPrompt } from "../prompts";
import type {
  GeneratedComponent,
  GeneratorResult,
  GeneratorSettings,
  GenStatus,
} from "../types";
import { parseGeneratedComponent } from "../utils/code";

interface LoadedState {
  component: GeneratedComponent | null;
  raw: string;
}

export interface UseGeneratorResult {
  settings: GeneratorSettings;
  updateSettings: (patch: Partial<GeneratorSettings>) => void;
  status: GenStatus;
  error?: string;
  raw: string;
  component: GeneratedComponent | null;
  messages: AiMessage[];
  generate: (overrides?: Partial<GeneratorSettings>) => void;
  regenerate: () => void;
  stopGeneration: () => void;
  reset: () => void;
  loadResult: (result: GeneratorResult) => void;
}

/**
 * Core of the prompt-to-component generator: settings, streaming chat, and
 * parsing of the structured model response. Output is derived during render;
 * effects only drive external side effects (history reporting, deferred sends).
 */
export function useGenerator(onResult?: (result: GeneratorResult) => void): UseGeneratorResult {
  const [settings, setSettings] = useState<GeneratorSettings>(defaultSettings);
  const [loaded, setLoaded] = useState<LoadedState | null>(null);

  const updateSettings = useCallback((patch: Partial<GeneratorSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const systemPrompt = useMemo(() => buildSystemPrompt(settings), [settings]);

  const { messages, send, clear, stop, isStreaming, error } = useChat({
    stream: true,
    modelId: settings.modelId,
    systemPrompt,
    temperature: 0.6,
    maxTokens: 4096,
  });

  const lastAssistant = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role === "assistant") return messages[index];
    }
    return null;
  }, [messages]);

  const raw = loaded ? loaded.raw : lastAssistant?.content ?? "";
  const parsed = useMemo(() => (raw.trim() ? parseGeneratedComponent(raw) : null), [raw]);
  const component = loaded ? loaded.component : lastAssistant && !isStreaming ? parsed : null;

  const status: GenStatus = error
    ? "error"
    : isStreaming
      ? "streaming"
      : loaded
        ? loaded.component
          ? "done"
          : "idle"
        : lastAssistant
          ? raw.trim()
            ? "done"
            : "idle"
          : "idle";

  const generate = useCallback(
    (overrides?: Partial<GeneratorSettings>) => {
      if (isStreaming) return;
      const effective = overrides ? { ...settings, ...overrides } : settings;
      setLoaded(null);
      void send(buildUserPrompt(effective));
    },
    [isStreaming, send, settings]
  );

  // Regenerate sends after `clear()` has been flushed so the model gets a
  // clean, single-message conversation instead of stale history.
  const pendingRef = useRef<string | null>(null);

  const regenerate = useCallback(() => {
    if (isStreaming) return;
    pendingRef.current = buildUserPrompt(settings);
    setLoaded(null);
    clear();
  }, [clear, isStreaming, settings]);

  useEffect(() => {
    if (isStreaming || !pendingRef.current) return;
    const text = pendingRef.current;
    pendingRef.current = null;
    void send(text);
  }, [isStreaming, messages, send]);

  const stopGeneration = useCallback(() => {
    stop();
  }, [stop]);

  const reset = useCallback(() => {
    pendingRef.current = null;
    setLoaded(null);
    clear();
  }, [clear]);

  /** Restores a history entry into the result panel. */
  const loadResult = useCallback((result: GeneratorResult) => {
    pendingRef.current = null;
    setLoaded({ component: result.component, raw: result.raw });
    clear();
    setSettings((prev) => ({ ...prev, prompt: result.prompt || prev.prompt }));
  }, [clear]);

  const reportedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!lastAssistant || isStreaming || error || !parsed) return;
    if (reportedRef.current === lastAssistant.id) return;
    reportedRef.current = lastAssistant.id;
    onResult?.({
      id: uid("gen"),
      prompt: settings.prompt,
      modelId: settings.modelId,
      createdAt: Date.now(),
      favorite: false,
      component: parsed,
      raw,
    });
  }, [error, isStreaming, lastAssistant, onResult, parsed, raw, settings.modelId, settings.prompt]);

  return {
    settings,
    updateSettings,
    status,
    error,
    raw,
    component,
    messages,
    generate,
    regenerate,
    stopGeneration,
    reset,
    loadResult,
  };
}
