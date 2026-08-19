"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CODE_EDITOR_SOURCE } from "./code-editor-source";

const basicCode = `function greet(name: string) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

export default greet;`;

const toolbarCode = `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`;

const tabsCode = `export default function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
    </div>
  );
}`;

const BASIC_CODE_SNIPPET = `<CodeEditor
  code={code}
  language="tsx"
  showLineNumbers
  onChange={setCode}
/>`;

const TOOLBAR_CODE_SNIPPET = `<CodeEditor
  code={code}
  toolbar={
    <>
      <Button variant="ghost" size="sm">Copy</Button>
      <Button size="sm">Run</Button>
    </>
  }
/>`;

const TABS_CODE_SNIPPET = `const files = [
  { name: "index.tsx", code: appCode },
  { name: "styles.css", code: cssCode },
  { name: "utils.ts", code: utilCode },
];

<CodeEditor files={files} activeFile={active} />`;

function BasicEditorDemo() {
  return (
    <div className="w-full p-4">
      <div className="rounded-xl border border-border overflow-hidden bg-[#1e1e2e] text-[#cdd6f4]">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
          <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" /></div>
          <span className="text-xs text-white/50 ml-2">component.tsx</span>
        </div>
        <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">{basicCode}</pre>
      </div>
    </div>
  );
}

function ToolbarEditorDemo() {
  return (
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
        <pre className="p-4 text-xs font-mono bg-background leading-relaxed">{toolbarCode}</pre>
      </div>
    </div>
  );
}

function MultiTabEditorDemo() {
  return (
    <div className="w-full p-4">
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="flex border-b border-border bg-muted/30">
          {["index.tsx", "styles.css", "utils.ts"].map((tab, i) => (
            <button key={tab} className={`px-4 py-2 text-xs border-r border-border ${i === 0 ? "bg-background font-medium" : "text-muted-foreground"}`}>{tab}</button>
          ))}
        </div>
        <pre className="p-4 text-xs font-mono bg-background leading-relaxed">{tabsCode}</pre>
      </div>
    </div>
  );
}

export default function CodeEditorPage() {
  return (
    <ComponentDocPage
      name="Code Editor"
      category="Forms"
      description="A code editor component with syntax highlighting, line numbers, and editable code blocks for live coding experiences."
    >
      <PreviewPanel filename="code-editor.tsx">
        <BasicEditorDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CODE_EDITOR_SOURCE}
        filename="components/ui/CodeEditor/CodeEditor.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Editor" description="A simple code editor with line numbers." code={BASIC_CODE_SNIPPET}>
          <BasicEditorDemo />
        </ExampleBlock>

        <ExampleBlock title="With Toolbar" description="Editor with action buttons in the toolbar." code={TOOLBAR_CODE_SNIPPET}>
          <ToolbarEditorDemo />
        </ExampleBlock>

        <ExampleBlock title="Multi-tab Editor" description="Editor with multiple file tabs." code={TABS_CODE_SNIPPET}>
          <MultiTabEditorDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}