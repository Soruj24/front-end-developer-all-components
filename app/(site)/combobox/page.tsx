"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { Combobox } from "@/components/_combobox";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add combobox`;

const usageCode = `import { Combobox } from "@/components/_combobox";

const frameworks = [
  { value: "next", label: "Next.js", description: "React framework" },
  { value: "remix", label: "Remix", description: "Full-stack web framework" },
  { value: "gatsby", label: "Gatsby", description: "Static site generator" },
];

export default function Example() {
  const [value, setValue] = useState("");
  return (
    <Combobox
      options={frameworks}
      value={value}
      onValueChange={setValue}
      placeholder="Select framework..."
    />
  );
}`;

const frameworks = [
  { value: "next", label: "Next.js", description: "React framework" },
  { value: "remix", label: "Remix", description: "Full-stack web framework" },
  { value: "gatsby", label: "Gatsby", description: "Static site generator" },
  { value: "astro", label: "Astro", description: "Content-focused framework" },
  { value: "nuxt", label: "Nuxt", description: "Vue.js framework" },
  { value: "svelte", label: "SvelteKit", description: "Svelte framework" },
  { value: "angular", label: "Angular", description: "Platform for web apps" },
];

const languages = [
  { value: "js", label: "JavaScript", icon: <span className="text-yellow-500 font-bold">JS</span> },
  { value: "ts", label: "TypeScript", icon: <span className="text-blue-500 font-bold">TS</span> },
  { value: "py", label: "Python", icon: <span className="text-green-500 font-bold">PY</span> },
  { value: "rb", label: "Ruby", icon: <span className="text-red-500 font-bold">RB</span> },
  { value: "go", label: "Go", icon: <span className="text-cyan-500 font-bold">GO</span> },
  { value: "rs", label: "Rust", icon: <span className="text-orange-500 font-bold">RS</span> },
  { value: "java", label: "Java", icon: <span className="text-red-600 font-bold">JV</span> },
];

const statusOptions = [
  { value: "active", label: "Active", group: "Status" },
  { value: "inactive", label: "Inactive", group: "Status" },
  { value: "pending", label: "Pending", group: "Status" },
  { value: "archived", label: "Archived", group: "Status" },
  { value: "admin", label: "Admin", group: "Role" },
  { value: "editor", label: "Editor", group: "Role" },
  { value: "viewer", label: "Viewer", group: "Role" },
];

const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "au", label: "Australia", description: "Oceania" },
  { value: "br", label: "Brazil", description: "South America" },
  { value: "in", label: "India", description: "Asia" },
  { value: "ca", label: "Canada", description: "North America" },
  { value: "mx", label: "Mexico", description: "North America" },
];

const actions = [
  { value: "copy", label: "Copy", description: "Copy to clipboard", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
  { value: "paste", label: "Paste", description: "Paste from clipboard", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { value: "delete", label: "Delete", description: "Delete selection", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> },
  { value: "duplicate", label: "Duplicate", description: "Create a copy", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
  { value: "export", label: "Export", description: "Export as file", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium text-muted-foreground">{children}</p>;
}

export default function ComboboxPage() {
  const [framework, setFramework] = useState("");
  const [languages2, setLanguages2] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [action, setAction] = useState("");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Combobox</h1>
          <Badge variant="primary">9 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Searchable dropdown select built on top of a popover with command
          palette. Users can type to filter options and select one or multiple
          items. Perfect for long lists of options.
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

      {/* ── Single Select ─────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Single Select</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a single item from a searchable list.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <SectionLabel>Framework</SectionLabel>
            <Combobox
              options={frameworks}
              value={framework}
              onValueChange={(v) => setFramework(v as string)}
              placeholder="Select framework..."
            />
            <p className="text-xs text-muted-foreground">
              Selected: <span className="font-medium text-foreground">{framework || "—"}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>With default value</SectionLabel>
            <Combobox
              options={frameworks}
              defaultValue="next"
              placeholder="Select framework..."
            />
          </div>
        </div>
      </section>

      {/* ── Multi Select ──────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Multi Select</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select multiple items with a configurable maximum.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Languages (max 3)</SectionLabel>
          <Combobox
            options={languages}
            value={languages2}
            onValueChange={(v) => setLanguages2(v as string[])}
            multiple
            placeholder="Select languages..."
            searchPlaceholder="Search languages..."
            maxSelected={3}
          />
          <p className="text-xs text-muted-foreground">
            Selected:{" "}
            <span className="font-medium text-foreground">
              {languages2.length > 0 ? languages2.join(", ") : "—"}
            </span>{" "}
            ({languages2.length}/3)
          </p>
        </div>
      </section>

      {/* ── With Icons ────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Options can include leading icons for visual identification.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Pick a language</SectionLabel>
          <Combobox
            options={languages}
            placeholder="Pick a language..."
            searchPlaceholder="Search languages..."
          />
        </div>
      </section>

      {/* ── With Description ──────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Description</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Options can carry secondary text for additional context.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Country</SectionLabel>
          <Combobox
            options={countries}
            value={country}
            onValueChange={(v) => setCountry(v as string)}
            placeholder="Select country..."
            searchPlaceholder="Search countries..."
          />
        </div>
      </section>

      {/* ── Grouped Options ───────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Grouped Options</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Options can be organized into logical groups.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Status or Role</SectionLabel>
          <Combobox
            options={statusOptions}
            value={status}
            onValueChange={(v) => setStatus(v as string)}
            placeholder="Select status or role..."
            searchPlaceholder="Search..."
          />
        </div>
      </section>

      {/* ── Command Palette ───────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Command Palette</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use as a quick-action command palette with icons and descriptions.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Quick Action</SectionLabel>
          <Combobox
            options={actions}
            value={action}
            onValueChange={(v) => setAction(v as string)}
            placeholder="Type a command..."
            searchPlaceholder="Search actions..."
          />
          {action && (
            <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm">
              Executing: <span className="font-medium text-foreground">{action}</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Empty State ───────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Empty State</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Shows a message when no options are available.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>No options</SectionLabel>
          <Combobox
            options={[]}
            placeholder="No options available..."
            emptyMessage="Nothing to select."
          />
        </div>
      </section>

      {/* ── Form Example ──────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">In a Form</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Comboboxes integrate naturally with form layouts and labels.
          </p>
        </div>

        <ComponentPreview id="combobox-form">
          <form className="flex w-full max-w-md flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Framework</label>
              <Combobox options={frameworks} placeholder="Choose a framework..." />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Languages</label>
              <Combobox options={languages} multiple placeholder="Choose languages..." maxSelected={3} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Country</label>
              <Combobox options={countries} placeholder="Choose a country..." searchPlaceholder="Search countries..." />
            </div>
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Submit
            </button>
          </form>
        </ComponentPreview>
      </section>

      {/* ── API Reference ─────────────────────────────────────────── */}
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
                <td className="px-4 py-3 text-muted-foreground">ComboboxOption[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string | string[]</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">defaultValue</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string | string[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">multiple</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"Select..."'}</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">searchPlaceholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"Search..."'}</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">emptyMessage</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"No results found."'}</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">maxSelected</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
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
