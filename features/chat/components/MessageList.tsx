"use client";

import { useEffect, useRef } from "react";
import type { Message, User } from "../types/chat";

interface MessageListProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
}

export function MessageList({ messages, users, currentUserId }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getUser = (id: string) => users.find((u) => u.id === id)!;

  const grouped = messages.reduce<{ date: string; items: Message[] }[]>((acc, msg) => {
    const date = new Date(msg.timestamp).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    const last = acc[acc.length - 1];
    if (last && last.date === date) {
      last.items.push(msg);
    } else {
      acc.push({ date, items: [msg] });
    }
    return acc;
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {grouped.map((group) => (
        <div key={group.date}>
          <div className="sticky top-0 z-10 flex items-center gap-4 py-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-[11px] font-medium text-zinc-500">{group.date}</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
          {group.items.map((msg) => {
            const isOwn = msg.senderId === currentUserId;
            const sender = getUser(msg.senderId);
            const showAvatar = group.items.indexOf(msg) === 0 || group.items[0].senderId !== msg.senderId;

            return (
              <div
                key={msg.id}
                className={`group flex gap-3 py-1 ${isOwn ? "flex-row-reverse" : ""}`}
              >
                {showAvatar ? (
                  <img
                    src={sender?.avatar}
                    alt={sender?.name}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 shrink-0" />
                )}
                <div className={`max-w-[70%] ${isOwn ? "items-end" : ""}`}>
                  {showAvatar && (
                    <div className={`mb-1 flex items-center gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
                      <span className="text-xs font-semibold text-zinc-300">{sender?.name}</span>
                      <span className="text-[10px] text-zinc-600">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      isOwn
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-zinc-800 text-zinc-200 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`mt-1 flex flex-wrap gap-1 ${isOwn ? "justify-end" : ""}`}>
                      {msg.reactions.map((r, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-xs"
                        >
                          {r.emoji} <span className="text-zinc-400">{r.userIds.length}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
