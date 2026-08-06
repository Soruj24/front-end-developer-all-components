import type { RegistryEntry } from "../../types";

export const comboboxCommandPalette: RegistryEntry = {
  id: "combobox-command-palette",
  title: "Command Palette",
  description: "Combobox used as a command palette",
  source: `"use client";

import { useState } from "react";
import { Combobox } from "@/components/_combobox";

const actions = [
  { value: "copy", label: "Copy", description: "Copy to clipboard", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
  { value: "paste", label: "Paste", description: "Paste from clipboard", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { value: "delete", label: "Delete", description: "Delete selection", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> },
  { value: "duplicate", label: "Duplicate", description: "Create a copy", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
  { value: "export", label: "Export", description: "Export as file", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
];

export function ComboboxCommandPalette() {
  const [action, setAction] = useState<string>("");

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
}`,
  dependencies: ["@/components/_combobox"],
};
