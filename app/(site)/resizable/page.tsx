"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Resizable, ResizablePanel, ResizableHandle } from "@/components/_resizable";
import {
  Code,
  Eye,
  Terminal,
  Folder,
} from "lucide-react";

const installCommand = `npx component-library@latest add resizable`;

const usageCode = `import { Resizable, ResizablePanel, ResizableHandle } from "@/components/_resizable";

<Resizable defaultSizes={[50, 50]}>
  <ResizablePanel>Panel 1</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Panel 2</ResizablePanel>
</Resizable>`;

function ResizableBasic() {
  return (
    <Resizable defaultSizes={[50, 50]} className="h-48">
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 1</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 2</div>
      </ResizablePanel>
    </Resizable>
  );
}

function ResizableThreePanels() {
  return (
    <Resizable defaultSizes={[33, 34, 33]} className="h-48">
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Left</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Center</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Right</div>
      </ResizablePanel>
    </Resizable>
  );
}

function ResizableFourPanels() {
  return (
    <Resizable defaultSizes={[25, 25, 25, 25]} className="h-48">
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">1</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">2</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">3</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">4</div>
      </ResizablePanel>
    </Resizable>
  );
}

function ResizableSidebar() {
  return (
    <Resizable defaultSizes={[25, 75]} className="h-64">
      <ResizablePanel>
        <div className="flex h-full flex-col rounded border bg-muted/30 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Folder className="h-3 w-3" />
            Explorer
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <div className="rounded bg-muted px-2 py-1">src</div>
            <div className="rounded px-2 py-1 pl-4">components</div>
            <div className="rounded px-2 py-1 pl-4">hooks</div>
            <div className="rounded px-2 py-1 pl-4">utils</div>
            <div className="rounded px-2 py-1 pl-6">App.tsx</div>
            <div className="rounded px-2 py-1 pl-6">index.tsx</div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Main Content
        </div>
      </ResizablePanel>
    </Resizable>
  );
}

function ResizableCodeEditor() {
  return (
    <Resizable defaultSizes={[60, 40]} className="h-64">
      <ResizablePanel>
        <div className="flex h-full flex-col rounded border bg-zinc-950 p-4 font-mono text-sm text-green-400">
          <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500">
            <Code className="h-3 w-3" />
            App.tsx
          </div>
          <pre className="overflow-auto">
{`import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}`}
          </pre>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full flex-col rounded border bg-muted/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Eye className="h-3 w-3" />
            Preview
          </div>
          <div className="flex flex-1 items-center justify-center rounded bg-white dark:bg-zinc-900">
            <div className="text-center">
              <h1 className="text-lg font-bold">Count: 0</h1>
              <button className="mt-2 rounded bg-blue-500 px-3 py-1 text-xs text-white">Increment</button>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </Resizable>
  );
}

