"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add chat-bubble`;
const usageCode = `import { ChatBubble } from "@/components/ui/chat-bubble";

<ChatBubble message="Hello!" sender="user" />`;

export default function ChatBubblePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Chat Bubble</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">Chat bubble components for messaging interfaces with sender alignment, timestamps, and avatar support.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Message Directions</h2><p className="mt-1 text-sm text-muted-foreground">User and other sender bubbles aligned left and right.</p></div>
        <ComponentPreview id="chat-bubble-directions">
          <div className="w-full p-4">
            <div className="flex flex-col gap-3 max-w-md">
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
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Avatars</h2><p className="mt-1 text-sm text-muted-foreground">Chat bubbles with user avatars for conversation context.</p></div>
        <ComponentPreview id="chat-bubble-avatars">
          <div className="w-full p-4">
            <div className="flex flex-col gap-3 max-w-md">
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
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Typing Indicator</h2><p className="mt-1 text-sm text-muted-foreground">Animated dots showing someone is typing.</p></div>
        <ComponentPreview id="chat-bubble-typing">
          <div className="w-full p-4">
            <div className="flex justify-start max-w-md">
              <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
