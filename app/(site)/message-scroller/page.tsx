"use client";

import { useState, useRef, useEffect } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { MessageScroller } from "@/components/ui/MessageScroller";

const MESSAGE_SCROLLER_SOURCE = `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MessageItem {
  id: string;
  content: string;
  timestamp?: string;
}

export interface MessageScrollerProps {
  messages: MessageItem[];
  autoScroll?: boolean;
  className?: string;
}

export function MessageScroller({
  messages,
  autoScroll = true,
  className,
}: MessageScrollerProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-y-auto rounded-md border bg-white p-3 dark:bg-zinc-900",
        className
      )}
    >
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-0.2">
          <p className="text-sm text-zinc-900 dark:text-zinc-100">{msg.content}</p>
          {msg.timestamp && (
            <span className="text-xs text-zinc-400">{msg.timestamp}</span>
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}`;

function ChatDemo() {
  const [messages, setMessages] = useState([
    { id: "1", content: "Hello! How can I help you today?", timestamp: "10:00 AM" },
    { id: "2", content: "I need help with my account settings.", timestamp: "10:01 AM" },
    { id: "3", content: "Sure, let me check that for you.", timestamp: "10:01 AM" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: Date.now().toString(),
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="border border-border rounded-lg bg-background p-3 h-64">
        <MessageScroller messages={messages} />
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-1"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function MessageScrollerPage() {
  return (
    <ComponentDocPage
      name="Message Scroller"
      category="Data Display"
      description="An auto-scrolling message container that smoothly scrolls to the latest message."
    >
      <PreviewPanel filename="MessageScroller.tsx">
        <div className="border border-border rounded-lg bg-background p-3 w-full max-w-md h-64">
          <MessageScroller
            messages={[
              { id: "1", content: "Welcome to the support chat!", timestamp: "10:00 AM" },
              { id: "2", content: "How can I assist you today?", timestamp: "10:00 AM" },
              { id: "3", content: "I have a question about my order.", timestamp: "10:01 AM" },
            ]}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={MESSAGE_SCROLLER_SOURCE}
        filename="MessageScroller.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Chat Interface" code={MESSAGE_SCROLLER_SOURCE}>
          <ChatDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Log Viewer"
          code={`<MessageScroller messages={logs} autoScroll />`}
        >
          <div className="w-full max-w-md border border-border rounded-lg bg-background p-3 h-64">
            <MessageScroller
              autoScroll={false}
              messages={[
                { id: "1", content: "[INFO] Server started on port 3000", timestamp: "09:00:00" },
                { id: "2", content: "[DEBUG] Database connection established", timestamp: "09:00:01" },
                { id: "3", content: "[WARN] High memory usage detected", timestamp: "09:00:02" },
                { id: "4", content: "[INFO] Request processed successfully", timestamp: "09:00:03" },
              ]}
            />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
