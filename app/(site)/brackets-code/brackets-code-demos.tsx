"use client";

import { useState } from "react";
import { Braces, Type, GitBranch, Terminal, FileCode, Copy } from "lucide-react";

export function BracketsCodeDemo() {
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Braces className="h-3 w-3 text-primary" />
        <span>component.tsx</span>
        <GitBranch className="h-3 w-3" />
        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px]">main</span>
      </div>
      <pre className="text-[13px] leading-relaxed text-foreground">{`function Button({ children, variant = "primary" }) {
  return (
    <button className="btn btn-primary">
      {children}
    </button>
  );
}`}</pre>
    </div>
  );
}

export function InlineCode() {
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

export function SyntaxHighlight() {
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Type className="h-3 w-3 text-blue-500" />
        <span>types.ts</span>
      </div>
      <pre className="text-[13px] leading-relaxed text-foreground">{`interface User {
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

export function BracketPair() {
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
        <div className="flex gap-1"><span className="text-purple-500">{"{"}</span><span className="flex-1">{"function calculate() {"}</span><span className="text-purple-500">{"}"}</span></div>
        <div className="pl-4 flex gap-1"><span className="text-blue-500">[</span><span className="flex-1">{"const arr = [1, 2, 3]"}</span><span className="text-blue-500">]</span></div>
        <div className="pl-8 flex gap-1"><span className="text-green-500">(</span><span className="flex-1">{"return arr.map(x => x * 2)"}</span><span className="text-green-500">)</span></div>
        <div className="pl-4 flex gap-1"><span className="text-purple-500">{"}"}</span></div>
      </div>
    </div>
  );
}

export function CodeSnippet() {
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

export function TerminalCode() {
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
        <div className="text-gray-400">  Compiled successfully</div>
        <div className="text-gray-400">  Output: dist/ (2.4 MB)</div>
        <div><span className="text-gray-500">$</span><span className="ml-2 text-white"> _</span></div>
      </div>
    </div>
  );
}

export function EditorCode() {
  const [code, setCode] = useState(`const greeting = "Hello, World!";\nconsole.log(greeting);`);

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
