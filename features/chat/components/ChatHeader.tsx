"use client";

import type { Conversation, User } from "../types/chat";
import { UserAvatar } from "./UserAvatar";

interface ChatHeaderProps {
  conversation: Conversation;
  users: User[];
  currentUserId: string;
  onToggleSidebar?: () => void;
}

export function ChatHeader({ conversation, users, currentUserId, onToggleSidebar }: ChatHeaderProps) {
  const otherUsers = conversation.participants
    .filter((id) => id !== currentUserId)
    .map((id) => users.find((u) => u.id === id))
    .filter(Boolean) as User[];

  const statusText =
    conversation.type === "channel"
      ? `${otherUsers.length} members`
      : otherUsers.length === 1
      ? otherUsers[0].status === "online"
        ? "Online"
        : "Last seen recently"
      : otherUsers.map((u) => u.name.split(" ")[0]).join(", ");

  return (
    <div className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {conversation.type === "channel" ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-lg font-bold text-zinc-300">
            #
          </div>
        ) : otherUsers.length === 1 ? (
          <UserAvatar user={otherUsers[0]} size="md" />
        ) : (
          <div className="flex -space-x-2">
            {otherUsers.slice(0, 2).map((u) => (
              <img
                key={u.id}
                src={u.avatar}
                alt={u.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-zinc-900"
              />
            ))}
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-white">{conversation.name}</h2>
          <p className="text-xs text-zinc-500">{statusText}</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
