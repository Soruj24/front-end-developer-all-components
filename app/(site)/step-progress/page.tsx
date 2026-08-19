"use client";

import { useState } from "react";
import { Check, Circle, Loader2 } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { STEPPROGRESS_SOURCE } from "./step-progress-source";

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
    <ComponentDocPage
      name="Step Progress"
      category="Navigation"
      description="Visual progress indicators showing which step the user is on in a multi-step process. Supports numbered, animated, and minimal variants in horizontal and vertical layouts."
    >
      <PreviewPanel filename="step-progress.tsx">
        <div className="flex flex-col gap-4">
          <StepProgress steps={threeSteps} current={s1} variant="numbered" />
          <div className="flex gap-2">
            <button onClick={() => setS1(Math.max(0, s1 - 1))} disabled={s1 === 0} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Back</button>
            <button onClick={() => setS1(Math.min(threeSteps.length - 1, s1 + 1))} disabled={s1 === threeSteps.length - 1} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50">Next</button>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={STEPPROGRESS_SOURCE} filename="components/ui/StepProgress/StepProgress.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Numbered (Default)" description="Steps shown as numbered circles with completed checkmarks." code={`<StepProgress steps={steps} current={1} variant="numbered" />`}>
          <div className="flex flex-col gap-4">
            <StepProgress steps={threeSteps} current={s1} variant="numbered" />
            <div className="flex gap-2">
              <button onClick={() => setS1(Math.max(0, s1 - 1))} disabled={s1 === 0} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Back</button>
              <button onClick={() => setS1(Math.min(threeSteps.length - 1, s1 + 1))} disabled={s1 === threeSteps.length - 1} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50">Next</button>
            </div>
          </div>
        </ExampleBlock>
        <ExampleBlock title="Checkout Flow" description="Four-step e-commerce checkout progress." code={`<StepProgress steps={checkoutSteps} current={2} variant="numbered" />`}>
          <StepProgress steps={fourSteps} current={s2} variant="numbered" />
        </ExampleBlock>
        <ExampleBlock title="Animated Current" description="Current step shown with a spinning loader." code={`<StepProgress steps={steps} current={1} variant="animated" />`}>
          <div className="flex flex-col gap-4">
            <StepProgress steps={fourSteps} current={1} variant="animated" />
          </div>
        </ExampleBlock>
        <ExampleBlock title="Minimal" description="Minimal step indicator with borders only." code={`<StepProgress steps={steps} current={1} variant="minimal" />`}>
          <StepProgress steps={threeSteps} current={s1} variant="minimal" />
        </ExampleBlock>
        <ExampleBlock title="Vertical" description="Vertical step progress layout." code={`<StepProgress steps={steps} current={2} variant="numbered" orientation="vertical" />`}>
          <div className="max-w-xs">
            <StepProgress steps={fourSteps} current={s2} variant="numbered" orientation="vertical" />
          </div>
        </ExampleBlock>
        <ExampleBlock title="Progress Bar" description="Linear progress bar showing completion percentage." code={`<ProgressBar current={3} total={4} label="Setup Progress" />`}>
          <div className="flex w-full flex-col gap-4">
            <ProgressBar current={s3 + 1} total={4} label="Setup Progress" />
            <div className="flex gap-2">
              <button onClick={() => setS3(Math.max(0, s3 - 1))} disabled={s3 === 0} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Back</button>
              <button onClick={() => setS3(Math.min(3, s3 + 1))} disabled={s3 === 3} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50">Next</button>
            </div>
          </div>
        </ExampleBlock>
        <ExampleBlock title="Labeled Progress Bars" description="Multiple progress bars for different tasks." code={`<div className="flex flex-col gap-4">
  <ProgressBar current={4} total={4} label="Profile" />
  <ProgressBar current={3} total={5} label="Verification" />
  <ProgressBar current={1} total={3} label="Billing Setup" />
</div>`}>
          <div className="flex w-full flex-col gap-4">
            <ProgressBar current={4} total={4} label="Profile" />
            <ProgressBar current={3} total={5} label="Verification" />
            <ProgressBar current={1} total={3} label="Billing Setup" />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
