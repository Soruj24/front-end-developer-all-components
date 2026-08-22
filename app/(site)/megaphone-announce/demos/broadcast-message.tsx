"use client";

import { useState } from "react";
import { Volume2, Send, CheckCircle } from "lucide-react";

export function BroadcastMessage() {
  const [channel, setChannel] = useState<"all" | "email" | "sms" | "push">("all");
  const [sent, setSent] = useState(false);

  const handleBroadcast = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Volume2 className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Broadcast Message</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Channel</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(["all", "email", "sms", "push"] as const).map((ch) => (
              <button key={ch} onClick={() => setChannel(ch)} className={`rounded-lg py-2 text-xs font-medium capitalize transition-all ${channel === ch ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
                {ch}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Message</label>
          <textarea className="w-full min-h-[80px] rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800" placeholder="Enter your broadcast message..." defaultValue="System maintenance scheduled for tonight at 11 PM UTC." />
        </div>
        <button onClick={handleBroadcast} disabled={sent} className={`w-full rounded-xl py-2.5 text-sm font-medium transition-all ${sent ? "bg-emerald-500 text-white" : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"}`}>
          {sent ? (
            <span className="flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4" />Broadcast Sent!</span>
          ) : (
            <span className="flex items-center justify-center gap-2"><Send className="h-4 w-4" />Broadcast Now</span>
          )}
        </button>
      </div>
    </div>
  );
}
