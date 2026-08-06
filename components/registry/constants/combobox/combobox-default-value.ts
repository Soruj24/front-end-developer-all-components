import type { RegistryEntry } from "../../types";

export const comboboxDefaultValue: RegistryEntry = {
  id: "combobox-default-value",
  title: "Default Value",
  description: "Combobox with pre-selected value",
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

export function ComboboxDefaultValue() {
  return (
    <Combobox
      options={frameworks}
      defaultValue="next"
      placeholder="Select framework..."
    />
  );
}`,
  component: "ComboboxDefaultValue",
  dependencies: ["@/components/_combobox"],
};
