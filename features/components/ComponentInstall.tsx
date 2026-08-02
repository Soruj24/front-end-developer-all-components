"use client";

import { useState } from "react";
import type { RegistryComponent } from "@/features/registry";
import { installManagers, installManagerLabel, cliCommand } from "@/features/registry";
import { cn } from "@/lib/cn";
import { CopyButton } from "./CopyButton";

export function ComponentInstall({ component }: { component: RegistryComponent }) {
  const [manager, setManager] = useState(installManagers[0]);
  const command = component.install[manager] ?? "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-muted/30 p-1">
        {installManagers.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setManager(item)}
            className={cn(
              "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              manager === item
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {installManagerLabel[item]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
          {command}
        </code>
        <CopyButton text={command} />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
          {cliCommand(component.slug)}
        </code>
        <CopyButton text={cliCommand(component.slug)} label="Copy CLI" />
      </div>

      <p className="text-xs text-muted-foreground">
        Ships {component.files.length} file{component.files.length === 1 ? "" : "s"} —{" "}
        {component.files.map((file) => <code key={file} className="font-mono">{file}</code>)}
        {" "}with no runtime dependencies beyond React.
      </p>
    </div>
  );
}
