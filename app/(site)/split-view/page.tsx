"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { GripVertical, PanelLeft, PanelRight, Columns, Rows } from "lucide-react";

const installCommand = `npx component-library@latest add split-view`;

const usageCode = `import { useState } from "react";

function SplitView({ left, right, defaultSize = 50 }) {
  const [size, setSize] = useState(defaultSize);
  return (
    <div className="flex h-64 rounded-lg border overflow-hidden">
      <div style={{ width: \`\${size}%\` }} className="overflow-auto border-r">
        {left}
      </div>
      <div className="w-1 cursor-col-resize bg-border" />
      <div style={{ width: \`\${100 - size}%\` }} className="overflow-auto">
        {right}
      </div>
    </div>
  );
}`;

function SplitView({
  left,
  right,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  direction = "horizontal",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  direction?: "horizontal" | "vertical";
}) {
  const [size, setSize] = useState(defaultSize);
  const isHorizontal = direction === "horizontal";

  return (
    <div className={`flex h-64 w-full overflow-hidden rounded-lg border border-border ${isHorizontal ? "flex-row" : "flex-col"}`}>
      <div
        className="overflow-auto"
        style={{
          [isHorizontal ? "width" : "height"]: `${size}%`,
          minWidth: isHorizontal ? 0 : undefined,
          minHeight: !isHorizontal ? 0 : undefined,
        }}
      >
        {left}
      </div>
      <div
        className={`flex items-center justify-center bg-border/50 transition-colors hover:bg-border ${
          isHorizontal ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize"
        }`}
        onMouseDown={(e) => {
          e.preventDefault();
          const container = e.currentTarget.parentElement;
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const onMove = (ev: MouseEvent) => {
            let pct = isHorizontal
              ? ((ev.clientX - rect.left) / rect.width) * 100
              : ((ev.clientY - rect.top) / rect.height) * 100;
            pct = Math.min(maxSize, Math.max(minSize, pct));
            setSize(pct);
          };
          const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
          };
          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
        }}
      >
        <GripVertical className={`h-3 w-3 text-muted-foreground/70 ${!isHorizontal ? "rotate-90" : ""}`} />
      </div>
      <div
        className="overflow-auto"
        style={{
          [isHorizontal ? "width" : "height"]: `${100 - size}%`,
          minWidth: isHorizontal ? 0 : undefined,
          minHeight: !isHorizontal ? 0 : undefined,
        }}
      >
        {right}
      </div>
    </div>
  );
}

function CodeEditor() {
  const [activeFile, setActiveFile] = useState("page.tsx");
  const files = ["page.tsx", "styles.css", "utils.ts"];
  const codeContent: Record<string, string> = {
    "page.tsx": `export default function Page() {\n  return (\n    <div className="p-4">\n      <h1>Hello World</h1>\n    </div>\n  );\n}`,
    "styles.css": `.container {\n  padding: 1rem;\n  max-width: 1200px;\n}`,
    "utils.ts": `export function formatDate(d: Date) {\n  return d.toLocaleDateString();\n}`,
  };

  return (
    <SplitView
      defaultSize={60}
      left={
        <div className="flex h-full flex-col bg-zinc-950 text-sm">
          <div className="flex border-b border-zinc-800">
            {files.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFile(f)}
                className={`border-r border-zinc-800 px-3 py-1.5 text-xs ${
                  activeFile === f ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <pre className="flex-1 overflow-auto p-4 font-mono text-xs text-zinc-300">
            {codeContent[activeFile]}
          </pre>
        </div>
      }
      right={
        <div className="flex h-full items-center justify-center bg-zinc-50 dark:bg-zinc-900">
          <div className="text-center text-sm text-muted-foreground">
            <PanelRight className="mx-auto mb-2 h-6 w-6" />
            <p className="text-xs">Preview Panel</p>
          </div>
        </div>
      }
    />
  );
}

export default function SplitViewPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Split View</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A resizable split pane layout that divides content into two panels. Supports horizontal and vertical directions with a draggable divider.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Horizontal split with draggable divider.</p>
        </div>
        <ComponentPreview id="split-default">
          <SplitView
            left={
              <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                <div className="text-center">
                  <PanelLeft className="mx-auto mb-2 h-6 w-6" />
                  <p>Left Panel</p>
                  <p className="text-xs">Drag divider to resize</p>
                </div>
              </div>
            }
            right={
              <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                <div className="text-center">
                  <PanelRight className="mx-auto mb-2 h-6 w-6" />
                  <p>Right Panel</p>
                  <p className="text-xs">Drag divider to resize</p>
                </div>
              </div>
            }
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical</h2>
          <p className="mt-1 text-sm text-muted-foreground">Top-bottom split with horizontal divider.</p>
        </div>
        <ComponentPreview id="split-vertical">
          <SplitView
            direction="vertical"
            left={
              <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                <div className="text-center"><Rows className="mx-auto mb-2 h-6 w-6" /><p>Top Panel</p></div>
              </div>
            }
            right={
              <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                <div className="text-center"><Rows className="mx-auto mb-2 h-6 w-6" /><p>Bottom Panel</p></div>
              </div>
            }
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">50/50 Default Size</h2>
          <p className="mt-1 text-sm text-muted-foreground">Equal split starting at 50% each.</p>
        </div>
        <ComponentPreview id="split-50-50">
          <SplitView
            defaultSize={50}
            left={<div className="flex h-full items-center justify-center p-4"><span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">50%</span></div>}
            right={<div className="flex h-full items-center justify-center p-4"><span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">50%</span></div>}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Code Editor</h2>
          <p className="mt-1 text-sm text-muted-foreground">Real-world split view as a code editor with file tabs and preview.</p>
        </div>
        <ComponentPreview id="split-code-editor">
          <CodeEditor />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Narrow / Wide</h2>
          <p className="mt-1 text-sm text-muted-foreground">Split with initial sizes of 30% sidebar and 70% content.</p>
        </div>
        <ComponentPreview id="split-narrow-wide">
          <SplitView
            defaultSize={30}
            minSize={15}
            left={
              <div className="flex h-full flex-col gap-2 p-3">
                <p className="text-xs font-medium text-muted-foreground">Sidebar</p>
                {["Dashboard", "Settings", "Profile", "Team", "Billing"].map((item) => (
                  <div key={item} className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted">{item}</div>
                ))}
              </div>
            }
            right={
              <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                <div className="text-center"><Columns className="mx-auto mb-2 h-6 w-6" /><p>Main Content</p><p className="text-xs">30% / 70%</p></div>
              </div>
            }
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Document Viewer</h2>
          <p className="mt-1 text-sm text-muted-foreground">Split view for reading documents with a notes panel.</p>
        </div>
        <ComponentPreview id="split-document">
          <SplitView
            defaultSize={65}
            left={
              <div className="h-full overflow-auto p-4">
                <h3 className="mb-2 text-sm font-medium">Design System Guide</h3>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                  <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.</p>
                  <p>Components should be modular, composable, and reusable. Each component should serve a single purpose.</p>
                  <p>Documentation is critical for adoption. Every component should include usage guidelines and code examples.</p>
                </div>
              </div>
            }
            right={
              <div className="flex h-full flex-col gap-3 p-4">
                <p className="text-xs font-medium text-muted-foreground">Notes</p>
                <textarea placeholder="Add your notes here..." className="flex-1 resize-none rounded-lg border border-border p-3 text-xs outline-none focus:ring-1 focus:ring-ring" />
              </div>
            }
          />
        </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">left</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">right</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">defaultSize</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">50</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">minSize</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">20</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxSize</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">80</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">direction</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"horizontal" | "vertical"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
