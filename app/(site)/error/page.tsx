"use client";

import { useState, type ComponentType } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
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

const installCommand = `npx component-library@latest add error`;

const usageCode = `import { ErrorBoundary } from "@/components/error";

<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>`;

const errorProps = [
  { prop: "variant", type: "\"http\" | \"full-page\" | \"inline\" | \"form\" | \"summary\"", default: "\"http\"", required: "No" },
  { prop: "statusCode", type: "number", default: "500", required: "No" },
  { prop: "title", type: "string", default: "-", required: "No" },
  { prop: "description", type: "string", default: "-", required: "No" },
  { prop: "onRetry", type: "() => void", default: "-", required: "No" },
  { prop: "showDetails", type: "boolean", default: "false", required: "No" },
];

export default function ErrorPage() {
  const [activePattern, setActivePattern] = useState(0);
  const { Render: Active, registryId } = ERROR_PATTERNS[activePattern];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Error</h1>
          <Badge variant="primary">{ERROR_PATTERNS.length} examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Error page patterns — 4xx, 5xx, and application errors. Use the tabs to
          switch between the live preview, source code, CLI, installation, and
          dependency details for each example.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        <p className="text-sm text-muted-foreground">Choose a pattern to preview below.</p>

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
      </section>


    </div>
  );
}
