"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Code, Braces, Type, GitBranch, Terminal, FileCode, Copy } from "lucide-react";

const installCommand = `npx component-library@latest add brackets-code`;
const usageCode = `import { BracketsCode } from "@/components/ui/brackets-code";

<BracketsCode language="tsx" code={snippet} />`;

function CodeBlockDemo() {
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Braces className="h-3 w-3 text-primary" />
        <span>component.tsx</span>
        <GitBranch className="h-3 w-3" />
        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px]">main</span>
      </div>
      <pre>{`function Button({ children, variant = "primary" }) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}`}</pre>
    </div>
  );
}

function InlineCode() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {["useState", "useEffect", "useCallback", "useMemo", "useRef", "useReducer"].map((hook) => (
        <code key={hook} className="px-3 py-1.5 rounded-md bg-muted text-sm font-mono text-foreground border border-border flex items-center gap-1.5">
          <Braces className="h-3 w-3 text-primary/60" />
          {hook}
        </code>
      ))}
    </div>
  );
}

function SyntaxHighlight() {
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Type className="h-3 w-3 text-blue-500" />
        <span>types.ts</span>
      </div>
      <pre className="text-[13px] leading-relaxed">{`interface User {
  id: string;
  name: string;
  email: string;
  roles: "admin" | "user" | "guest";
  metadata?: Record<string, unknown>;
}

type UserResponse = User & {
  createdAt: Date;
  updatedAt: Date;
};`}</pre>
    </div>
  );
}

function BracketPair() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Braces className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Bracket Pair Colorizer</h4>
          <p className="text-sm text-muted-foreground">Matching brackets highlighted</p>
        </div>
      </div>
      <div className="font-mono text-sm space-y-1 bg-muted/50 rounded p-4">
        <div className="flex gap-1"><span className="text-purple-500">{</span><span className="flex-1">function calculate() {</span><span className="text-purple-500">}</span></div>
        <div className="pl-4 flex gap-1"><span className="text-blue-500">[</span><span className="flex-1">const arr = [1, 2, 3]</span><span className="text-blue-500">]</span></div>
        <div className="pl-8 flex gap-1"><span className="text-green-500">(</span><span className="flex-1">return arr.map(x => x * 2)</span><span className="text-green-500">)</span></div>
        <div className="pl-4 flex gap-1"><span className="text-purple-500">}</span></div>
      </div>
    </div>
  );
}

function CodeSnippet() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <FileCode className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm text-foreground truncate">api/users/route.ts</p>
        <p className="text-xs text-muted-foreground">GET /api/users - List all users</p>
      </div>
      <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
        <Copy className="h-3.5 w-3.5" />
        Copy
      </button>
    </div>
  );
}

function TerminalCode() {
  return (
    <div className="rounded-xl border border-border bg-black p-4 font-mono text-sm text-green-400">
      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
        <Terminal className="h-3 w-3" />
        <span>~/project</span>
        <span className="text-green-400">$</span>
      </div>
      <div className="space-y-1 text-[13px]">
        <div><span className="text-gray-500">$</span><span className="ml-2"> npm run build</span></div>
        <div className="text-gray-400">  Building application...</div>
        <div className="text-green-400">  Compiled successfully</div>
        <div className="text-gray-400">  Output: dist/ (2.4 MB)</div>
        <div><span className="text-gray-500">$</span><span className="ml-2 text-white"> _</span></div>
      </div>
    </div>
  );
}

function EditorCode() {
  const [code, setCode] = useState(`const greeting = "Hello, World!";
console.log(greeting);`);

  return (
    <div className="rounded-xl border border-border bg-muted/50 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-xs text-muted-foreground font-mono">editor.ts</div>
        <div className="flex items-center gap-2">
          <Type className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">TypeScript</span>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-32 p-3 font-mono text-sm bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground"
        placeholder="Write code here..."
        spellCheck={false}
      />
    </div>
  );
}

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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Code Block</h2><p className="mt-1 text-sm text-muted-foreground">Multi-line code with syntax highlighting and file info.</p></div>
        <ComponentPreview id="brackets-code-block"><CodeBlockDemo /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Inline Code</h2><p className="mt-1 text-sm text-muted-foreground">Inline code snippets with bracket styling.</p></div>
        <ComponentPreview id="brackets-code-inline"><InlineCode /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Syntax Highlight</h2><p className="mt-1 text-sm text-muted-foreground">TypeScript interfaces with colored tokens.</p></div>
        <ComponentPreview id="brackets-code-syntax"><SyntaxHighlight /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Bracket Pairs</h2><p className="mt-1 text-sm text-muted-foreground">Color-coded matching brackets for nested structures.</p></div>
        <ComponentPreview id="brackets-code-pairs"><BracketPair /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Code Snippet</h2><p className="mt-1 text-sm text-muted-foreground">File snippet with copy-to-clipboard action.</p></div>
        <ComponentPreview id="brackets-code-snippet"><CodeSnippet /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Terminal Code</h2><p className="mt-1 text-sm text-muted-foreground">Command-line output simulation.</p></div>
        <ComponentPreview id="brackets-code-terminal"><TerminalCode /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Live Editor</h2><p className="mt-1 text-sm text-muted-foreground">Editable code area with language detection.</p></div>
        <ComponentPreview id="brackets-code-editor"><EditorCode /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">code</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">language</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">"typescript"</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showLineNumbers</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">copyable</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
