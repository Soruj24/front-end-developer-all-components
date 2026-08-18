"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add brackets-code`;
const usageCode = `import { BracketsCode } from "@/components/ui/brackets-code";

<BracketsCode language="tsx" code={snippet} />`;

export default function BracketsCodePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Brackets Code</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A code display component with bracket decorations, syntax highlighting, and copy functionality for code snippets.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Code with Brackets</h2><p className="mt-1 text-sm text-muted-foreground">Code snippets displayed with decorative bracket wrappers.</p></div>
        <ComponentPreview id="brackets-code-basic">
          <div className="w-full p-4">
            <div className="flex items-center gap-3 justify-center">
              <span className="text-4xl text-primary/30 font-mono">{"{"}</span>
              <div className="rounded-lg bg-muted px-4 py-2 font-mono text-sm">
                <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">app</span>{" = "}
                <span className="text-green-600 dark:text-green-400">&quot;hello&quot;</span>;
              </div>
              <span className="text-4xl text-primary/30 font-mono">{"}"}</span>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Multi-line Code Block</h2><p className="mt-1 text-sm text-muted-foreground">A larger code block with line numbers and brackets.</p></div>
        <ComponentPreview id="brackets-code-multiline">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border bg-muted/50 p-4 font-mono text-xs relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-border bg-muted/30 flex flex-col items-center pt-4 text-muted-foreground">
                {[1, 2, 3, 4, 5].map((n) => <span key={n}>{n}</span>)}
              </div>
              <pre className="ml-8">{`function greet(name) {
  if (name) {
    return "Hello, " + name;
  }
  return "Hello, World";
}`}</pre>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Inline Code Brackets</h2><p className="mt-1 text-sm text-muted-foreground">Inline code snippets with bracket styling.</p></div>
        <ComponentPreview id="brackets-code-inline">
          <div className="w-full p-4">
            <div className="flex flex-wrap items-center gap-3 justify-center">
              {["useState", "useEffect", "useCallback"].map((fn) => (
                <code key={fn} className="px-3 py-1.5 rounded-md bg-muted text-sm font-mono text-foreground border border-border">
                  {fn}()
                </code>
              ))}
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
