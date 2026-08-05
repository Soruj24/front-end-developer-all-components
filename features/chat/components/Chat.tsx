"use client";

import { useState, useCallback } from "react";
import type { Conversation, Message, User } from "../types/chat";
import { currentUser, users, conversations as initialConversations, messages as initialMessages } from "../constants/chat-data";
import { ChatHeader } from "./ChatHeader";
import { ConversationList } from "./ConversationList";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";

export function Chat() {
  const [activeId, setActiveId] = useState<string | null>("c1");
  const [allMessages, setAllMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [typingUsers] = useState<string[]>([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const activeConversation = initialConversations.find((c) => c.id === activeId) ?? null;

  const handleSend = useCallback(
    (content: string) => {
      if (!activeId) return;
      const newMsg: Message = {
        id: `m-${Date.now()}`,
        senderId: currentUser.id,
        content,
        timestamp: new Date().toISOString(),
        status: "sent",
      };
      setAllMessages((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] ?? []), newMsg],
      }));
    },
    [activeId]
  );

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    setShowMobileSidebar(false);
  }, []);

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside
        className={`${
          showMobileSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-80 border-r border-zinc-800 bg-zinc-900 transition-transform duration-200 lg:relative lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* User header */}
          <div className="flex h-16 items-center gap-3 border-b border-zinc-800 px-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{currentUser.name}</p>
              <p className="text-xs text-zinc-500">{currentUser.role}</p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            <p className="mb-2 px-6 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Direct Messages</p>
            <ConversationList
              conversations={initialConversations.filter((c) => c.type === "direct")}
              activeId={activeId}
              onSelect={handleSelect}
              users={users}
              searchQuery={searchQuery}
            />
            <p className="mb-2 mt-4 px-6 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Channels</p>
            <ConversationList
              conversations={initialConversations.filter((c) => c.type !== "direct")}
              activeId={activeId}
              onSelect={handleSelect}
              users={users}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Main chat area */}
      <main className="flex flex-1 flex-col">
        {activeConversation ? (
          <>
            <ChatHeader
              conversation={activeConversation}
              users={users}
              currentUserId={currentUser.id}
              onToggleSidebar={() => setShowMobileSidebar(!showMobileSidebar)}
            />
            <MessageList
              messages={allMessages[activeId!] ?? []}
              users={users}
              currentUserId={currentUser.id}
            />
            <TypingIndicator names={typingUsers} />
            <MessageInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-800/50">
                <svg className="h-10 w-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Select a conversation</h3>
              <p className="mt-1 text-sm text-zinc-500">Pick from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
