"use client";

import { useState, useEffect } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { TYPING_INDICATOR_SOURCE } from "./typing-indicator-source";

const CHAT_BUBBLES_CODE = `<TypingBubble dots={3} color="#6366f1" label="Alice" />
<TypingBubble dots={4} color="#10b981" label="Bob" />
<TypingBubble dots={3} color="#f94144" label="Charlie" />
<TypingBubble dots={5} color="#8b5cf6" label="Diana" />`;

const LIVE_CHAT_CODE = `<TypingChatDemo />`;

const USE_CASES_CODE = `<div className="flex items-center gap-2">
  <TypingDots dots={3} color="#6366f1" size={6} />
  <span className="text-sm font-medium">AI Generating...</span>
</div>`;

function TypingDots({ dots = 3, color = "#6366f1", size = 8, gap = 4 }: { dots?: number; color?: string; size?: number; gap?: number }) {
  return (
    <div className="flex items-center" style={{ gap }}>
      {Array.from({ length: dots }, (_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: size, height: size, backgroundColor: color,
            animation: `typing-bounce 1.4s ${i * 0.16}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-${size}px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function TypingBubble({ dots = 3, color = "#6366f1", label }: { dots?: number; color?: string; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
        <TypingDots dots={dots} color={color} />
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}

function TypingChatDemo() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const sequence = [
      { sender: "them", text: "Hey, how are you?" },
      { sender: "me", text: "I'm good! Working on the new feature." },
      { sender: "them", text: "Nice! Can I see a preview?" },
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < sequence.length) {
        const current = idx;
        if (sequence[current].sender === "them") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [...prev, sequence[current]]);
          }, 1500);
        } else {
          setMessages((prev) => [...prev, sequence[current]]);
        }
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
      <div className="mb-3 text-center text-xs font-medium text-muted-foreground">Chat</div>
      <div className="flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.sender === "me" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
              <TypingDots dots={3} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TypingIndicatorPage() {
  const [color, setColor] = useState("#6366f1");
  const [dotCount, setDotCount] = useState(3);
  const [dotSize, setDotSize] = useState(8);

  return (
    <ComponentDocPage
      name="Typing Indicator"
      category="Feedback"
      description="Animated dots indicating that someone is typing or processing. Ideal for chat interfaces, search bars, and real-time collaboration."
    >
      <PreviewPanel filename="typing-indicator.tsx">
        <div className="flex flex-col items-center gap-8">
          <div className="flex h-16 items-center">
            <TypingDots dots={dotCount} color={color} size={dotSize} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Dots <input type="range" min={2} max={6} value={dotCount} onChange={(e) => setDotCount(+e.target.value)} className="w-20" /> <span className="w-4 text-right text-xs font-mono">{dotCount}</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Size <input type="range" min={4} max={16} value={dotSize} onChange={(e) => setDotSize(+e.target.value)} className="w-20" /> <span className="w-6 text-right text-xs font-mono">{dotSize}px</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer" /> Color
            </label>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={TYPING_INDICATOR_SOURCE}
        filename="components/ui/TypingIndicator/TypingIndicator.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Chat Bubbles" description="Typing indicator inside chat message bubbles." code={CHAT_BUBBLES_CODE}>
          <div className="flex flex-col gap-4">
            <TypingBubble dots={3} color="#6366f1" label="Alice" />
            <TypingBubble dots={4} color="#10b981" label="Bob" />
            <TypingBubble dots={3} color="#f94144" label="Charlie" />
            <TypingBubble dots={5} color="#8b5cf6" label="Diana" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Live Chat Demo" description="Typing indicator in a realistic chat context." code={LIVE_CHAT_CODE}>
          <TypingChatDemo />
        </ExampleBlock>

        <ExampleBlock title="Use Cases" description="Various scenarios for typing indicators." code={USE_CASES_CODE}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4 dark:border-border">
              <div className="mb-2 flex items-center gap-2">
                <TypingDots dots={3} color="#6366f1" size={6} />
                <span className="text-sm font-medium">AI Generating...</span>
              </div>
              <p className="text-xs text-muted-foreground">Response is being crafted</p>
            </div>
            <div className="rounded-xl border border-border p-4 dark:border-border">
              <div className="mb-2 flex items-center gap-2">
                <TypingDots dots={3} color="#10b981" size={6} />
                <span className="text-sm font-medium">Search results loading</span>
              </div>
              <p className="text-xs text-muted-foreground">Finding best matches</p>
            </div>
            <div className="rounded-xl border border-border p-4 dark:border-border">
              <div className="mb-2 flex items-center gap-2">
                <TypingDots dots={4} color="#f94144" size={6} />
                <span className="text-sm font-medium">Recording audio</span>
              </div>
              <p className="text-xs text-muted-foreground">Listening for input</p>
            </div>
            <div className="rounded-xl border border-border p-4 dark:border-border">
              <div className="mb-2 flex items-center gap-2">
                <TypingDots dots={3} color="#8b5cf6" size={6} />
                <span className="text-sm font-medium">Collaborative editing</span>
              </div>
              <p className="text-xs text-muted-foreground">3 people editing</p>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}