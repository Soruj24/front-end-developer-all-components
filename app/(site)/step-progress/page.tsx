"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Check, Circle, Loader2 } from "lucide-react";

const installCommand = `npx component-library@latest add step-progress`;

const usageCode = `import { Check, Circle, Loader2 } from "lucide-react";

function StepProgress({ steps, current }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={\`flex h-8 w-8 items-center justify-center rounded-full border-2 \${
            i < current ? "border-green-500 bg-green-500 text-white" :
            i === current ? "border-primary bg-primary text-primary-foreground" :
            "border-muted-foreground/30 text-muted-foreground"
          }\`}>
            {i < current ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={\`h-0.5 w-12 \${i < current ? "bg-green-500" : "bg-muted-foreground/20"}\`} />
          )}
        </div>
      ))}
    </div>
  );
}`;

function StepProgress({
  steps,
  current,
  variant = "default",
  orientation = "horizontal",
}: {
  steps: { label: string; description?: string }[];
  current: number;
  variant?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const isHorizontal = orientation === "horizontal";
  const isNumbered = variant === "numbered";
  const isMinimal = variant === "minimal";
  const isAnimated = variant === "animated";

  return (
    <div className={`flex ${isHorizontal ? "items-start" : "flex-col gap-0"}`}>
      {steps.map((step, i) => {
        const completed = i < current;
        const active = i === current;
        const upcoming = i > current;

        return (
          <div key={i} className={`flex ${isHorizontal ? "flex-1 flex-col items-center" : "flex-row items-start gap-3"}`}>
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-all ${
                  completed
                    ? "bg-emerald-500 text-white"
                    : active
                    ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900 ring-2 ring-foreground/20 dark:ring-muted/20"
                    : isMinimal
                    ? "border border-border text-muted-foreground"
                    : "border-2 border-border text-muted-foreground"
                }`}
              >
                {completed ? (
                  <Check className="h-4 w-4" />
                ) : active && isAnimated ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isNumbered || isMinimal ? (
                  i + 1
                ) : (
                  <Circle className="h-2 w-2" />
                )}
              </div>
              {!isHorizontal && i < steps.length - 1 && (
                <div
                  className={`w-px self-stretch ${
                    completed ? "bg-emerald-500" : "bg-border"
                  }`}
                  style={{ minHeight: "24px" }}
                />
              )}
            </div>
            <div className={`${isHorizontal ? "mt-2 text-center" : "flex-1 pb-6"}`}>
              <p
                className={`text-sm ${
                  completed || active ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
              )}
            </div>
            {isHorizontal && i < steps.length - 1 && (
              <div
                className={`absolute left-[calc(50%+16px)] right-[calc(-50%+16px)] top-4 h-0.5 ${
                  completed ? "bg-emerald-500" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ current, total, label }: { current: number; total: number; label?: string }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">{pct}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground transition-all dark:bg-muted"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function StepProgressPage() {
  const [s1, setS1] = useState(2);
  const [s2, setS2] = useState(1);
  const [s3, setS3] = useState(0);

  const threeSteps = [
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Fill in details" },
    { label: "Done", description: "All set" },
  ];

  const fourSteps = [
    { label: "Cart", description: "Review items" },
    { label: "Shipping", description: "Delivery info" },
    { label: "Payment", description: "Secure checkout" },
    { label: "Confirm", description: "Place order" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Step Progress</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Visual progress indicators showing which step the user is on in a multi-step process. Supports numbered, animated, and minimal variants in horizontal and vertical layouts.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Numbered (Default)</h2>
          <p className="mt-1 text-sm text-muted-foreground">Steps shown as numbered circles with completed checkmarks.</p>
        </div>
        <ComponentPreview id="step-progress-numbered">
          <div className="flex flex-col gap-4">
            <StepProgress steps={threeSteps} current={s1} variant="numbered" />
            <div className="flex gap-2">
              <button onClick={() => setS1(Math.max(0, s1 - 1))} disabled={s1 === 0} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Back</button>
              <button onClick={() => setS1(Math.min(threeSteps.length - 1, s1 + 1))} disabled={s1 === threeSteps.length - 1} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50">Next</button>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Checkout Flow</h2>
          <p className="mt-1 text-sm text-muted-foreground">Four-step e-commerce checkout progress.</p>
        </div>
        <ComponentPreview id="step-progress-checkout">
          <StepProgress steps={fourSteps} current={s2} variant="numbered" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Current</h2>
          <p className="mt-1 text-sm text-muted-foreground">Current step shown with a spinning loader.</p>
        </div>
        <ComponentPreview id="step-progress-animated">
          <div className="flex flex-col gap-4">
            <StepProgress steps={fourSteps} current={1} variant="animated" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Minimal</h2>
          <p className="mt-1 text-sm text-muted-foreground">Minimal step indicator with borders only.</p>
        </div>
        <ComponentPreview id="step-progress-minimal">
          <StepProgress steps={threeSteps} current={s1} variant="minimal" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical</h2>
          <p className="mt-1 text-sm text-muted-foreground">Vertical step progress layout.</p>
        </div>
        <ComponentPreview id="step-progress-vertical">
          <div className="max-w-xs">
            <StepProgress steps={fourSteps} current={s2} variant="numbered" orientation="vertical" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Progress Bar</h2>
          <p className="mt-1 text-sm text-muted-foreground">Linear progress bar showing completion percentage.</p>
        </div>
        <ComponentPreview id="step-progress-bar">
          <div className="flex w-full flex-col gap-4">
            <ProgressBar current={s3 + 1} total={4} label="Setup Progress" />
            <div className="flex gap-2">
              <button onClick={() => setS3(Math.max(0, s3 - 1))} disabled={s3 === 0} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Back</button>
              <button onClick={() => setS3(Math.min(3, s3 + 1))} disabled={s3 === 3} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50">Next</button>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Labeled Progress Bars</h2>
          <p className="mt-1 text-sm text-muted-foreground">Multiple progress bars for different tasks.</p>
        </div>
        <ComponentPreview id="step-progress-multi-bar">
          <div className="flex w-full flex-col gap-4">
            <ProgressBar current={4} total={4} label="Profile" />
            <ProgressBar current={3} total={5} label="Verification" />
            <ProgressBar current={1} total={3} label="Billing Setup" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">steps</td>
                <td className="px-4 py-3 text-muted-foreground">{`{ label: string; description?: string }[]`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">current</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default" | "numbered" | "minimal" | "animated"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"numbered"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">{`"horizontal" | "vertical"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"horizontal"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
