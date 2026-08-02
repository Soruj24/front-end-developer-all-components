"use client";

import { useState } from "react";

const conversations = [
  { id: 1, name: "Alice Johnson", lastMessage: "Sure, I'll send that over now.", lastTime: "10:36 AM", unread: 2, online: true },
  { id: 2, name: "Bob Martinez", lastMessage: "Can we reschedule the meeting?", lastTime: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Carol Smith", lastMessage: "The deployment went smoothly.", lastTime: "Yesterday", unread: 1, online: true },
  { id: 4, name: "David Lee", lastMessage: "Let me check the logs.", lastTime: "Mon", unread: 0, online: false },
  { id: 5, name: "Emma Wilson", lastMessage: "PR is ready for review!", lastTime: "Mon", unread: 3, online: true },
  { id: 6, name: "Frank Garcia", lastMessage: "Can you hop on a quick call?", lastTime: "Sun", unread: 0, online: false },
  { id: 7, name: "Grace Kim", lastMessage: "Thanks for the help yesterday.", lastTime: "Sun", unread: 0, online: true },
  { id: 8, name: "Henry Turner", lastMessage: "Updated the dashboard UI.", lastTime: "Sat", unread: 0, online: false },
];

const allMessages = [
  { id: 1, conversationId: 1, sender: "Alice Johnson", text: "Hey! How's the project going?", time: "10:32 AM", isMe: false },
  { id: 2, conversationId: 1, sender: "Me", text: "Going well! Almost done with the dashboard.", time: "10:33 AM", isMe: true },
  { id: 3, conversationId: 1, sender: "Alice Johnson", text: "Great! Do you need the API docs?", time: "10:34 AM", isMe: false },
  { id: 4, conversationId: 1, sender: "Me", text: "Yes, that would be helpful.", time: "10:35 AM", isMe: true },
  { id: 5, conversationId: 1, sender: "Alice Johnson", text: "Sure, I'll send that over now.", time: "10:36 AM", isMe: false },
  { id: 6, conversationId: 2, sender: "Bob Martinez", text: "Hey, are you free tomorrow?", time: "2:15 PM", isMe: false },
  { id: 7, conversationId: 2, sender: "Me", text: "Let me check my calendar.", time: "2:16 PM", isMe: true },
  { id: 8, conversationId: 2, sender: "Bob Martinez", text: "Can we reschedule the meeting?", time: "2:17 PM", isMe: false },
  { id: 9, conversationId: 3, sender: "Carol Smith", text: "The deployment went smoothly.", time: "4:00 PM", isMe: false },
  { id: 10, conversationId: 3, sender: "Me", text: "No errors in the logs?", time: "4:02 PM", isMe: true },
  { id: 11, conversationId: 3, sender: "Carol Smith", text: "Everything looks clean!", time: "4:03 PM", isMe: false },
  { id: 12, conversationId: 4, sender: "David Lee", text: "I pushed the hotfix.", time: "11:00 AM", isMe: false },
  { id: 13, conversationId: 4, sender: "Me", text: "Let me check the logs.", time: "11:02 AM", isMe: true },
  { id: 14, conversationId: 5, sender: "Emma Wilson", text: "PR is ready for review!", time: "9:45 AM", isMe: false },
  { id: 15, conversationId: 5, sender: "Me", text: "I'll take a look right now.", time: "9:47 AM", isMe: true },
  { id: 16, conversationId: 5, sender: "Emma Wilson", text: "Thanks! Let me know if anything needs changing.", time: "9:48 AM", isMe: false },
  { id: 17, conversationId: 6, sender: "Frank Garcia", text: "Can you hop on a quick call?", time: "3:30 PM", isMe: false },
  { id: 18, conversationId: 6, sender: "Me", text: "Sure, give me 5 minutes.", time: "3:31 PM", isMe: true },
  { id: 19, conversationId: 7, sender: "Grace Kim", text: "Thanks for the help yesterday.", time: "10:15 AM", isMe: false },
  { id: 20, conversationId: 7, sender: "Me", text: "Anytime! Happy to help.", time: "10:16 AM", isMe: true },
  { id: 21, conversationId: 8, sender: "Henry Turner", text: "Updated the dashboard UI.", time: "1:00 PM", isMe: false },
  { id: 22, conversationId: 8, sender: "Me", text: "Looks great! Love the new layout.", time: "1:02 PM", isMe: true },
  { id: 23, conversationId: 8, sender: "Henry Turner", text: "Thanks! Still need to tweak the mobile view.", time: "1:03 PM", isMe: false },
  { id: 24, conversationId: 8, sender: "Me", text: "Let me know if you need any help with that.", time: "1:04 PM", isMe: true },
  { id: 25, conversationId: 3, sender: "Carol Smith", text: "I think we can push to production by Friday.", time: "Yesterday", isMe: false },
  { id: 26, conversationId: 3, sender: "Me", text: "Sounds good. I'll prepare the release notes.", time: "Yesterday", isMe: true },
  { id: 27, conversationId: 3, sender: "Carol Smith", text: "Perfect, thanks!", time: "Yesterday", isMe: false },
];

const todayMessages = [
  { id: 100, conversationId: 1, sender: "Alice Johnson", text: "Hey! How's the project going?", time: "10:32 AM", isMe: false, date: "Today" },
  { id: 101, conversationId: 1, sender: "Me", text: "Going well! Almost done with the dashboard.", time: "10:33 AM", isMe: true, date: "Today" },
  { id: 102, conversationId: 1, sender: "Alice Johnson", text: "Great! Do you need the API docs?", time: "10:34 AM", isMe: false, date: "Today" },
  { id: 103, conversationId: 1, sender: "Me", text: "Yes, that would be helpful.", time: "10:35 AM", isMe: true, date: "Today" },
  { id: 104, conversationId: 1, sender: "Alice Johnson", text: "Sure, I'll send that over now.", time: "10:36 AM", isMe: false, date: "Today" },
];

const yesterdayMessages = [
  { id: 200, conversationId: 1, sender: "Alice Johnson", text: "By the way, did you see the latest PR?", time: "4:00 PM", isMe: false, date: "Yesterday" },
  { id: 201, conversationId: 1, sender: "Me", text: "Not yet, I'll check it out.", time: "4:05 PM", isMe: true, date: "Yesterday" },
];

function getMessagesForConversation(convId: number) {
  if (convId === 1) return [...yesterdayMessages, ...todayMessages];
  return allMessages.filter((m) => m.conversationId === convId);
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; conversationId: number; sender: string; text: string; time: string; isMe: boolean; date?: string }>>([]);

  const activeConversation = conversations.find((c) => c.id === activeChat);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (id: number) => {
    setActiveChat(id);
    setIsCalling(false);
    const convMessages = getMessagesForConversation(id);
    setMessages(convMessages);
    if (id === 1) {
      setTimeout(() => setIsTyping(true), 2000);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: Date.now(), conversationId: 1, sender: "Alice Johnson", text: "Let me know once you've reviewed it!", time: "10:37 AM", isMe: false, date: "Today" }]);
      }, 4000);
    }
  };

  const handleSend = () => {
    if (!messageText.trim() || !activeChat) return;
    setMessages((prev) => [...prev, { id: Date.now(), conversationId: activeChat, sender: "Me", text: messageText, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true, date: "Today" }]);
    setMessageText("");
  };

  const renderDateSeparator = (date: string) => (
    <div className="flex items-center gap-3 py-3">
      <div className="flex-1 border-t border-border" />
      <span className="text-xs font-medium text-muted-foreground">{date}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      <h1 className="sr-only">Chat</h1>
      <div className="flex h-full">
        <aside className="hidden w-80 shrink-0 flex-col border-r border-border bg-white dark:border-border dark:bg-zinc-900 lg:flex">
          <div className="flex items-center gap-3 border-b border-border p-4 dark:border-border">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <div>
              <p className="text-sm font-medium text-foreground">Alex Morgan</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="relative border-b border-border p-3 dark:border-border">
            <svg className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              aria-label="Search conversations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-border bg-muted/40 py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectChat(conv.id)}
                className={`flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50 ${
                  activeChat === conv.id ? "bg-blue-50 dark:bg-blue-950/30" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${
                    conv.id % 2 === 0 ? "from-emerald-400 to-teal-500" : "from-blue-400 to-purple-500"
                  }`} />
                  {conv.online && <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{conv.name}</span>
                    <span className="text-xs text-muted-foreground/70">{conv.lastTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="ml-2 rounded-full bg-blue-600 px-1.5 py-0.5 text-xs font-medium text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex flex-1 flex-col bg-background">
          {activeConversation ? (
            <>
              <div className="flex items-center justify-between border-b border-border p-4 dark:border-border">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${
                    activeConversation.id % 2 === 0 ? "from-emerald-400 to-teal-500" : "from-blue-400 to-purple-500"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{activeConversation.name}</p>
                    <p className={`text-xs ${activeConversation.online ? "text-green-500" : "text-muted-foreground/70"}`}>
                      {activeConversation.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCalling(true)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {isCalling && (
                <div className="flex items-center justify-center gap-2 bg-green-50 py-2 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
                  <svg className="h-4 w-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Calling {activeConversation.name}...
                  <button
                    onClick={() => setIsCalling(false)}
                    className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                  >
                    End
                  </button>
                </div>
              )}

              <div className="flex-1 space-y-1 overflow-y-auto p-4">
                {messages.map((msg, i) => {
                  const showDateSeparator = msg.date && (i === 0 || messages[i - 1]?.date !== msg.date);
                  return (
                    <div key={msg.id}>
                      {showDateSeparator && renderDateSeparator(msg.date!)}
                      <div className={`flex gap-3 py-0.5 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                        {!msg.isMe && (
                          <div className={`mt-1 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br ${
                            msg.conversationId % 2 === 0 ? "from-emerald-400 to-teal-500" : "from-blue-400 to-purple-500"
                          }`} />
                        )}
                        <div className={`flex max-w-[70%] flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                          <div className={`rounded-2xl px-4 py-2 text-sm ${
                            msg.isMe
                              ? "rounded-tr-sm bg-blue-600 text-white"
                              : "rounded-tl-sm bg-muted text-zinc-900 dark:bg-muted dark:text-zinc-100"
                          }`}>
                            {msg.text}
                          </div>
                          <span className="mt-0.5 px-1 text-[10px] text-muted-foreground/70">{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex gap-3 py-2">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm dark:bg-muted">
                      <span className="text-muted-foreground">Alice is typing</span>
                      <span className="flex gap-0.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border p-4 dark:border-border">
                <div className="flex items-end gap-3">
                  <button className="mb-1 rounded-lg p-2 text-muted-foreground/70 transition-colors hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="mb-1 rounded-lg p-2 text-muted-foreground/70 transition-colors hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <div className="relative flex-1">
                    <textarea
                      aria-label="Type a message"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                      placeholder="Type a message..."
                      rows={1}
                      className="max-h-32 w-full resize-none rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
                      style={{ height: "auto", minHeight: "40px" }}
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    className="mb-1 rounded-lg bg-blue-600 p-2.5 text-white transition-colors hover:bg-blue-700"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted dark:bg-muted">
                <svg className="h-10 w-10 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-muted-foreground">Select a conversation</p>
              <p className="text-sm text-muted-foreground/70">Choose a conversation from the sidebar to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
