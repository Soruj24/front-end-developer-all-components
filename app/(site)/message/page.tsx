"use client";

import { Message } from "@/components/_message";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add message`;

const usageCode = `import { Message } from "@/components/_message"

<Message position="received" author="Alice">
  Hey, how are you?
</Message>
<Message position="sent" author="You">
  I'm doing great!
</Message>`;

export default function MessagePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Message</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Displays a single chat message with author, timestamp, and status.
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
            Default message with author and timestamp.
          </p>
        </div>
        <ComponentPreview id="message-default">
          <div className="flex flex-col gap-3">
            <Message position="received" author="Alice" timestamp="2:30 PM">
              Hey, how are you doing?
            </Message>
            <Message position="sent" author="You" timestamp="2:31 PM">
              I&apos;m doing great, thanks!
            </Message>
          </div>
        </ComponentPreview>
      </section>

      {/* Bubble */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Bubble</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Message with bubble variant styling.
          </p>
        </div>
        <ComponentPreview id="message-bubble">
          <div className="flex flex-col gap-3">
            <Message variant="bubble" position="received" author="Alice">
              This is a bubble message!
            </Message>
            <Message variant="bubble" position="sent">
              Looks great!
            </Message>
          </div>
        </ComponentPreview>
      </section>

      {/* Status */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Status</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Message with delivery status indicators.
          </p>
        </div>
        <ComponentPreview id="message-status">
          <div className="flex flex-col gap-3">
            <Message position="sent" status="sent" timestamp="2:30 PM">
              Message sent
            </Message>
            <Message position="sent" status="delivered" timestamp="2:31 PM">
              Message delivered
            </Message>
            <Message position="sent" status="read" timestamp="2:32 PM">
              Message read
            </Message>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;bubble&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">position</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sent&quot; | &quot;received&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">author</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">timestamp</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sent&quot; | &quot;delivered&quot; | &quot;read&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">avatar</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
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
