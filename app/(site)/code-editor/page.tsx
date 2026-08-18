"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add code-editor`;
const usageCode = `import { CodeEditor } from "@/components/ui/code-editor";

<CodeEditor language="tsx" value={code} onChange={setCode} />`;

export default function CodeEditorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Code Editor</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A code editor component with syntax highlighting, line numbers, and editable code blocks for live coding experiences.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Editor</h2><p className="mt-1 text-sm text-muted-foreground">A simple code editor with line numbers.</p></div>
        <ComponentPreview id="code-editor-basic">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border overflow-hidden bg-[#1e1e2e] text-[#cdd6f4]">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" /></div>
                <span className="text-xs text-white/50 ml-2">component.tsx</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">{`function greet(name: string) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

export default greet;`}</pre>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Toolbar</h2><p className="mt-1 text-sm text-muted-foreground">Editor with action buttons in the toolbar.</p></div>
        <ComponentPreview id="code-editor-toolbar">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" /></div>
                  <span className="text-xs text-muted-foreground">playground.tsx</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-[10px] px-2 py-1 rounded bg-muted text-foreground">Copy</button>
                  <button className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground">Run</button>
                </div>
              </div>
              <pre className="p-4 text-xs font-mono bg-background leading-relaxed">{`const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`}</pre>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Multi-tab Editor</h2><p className="mt-1 text-sm text-muted-foreground">Editor with multiple file tabs.</p></div>
        <ComponentPreview id="code-editor-tabs">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="flex border-b border-border bg-muted/30">
                {["index.tsx", "styles.css", "utils.ts"].map((tab, i) => (
                  <button key={tab} className={`px-4 py-2 text-xs border-r border-border ${i === 0 ? "bg-background font-medium" : "text-muted-foreground"}`}>{tab}</button>
                ))}
              </div>
              <pre className="p-4 text-xs font-mono bg-background leading-relaxed">{`export default function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
    </div>
  );
}`}</pre>
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
