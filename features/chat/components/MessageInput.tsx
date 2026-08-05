"use client";

import { useState, useRef, useEffect } from "react";
import { quickReactions } from "../constants/chat-data";

interface MessageInputProps {
  onSend: (content: string) => void;
  onTyping?: () => void;
}

export function MessageInput({ onSend, onTyping }: MessageInputProps) {
  const [value, setValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSubmit() {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="border-t border-zinc-800 bg-zinc-900/50 px-4 py-3">
      <div className="flex items-end gap-3">
        <div className="relative" ref={emojiRef}>
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {showEmoji && (
            <div className="absolute bottom-12 left-0 z-20 flex gap-1 rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-xl">
              {quickReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setValue((v) => v + emoji);
                    setShowEmoji(false);
                    inputRef.current?.focus();
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-colors hover:bg-zinc-800"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1">
          <textarea
            ref={inputRef}
            rows={1}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onTyping?.();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
