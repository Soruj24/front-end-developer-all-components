"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Input, Card, CardContent, Checkbox } from "@/components/ui";

const installCommand = "npx component-library@latest add multi-select";

const usageCode = `import { MultiSelect } from "@/components/ui";

export default function Example() {
  return <MultiSelect options={options} onChange={(v) => console.log(v)} />;
}`;

const allOptions = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "next", label: "Next.js" },
  { id: "nuxt", label: "Nuxt" },
];

export default function MultiSelectPage() {
  const [selected, setSelected] = useState<string[]>(["react", "next"]);
  const [search, setSearch] = useState("");

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const filtered = allOptions.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Multi Select</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Multi-select dropdown with tag display, search filtering, and keyboard navigation.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Tag Display</h3>
          <ComponentPreview id="multi-select-default">
            <div className="flex w-full flex-wrap gap-1.5">
              {selected.map((id) => {
                const opt = allOptions.find((o) => o.id === id);
                return (
                  <span key={id} className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {opt?.label}
                    <button onClick={() => toggle(id)} className="hover:text-primary/70">✕</button>
                  </span>
                );
              })}
              {selected.length === 0 && <span className="text-sm text-muted-foreground">No items selected</span>}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Search</h3>
          <ComponentPreview id="multi-select-search">
            <div className="w-full max-w-sm">
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="mb-2" />
              <div className="max-h-48 overflow-y-auto rounded-lg border border-border">
                {filtered.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 px-3 py-2 hover:bg-muted cursor-pointer border-b border-border last:border-0">
                    <Checkbox checked={selected.includes(opt.id)} onCheckedChange={() => toggle(opt.id)} />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="multi-select-interactive">
            <Card className="w-full max-w-sm">
              <CardContent className="p-3">
                <div className="mb-2 flex flex-wrap gap-1">
                  {selected.map((id) => {
                    const opt = allOptions.find((o) => o.id === id);
                    return (
                      <span key={id} className="inline-flex items-center gap-1 rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        {opt?.label}
                        <button onClick={() => toggle(id)}>✕</button>
                      </span>
                    );
                  })}
                </div>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter options..." className="mb-2 text-sm" />
                <div className="space-y-0.5">
                  {filtered.map((opt) => (
                    <button key={opt.id} onClick={() => toggle(opt.id)} className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-left transition-colors ${selected.includes(opt.id) ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                      <div className={`h-4 w-4 rounded border flex items-center justify-center ${selected.includes(opt.id) ? "bg-primary border-primary text-white" : "border-border"}`}>
                        {selected.includes(opt.id) && <span className="text-[10px]">✓</span>}
                      </div>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">options</td>
                <td className="px-4 py-3 text-muted-foreground">Option[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}