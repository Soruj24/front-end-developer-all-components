"use client";

import { useState } from "react";
import { writeClipboard } from "@/lib/clipboard";
import type { CopyPackage } from "../types/copy-package";
import { TARGET_ENV, SETUP_NOTES } from "../constants/target-env";

/** Target-environment + setup checklist for a copyable component. */
export function SetupChecklist({ pkg }: { pkg: CopyPackage }) {
  const [copied, setCopied] = useState(false);

  return (
    <section aria-label="Setup requirements" className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Setup &amp; Requirements
      </h2>
      <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
        <li>Framework: {TARGET_ENV.framework}</li>
        <li>React: {TARGET_ENV.react} · TypeScript: {TARGET_ENV.typescript}</li>
        <li>Tailwind: {TARGET_ENV.tailwind}</li>
        <li>
          Dependencies:{" "}
          {pkg.requiredDeps.length > 0 ? pkg.requiredDeps.join(", ") : "react only"}
        </li>
        {pkg.needsClientDirective && (
          <li>Add <code className="font-mono">&quot;use client&quot;</code> at the top under Next.js App Router.</li>
        )}
        {SETUP_NOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {pkg.installCommand && (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
          <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
            {pkg.installCommand}
          </code>
          <button
            type="button"
            onClick={async () => setCopied(await writeClipboard(pkg.installCommand))}
            className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      {pkg.cnFile && (
        <details className="rounded-xl border border-border p-3">
          <summary className="cursor-pointer text-xs font-medium text-foreground">
            Required helper: {pkg.cnFile.filename} (click to view)
          </summary>
          <pre className="mt-2 overflow-auto rounded-lg bg-muted/40 p-3 font-mono text-[11px] leading-relaxed">
            {pkg.cnFile.code}
          </pre>
        </details>
      )}
    </section>
  );
}
