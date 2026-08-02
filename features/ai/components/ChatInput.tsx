"use client";

import { useState } from "react";

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
        className="min-h-11 flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-40"
      >
        Send
      </button>
    </div>
  );
}
