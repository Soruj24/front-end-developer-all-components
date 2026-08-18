"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { X, Plus, Tag, Palette, CheckCircle2 } from "lucide-react";

const installCommand = `npx component-library@latest add chip-input`;

const usageCode = `import { ChipInput } from "@/components/ui";

<ChipInput
  value={chips}
  onChange={setChips}
  placeholder="Add tags..."
/>`;

function Chip({ label, color, onRemove }: { label: string; color?: string; onRemove: () => void }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${color || "bg-primary-soft text-blue-800 dark:bg-blue-900 dark:text-blue-100"}`}>
      {label}
      <button onClick={onRemove} className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function ChipInputDemo() {
  const [chips, setChips] = useState(["React", "TypeScript", "Next.js"]);
  const [input, setInput] = useState("");

  const addChip = () => {
    if (input.trim() && !chips.includes(input.trim())) {
      setChips([...chips, input.trim()]);
      setInput("");
    }
  };

  const removeChip = (idx: number) => setChips(chips.filter((_, i) => i !== idx));

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2">
        {chips.map((chip, i) => (
          <Chip key={chip} label={chip} onRemove={() => removeChip(i)} />
        ))}
        <div className="flex items-center gap-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addChip(); } }}
            placeholder="Add tag..."
            className="w-24 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button onClick={addChip} className="rounded-md p-1 hover:bg-muted">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Type and press Enter to add chips</p>
    </div>
  );
}

function ColoredChipsDemo() {
  const [chips, setChips] = useState([
    { label: "Urgent", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
    { label: "Feature", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
    { label: "Bug", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" },
    { label: "Enhancement", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
  ]);

  const removeChip = (idx: number) => setChips(chips.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip, i) => (
        <Chip key={chip.label} label={chip.label} color={chip.color} onRemove={() => removeChip(i)} />
      ))}
    </div>
  );
}

function DisabledChipsDemo() {
  const chips = ["Draft", "Published", "Archived"];
  return (
    <div className="flex flex-wrap gap-2 opacity-50">
      {chips.map((chip) => (
        <span key={chip} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
          {chip}
        </span>
      ))}
    </div>
  );
}

function SuggestionsDemo() {
  const [chips, setChips] = useState(["React"]);
  const [input, setInput] = useState("");
  const suggestions = ["Vue", "Angular", "Svelte", "Solid", "Qwik"].filter((s) => !chips.includes(s));
  const filtered = input ? suggestions.filter((s) => s.toLowerCase().includes(input.toLowerCase())) : suggestions;

  const addChip = (label: string) => { setChips([...chips, label]); setInput(""); };
  const removeChip = (idx: number) => setChips(chips.filter((_, i) => i !== idx));

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2">
        {chips.map((chip, i) => (
          <Chip key={chip} label={chip} onRemove={() => removeChip(i)} />
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search frameworks..."
          className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {filtered.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {filtered.map((s) => (
            <button key={s} onClick={() => addChip(s)} className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted">
              <Plus className="h-3 w-3" />{s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChipInputPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Chip Input</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A tag/chip input component with autocomplete support. Add, remove, and manage chips with keyboard and mouse interactions.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Chips</h2>
          <p className="mt-1 text-sm text-muted-foreground">Type and press Enter to add tags. Click X to remove.</p>
        </div>
        <ComponentPreview id="chip-input-basic">
          <ChipInputDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Colored Chips</h2>
          <p className="mt-1 text-sm text-muted-foreground">Chips with different color variants for categories.</p>
        </div>
        <ComponentPreview id="chip-input-colored">
          <ColoredChipsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Disabled</h2>
          <p className="mt-1 text-sm text-muted-foreground">Chips in a disabled, read-only state.</p>
        </div>
        <ComponentPreview id="chip-input-disabled">
          <DisabledChipsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Suggestions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Autocomplete suggestions below the input area.</p>
        </div>
        <ComponentPreview id="chip-input-suggestions">
          <SuggestionsDemo />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Add tags...&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">suggestions</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
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
