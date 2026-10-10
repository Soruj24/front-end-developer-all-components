"use client";

import { useMemo } from "react";
import type { RegistryComponent } from "@/features/registry";
import { buildCopyPackage } from "@/features/copyable";
import { CopyButton } from "./CopyButton";

/** Copy-paste install guidance with real dependency commands. */
export function ComponentInstall({ component }: { component: RegistryComponent }) {
  const pkg = useMemo(() => buildCopyPackage(component), [component]);
  const targetFile = component.files[0] ?? `components/ui/${component.slug}.tsx`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
          {targetFile}
        </code>
        <CopyButton text={targetFile} label="Copy path" />
      </div>
      {pkg.installCommand ? (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
          <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
            {pkg.installCommand}
          </code>
          <CopyButton text={pkg.installCommand} label="Copy" />
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          No extra packages — React only.
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Copy the component tab above into <code className="font-mono">{targetFile}</code>
        {pkg.cnFile && (
          <> plus <code className="font-mono">lib/cn.ts</code> (shown under Setup)</>
        )}
        . Requires: {pkg.requiredDeps.join(", ") || "react"}.
      </p>
    </div>
  );
}
