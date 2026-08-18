"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Table } from "lucide-react";

const installCommand = `npx component-library@latest add zebra-table`;
const usageCode = `// usage`;

export default function ZebraTablePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zebra Table</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zebra-striped table component for improved readability with alternating row colors and sortable columns.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zebra Table Demo</h2><p className="mt-1 text-sm text-muted-foreground">A table with alternating row colors for better readability.</p></div>
        <ComponentPreview id="zebra-table-demo"><div className="w-full p-4">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="px-3 py-2 text-left font-medium">Name</th><th className="px-3 py-2 text-left font-medium">Role</th><th className="px-3 py-2 text-left font-medium">Status</th></tr></thead>
            <tbody>
              <tr className="border-b bg-muted/30"><td className="px-3 py-2">Alice</td><td className="px-3 py-2 text-muted-foreground">Developer</td><td className="px-3 py-2"><span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Active</span></td></tr>
              <tr className="border-b"><td className="px-3 py-2">Bob</td><td className="px-3 py-2 text-muted-foreground">Designer</td><td className="px-3 py-2"><span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Active</span></td></tr>
              <tr className="border-b bg-muted/30"><td className="px-3 py-2">Charlie</td><td className="px-3 py-2 text-muted-foreground">Manager</td><td className="px-3 py-2"><span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">Away</span></td></tr>
            </tbody>
          </table>
        </div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
