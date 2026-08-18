"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add typing-indicator`;

const usageCode = `import { TypingIndicator } from "@/components/_typing-indicator";

<TypingIndicator />
<TypingIndicator dots={4} color="#6366f1" label="Someone is typing..." />`;

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
        if (sequence[idx].sender === "them") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [...prev, sequence[idx]]);
            idx++;
          }, 1500);
        } else {
          setMessages((prev) => [...prev, sequence[idx]]);
          idx++;
        }
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Typing Indicator</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated dots indicating that someone is typing or processing. Ideal for chat interfaces, search bars, and real-time collaboration.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Demo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Customize the typing indicator dots.</p>
        </div>
        <ComponentPreview id="typing-interactive">
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
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Chat Bubbles</h2>
          <p className="mt-1 text-sm text-muted-foreground">Typing indicator inside chat message bubbles.</p>
        </div>
        <ComponentPreview id="typing-bubbles">
          <div className="flex flex-col gap-4">
            <TypingBubble dots={3} color="#6366f1" label="Alice" />
            <TypingBubble dots={4} color="#10b981" label="Bob" />
            <TypingBubble dots={3} color="#f94144" label="Charlie" />
            <TypingBubble dots={5} color="#8b5cf6" label="Diana" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Live Chat Demo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Typing indicator in a realistic chat context.</p>
        </div>
        <ComponentPreview id="typing-chat">
          <TypingChatDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Use Cases</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various scenarios for typing indicators.</p>
        </div>
        <ComponentPreview id="typing-usecases">
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
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "dots", type: "number", def: "3", req: "No" },
                { prop: "color", type: "string", def: "\"#6366f1\"", req: "No" },
                { prop: "size", type: "number", def: "8", req: "No" },
                { prop: "gap", type: "number", def: "4", req: "No" },
                { prop: "label", type: "string", def: "-", req: "No" },
              ].map((row) => (
                <tr key={row.prop} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.def}</td>
                  <td className="px-4 py-3">{row.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
