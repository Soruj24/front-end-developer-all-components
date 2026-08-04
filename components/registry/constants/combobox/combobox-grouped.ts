import type { RegistryEntry } from "../../types";

export const comboboxGrouped: RegistryEntry = {
  id: "combobox-grouped",
  name: "Grouped Options",
  description: "Combobox with grouped options",
  code: `"use client";

import { Combobox } from "@/components/_combobox";

const statusOptions = [
  { value: "active", label: "Active", group: "Status" },
  { value: "inactive", label: "Inactive", group: "Status" },
  { value: "pending", label: "Pending", group: "Status" },
  { value: "archived", label: "Archived", group: "Status" },
  { value: "admin", label: "Admin", group: "Role" },
  { value: "editor", label: "Editor", group: "Role" },
  { value: "viewer", label: "Viewer", group: "Role" },
];

export function ComboboxGrouped() {
  return (
    <Combobox
      options={statusOptions}
      placeholder="Select status or role..."
      searchPlaceholder="Search..."
    />
  );
}`,
  component: "ComboboxGrouped",
  dependencies: ["@/components/_combobox"],
};
