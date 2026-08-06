"use client";

import { useState, type ComponentType } from "react";
import { ComponentPreview } from "@/components/preview";
import { HttpStatusErrors } from "./components/HttpStatusErrors";
import { FullPageErrors } from "./components/FullPageErrors";
import { InlineErrors } from "./components/InlineErrors";
import { FormValidationErrors } from "./components/FormValidationErrors";
import { ErrorSummaryCards } from "./components/ErrorSummaryCards";
import { ErrorStates } from "./components/ErrorStates";
import { ErrorWithDetails } from "./components/ErrorWithDetails";
import { UseCaseScenarios } from "./components/UseCaseScenarios";

const ERROR_PATTERNS: Array<{ label: string; Render: ComponentType; registryId: string }> = [
  { label: "HTTP Status", Render: HttpStatusErrors, registryId: "error-http-status" },
  { label: "Full Page", Render: FullPageErrors, registryId: "error-full-page" },
  { label: "Inline", Render: InlineErrors, registryId: "error-inline" },
  { label: "Form Validation", Render: FormValidationErrors, registryId: "error-form-validation" },
  { label: "Summary Cards", Render: ErrorSummaryCards, registryId: "error-summary-cards" },
  { label: "Error States", Render: ErrorStates, registryId: "error-details" },
  { label: "With Details", Render: ErrorWithDetails, registryId: "error-details" },
  { label: "Use Cases", Render: UseCaseScenarios, registryId: "error-use-case" },
];

export default function ErrorPage() {
  const [activePattern, setActivePattern] = useState(0);
  const { Render: Active, registryId } = ERROR_PATTERNS[activePattern];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Error</h1>
        <p className="mt-1 text-muted-foreground">Error page patterns — 4xx, 5xx, and application errors.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ERROR_PATTERNS.map((pattern, i) => (
          <button
            key={pattern.label}
            onClick={() => setActivePattern(i)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activePattern === i
                ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900"
                : "bg-muted text-muted-foreground hover:bg-muted dark:bg-muted dark:text-muted-foreground/70 dark:hover:bg-zinc-600"
            }`}
          >
            {i + 1}. {pattern.label}
          </button>
        ))}
      </div>

      <ComponentPreview id={registryId} title={ERROR_PATTERNS[activePattern].label + " Errors"}>
        <Active />
      </ComponentPreview>

      <p className="text-center text-xs text-muted-foreground/70">
        Pattern {activePattern + 1} of {ERROR_PATTERNS.length} —{" "}
        <span className="font-medium">{ERROR_PATTERNS[activePattern].label}</span>
      </p>
    </div>
  );
}
