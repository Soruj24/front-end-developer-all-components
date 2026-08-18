"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add wrap-text`;
const usageCode = `import { WrapText } from "@/components/_wrap-text";

<WrapText truncate={false}>Long text content here</WrapText>`;

function TextBlock({ truncate, lines, label }: { truncate: boolean; lines: number; label: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      <p className={`text-sm ${truncate ? `line-clamp-${lines}` : ""}`}>
        This is a long piece of text that demonstrates how text wrapping behaves in different contexts. It should wrap naturally across multiple lines based on the container width and configuration settings.
      </p>
    </div>
  );
}

function InlineWrap({ text, align }: { text: string; align: string }) {
  return (
    <div className={`rounded-lg border border-border p-3 text-sm text-${align}`}>
      {text}
    </div>
  );
}

export default function WrapTextPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wrap Text</h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Text wrapping controls with truncation, line clamping, and overflow handling.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Truncation Levels</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TextBlock truncate={false} lines={0} label="No truncation" />
          <TextBlock truncate={true} lines={1} label="1 line clamp" />
          <TextBlock truncate={true} lines={2} label="2 line clamp" />
          <TextBlock truncate={true} lines={3} label="3 line clamp" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Text Alignment</h2>
        <div className="flex flex-col gap-2">
          <InlineWrap text="Left aligned text that wraps naturally within its container." align="left" />
          <InlineWrap text="Center aligned text that wraps naturally within its container." align="center" />
          <InlineWrap text="Right aligned text that wraps naturally within its container." align="right" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Overflow Behavior</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="truncate rounded-lg border border-border p-3 text-sm">
            This text is truncated with an ellipsis when it overflows the container width.
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-border p-3 text-sm">
            Single line ellipsis overflow example text.
          </div>
        </div>
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">truncate</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">lines</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
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
