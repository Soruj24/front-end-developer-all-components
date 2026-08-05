"use client";

import { useState } from "react";
import type { Conversation, User } from "../types/chat";
import { UserAvatar } from "./UserAvatar";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  users: User[];
  searchQuery: string;
}

export function ConversationList({ conversations, activeId, onSelect, users, searchQuery }: ConversationListProps) {
  const getUser = (id: string) => users.find((u) => u.id === id)!;

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinned = filtered.filter((c) => c.pinned);
  const others = filtered.filter((c) => !c.pinned);

  return (
    <div className="flex flex-col gap-1 px-2">
      {pinned.length > 0 && (
        <div className="mb-2">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Pinned</p>
          {pinned.map((c) => (
            <ConversationItem key={c.id} conversation={c} isActive={c.id === activeId} onClick={onSelect} getUser={getUser} />
          ))}
        </div>
      )}
      {others.map((c) => (
        <ConversationItem key={c.id} conversation={c} isActive={c.id === activeId} onClick={onSelect} getUser={getUser} />
      ))}
    </div>
  );
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
  getUser,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: (id: string) => void;
  getUser: (id: string) => User;
}) {
  const otherUser = conversation.type === "direct"
    ? conversation.participants.find((id) => id !== "u1")
    : null;

  return (
    <button
      onClick={() => onClick(conversation.id)}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
        isActive
          ? "bg-zinc-800/80 text-white"
          : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
      }`}
    >
      {otherUser ? (
        <UserAvatar user={getUser(otherUser)} size="sm" />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm">
          {conversation.type === "channel" ? "#" : "\u{1F465}"}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">{conversation.name}</span>
          {conversation.lastMessage && (
            <span className="ml-2 shrink-0 text-[10px] text-zinc-500">
              {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>
        {conversation.lastMessage && (
          <p className="mt-0.5 truncate text-xs text-zinc-500">
            {conversation.lastMessage.content}
          </p>
        )}
      </div>
      {conversation.unreadCount > 0 && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}
