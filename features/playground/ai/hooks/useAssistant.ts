"use client";

import { useCallback, useMemo, useState } from "react";
import { useChat, type AiMessage } from "@/features/ai";
import { usePlayground } from "../../context";
import { getAssistantCommand } from "../constants/commands";
import { buildCommandPrompt, buildSystemPrompt } from "../prompts";
import type { ApplyMode, AssistantCommandId, AssistantContext, CodeSnippet } from "../types";
import { fileNameForCommand, firstSourceSnippet } from "../utils/code";

const INPUT_COMMANDS = new Set<AssistantCommandId>(["generate-component", "generate-variants"]);

export interface UseAssistantResult {
  activeCommand: AssistantCommandId;
  setActiveCommand: (id: AssistantCommandId) => void;
  input: string;
  setInput: (value: string) => void;
  sendChat: () => void;
  runCommand: (id: AssistantCommandId) => void;
  stop: () => void;
  clear: () => void;
  focusSignal: number;
  messages: AiMessage[];
  isStreaming: boolean;
  error?: string;
  primarySnippet: CodeSnippet | null;
  applyMode: ApplyMode;
  applyToActiveFile: () => void;
  applyAsNewFile: (name?: string) => void;
  copyPrimary: () => void;
}

/** Builds the assistant context from the current playground state. */
function buildAssistantContext(
  files: ReturnType<typeof usePlayground>["files"],
  consoleApi: ReturnType<typeof usePlayground>["console"]
): AssistantContext {
  return {
    activeFile: files.activeName,
    activeSource: files.active.source,
    files: files.files.map((file) => ({ name: file.name, source: file.source })),
    problems: consoleApi.problems.map((p) => ({
      severity: p.severity,
      message: p.message,
      file: p.file,
      line: p.line,
    })),
    buildStatus: consoleApi.counts.errors > 0 ? "errors" : "clean",
  };
}

/** Stateful core of the integrated AI Assistant panel. */
export function useAssistant(): UseAssistantResult {
  const { files, console: consoleApi, setStatusMessage } = usePlayground();
  const [activeCommand, setActiveCommandState] = useState<AssistantCommandId>("chat");
  const [lastCommand, setLastCommand] = useState<AssistantCommandId>("chat");
  const [lastInput, setLastInput] = useState("");
  const [input, setInput] = useState("");
  const [focusSignal, setFocusSignal] = useState(0);

  const context = useMemo(() => buildAssistantContext(files, consoleApi), [files, consoleApi]);
  const systemPrompt = useMemo(() => buildSystemPrompt(context), [context]);

  const { messages, send, clear, stop, isStreaming, error } = useChat({
    stream: true,
    systemPrompt,
  });

  const setActiveCommand = useCallback((id: AssistantCommandId) => {
    setActiveCommandState(id);
  }, []);

  const requestFocus = useCallback(() => {
    setFocusSignal((value) => value + 1);
  }, []);

  const sendChat = useCallback(() => {
    const content = input.trim();
    if (!content || isStreaming) return;
    setLastCommand("chat");
    setLastInput(content);
    setActiveCommandState("chat");
    setInput("");
    void send(content);
  }, [input, isStreaming, send]);

  const runCommand = useCallback(
    (id: AssistantCommandId) => {
      if (isStreaming) return;
      setActiveCommandState(id);
      const raw = input.trim();
      if (INPUT_COMMANDS.has(id) && !raw) {
        requestFocus();
        return;
      }
      setLastCommand(id);
      setLastInput(raw);
      setInput("");
      void send(buildCommandPrompt(id, raw, context));
    },
    [context, input, isStreaming, requestFocus, send]
  );

  const lastAssistant = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role === "assistant") return messages[index];
    }
    return null;
  }, [messages]);

  const primarySnippet = useMemo(
    () => (lastAssistant ? firstSourceSnippet(lastAssistant.content) : null),
    [lastAssistant]
  );

  const applyMode = getAssistantCommand(lastCommand).applyMode;

  const applyToActiveFile = useCallback(() => {
    if (!primarySnippet || isStreaming) return;
    files.updateSource(files.activeName, primarySnippet.code);
    setStatusMessage(`AI applied to ${files.activeName}`);
  }, [files, isStreaming, primarySnippet, setStatusMessage]);

  const applyAsNewFile = useCallback(
    (name?: string) => {
      if (!primarySnippet || isStreaming) return;
      const existing = files.files.map((file) => file.name);
      const target =
        name?.trim() ||
        fileNameForCommand(files.activeName, lastCommand, lastInput, existing);
      files.addFile(target, primarySnippet.code);
      setStatusMessage(`AI created ${target}`);
    },
    [files, isStreaming, primarySnippet, setStatusMessage, lastCommand, lastInput]
  );

  const copyPrimary = useCallback(() => {
    if (!primarySnippet) return;
    void navigator.clipboard?.writeText(primarySnippet.code);
  }, [primarySnippet]);

  return {
    activeCommand,
    setActiveCommand,
    input,
    setInput,
    sendChat,
    runCommand,
    stop,
    clear,
    focusSignal,
    messages,
    isStreaming,
    error,
    primarySnippet,
    applyMode,
    applyToActiveFile,
    applyAsNewFile,
    copyPrimary,
  };
}
