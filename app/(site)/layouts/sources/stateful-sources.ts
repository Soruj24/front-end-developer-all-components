/** Verbatim stateful pattern sources (Code Viewer). */
export const OVERLAY_SIDEBAR_SOURCE = `"use client";

import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";

/** Collapsible off-canvas drawer over the main view. */
export function OverlaySidebarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10">
        Main Content
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="absolute left-3 top-3 z-20 rounded-md border border-border bg-background p-1.5 shadow-xs transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">Open sidebar</span>
      </button>
      {open ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="absolute inset-y-0 left-0 z-30 w-32 cursor-default border-r border-border bg-background p-2 text-left shadow-lg"
          >
            <span className="block px-1 pb-2 text-[11px] font-semibold tracking-tight">Drawer</span>
            {["Overview", "Reports", "Team"].map((item) => (
              <span
                key={item}
                className="block rounded-md px-1.5 py-1 text-[11px] text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss overlay"
            className="absolute inset-0 z-20 bg-overlay"
          />
        </>
      ) : null}
    </div>
  );
}`;

export const WIZARD_SOURCE = `"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";

const wizardSteps = ["Account", "Workspace", "Done"];

/** Multi-step form flow with a progress rail. */
export function WizardDemo() {
  const [step, setStep] = useState(0);
  const last = step === wizardSteps.length - 1;
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 flex-col gap-3 p-4">
        <ol className="flex items-center gap-2">
          {wizardSteps.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-current={i === step ? "step" : undefined}
                className={\`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium transition-colors duration-150 \${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }\`}
              >
                {i < step ? <CheckIcon className="h-3 w-3" aria-hidden="true" /> : i + 1}
              </span>
              <span className={\`text-[11px] \${i === step ? "font-medium text-foreground" : "text-muted-foreground/70"}\`}>
                {label}
              </span>
              {i < wizardSteps.length - 1 ? (
                <span className="h-px w-6 bg-border" aria-hidden="true" />
              ) : null}
            </li>
          ))}
        </ol>
        <div className="flex-1 rounded-lg border border-dashed border-border bg-muted/20 p-2 text-[11px] text-muted-foreground/60">
          Step {step + 1} of {wizardSteps.length}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-md border border-input px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(wizardSteps.length - 1, s + 1))}
            disabled={last}
            className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}`;
