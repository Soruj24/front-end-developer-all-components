"use client";

import { useState } from "react";
import {
  BookmarkIcon,
  CheckIcon,
  MessageSquareIcon,
  TerminalIcon,
  XIcon,
} from "lucide-react";

const frame =
  "flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs";

/** Editorial reading layout: centred column with meta row. */
export function MinimalBlogDemo() {
  return (
    <div className={frame}>
      <div className="mx-auto flex w-full max-w-72 flex-col gap-2 p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
          Engineering
        </span>
        <h3 className="text-sm font-semibold tracking-tight">
          Designing resilient layouts
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Grids, flexbox and container queries working as one system.
        </p>
        <span className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground/70">
          <span className="flex items-center gap-1">
            <MessageSquareIcon className="h-3 w-3" aria-hidden="true" /> 12
          </span>
          <span className="flex items-center gap-1">
            <BookmarkIcon className="h-3 w-3" aria-hidden="true" /> Save
          </span>
        </span>
      </div>
    </div>
  );
}

/** Bottom sheet sliding over dimmed page content. */
export function ModalSheetDemo() {
  return (
    <div className={`${frame} relative`}>
      <div aria-hidden="true" className="absolute inset-0 bg-overlay" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share project"
        className="absolute inset-x-0 bottom-0 z-10 rounded-t-xl border-t border-border bg-background p-3 shadow-lg"
      >
        <span className="mx-auto mb-2 block h-1 w-8 rounded-full bg-border" />
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-tight">Share project</span>
          <button
            type="button"
            aria-label="Close sheet"
            className="rounded-md p-1 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        {["Copy link", "Invite by email"].map((action) => (
          <button
            key={action}
            type="button"
            className="block w-full rounded-md px-2 py-1.5 text-left text-[11px] text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

const wizardSteps = ["Account", "Workspace", "Done"];

/** Multi-step form flow with a progress rail. */
export function WizardDemo() {
  const [step, setStep] = useState(0);
  const last = step === wizardSteps.length - 1;
  return (
    <div className={frame}>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <ol className="flex items-center gap-2">
          {wizardSteps.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-current={i === step ? "step" : undefined}
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium transition-colors duration-150 ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <CheckIcon className="h-3 w-3" aria-hidden="true" /> : i + 1}
              </span>
              <span className={`text-[11px] ${i === step ? "font-medium text-foreground" : "text-muted-foreground/70"}`}>
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
}

/** Console-style panel with prompt rows. */
export function TerminalDemo() {
  return (
    <div className={frame}>
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-muted/40 px-3">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <TerminalIcon className="h-3 w-3" aria-hidden="true" /> zsh
        </span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-primary/40" />
        </span>
      </div>
      <div className="flex-1 space-y-1 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
        <p><span className="text-primary">~</span> npm run dev</p>
        <p>ready in 240ms</p>
        <p><span className="text-primary">~</span> <span className="inline-block h-3 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-muted-foreground/60" aria-hidden="true" /></p>
      </div>
    </div>
  );
}
