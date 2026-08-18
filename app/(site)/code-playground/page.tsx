"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CodePlayground } from "@/components/ui";
import { fullProject, quickProject } from "@/components/code-playground/demo";

const installCommand = `npx component-library@latest add code-playground`;

const usageCode = `import { CodePlayground } from "@/components/ui";

<CodePlayground
  files={project}
  entry="App.tsx"
  title="My App"
  shareKey="demo"
/>`;

export default function CodePlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Code Playground
          </h1>
          <Badge variant="primary">2 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An interactive, self-contained IDE for React + TypeScript. Edit code
          with a live preview, compile with esbuild in the browser, and play
          with the console, responsive devices, themes, sharing, and export.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Multi-file App</h3>
            <p className="text-sm text-muted-foreground">Edit multiple files with live recompilation.</p>
          </div>
          <ComponentPreview id="code-playground-full">
            <div className="flex w-full flex-col gap-4 py-6">
              <CodePlayground
                files={fullProject}
                entry="App.tsx"
                title="Multi-file App"
                shareKey="full"
              />
              <p className="text-xs text-subtle">
                Try editing <span className="font-mono">timer.ts</span> or{" "}
                <span className="font-mono">analytics.ts</span> — the preview
                recompiles on the fly.
              </p>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Single-file App</h3>
            <p className="text-sm text-muted-foreground">Quick single-file playground with custom height.</p>
          </div>
          <ComponentPreview id="code-playground-quick">
            <div className="flex w-full flex-col gap-4 py-6">
              <CodePlayground
                files={quickProject}
                entry="App.tsx"
                title="Single-file App"
                height={480}
                shareKey="quick"
              />
            </div>
          </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">files</td>
                <td className="px-4 py-3 text-muted-foreground">PlaygroundFile[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">entry</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">600</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">shareKey</td>
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
