"use client";

import { useState, type FormEvent } from "react";

export function EmailCardVariant() {
  const [read, setRead] = useState(false);
  return (
    <div
      onClick={() => setRead(!read)}
      className={`cursor-pointer rounded-lg border p-4 transition-all ${
        read ? "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" : "border-zinc-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {!read && <div className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />}
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">New project assignment</p>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">You have been assigned to the new dashboard project.</p>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">2m</span>
      </div>
    </div>
  );
}

export function NotificationVariant() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex h-32 items-center justify-center gap-8 rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="relative">
        <span className="text-2xl">&#128276;</span>
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {count}
          </span>
        )}
      </div>
      <button
        onClick={() => setCount(Math.max(0, count - 1))}
        className="rounded-lg border border-zinc-200 bg-white px-3 py-1 text-xs font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      >
        Dismiss
      </button>
    </div>
  );
}

export function MailListVariant() {
  const [sel, setSel] = useState<number | null>(null);
  const emails = [
    { id: 1, from: "Alice", subject: "Update" },
    { id: 2, from: "Bob", subject: "Meeting" },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      {emails.map((e) => (
        <div
          key={e.id}
          onClick={() => setSel(e.id)}
          className={`flex items-center gap-3 border-b border-zinc-200 p-3 transition-colors last:border-b-0 dark:border-zinc-800 ${
            sel === e.id ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
          }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
            {e.from.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{e.from}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{e.subject}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SendVariant() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const handle = () => {
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
    setTimeout(() => setStatus("idle"), 3000);
  };
  return (
    <div className="flex h-32 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <button
        onClick={handle}
        disabled={status !== "idle"}
        className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
          status === "sent"
            ? "bg-emerald-500 text-white"
            : status === "sending"
            ? "bg-zinc-400 text-white dark:bg-zinc-600"
            : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"
        }`}
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send"}
      </button>
    </div>
  );
}

export function UnreadVariant() {
  const [emails, setEmails] = useState([
    { id: 1, read: false },
    { id: 2, read: false },
    { id: 3, read: true },
  ]);
  const toggle = (id: number) => setEmails(emails.map((e) => (e.id === id ? { ...e, read: !e.read } : e)));
  return (
    <div className="space-y-1.5">
      {emails.map((e) => (
        <button
          key={e.id}
          onClick={() => toggle(e.id)}
          className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm transition-all ${
            e.read ? "bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400" : "border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          }`}
        >
          <div className={`h-2 w-2 rounded-full ${e.read ? "bg-zinc-400" : "bg-zinc-900 dark:bg-zinc-100"}`} />
          <span className={e.read ? "" : "font-medium"}>Email {e.id}</span>
          <span className="ml-auto text-xs text-zinc-400">{e.read ? "Read" : "Unread"}</span>
        </button>
      ))}
    </div>
  );
}

export function NewsletterVariant() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const sub = (e: FormEvent) => { e.preventDefault(); if (email) setDone(true); };
  if (done) return <div className="py-8 text-center"><p className="font-medium text-zinc-900 dark:text-zinc-100">Subscribed!</p></div>;
  return (
    <form onSubmit={sub} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        required
      />
      <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900">
        Subscribe
      </button>
    </form>
  );
}

export function FilterVariant() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const emails = [
    { id: 1, subject: "Welcome", read: false },
    { id: 2, subject: "Digest", read: true },
  ];
  const filtered = emails.filter((e) => (filter === "unread" ? !e.read : filter === "read" ? e.read : true));
  return (
    <>
      <div className="mb-3 flex gap-1.5">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
              filter === f ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {filtered.map((e) => (
          <div key={e.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className={`h-2 w-2 rounded-full ${e.read ? "bg-zinc-400" : "bg-zinc-900 dark:bg-zinc-100"}`} />
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{e.subject}</p>
          </div>
        ))}
      </div>
    </>
  );
}
