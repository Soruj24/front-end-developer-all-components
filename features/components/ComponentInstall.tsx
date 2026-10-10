"use client";

import type { RegistryComponent } from "@/features/registry";
import { CopyButton } from "./CopyButton";

/**
 * Copy-paste installation guidance. Components ship as source files —
 * there is no package to install.
 */
export function ComponentInstall({ component }: { component: RegistryComponent }) {
  const targetFile = component.files[0] ?? `components/ui/${component.slug}.tsx`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
          {targetFile}
        </code>
        <CopyButton text={targetFile} label="Copy path" />
      </div>

      <p className="text-xs text-muted-foreground">
        Copy the source code above into{" "}
        <code className="font-mono">{targetFile}</code> in your project.
        Components are copy-paste — no package install required.
      </p>

      {component.dependencies.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Requires:{" "}
          {component.dependencies.map((dep) => (
            <code key={dep} className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
              {dep}
            </code>
          ))}
        </p>
      )}
    </div>
  );
}
