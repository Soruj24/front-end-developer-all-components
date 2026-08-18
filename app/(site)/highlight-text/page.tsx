"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Highlighter } from "lucide-react";

const installCommand = `npx component-library@latest add highlight-text`;
const usageCode = `// usage`;

export default function HighlightTextPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Highlight Text</h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A text highlighting component that draws attention to specific words or phrases with customizable colors.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Text with various highlight styles for emphasis.</p></div>
        <ComponentPreview id="highlight-text"><div className="w-full p-4"><div className="flex flex-col gap-6 max-w-xl"><p className="text-lg leading-relaxed text-foreground">This is <span className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">highlighted text</span> within a paragraph for emphasis.</p><p className="text-lg leading-relaxed text-foreground">You can use <span className="bg-primary/20 text-primary px-1 rounded font-medium">primary highlight</span> to draw attention.</p><p className="text-lg leading-relaxed text-foreground">Or try a <span className="relative inline-block"><span className="relative z-10">gradient highlight</span><span className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 -rotate-1"></span></span> for a modern look.</p><p className="text-lg leading-relaxed text-foreground">The <span className="border-b-2 border-dashed border-primary">underline highlight</span> adds a subtle touch of emphasis.</p></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">children</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{"solid"} | {"underline"} | {"gradient"}</td><td className="px-4 py-3 text-muted-foreground">{"solid"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">currentColor</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
