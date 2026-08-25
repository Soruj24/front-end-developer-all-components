"use client";

import { useState, useRef } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { MessageScroller } from "@/components/ui/MessageScroller";

const MESSAGE_SCROLLER_SOURCE = `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface MessageItem {
  id: string;
  content: string;
  timestamp?: string;
}

interface MessageScrollerProps {
  messages: MessageItem[];
  autoScroll?: boolean;
  className?: string;
}

export function MessageScroller({ messages, autoScroll = true, className }: MessageScrollerProps) {
  const containerRef = useRef(null);
  const endRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    if (autoScroll && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight >= 40);
  };

  return (
    <div className={cn("relative flex flex-col", className)}>
      <div ref={containerRef} onScroll={handleScroll} role="log" aria-label="Messages" aria-live="polite"
        className="flex flex-1 flex-col gap-1 overflow-y-auto rounded-2xl border border-border bg-card p-3 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className="group flex flex-col gap-0.5 rounded-xl bg-muted/50 px-3.5 py-2.5 transition-colors hover:bg-muted/80">
            <p className="text-sm leading-relaxed text-foreground">{msg.content}</p>
            {msg.timestamp && <span className="text-xs text-muted-foreground/60">{msg.timestamp}</span>}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {showScrollDown && (
        <button onClick={() => endRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-md">
          ↓
        </button>
      )}
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
      <div className="h-64">
        <MessageScroller messages={messages} />
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
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
      description="Auto-scrolling message container with smooth scroll-to-bottom button and aria-live announcements."
    >
      <PreviewPanel filename="message-scroller-preview.tsx">
        <div className="w-full max-w-md h-64">
          <MessageScroller
            messages={[
              { id: "1", content: "Welcome to the support chat!", timestamp: "10:00 AM" },
              { id: "2", content: "How can I assist you today?", timestamp: "10:00 AM" },
              { id: "3", content: "I have a question about my order.", timestamp: "10:01 AM" },
            ]}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={MESSAGE_SCROLLER_SOURCE} filename="components/ui/MessageScroller/MessageScroller.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Chat Interface"
          description="Interactive chat demo with message input and auto-scroll."
          code={`<MessageScroller messages={messages} autoScroll />`}
          filename="chat.tsx"
        >
          <ChatDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Log Viewer"
          description="Log output with auto-scroll disabled for manual browsing."
          code={`<MessageScroller messages={logs} autoScroll={false} />`}
          filename="log.tsx"
        >
          <div className="w-full max-w-md h-64">
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
