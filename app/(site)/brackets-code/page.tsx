"use client";

import { Code, Braces, Type, GitBranch, Terminal, FileCode, Copy } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { BRACKETS_CODE_SOURCE } from "./brackets-code-source";
import {
  BracketsCodeDemo,
  InlineCode,
  SyntaxHighlight,
  BracketPair,
  CodeSnippet,
  TerminalCode,
  EditorCode,
} from "./brackets-code-demos";

const bracketsSource = BRACKETS_CODE_SOURCE;

export default function BracketsCodePage() {
  return (
    <ComponentDocPage
      name="Brackets Code"
      category="Data Display"
      description="A code display component with bracket decorations, syntax highlighting, and copy functionality for code snippets."
    >
      <PreviewPanel filename="brackets-code/page.tsx">
        <BracketsCodeDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={bracketsSource}
        filename="components/ui/brackets-code/BracketsCode.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Inline Code" description="Inline code snippets with bracket styling." code={`<code key="useState" className="px-3 py-1.5 rounded-md bg-muted text-sm font-mono text-foreground border border-border flex items-center gap-1.5">
  <Braces className="h-3 w-3 text-primary/60" />
  useState
</code>`}>
          <InlineCode />
        </ExampleBlock>

        <ExampleBlock title="Syntax Highlight" description="TypeScript interfaces with colored tokens." code={`<pre className="text-[13px] leading-relaxed">
interface User {
  id: string;
  name: string;
  email: string;
  roles: "admin" | "user" | "guest";
  metadata?: Record<string, unknown>;
}

type UserResponse = User & {
  createdAt: Date;
  updatedAt: Date;
};
</pre>`}>
          <SyntaxHighlight />
        </ExampleBlock>

        <ExampleBlock title="Bracket Pair" description="Color-coded matching brackets for nested structures." code={`<div className="flex items-center gap-3">
  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
    <Braces className="h-5 w-5 text-primary" />
  </div>
  <div>
    <h4 className="font-semibold text-foreground">Bracket Pair Colorizer</h4>
    <p className="text-sm text-muted-foreground">Matching brackets highlighted</p>
  </div>
</div>`}>
          <BracketPair />
        </ExampleBlock>

        <ExampleBlock title="Code Snippet" description="File snippet with copy-to-clipboard action." code={`<div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
    <FileCode className="h-6 w-6 text-muted-foreground" />
  </div>
  <div>
    <p className="font-mono text-sm text-foreground truncate">api/users/route.ts</p>
    <p className="text-xs text-muted-foreground">GET /api/users - List all users</p>
  </div>
  <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
    <Copy className="h-3.5 w-3.5" />
    Copy
  </button>
</div>`}>
          <CodeSnippet />
        </ExampleBlock>

        <ExampleBlock title="Terminal Code" description="Command-line output simulation." code={`<div className="rounded-xl border border-border bg-black p-4 font-mono text-sm text-green-400">
  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
    <Terminal className="h-3 w-3" />
    <span>~/project</span>
    <span className="text-green-400">$</span>
  </div>
  <div className="space-y-1 text-[13px]">
    <div><span className="text-gray-500">$</span><span className="ml-2"> npm run build</span></div>
    <div className="text-gray-400">  Building application...</div>
    <div className="text-gray-400">  Compiled successfully</div>
    <div className="text-gray-400">  Output: dist/ (2.4 MB)</div>
    <div><span className="text-gray-500">$</span><span className="ml-2 text-white"> _</span></div>
  </div>
</div>`}>
          <TerminalCode />
        </ExampleBlock>

        <ExampleBlock title="Live Editor" description="Editable code area with language detection." code={`<textarea
  value={code}
  onChange={(e) => setCode(e.target.value)}
  className="w-full h-32 p-3 font-mono text-sm bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground"
  placeholder="Write code here..."
  spellCheck={false} />
`}
          <EditorCode />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}