function ResizableIDE() {
  return (
    <Resizable defaultSizes={[20, 60, 20]} className="h-72">
      <ResizablePanel>
        <div className="flex h-full flex-col rounded border bg-zinc-900 p-2 text-sm text-zinc-300">
          <div className="mb-2 flex items-center gap-2 px-2 text-xs text-zinc-500">
            <Folder className="h-3 w-3" />
            Files
          </div>
          <div className="flex flex-col gap-0.5">
            {["package.json", "tsconfig.json", "src/", "public/"].map((f) => (
              <div key={f} className="rounded px-2 py-1 text-xs hover:bg-zinc-800">{f}</div>
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full flex-col rounded border bg-zinc-950 p-3 font-mono text-xs text-zinc-400">
          <div className="mb-2 flex items-center gap-2 text-zinc-600">
            <Code className="h-3 w-3" />
            main.ts
          </div>
          <pre className="overflow-auto">{`const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000);`}</pre>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full flex-col rounded border bg-zinc-900 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500">
            <Terminal className="h-3 w-3" />
            Terminal
          </div>
          <div className="font-mono text-xs text-green-400">
            <div>$ npm run dev</div>
            <div className="text-zinc-500">Server running on port 3000</div>
          </div>
        </div>
      </ResizablePanel>
    </Resizable>
  );
}

function ResizableDashboard() {
  const [sizes, setSizes] = useState([25, 75]);

  return (
    <div className="flex flex-col gap-3">
      <Resizable defaultSizes={[25, 75]} onSizesChange={setSizes} className="h-64">
        <ResizablePanel>
          <div className="flex h-full flex-col rounded border bg-muted/30 p-3">
            <div className="mb-3 text-xs font-medium text-muted-foreground">Filters</div>
            <div className="flex flex-col gap-2">
              {["All", "Active", "Pending", "Completed"].map((status) => (
                <button key={status} className="rounded-md border border-border px-3 py-1.5 text-left text-xs hover:bg-muted dark:border-border">
                  {status}
                </button>
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="flex h-full flex-col rounded border bg-muted/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">Projects</span>
              <span className="text-xs text-muted-foreground">Panel: {sizes.map((s) => `${Math.round(s)}%`).join(" / ")}</span>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex items-center justify-center rounded border border-border p-3 text-xs dark:border-border">
                  Project {i + 1}
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>
      </Resizable>
    </div>
  );
}

function ResizableNested() {
  return (
    <Resizable defaultSizes={[30, 70]} className="h-64">
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Left Panel
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Resizable defaultSizes={[50, 50]} className="h-full">
          <ResizablePanel>
            <div className="flex h-full items-center justify-center rounded border bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
              Top Right
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className="flex h-full items-center justify-center rounded border bg-purple-50 p-4 text-sm text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              Bottom Right
            </div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  );
}

function ResizableWithContent() {
  return (
    <Resizable defaultSizes={[40, 60]} className="h-64">
      <ResizablePanel>
        <div className="flex h-full flex-col rounded border bg-muted/30 p-4">
          <h3 className="mb-2 text-sm font-medium">Documentation</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Resizable panels allow users to adjust the width of content areas by dragging a handle.
            This is useful for code editors, dashboards, and split-view interfaces.
          </p>
          <div className="mt-4 rounded bg-muted p-3">
            <code className="text-xs">{"<Resizable>"}</code>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          <div className="text-center">
            <Code className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Code Preview</p>
          </div>
        </div>
      </ResizablePanel>
    </Resizable>
  );
}

export default function ResizablePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Resizable</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Professional resizable panel groups with drag-to-resize handles. Perfect for code editors, dashboards, split views, and IDE layouts.
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

      {/* Basic */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic</h2>
          <p className="mt-1 text-sm text-muted-foreground">Two resizable panels with equal width.</p>
        </div>
        <ComponentPreview id="resizable-basic">
          <ResizableBasic />
        </ComponentPreview>
      </section>

      {/* Three Panels */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Three Panels</h2>
          <p className="mt-1 text-sm text-muted-foreground">Three-panel layout with sidebar, content, and preview.</p>
        </div>
        <ComponentPreview id="resizable-three">
          <ResizableThreePanels />
        </ComponentPreview>
      </section>

      {/* Four Panels */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Four Panels</h2>
          <p className="mt-1 text-sm text-muted-foreground">Quad-panel layout for complex interfaces.</p>
        </div>
        <ComponentPreview id="resizable-four">
          <ResizableFourPanels />
        </ComponentPreview>
      </section>

      {/* Sidebar */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sidebar Layout</h2>
          <p className="mt-1 text-sm text-muted-foreground">File explorer sidebar with main content area.</p>
        </div>
        <ComponentPreview id="resizable-sidebar">
          <ResizableSidebar />
        </ComponentPreview>
      </section>

      {/* Code Editor */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Code Editor</h2>
          <p className="mt-1 text-sm text-muted-foreground">Split view with code and live preview.</p>
        </div>
        <ComponentPreview id="resizable-code-editor">
          <ResizableCodeEditor />
        </ComponentPreview>
      </section>

      {/* IDE */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">IDE Layout</h2>
          <p className="mt-1 text-sm text-muted-foreground">VS Code-style with file explorer, editor, and terminal.</p>
        </div>
        <ComponentPreview id="resizable-ide">
          <ResizableIDE />
        </ComponentPreview>
      </section>

      {/* Dashboard */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">Resizable sidebar with filter controls and live size display.</p>
        </div>
        <ComponentPreview id="resizable-dashboard">
          <ResizableDashboard />
        </ComponentPreview>
      </section>

      {/* Nested */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Nested Panels</h2>
          <p className="mt-1 text-sm text-muted-foreground">Nested resizable panels for complex layouts.</p>
        </div>
        <ComponentPreview id="resizable-nested">
          <ResizableNested />
        </ComponentPreview>
      </section>

      {/* With Content */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Content</h2>
          <p className="mt-1 text-sm text-muted-foreground">Documentation with code preview.</p>
        </div>
        <ComponentPreview id="resizable-content">
          <ResizableWithContent />
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
                <td className="px-4 py-3 font-mono text-xs">defaultSizes</td>
                <td className="px-4 py-3 text-muted-foreground">number[]</td>
                <td className="px-4 py-3 text-muted-foreground">Evenly distributed</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">collapsible</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onSizesChange</td>
                <td className="px-4 py-3 text-muted-foreground">(sizes: number[]) =&gt; void</td>
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
