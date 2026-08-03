"use client";

import { useEffect, useRef } from "react";
import { getAssistantCommand } from "../constants/commands";
import type { AssistantCommandId } from "../types";
import { Icon } from "../../ui/icons";

export interface AiInputProps {
  activeCommand: AssistantCommandId;
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
  isStreaming: boolean;
  focusSignal: number;
  disabled?: boolean;
}

export function AiInput({
  activeCommand,
  value,
  onChange,
  onSend,
  onStop,
  isStreaming,
  focusSignal,
  disabled,
}: AiInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (focusSignal > 0) textareaRef.current?.focus();
  }, [focusSignal]);

  const command = getAssistantCommand(activeCommand);
  const canSend = Boolean(value.trim()) && !isStreaming && !disabled;

  const submit = () => {
    if (!canSend) return;
    onSend();
  };

  return (
    <div className="shrink-0 border-t border-[#2a2a2e] bg-[#1f1f23] p-2">
      {activeCommand !== "chat" && (
        <p className="mb-1 px-0.5 text-[10.5px] text-[#2b7de9]">
          {command.label} · press Enter to run
        </p>
      )}
      <div className="flex items-end gap-1.5">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          placeholder={command.placeholder}
          rows={2}
          className="min-h-[44px] max-h-32 flex-1 resize-none rounded border border-[#3a3a41] bg-[#1a1a1e] px-2.5 py-1.5 text-[12.5px] leading-relaxed text-[#d4d4d8] outline-none placeholder:text-[#6a6a72] focus:border-[#2b7de9]"
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            title="Stop generating"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#4d2020] text-[#f48771] transition-colors hover:bg-[#5a2626]"
            aria-label="Stop"
          >
            <Icon name="x" width={13} height={13} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canSend}
            title="Send (Enter)"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#2b7de9] text-white transition-colors hover:bg-[#3b8be9] disabled:opacity-50"
            aria-label="Send"
          >
            <Icon name="play" width={12} height={12} className="rotate-90" />
          </button>
        )}
      </div>
    </div>
  );
}
