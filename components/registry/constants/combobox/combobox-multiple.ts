import type { RegistryEntry } from "../../types";

export const comboboxMultiple: RegistryEntry = {
  id: "combobox-multiple",
  title: "Multiple Select",
  description: "Multi-select combobox with max selected limit",
  code: `"use client";

import { Combobox } from "@/components/_combobox";

const languages = [
  { value: "js", label: "JavaScript", icon: <span className="text-yellow-500">JS</span> },
  { value: "ts", label: "TypeScript", icon: <span className="text-blue-500">TS</span> },
  { value: "py", label: "Python", icon: <span className="text-green-500">PY</span> },
  { value: "rb", label: "Ruby", icon: <span className="text-red-500">RB</span> },
  { value: "go", label: "Go", icon: <span className="text-cyan-500">GO</span> },
  { value: "rs", label: "Rust", icon: <span className="text-orange-500">RS</span> },
  { value: "java", label: "Java", icon: <span className="text-red-600">JV</span> },
];

export function ComboboxMultiple() {
  return (
    <Combobox
      options={languages}
      multiple
      placeholder="Select languages..."
      searchPlaceholder="Search languages..."
      maxSelected={3}
    />
  );
}`,
  dependencies: ["@/components/_combobox"],
};
