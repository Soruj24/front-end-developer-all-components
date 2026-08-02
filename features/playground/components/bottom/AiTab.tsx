"use client";

import { useState } from "react";
import { useChat } from "@/features/ai";
import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";

export function AiTab() {
  const { files } = usePlayground();
  const [input, setInput] = useState("");

  const systemPrompt = [
    "You are an embedded code assistant in a component playground.",
    `Current files: ${files.files.map((f) => f.name).join(", ")}.`,
    "Give terse, actionable answers. When writing code, output it in a single markdown code block.",
    "Ask clarifying questions if the request is ambiguous.",
  ].join(" ");

  const { messages, send, clear, isStreaming, error } = useChat({ stream: true, systemPrompt });

  const submit = () => {
    if (!input.trim() || isStreaming) return;
    void send(input);
    setInput("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2 text-[12px] leading-relaxed">
        {messages.length === 0 && (
          <p className="text-[#6a6a72]">
            Ask the AI to review code, explain a concept, or generate a component you can paste back.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`whitespace-pre-wrap rounded-md px-2.5 py-1.5 ${
              message.role === "user"
                ? "ml-6 bg-[#2b7de9]/15 text-[#d4d4d8]"
                : "mr-6 border border-[#2a2a2e] bg-[#1e1e1e] text-[#cccccc]"
            }`}
          >
            {message.content || "…"}
          </div>
        ))}
        {isStreaming && <p className="text-[11px] text-[#6a6a72]">Streaming…</p>}
        {error && <p className="text-[11px] text-[#f48771]">{error}</p>}
      </div>

      <div className="flex items-end gap-2 border-t border-[#2a2a2e] p-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask about the current project…"
          rows={1}
          className="min-h-[32px] flex-1 resize-none rounded border border-[#3a3a41] bg-[#1e1e1e] px-2 py-1.5 text-[12px] text-[#d4d4d8] outline-none placeholder:text-[#6a6a72] focus:border-[#2b7de9]"
        />
        <button
          type="button"
          onClick={clear}
          disabled={messages.length === 0}
          className="flex h-8 items-center gap-1 rounded px-2 text-[11px] text-[#9ca3af] hover:bg-[#37373d] disabled:opacity-40"
        >
          <Icon name="trash" width={11} height={11} />
          Clear
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={isStreaming || !input.trim()}
          className="flex h-8 w-8 items-center justify-center rounded bg-[#2b7de9] text-white hover:bg-[#3b8be9] disabled:opacity-50"
          aria-label="Send"
        >
          <Icon name="play" width={13} height={13} className="rotate-90" />
        </button>
      </div>
    </div>
  );
}
