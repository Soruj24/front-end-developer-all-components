"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

export function BasicVariant() {
  const [msg, setMsg] = useState("");
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 shadow-sm focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-zinc-500">
        <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-1 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100" />
        <button disabled={!msg.trim()} className="rounded-lg bg-zinc-900 p-2 text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900" aria-label="Send"><Send className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export function AttachmentVariant() {
  const [msg, setMsg] = useState("");
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-zinc-500">
        <div className="flex items-center gap-2 px-3 py-2">
          <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800" aria-label="Attach"><Paperclip className="h-4 w-4" /></button>
          <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-1 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100" />
          <button disabled={!msg.trim()} className="rounded-lg bg-zinc-900 p-2 text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900" aria-label="Send"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}

export function ChatVariant() {
  return (
    <div className="w-full max-w-sm space-y-2.5">
      <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 px-3.5 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">Hello!</div></div>
      <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl rounded-bl-md bg-zinc-100 px-3.5 py-2 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">Hi there!</div></div>
      <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 px-3.5 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">How are you?</div></div>
    </div>
  );
}

export function DisabledVariant() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 opacity-60 dark:border-zinc-700 dark:bg-zinc-900">
        <input type="text" placeholder="Type a message..." disabled className="flex-1 bg-transparent px-1 py-1 text-sm text-zinc-400 outline-none placeholder:text-zinc-400" />
        <button disabled className="rounded-lg bg-zinc-300 p-2 text-zinc-500 dark:bg-zinc-700" aria-label="Send"><Send className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export function CounterVariant() {
  const [msg, setMsg] = useState("");
  const rem = 280 - msg.length;
  const over = rem < 0;
  return (
    <div className="w-full max-w-sm space-y-1">
      <div className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm focus-within:ring-2 ${over ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100" : "border-zinc-200 focus-within:border-zinc-400 focus-within:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950"}`}>
        <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-1 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100" />
        <button disabled={!msg.trim() || over} className="rounded-lg bg-zinc-900 p-2 text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900" aria-label="Send"><Send className="h-4 w-4" /></button>
      </div>
      <div className="flex justify-end px-1"><span className={`font-mono text-[11px] font-medium ${over ? "text-red-500" : rem <= 20 ? "text-amber-500" : "text-zinc-400"}`}>{rem}</span></div>
    </div>
  );
}
