import type { RegistryEntry } from "../../types";

export const comboboxEmpty: RegistryEntry = {
  id: "combobox-empty",
  title: "Empty State",
  description: "Combobox with no options",
  source: `"use client";

import { Combobox } from "@/components/_combobox";

export function ComboboxEmpty() {
  return (
    <Combobox
      options={[]}
      placeholder="No options available..."
      emptyMessage="Nothing to select."
    />
  );
}`,
  dependencies: ["@/components/_combobox"],
};
