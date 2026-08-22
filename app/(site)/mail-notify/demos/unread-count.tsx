"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

export function UnreadCount() {
  const [emails, setEmails] = useState([
    { id: 1, read: false },
    { id: 2, read: false },
    { id: 3, read: true },
    { id: 4, read: false },
    { id: 5, read: true },
  ]);
  const unreadCount = emails.filter((e) => !e.read).length;
  const toggleRead = (id: number) => setEmails(emails.map((e) => (e.id === id ? { ...e, read: !e.read } : e)));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <AlertCircle className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Unread Count</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Unread Messages</span>
          <span className="inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
            {unreadCount}
          </span>
        </div>
        <div className="space-y-1.5">
          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => toggleRead(email.id)}
              className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm transition-all ${
                email.read
                  ? "bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                  : "border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              }`}
            >
              <div className={`h-2 w-2 rounded-full ${email.read ? "bg-zinc-400" : "bg-zinc-900 dark:bg-zinc-100"}`} />
              <span className={email.read ? "" : "font-medium"}>Email {email.id}</span>
              <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">{email.read ? "Read" : "Unread"}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
