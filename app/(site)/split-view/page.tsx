"use client";

import { useState } from "react";
import { GripVertical, PanelLeft, PanelRight, Columns, Rows } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SPLIT_VIEW_SOURCE, DEFAULT_CODE, VERTICAL_CODE, FIFTY_CODE, CODE_EDITOR_CODE, NARROW_CODE, DOC_CODE } from "./split-view-source";

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
    <ComponentDocPage name="Split View" category="Layout" description="A resizable split pane layout that divides content into two panels. Supports horizontal and vertical directions with a draggable divider.">
      <PreviewPanel filename="split-view.tsx">
        <SplitView
          left={<div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground"><div className="text-center"><PanelLeft className="mx-auto mb-2 h-6 w-6" /><p>Left Panel</p><p className="text-xs">Drag divider to resize</p></div></div>}
          right={<div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground"><div className="text-center"><PanelRight className="mx-auto mb-2 h-6 w-6" /><p>Right Panel</p><p className="text-xs">Drag divider to resize</p></div></div>}
        />
      </PreviewPanel>

      <SourceCodeViewer source={SPLIT_VIEW_SOURCE} filename="components/ui/SplitView/SplitView.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Vertical" description="Top-bottom split with horizontal divider." code={VERTICAL_CODE}>
          <SplitView
            direction="vertical"
            left={<div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground"><div className="text-center"><Rows className="mx-auto mb-2 h-6 w-6" /><p>Top Panel</p></div></div>}
            right={<div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground"><div className="text-center"><Rows className="mx-auto mb-2 h-6 w-6" /><p>Bottom Panel</p></div></div>}
          />
        </ExampleBlock>

        <ExampleBlock title="50/50 Default Size" description="Equal split starting at 50% each." code={FIFTY_CODE}>
          <SplitView
            defaultSize={50}
            left={<div className="flex h-full items-center justify-center p-4"><span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">50%</span></div>}
            right={<div className="flex h-full items-center justify-center p-4"><span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">50%</span></div>}
          />
        </ExampleBlock>

        <ExampleBlock title="Code Editor" description="Real-world split view as a code editor with file tabs and preview." code={CODE_EDITOR_CODE}>
          <CodeEditor />
        </ExampleBlock>

        <ExampleBlock title="Narrow / Wide" description="Split with initial sizes of 30% sidebar and 70% content." code={NARROW_CODE}>
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
            right={<div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground"><div className="text-center"><Columns className="mx-auto mb-2 h-6 w-6" /><p>Main Content</p><p className="text-xs">30% / 70%</p></div></div>}
          />
        </ExampleBlock>

        <ExampleBlock title="Document Viewer" description="Split view for reading documents with a notes panel." code={DOC_CODE}>
          <SplitView
            defaultSize={65}
            left={
              <div className="h-full overflow-auto p-4">
                <h3 className="mb-2 text-sm font-medium">Design System Guide</h3>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                  <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.</p>
                  <p>Components should be modular, composable, and reusable. Each component should serve a single purpose.</p>
                  <p>Documentation is critical for adoption. Every component should include guidelines and code examples.</p>
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
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}