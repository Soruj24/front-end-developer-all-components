"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add input-group`;

const usageCode = `import { InputGroup } from "@/components/_input-group";

<InputGroup label="Email" leading="@" placeholder="you@example.com" />
<InputGroup label="Price" leading="$" trailing=".00" />`;

function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export default function InputGroupPage() {
  const inputBase = "flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-100";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Input Group</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Input fields with prepended or appended content like icons, text
          labels, or buttons. Useful for search bars, pricing inputs, and more.
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

      {/* Leading Icon */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Leading Icon</h2>
          <p className="mt-1 text-sm text-muted-foreground">Input with an icon on the left side.</p>
        </div>
        <ComponentPreview id="input-group-leading">
          <div className="w-full max-w-sm">
            <label className="mb-2 block text-sm font-medium text-foreground">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </div>
              <input type="text" placeholder="Search..." className={`${inputBase} pl-10`} />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Trailing Text */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Trailing Text</h2>
          <p className="mt-1 text-sm text-muted-foreground">Input with text appended on the right side.</p>
        </div>
        <ComponentPreview id="input-group-trailing">
          <div className="w-full max-w-sm">
            <label className="mb-2 block text-sm font-medium text-foreground">Website</label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-black/[.08] bg-zinc-100 px-3 text-sm text-muted-foreground dark:border-white/[.145] dark:bg-zinc-800">
                https://
              </span>
              <input type="text" placeholder="example.com" className={`${inputBase} rounded-l-none`} />
            </div>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">leading</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">trailing</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">error</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
