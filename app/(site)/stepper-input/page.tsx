"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Stepper } from "@/components/ui/Stepper";

const STEPPER_SOURCE = `import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type StepperVariant = "default" | "numbered" | "dots";

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  variant?: StepperVariant;
  orientation?: "horizontal" | "vertical";
  onStepClick?: (step: number) => void;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(({ steps, currentStep, variant = "numbered", orientation = "horizontal", onStepClick, className, ...props }, ref) => {
  const isHorizontal = orientation === "horizontal";
  return (
    <div ref={ref} role="navigation" aria-label="Progress"
      className={cn(isHorizontal ? "flex flex-row items-start" : "flex flex-col", className)} {...props}>
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        const isLast = i === steps.length - 1;
        const isClickable = !!onStepClick && (isCompleted || !steps.some((_, j) => j < i && j > currentStep));
        return (
          <div key={i} className={cn("flex", isHorizontal ? "flex-1 flex-col items-center" : "flex-row items-start", !isHorizontal && !isLast && "pb-0")}>
            <div className={cn("flex", isHorizontal ? "flex-col items-center" : "flex-row items-start")}>
              <button type="button" disabled={!isClickable} onClick={() => onStepClick?.(i)} aria-current={isActive ? "step" : undefined}
                className={cn("relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
                  isCompleted && "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
                  isActive && "bg-background text-primary ring-2 ring-primary shadow-sm shadow-primary/10",
                  !isCompleted && !isActive && "bg-muted text-muted-foreground",
                  isClickable ? "cursor-pointer hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" : "cursor-default")}>
                {isCompleted ? <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  : variant === "dots" ? <span className={cn("h-2.5 w-2.5 rounded-full", isActive ? "bg-primary" : "bg-current")} />
                  : <span>{i + 1}</span>}
              </button>
              <div className={cn(isHorizontal ? "mt-3 text-center" : "ml-4 pt-1")}>
                <div className={cn("text-sm font-medium transition-colors", isActive ? "text-foreground" : isCompleted ? "text-foreground" : "text-muted-foreground")}>{step.label}</div>
                {step.description && <div className={cn("mt-0.5 text-xs", isActive ? "text-muted-foreground" : "text-muted-foreground/70")}>{step.description}</div>}
              </div>
            </div>
            {!isLast && <div className={cn(isHorizontal ? "mx-3 mt-0 h-0.5 flex-1 self-center" : "ml-[19px] h-8 w-0.5", "rounded-full transition-colors", isCompleted ? "bg-primary" : "bg-border")} />}
          </div>
        );
      })}
    </div>
  );
});

Stepper.displayName = "Stepper";
export default Stepper;
export { Stepper };`;

export default function StepperInputPage() {
  const [current, setCurrent] = useState(1);
  const [verticalCurrent, setVerticalCurrent] = useState(0);
  const [dotsCurrent, setDotsCurrent] = useState(1);

  const steps = [
    { label: "Shopping Cart", description: "Review your items" },
    { label: "Shipping", description: "Enter shipping details" },
    { label: "Payment", description: "Payment information" },
    { label: "Confirmation", description: "Order confirmed" },
  ];

  return (
    <ComponentDocPage
      name="Stepper"
      category="Navigation"
      description="A multi-step wizard component with numbered or dot indicators. Supports horizontal and vertical layouts with clickable steps."
    >
      <PreviewPanel filename="stepper-preview.tsx">
        <div className="w-full max-w-lg">
          <Stepper
            steps={steps}
            currentStep={current}
            onStepClick={setCurrent}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={STEPPER_SOURCE}
        filename="components/ui/Stepper.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Numbered steps with descriptions and clickable navigation."
          code={`import { Stepper } from "@/components/ui/Stepper";\n\n<Stepper\n  steps={steps}\n  currentStep={current}\n  onStepClick={setCurrent}\n/>`}
          filename="default.tsx"
        >
          <div className="w-full max-w-lg">
            <Stepper
              steps={steps}
              currentStep={current}
              onStepClick={setCurrent}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Dots Variant"
          description="Dot-based indicators instead of numbers."
          code={`<Stepper\n  steps={steps}\n  currentStep={1}\n  variant="dots"\n/>`}
          filename="dots.tsx"
        >
          <div className="w-full max-w-lg">
            <Stepper
              steps={steps.slice(0, 3)}
              currentStep={dotsCurrent}
              variant="dots"
              onStepClick={setDotsCurrent}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description="Steps arranged vertically with side labels."
          code={`<Stepper\n  steps={steps}\n  currentStep={0}\n  orientation="vertical"\n/>`}
          filename="vertical.tsx"
        >
          <div className="w-full max-w-sm">
            <Stepper
              steps={steps.slice(0, 3)}
              currentStep={verticalCurrent}
              orientation="vertical"
              onStepClick={setVerticalCurrent}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Completed"
          description="All steps completed."
          code={`<Stepper steps={steps} currentStep={4} />`}
          filename="completed.tsx"
        >
          <div className="w-full max-w-lg">
            <Stepper steps={steps} currentStep={4} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="First Step"
          description="At the beginning of the flow."
          code={`<Stepper steps={steps} currentStep={0} />`}
          filename="first-step.tsx"
        >
          <div className="w-full max-w-lg">
            <Stepper steps={steps} currentStep={0} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical Completed"
          description="Vertical layout with all steps completed."
          code={`<Stepper\n  steps={steps}\n  currentStep={4}\n  orientation="vertical"\n/>`}
          filename="vertical-completed.tsx"
        >
          <div className="w-full max-w-sm">
            <Stepper
              steps={steps}
              currentStep={4}
              orientation="vertical"
            />
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">steps</td>
                <td className="px-4 py-3 text-muted-foreground">Step[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">currentStep</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;numbered&quot; | &quot;dots&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;numbered&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onStepClick</td>
                <td className="px-4 py-3 text-muted-foreground">(step: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Step Interface
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Property</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
