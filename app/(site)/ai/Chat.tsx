"use client";

import { MarkdownRenderer } from "@/components/markdown";
import { cn } from "@/lib/cn";
import { CopyIcon, RegenerateIcon, EditIcon, TrashIcon, ThumbsUpIcon, ThumbsDownIcon } from "./icons";
import type { Message } from "./data";

export function TypingIndicator() {
  return (
    <div className="flex gap-4 animate-fadeSlide">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white shadow-sm">
        AI
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border/60 bg-card px-5 py-4 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
        <span className="h-2 w-2 animate-[typing-dot_1.4s_ease-in-out_infinite] rounded-full bg-muted-foreground/40" />
        <span className="h-2 w-2 animate-[typing-dot_1.4s_ease-in-out_infinite] rounded-full bg-muted-foreground/40" style={{ animationDelay: "0.2s" }} />
        <span className="h-2 w-2 animate-[typing-dot_1.4s_ease-in-out_infinite] rounded-full bg-muted-foreground/40" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}

export function ChatMessage({
  msg,
  isStreaming,
  streamingText,
  followUps,
  onCopy,
  onRegenerate,
  onEdit,
  onDelete,
  onFeedback,
  onFollowUp,
}: {
  msg: Message;
  isStreaming: boolean;
  streamingText: string;
  followUps: string[];
  onCopy: (text: string) => void;
  onRegenerate: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onFeedback: (id: number, type: "up" | "down") => void;
  onFollowUp: (text: string) => void;
}) {
  const isUser = msg.role === "user";
  const displayText = isStreaming && streamingText ? streamingText : msg.text;

  const editPrompt = () => {
    const t = prompt("Edit message:", msg.text);
    if (t) onEdit(msg.id, t);
  };

  return (
    <div className={cn("flex gap-4 animate-fadeSlide", isUser ? "flex-row-reverse" : "")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white shadow-sm">
          AI
        </div>
      )}
      <div className={cn("group relative max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-5 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-blue-600 text-white shadow-sm shadow-blue-600/20"
              : "rounded-tl-sm border border-border/60 bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
          )}
        >
          {isUser ? displayText : <MarkdownRenderer text={displayText} />}
        </div>

        {!isUser && (
          <div className="mt-1.5 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button onClick={() => onCopy(msg.text)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Copy">
              <CopyIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onRegenerate(msg.id)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Regenerate">
              <RegenerateIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={editPrompt} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Edit">
              <EditIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onDelete(msg.id)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Delete">
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-1 pl-1">
              <button onClick={() => onFeedback(msg.id, "up")} className={cn("rounded-lg p-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", msg.feedback === "up" ? "text-blue-500" : "text-muted-foreground/70 hover:text-blue-500")} title="Like">
                <ThumbsUpIcon className="h-3.5 w-3.5" fill={msg.feedback === "up" ? "currentColor" : "none"} />
              </button>
              <button onClick={() => onFeedback(msg.id, "down")} className={cn("rounded-lg p-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", msg.feedback === "down" ? "text-red-500" : "text-muted-foreground/70 hover:text-red-500")} title="Dislike">
                <ThumbsDownIcon className="h-3.5 w-3.5" fill={msg.feedback === "down" ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        )}

        {isUser && (
          <div className="mt-1 flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button onClick={() => onCopy(msg.text)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Copy">
              <CopyIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={editPrompt} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Edit">
              <EditIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onDelete(msg.id)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Delete">
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {followUps.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {followUps.map((fup, j) => (
              <button
                key={j}
                onClick={() => onFollowUp(fup)}
                className={cn(
                  "rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-all",
                  "hover:border-primary/30 hover:text-primary hover:bg-primary/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "active:scale-[0.97]",
                )}
              >
                {fup}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
