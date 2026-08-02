"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/home/CodeBlock";
import { cn } from "@/lib/cn";
import type { InstallManager, RegistryItem } from "@/components/registry";
import { CopyButton } from "./CopyButton";
import { PackageIcon } from "./icons";

/* ------------------------------------------------------------------ */
/* Code                                                               */
/* ------------------------------------------------------------------ */

interface CodePanelProps {
  item: RegistryItem;
}

export function CodePanel({ item }: CodePanelProps) {
  return (
    <div className="p-4 sm:p-6">
      <CodeBlock
        code={item.source}
        filename={item.files[0]}
        label="tsx"
        variant="terminal"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CLI                                                                */
/* ------------------------------------------------------------------ */

function TerminalLine({ command, dark }: { command: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border px-4 py-3 font-mono text-sm",
        dark
          ? "border-zinc-800 bg-[#0b0b10] text-zinc-200"
          : "border-border bg-muted/50 text-foreground"
      )}
    >
      <span className="flex min-w-0 items-center gap-2 overflow-x-auto">
        <span className={dark ? "text-success" : "text-accent"}>$</span>
        <span className="whitespace-nowrap">{command}</span>
      </span>
      <CopyButton
        value={command}
        className={cn(
          "shrink-0",
          dark ? "text-muted-foreground/70 hover:bg-zinc-800 hover:text-zinc-100" : ""
        )}
      />
    </div>
  );
}

interface CliPanelProps {
  item: RegistryItem;
}

export function CliPanel({ item }: CliPanelProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <p className="text-sm text-muted-foreground">
        Scaffold the component straight into your project with the CLI.
      </p>
      <TerminalLine command={item.cli} dark />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Install                                                            */
/* ------------------------------------------------------------------ */

const MANAGERS: InstallManager[] = ["npm", "pnpm", "yarn", "bun"];

interface InstallPanelProps {
  item: RegistryItem;
}

export function InstallPanel({ item }: InstallPanelProps) {
  const [manager, setManager] = useState<InstallManager>("npm");

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 rounded-full border border-border bg-muted p-1">
          {MANAGERS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setManager(m)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                manager === m
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <span className="hidden text-xs text-muted-foreground sm:block">
          package manager
        </span>
      </div>
      <TerminalLine command={item.install[manager]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dependencies                                                       */
/* ------------------------------------------------------------------ */

interface DependenciesPanelProps {
  item: RegistryItem;
}

export function DependenciesPanel({ item }: DependenciesPanelProps) {
  const copyAll = item.dependencies.join(" ");

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <PackageIcon className="h-4 w-4" />
          {item.dependencies.length} runtime{" "}
          {item.dependencies.length === 1 ? "dependency" : "dependencies"}
        </p>
        <CopyButton value={copyAll} label="Copy all dependencies" />
      </div>
      <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border bg-muted/30">
        {item.dependencies.map((dep) => (
          <li
            key={dep}
            className="flex items-center justify-between gap-3 px-4 py-2.5"
          >
            <span className="font-mono text-sm">{dep}</span>
            <CopyButton value={dep} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground" />
          </li>
        ))}
      </ul>
    </div>
  );
}
