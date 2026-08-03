"use client";

import { useEffect, useRef } from "react";
import type { AiMessage } from "@/features/ai";
import { AiMarkdown } from "./AiMarkdown";

export interface AiMessagesProps {
  messages: AiMessage[];
  isStreaming: boolean;
  error?: string;
}

export function AiMessages({ messages, isStreaming, error }: AiMessagesProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-[260px]">
          <p className="text-[13px] font-medium text-[#d4d4d8]">AI Assistant</p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#6a6a72]">
            Use a command below or ask a question. Responses stream in as they are generated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
      {messages.map((message) => (
        <AiMessageItem key={message.id} message={message} />
      ))}

      {isStreaming && (
        <div className="flex items-center gap-1.5 px-2 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2b7de9]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2b7de9] [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2b7de9] [animation-delay:300ms]" />
        </div>
      )}

      {error && (
        <p className="rounded-md border border-[#4d2020] bg-[#3a1616] px-2.5 py-2 text-[12px] text-[#f48771]">
          {error}
        </p>
      )}

      <div ref={endRef} />
    </div>
  );
}

function AiMessageItem({ message }: { message: AiMessage }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[92%] whitespace-pre-wrap rounded-lg rounded-tr-sm bg-[#2b7de9]/20 px-2.5 py-1.5 text-[12.5px] leading-relaxed text-[#dbe7ff]">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-[#2a2a2e] bg-[#1e1e22] px-2.5 py-2 text-[#c6c6cd]">
      <AiMarkdown text={message.content || "…"} />
    </div>
  );
}
