"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Copy, Check, Code2, Terminal, FileCode, Braces } from "lucide-react";

const installCommand = `npx component-library@latest add code-block-pro`;
const usageCode = `import { CodeBlockPro } from "@/components/code-block-pro";

<CodeBlockPro
  code={code}
  language="typescript"
  theme="dark"
  showLineNumbers
/>`;

const sampleCode = `import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`;

function CodeBlockProDemo() {
  const [copied, setCopied] = useState(false);
  const lines = sampleCode.split("\n");

  const copy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg rounded-xl border bg-[#0d1117] overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">UserProfile.tsx</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">TypeScript</span>
          <button onClick={copy} className="rounded p-1 hover:bg-white/10 text-muted-foreground">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-[13px] leading-6">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-8 select-none text-right pr-4 text-white/20 text-xs">{i + 1}</span>
              <code className="text-white/80">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function SyntaxHighlightDemo() {
  const snippets = [
    { lang: "typescript", label: "TypeScript", icon: Braces, color: "text-blue-400" },
    { lang: "bash", label: "Bash", icon: Terminal, color: "text-emerald-400" },
    { lang: "json", label: "JSON", icon: Code2, color: "text-yellow-400" },
  ];
  const [active, setActive] = useState(0);

  const codeMap: Record<string, string> = {
    typescript: `const greet = (name: string): string => {\n  return \`Hello, \${name}!\`;\n};`,
    bash: `npm install @mylib/core\nnpm run build\necho "Done!"`,
    json: `{\n  "name": "my-library",\n  "version": "1.0.0",\n  "main": "dist/index.js"\n}`,
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex gap-1">
        {snippets.map((s, i) => (
          <button
            key={s.lang}
            onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              active === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <s.icon className={`h-3 w-3 ${active === i ? "" : s.color}`} />
            {s.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg border bg-[#0d1117] p-4">
        <pre className="text-[13px] text-white/80 leading-6">{codeMap[snippets[active].lang]}</pre>
      </div>
    </div>
  );
}

function InlineCodeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {["useState", "useEffect", "className", "onClick", "fetch()"].map((code) => (
        <code key={code} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
          {code}
        </code>
      ))}
    </div>
  );
}

export default function CodeBlockProPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Code Block Pro</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Advanced code block with syntax highlighting, line numbers, copy button, language tabs, and inline code styling.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Full Featured</h2>
        <ComponentPreview>
          <CodeBlockProDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Language Tabs</h2>
        <ComponentPreview>
          <SyntaxHighlightDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Inline Code</h2>
        <ComponentPreview>
          <InlineCodeDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">code</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">language</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"typescript"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showLineNumbers</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
