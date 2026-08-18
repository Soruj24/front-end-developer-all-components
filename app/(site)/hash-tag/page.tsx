"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Hash } from "lucide-react";

const installCommand = `npx component-library@latest add hash-tag`;
const usageCode = `// usage`;

export default function HashTagPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Hash Tag</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A hashtag input component that allows users to add and remove tags with a clean inline display.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Interactive hashtag input with add and remove capabilities.</p></div>
        <ComponentPreview id="hash-tag"><div className="w-full p-4"><div className="flex flex-col gap-4 max-w-md"><div className="flex flex-wrap gap-2 p-3 rounded-lg border bg-background"><span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">#react <button className="ml-0.5 hover:text-primary/70">&times;</button></span><span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">#typescript <button className="ml-0.5 hover:text-primary/70">&times;</button></span><span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">#nextjs <button className="ml-0.5 hover:text-primary/70">&times;</button></span><input className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Add tag..." /></div><div className="flex flex-wrap gap-2"><span className="px-3 py-1 rounded-full bg-muted text-sm cursor-pointer hover:bg-muted/80 transition-colors">#popular</span><span className="px-3 py-1 rounded-full bg-muted text-sm cursor-pointer hover:bg-muted/80 transition-colors">#trending</span><span className="px-3 py-1 rounded-full bg-muted text-sm cursor-pointer hover:bg-muted/80 transition-colors">#new</span></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">tags</td><td className="px-4 py-3 text-muted-foreground">string[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onAdd</td><td className="px-4 py-3 text-muted-foreground">{"(tag: string) => void"}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onRemove</td><td className="px-4 py-3 text-muted-foreground">{"(tag: string) => void"}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">placeholder</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{"Add tag..."}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
