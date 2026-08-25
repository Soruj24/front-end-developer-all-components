"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ChatInputProps {
  onSend: (content: string) => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Type a message…" }: ChatInputProps) {
  const [value, setValue] = useState("");

  function submit() {
    const content = value.trim();
    if (!content || disabled) return;
    setValue("");
    void onSend(content);
  }

  return (
    <div className="flex w-full items-end gap-2">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        rows={2}
        className="min-h-11 flex-1 resize-none rounded-xl border border-border/60 bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        className={cn(
          "rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground",
          "shadow-sm shadow-primary/20 transition-all",
          "hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "active:scale-[0.97]",
          "disabled:opacity-40 disabled:shadow-none disabled:hover:bg-primary",
        )}
      >
        Send
      </button>
    </div>
  );
}
