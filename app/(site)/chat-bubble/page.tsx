"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CHAT_BUBBLE_SOURCE = `"use client";

interface ChatBubbleProps {
  message: string;
  sender?: "user" | "other";
  avatar?: string;
  name?: string;
  timestamp?: string;
  className?: string;
}

export function ChatBubble({
  message,
  sender = "other",
  avatar,
  name,
  timestamp,
  className,
}: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <div className={["flex items-end gap-2", isUser ? "flex-row-reverse" : "", className].filter(Boolean).join(" ")}>
      {avatar && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
          {avatar}
        </div>
      )}
      <div className={["max-w-[80%] rounded-2xl px-4 py-2", isUser ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted"].join(" ")}>
        {name && <p className="mb-0.5 text-[11px] font-medium">{name}</p>}
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p className={["mt-1 text-[10px]", isUser ? "opacity-70" : "text-muted-foreground"].join(" ")}>{timestamp}</p>
        )}
      </div>
    </div>
  );
}`;

const DIRECTIONS_CODE = `<div className="flex justify-end">
  <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2 max-w-[80%]">
    <p className="text-sm">Hey, how are you?</p>
    <p className="text-[10px] opacity-70 mt-1">10:30 AM</p>
  </div>
</div>
<div className="flex justify-start">
  <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2 max-w-[80%]">
    <p className="text-sm">I'm doing great, thanks!</p>
    <p className="text-[10px] text-muted-foreground mt-1">10:32 AM</p>
  </div>
</div>`;

const AVATAR_CODE = `const messages = [
  { name: "Alice", msg: "Hi there!", align: "start", color: "bg-pink-500" },
  { name: "Bob", msg: "Hello Alice!", align: "end", color: "bg-blue-500" },
];

{messages.map((m) => (
  <div className={\`flex items-end gap-2 \${m.align === "end" ? "flex-row-reverse" : ""}\`}>
    <div className={\`h-8 w-8 rounded-full \${m.color} flex items-center justify-center text-[10px] text-white font-medium shrink-0\`}>
      {m.name[0]}
    </div>
    <div className={m.align === "end" ? "rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-3 py-1.5" : "rounded-2xl rounded-bl-sm bg-muted px-3 py-1.5"}>
      <p className="text-[11px] font-medium mb-0.5">{m.name}</p>
      <p className="text-sm">{m.msg}</p>
    </div>
  </div>
))}`;

const TYPING_CODE = `<div className="flex justify-start">
  <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: \`\${i * 0.15}s\` }} />
      ))}
    </div>
  </div>
</div>`;

export default function ChatBubblePage() {
  return (
    <ComponentDocPage
      name="Chat Bubble"
      category="Data Display"
      description="Chat bubble components for messaging interfaces with sender alignment, timestamps, and avatar support."
    >
      <PreviewPanel filename="chat-bubble.tsx">
        <div className="flex w-full max-w-md flex-col gap-3">
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2 max-w-[80%]">
              <p className="text-sm">Hey, how are you?</p>
              <p className="text-[10px] opacity-70 mt-1">10:30 AM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2 max-w-[80%]">
              <p className="text-sm">I'm doing great, thanks!</p>
              <p className="text-[10px] text-muted-foreground mt-1">10:32 AM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2 max-w-[80%]">
              <p className="text-sm">That's wonderful to hear.</p>
            </div>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={CHAT_BUBBLE_SOURCE} filename="components/ui/ChatBubble/ChatBubble.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Message Directions" description="User and other sender bubbles aligned left and right." code={DIRECTIONS_CODE} filename="message-directions.tsx">
          <div className="flex w-full max-w-md flex-col gap-3">
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2 max-w-[80%]">
                <p className="text-sm">Hey, how are you?</p>
                <p className="text-[10px] opacity-70 mt-1">10:30 AM</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2 max-w-[80%]">
                <p className="text-sm">I'm doing great, thanks!</p>
                <p className="text-[10px] text-muted-foreground mt-1">10:32 AM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2 max-w-[80%]">
                <p className="text-sm">That's wonderful to hear.</p>
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Avatars" description="Chat bubbles with user avatars for conversation context." code={AVATAR_CODE} filename="with-avatars.tsx">
          <div className="flex w-full max-w-md flex-col gap-3">
            {[
              { name: "Alice", msg: "Hi there!", align: "start", color: "bg-pink-500" },
              { name: "Bob", msg: "Hello Alice!", align: "end", color: "bg-blue-500" },
              { name: "Alice", msg: "How's the project?", align: "start", color: "bg-pink-500" },
            ].map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.align === "end" ? "flex-row-reverse" : ""}`}>
                <div className={`h-8 w-8 rounded-full ${m.color} flex items-center justify-center text-[10px] text-white font-medium shrink-0`}>{m.name[0]}</div>
                <div className={`rounded-2xl px-3 py-1.5 ${m.align === "end" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
                  <p className="text-[11px] font-medium mb-0.5">{m.name}</p>
                  <p className="text-sm">{m.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Typing Indicator" description="Animated dots showing someone is typing." code={TYPING_CODE} filename="typing-indicator.tsx">
          <div className="flex w-full max-w-md justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}