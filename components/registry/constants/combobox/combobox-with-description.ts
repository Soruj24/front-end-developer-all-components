import type { RegistryEntry } from "../../types";

export const comboboxWithDescription: RegistryEntry = {
  id: "combobox-with-description",
  title: "With Description",
  description: "Combobox with option descriptions",
  source: `"use client";

import { Combobox } from "@/components/_combobox";

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

export function ComboboxWithDescription() {
  return (
    <Combobox
      options={countries}
      placeholder="Select country..."
      searchPlaceholder="Search countries..."
    />
  );
}`,
  dependencies: ["@/components/_combobox"],
};
