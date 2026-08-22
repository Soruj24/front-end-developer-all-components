"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function SendButton() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSend = () => {
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Send className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Send Button</h3>
      </div>
      <div className="flex h-32 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <button
          onClick={handleSend}
          disabled={status !== "idle"}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
            status === "sent"
              ? "bg-emerald-500 text-white"
              : status === "sending"
              ? "bg-zinc-400 text-white dark:bg-zinc-600"
              : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          }`}
        >
          {status === "sending" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : status === "sent" ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Sent!
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Email
            </>
          )}
        </button>
      </div>
    </div>
  );
}
