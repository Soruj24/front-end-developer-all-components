"use client";

import { useState } from "react";
import { useChat } from "@/features/ai";
import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";

export function AiView() {
  const { files } = usePlayground();
  const [input, setInput] = useState("");

  const systemPrompt = [
    "You are an expert front-end engineer embedded in a live component playground.",
    "The user is editing a React + Tailwind project and can apply your changes directly.",
    "Respond with concise, actionable guidance. When asked to change code, explain what to change rather than assuming you can edit files directly.",
    `Current project files: ${files.files.map((f) => f.name).join(", ")}.`,
    "The user may paste code or ask you to review it. Be precise and terse.",
  ].join(" ");

  const { messages, send, clear, isStreaming, error } = useChat({ stream: true, systemPrompt });

  const submit = () => {
    if (!input.trim() || isStreaming) return;
    void send(input);
    setInput("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-2 py-2">
        {messages.length === 0 && (
          <div className="rounded-md border border-[#2a2a2e] bg-[#1f1f23] p-3 text-[12px] leading-relaxed text-[#9ca3af]">
            <p className="mb-1 flex items-center gap-1.5 font-medium text-[#d4d4d8]">
              <Icon name="sparkles" width={13} height={13} className="text-[#2b7de9]" />
              Assistant
            </p>
            Ask me about your current project, to review a component, or to draft code you can paste into the editor.
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-md px-2.5 py-1.5 text-[12px] leading-relaxed ${
              message.role === "user"
                ? "ml-4 bg-[#2b7de9]/15 text-[#d4d4d8]"
                : "mr-4 border border-[#2a2a2e] bg-[#1f1f23] text-[#cccccc]"
            }`}
          >
            {message.content || "…"}
          </div>
        ))}
        {isStreaming && <p className="px-1 text-[11px] text-[#6a6a72]">Streaming…</p>}
        {error && <p className="px-1 text-[11px] text-[#f48771]">{error}</p>}
      </div>

      {messages.length > 0 && (
        <button
          type="button"
          onClick={clear}
          className="mx-2 mb-1 flex items-center gap-1 self-start rounded px-1.5 py-0.5 text-[11px] text-[#9ca3af] hover:bg-[#37373d] hover:text-[#d4d4d8]"
        >
          <Icon name="trash" width={11} height={11} />
          Clear
        </button>
      )}

      <div className="flex items-end gap-1.5 border-t border-[#2a2a2e] p-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask about your code…"
          rows={2}
          className="min-h-[44px] flex-1 resize-none rounded border border-[#3a3a41] bg-[#1f1f23] px-2 py-1.5 text-[12px] text-[#d4d4d8] outline-none placeholder:text-[#6a6a72] focus:border-[#2b7de9]"
        />
        <button
          type="button"
          onClick={submit}
          disabled={isStreaming || !input.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#2b7de9] text-white transition-colors hover:bg-[#3b8be9] disabled:opacity-50"
          aria-label="Send"
        >
          <Icon name="play" width={13} height={13} className="rotate-90" />
        </button>
      </div>
    </div>
  );
}
