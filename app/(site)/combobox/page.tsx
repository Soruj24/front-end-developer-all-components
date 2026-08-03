"use client";

import { useState } from "react";
import { Combobox } from "@/components/_combobox";
import { ComponentPreview } from "@/components/preview";

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
  { value: "js", label: "JavaScript", icon: <span className="text-yellow-500">JS</span> },
  { value: "ts", label: "TypeScript", icon: <span className="text-blue-500">TS</span> },
  { value: "py", label: "Python", icon: <span className="text-green-500">PY</span> },
  { value: "rb", label: "Ruby", icon: <span className="text-red-500">RB</span> },
  { value: "go", label: "Go", icon: <span className="text-cyan-500">GO</span> },
  { value: "rs", label: "Rust", icon: <span className="text-orange-500">RS</span> },
  { value: "java", label: "Java", icon: <span className="text-red-600">JV</span> },
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

export default function ComboboxPage() {
  const [framework, setFramework] = useState<string>("");
  const [languages2, setLanguages2] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Combobox</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A searchable dropdown select. Users can type to filter options and select
          one or multiple items. Perfect for long lists of options.
        </p>
      </header>

      <ComponentPreview id="combobox-single">
        <div className="flex flex-col gap-2">
          <Combobox
            options={frameworks}
            value={framework}
            onValueChange={(v) => setFramework(v as string)}
            placeholder="Select framework..."
          />
          <p className="text-xs text-muted-foreground">Selected: {framework || "none"}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="combobox-multiple">
        <div className="flex flex-col gap-2">
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
            Selected: {languages2.length > 0 ? languages2.join(", ") : "none"} (max 3)
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="combobox-with-icons">
        <Combobox
          options={languages}
          placeholder="Pick a language..."
          searchPlaceholder="Search languages..."
        />
      </ComponentPreview>

      <ComponentPreview id="combobox-grouped">
        <Combobox
          options={statusOptions}
          value={status}
          onValueChange={(v) => setStatus(v as string)}
          placeholder="Select status or role..."
          searchPlaceholder="Search..."
        />
      </ComponentPreview>

      <ComponentPreview id="combobox-default-value">
        <Combobox
          options={frameworks}
          defaultValue="next"
          placeholder="Select framework..."
        />
      </ComponentPreview>

      <ComponentPreview id="combobox-empty">
        <Combobox
          options={[]}
          placeholder="No options available..."
          emptyMessage="Nothing to select."
        />
      </ComponentPreview>

      <ComponentPreview id="combobox-with-description">
        <Combobox
          options={countries}
          value={country}
          onValueChange={(v) => setCountry(v as string)}
          placeholder="Select country..."
          searchPlaceholder="Search countries..."
        />
      </ComponentPreview>

      <ComponentPreview id="combobox-form">
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Framework</label>
            <Combobox
              options={frameworks}
              placeholder="Choose a framework..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Languages</label>
            <Combobox
              options={languages}
              multiple
              placeholder="Choose languages..."
              maxSelected={3}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Country</label>
            <Combobox
              options={countries}
              placeholder="Choose a country..."
              searchPlaceholder="Search countries..."
            />
          </div>
          <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
            Submit
          </button>
        </form>
      </ComponentPreview>

      <ComponentPreview id="combobox-command-palette">
        <CommandPaletteExample />
      </ComponentPreview>
    </div>
  );
}

function CommandPaletteExample() {
  const [action, setAction] = useState<string>("");

  const actions = [
    { value: "copy", label: "Copy", description: "Copy to clipboard", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { value: "paste", label: "Paste", description: "Paste from clipboard", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { value: "delete", label: "Delete", description: "Delete selection", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> },
    { value: "duplicate", label: "Duplicate", description: "Create a copy", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { value: "export", label: "Export", description: "Export as file", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-muted-foreground">Quick Action</p>
      <Combobox
        options={actions}
        value={action}
        onValueChange={(v) => setAction(v as string)}
        placeholder="Type a command..."
        searchPlaceholder="Search actions..."
      />
      {action && (
        <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
          Executing: <span className="font-medium">{action}</span>
        </div>
      )}
    </div>
  );
}
