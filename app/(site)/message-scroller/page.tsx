"use client";

import { MessageScroller } from "@/components/_message-scroller";
import { Message } from "@/components/_message";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add message-scroller`;

const usageCode = `import { MessageScroller } from "@/components/_message-scroller";
import { Message } from "@/components/_message";

<MessageScroller className="h-64" showScrollButton>
  <Message position="received" author="Alice">Hello!</Message>
  <Message position="sent" author="You">Hi there!</Message>
</MessageScroller>`;

export default function MessageScrollerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Message Scroller</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A scrollable container for chat messages with auto-scroll and scroll-to-bottom button.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Default message scroller with auto-scroll.
          </p>
        </div>
        <ComponentPreview id="message-scroller-default">
          <MessageScroller className="h-64">
            <Message position="received" author="Alice">Message 1</Message>
            <Message position="sent" author="You">Message 2</Message>
            <Message position="received" author="Alice">Message 3</Message>
            <Message position="sent" author="You">Message 4</Message>
            <Message position="received" author="Alice">Message 5</Message>
          </MessageScroller>
        </ComponentPreview>
      </section>

      {/* Scroll Button */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Scroll Button</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Message scroller with scroll-to-bottom button.
          </p>
        </div>
        <ComponentPreview id="message-scroller-scroll-button">
          <MessageScroller className="h-64" showScrollButton>
            <Message position="received" author="Alice">Old message</Message>
            <Message position="sent" author="You">Reply</Message>
            <Message position="received" author="Alice">Another message</Message>
            <Message position="sent" author="You">Another reply</Message>
            <Message position="received" author="Alice">Latest message</Message>
          </MessageScroller>
        </ComponentPreview>
      </section>

      {/* Empty State */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Empty State</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Message scroller with empty state message.
          </p>
        </div>
        <ComponentPreview id="message-scroller-empty">
          <MessageScroller
            className="h-64"
            emptyMessage="No messages yet. Start a conversation!"
          />
        </ComponentPreview>
      </section>

      {/* API Reference */}
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">autoScroll</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showScrollButton</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">emptyMessage</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
