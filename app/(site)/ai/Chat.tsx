"use client";

import { MarkdownRenderer } from "@/components/markdown";
import { CopyIcon, RegenerateIcon, EditIcon, TrashIcon, ThumbsUpIcon, ThumbsDownIcon } from "./icons";
import type { Message } from "./data";

export function TypingIndicator() {
  return (
    <div className="flex gap-4 animate-fadeSlide">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
        AI
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-white px-5 py-4 dark:border-border dark:bg-muted">
        <span className="h-2 w-2 animate-[typing-dot_1.4s_ease-in-out_infinite] rounded-full bg-zinc-400" />
        <span className="h-2 w-2 animate-[typing-dot_1.4s_ease-in-out_infinite] rounded-full bg-zinc-400" style={{ animationDelay: "0.2s" }} />
        <span className="h-2 w-2 animate-[typing-dot_1.4s_ease-in-out_infinite] rounded-full bg-zinc-400" style={{ animationDelay: "0.4s" }} />
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
    <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : ""} animate-fadeSlide`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
          AI
        </div>
      )}
      <div className={`group relative max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-5 py-3 text-sm leading-relaxed ${
            isUser
              ? "rounded-tr-sm bg-blue-600 text-white"
              : "rounded-tl-sm border border-border bg-white dark:border-border dark:bg-muted"
          }`}
        >
          {isUser ? displayText : <MarkdownRenderer text={displayText} />}
        </div>

        {!isUser && (
          <div className="mt-1.5 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button onClick={() => onCopy(msg.text)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Copy">
              <CopyIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onRegenerate(msg.id)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Regenerate">
              <RegenerateIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={editPrompt} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Edit">
              <EditIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onDelete(msg.id)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Delete">
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-1 pl-1">
              <button onClick={() => onFeedback(msg.id, "up")} className={`rounded-lg p-1 text-xs ${msg.feedback === "up" ? "text-blue-500" : "text-muted-foreground/70"} hover:text-blue-500`} title="Like">
                <ThumbsUpIcon className="h-3.5 w-3.5" fill={msg.feedback === "up" ? "currentColor" : "none"} />
              </button>
              <button onClick={() => onFeedback(msg.id, "down")} className={`rounded-lg p-1 text-xs ${msg.feedback === "down" ? "text-red-500" : "text-muted-foreground/70"} hover:text-red-500`} title="Dislike">
                <ThumbsDownIcon className="h-3.5 w-3.5" fill={msg.feedback === "down" ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        )}

        {isUser && (
          <div className="mt-1 flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button onClick={() => onCopy(msg.text)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Copy">
              <CopyIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={editPrompt} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Edit">
              <EditIcon className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => onDelete(msg.id)} className="rounded-lg p-1 text-xs text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Delete">
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
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-blue-200 hover:text-blue-600 dark:border-border dark:bg-muted/50 dark:text-muted-foreground/70 dark:hover:border-blue-600 dark:hover:text-blue-400"
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
