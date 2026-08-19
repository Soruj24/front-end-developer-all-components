"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Chat } from "@/features/chat";

const CHAT_SOURCE = `"use client";

import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { cn } from "@/lib/cn";

interface Message {
  id: string;
  author: string;
  content: string;
  reactions?: string[];
  attachment?: { name: string; size: string };
}

const seed: Message[] = [
  { id: "1", author: "You", content: "Hey team, how is the release going?" },
  { id: "2", author: "Sam", content: "Almost there, shipping tonight.", reactions: ["🎉"] },
  { id: "3", author: "Alex", content: "Here is the updated spec.", attachment: { name: "spec.pdf", size: "1.2 MB" } },
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [draft, setDraft] = useState("");

  const send = () => {
    const content = draft.trim();
    if (!content) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), author: "You", content }]);
    setDraft("");
  };

  const toggleReaction = (id: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              reactions: m.reactions?.includes(emoji)
                ? m.reactions.filter((r) => r !== emoji)
                : [...(m.reactions ?? []), emoji],
            }
          : m
      )
    );
  };

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex flex-col", m.author === "You" ? "items-end" : "items-start")}>
            <div className={cn("max-w-sm rounded-2xl px-4 py-2 text-sm", m.author === "You" ? "bg-primary text-primary-foreground" : "bg-muted")}>
              {m.attachment && (
                <div className="mb-2 flex items-center gap-2 rounded-lg bg-background/60 px-3 py-2">
                  <Paperclip className="h-4 w-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{m.attachment.name}</p>
                    <p className="text-[10px] opacity-70">{m.attachment.size}</p>
                  </div>
                </div>
              )}
              <p>{m.content}</p>
            </div>
            {m.reactions && m.reactions.length > 0 && (
              <div className="mt-1 flex gap-1">
                {m.reactions.map((emoji, i) => (
                  <button key={i} onClick={() => toggleReaction(m.id, emoji)} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t p-3">
        <button className="text-muted-foreground">
          <Paperclip className="h-4 w-4" />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 rounded-full border bg-muted/50 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button className="text-muted-foreground">
          <Smile className="h-4 w-4" />
        </button>
        <button onClick={send} className="rounded-full bg-primary p-2 text-primary-foreground" aria-label="Send">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}`;

const CHAT_EXAMPLE = `<Chat
  channels={channels}
  messages={messages}
  onSendMessage={handleSend}
/>`;

export default function ChatPage() {
  return (
    <ComponentDocPage
      name="Chat"
      category="Data Display"
      description="Real-time chat interface with messages, reactions, and file sharing."
    >
      <PreviewPanel filename="chat.tsx">
        <Chat />
      </PreviewPanel>

      <SourceCodeViewer
        source={CHAT_SOURCE}
        filename="components/ui/Chat/Chat.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Full Chat Interface"
          description="Complete chat with messaging, reactions, and file sharing capabilities."
          code={CHAT_EXAMPLE}
        >
          <Chat />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}