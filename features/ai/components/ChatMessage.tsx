import type { AiMessage } from "../types";
import { cn } from "@/lib/cn";

export interface ChatMessageProps {
  message: AiMessage;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex w-full gap-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
            : "border border-border/60 bg-background/80 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
          isStreaming && "border-dashed",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
