"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { StickyNote } from "lucide-react";

const installCommand = `npx component-library@latest add sticky-note`;
const usageCode = `// usage`;

export default function StickyNotePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sticky Note</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A draggable sticky note component for quick notes and reminders.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Sticky Note Demo</h2><p className="mt-1 text-sm text-muted-foreground">Colorful sticky notes for quick reminders.</p></div>
        <ComponentPreview id="sticky-note-demo"><div className="w-full p-4"><div className="grid grid-cols-3 gap-4">
          <div className="rotate-[-2deg] rounded-lg bg-yellow-200 p-4 shadow-md dark:bg-yellow-900/40"><p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">Remember to buy groceries</p><p className="mt-2 text-xs text-yellow-700 dark:text-yellow-400">Today</p></div>
          <div className="rotate-[1deg] rounded-lg bg-green-200 p-4 shadow-md dark:bg-green-900/40"><p className="text-sm font-medium text-green-900 dark:text-green-200">Team meeting at 3pm</p><p className="mt-2 text-xs text-green-700 dark:text-green-400">Tomorrow</p></div>
          <div className="rotate-[-1deg] rounded-lg bg-pink-200 p-4 shadow-md dark:bg-pink-900/40"><p className="text-sm font-medium text-pink-900 dark:text-pink-200">Project deadline Friday</p><p className="mt-2 text-xs text-pink-700 dark:text-pink-400">This week</p></div>
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
