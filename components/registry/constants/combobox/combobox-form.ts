import type { RegistryEntry } from "../../types";

export const comboboxForm: RegistryEntry = {
  id: "combobox-form",
  title: "Form Usage",
  description: "Combobox used in a form context",
  code: `"use client";

import { Combobox } from "@/components/_combobox";

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

const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
];

export function ComboboxForm() {
  return (
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
  );
}`,
  dependencies: ["@/components/_combobox"],
};
