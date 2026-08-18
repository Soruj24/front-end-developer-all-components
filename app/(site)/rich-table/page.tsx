"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Table } from "lucide-react";

const installCommand = `npx component-library@latest add rich-table`;
const usageCode = `// usage`;

export default function RichTablePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Rich Table</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A feature-rich table component with sorting, row selection, pagination, and responsive horizontal scroll.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Rich data table with sorting and selection.</p></div>
        <ComponentPreview id="rich-table"><div className="w-full p-4"><div className="rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium"><div className="flex items-center gap-1">Name <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg></div></th><th className="px-4 py-3 text-left font-medium">Status</th><th className="px-4 py-3 text-left font-medium">Role</th><th className="px-4 py-3 text-left font-medium">Actions</th></tr></thead><tbody>{[{n:"John Doe",s:"Active",r:"Admin",c:"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"},{n:"Jane Smith",s:"Active",r:"Editor",c:"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"},{n:"Bob Wilson",s:"Inactive",r:"Viewer",c:"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"},{n:"Alice Brown",s:"Pending",r:"Editor",c:"bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"}].map((row,i)=>(<tr key={i} className="border-b last:border-b-0 hover:bg-muted/50 transition-colors"><td className="px-4 py-3 font-medium">{row.n}</td><td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.c}`}>{row.s}</span></td><td className="px-4 py-3 text-muted-foreground">{row.r}</td><td className="px-4 py-3"><button className="text-muted-foreground hover:text-foreground transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg></button></td></tr>))}</tbody></table></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">columns</td><td className="px-4 py-3 text-muted-foreground">{"{key: string; label: string}[]"}</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">data</td><td className="px-4 py-3 text-muted-foreground">{"Record<string, any>[]"}</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">sortable</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">selectable</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
