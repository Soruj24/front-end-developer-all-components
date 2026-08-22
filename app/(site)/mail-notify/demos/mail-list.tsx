"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";

export function MailList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const emails = [
    { id: 1, from: "Alice Johnson", subject: "Project Update", time: "10:30 AM", unread: true },
    { id: 2, from: "Bob Smith", subject: "Meeting Tomorrow", time: "9:15 AM", unread: true },
    { id: 3, from: "Carol White", subject: "Design Review", time: "Yesterday", unread: false },
    { id: 4, from: "David Brown", subject: "Sprint Planning", time: "Yesterday", unread: false },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Inbox className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Mail List</h3>
      </div>
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        {emails.map((email, i) => (
          <div
            key={email.id}
            onClick={() => setSelectedId(email.id)}
            className={`flex items-center gap-3 border-b border-zinc-200 p-3 transition-colors last:border-b-0 dark:border-zinc-800 ${
              selectedId === email.id
                ? "bg-zinc-100 dark:bg-zinc-800"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                email.unread
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
              }`}
            >
              {email.from.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${email.unread ? "font-semibold text-zinc-900 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300"}`}>{email.from}</span>
              </div>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{email.subject}</p>
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{email.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
