"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

export function MailFilter() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const emails = [
    { id: 1, subject: "Welcome email", read: false, category: "primary" },
    { id: 2, subject: "Weekly digest", read: true, category: "promotions" },
    { id: 3, subject: "Password reset", read: false, category: "primary" },
    { id: 4, subject: "New comment", read: true, category: "social" },
  ];
  const filtered = emails.filter((e) => (filter === "unread" ? !e.read : filter === "read" ? e.read : true));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Clock className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Mail Filter</h3>
      </div>
      <div className="mb-4 flex gap-1.5">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
              filter === f
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {filtered.map((email) => (
          <div key={email.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            <div className={`h-2 w-2 rounded-full ${email.read ? "bg-zinc-400" : "bg-zinc-900 dark:bg-zinc-100"}`} />
            <div className="flex-1">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{email.subject}</p>
              <p className="text-xs capitalize text-zinc-500 dark:text-zinc-400">{email.category}</p>
            </div>
            <span className="inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
              {email.read ? "Read" : "New"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
