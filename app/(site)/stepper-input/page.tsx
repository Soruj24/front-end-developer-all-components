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

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, variant = "numbered", orientation = "horizontal", onStepClick, className = "", ...props }, ref) => {
    const isHorizontal = orientation === "horizontal";
    return (
      <div
        ref={ref}
        className={\`flex \${isHorizontal ? "flex-row items-start" : "flex-col items-start gap-0"} \${className}\`}
        {...props}
      >
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          const isClickable = !!onStepClick && (isCompleted || !steps.some((_, j) => j < i && j > currentStep));
          return (
            <div
              key={i}
              className={\`flex \${isHorizontal ? "flex-1 flex-col items-center" : "flex-row items-start"} \${\!isHorizontal && i < steps.length - 1 ? "pb-0" : ""}\`}
            >
              <div className={\`flex \${isHorizontal ? "flex-col items-center" : "flex-row items-start"}\`}>
                <button
                  type="button"
                  disabled={!onStepClick}
                  onClick={() => onStepClick?.(i)}
                  className={\`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors \${
                    isCompleted
                      ? "bg-foreground text-background"
                      : isActive
                        ? "border-2 border-foreground bg-transparent text-foreground"
                        : "border-2 border-border bg-transparent text-muted-foreground"
                  } \${isClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"}\`}
                >
                  {isCompleted ? "✓" : variant === "dots" ? "" : variant === "numbered" ? i + 1 : ""}
                </button>
                <div className={\`\${isHorizontal ? "mt-2 text-center" : "ml-3"}\`}>
                  <div className={\`text-sm font-medium \${\isActive ? "text-foreground" : isCompleted ? "text-foreground" : "text-muted-foreground"}\`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={\`\${isHorizontal ? "mt-0 h-0.5 w-full self-center" : "ml-4 h-8 w-0.5"} \${\isCompleted ? "bg-foreground" : "bg-muted"}\`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";

export default Stepper;
export { Stepper };`;

const DOTS_CODE = `import { useState } from "react";
import { Stepper } from "@/components/ui/Stepper";

function DotsStepper() {
  const [current, setCurrent] = useState(1);
  const steps = [
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Review" },
  ];
  return <Stepper steps={steps} currentStep={current} variant="dots" onStepClick={setCurrent} />;
}`;

const VERTICAL_CODE = `import { useState } from "react";
import { Stepper } from "@/components/ui/Stepper";

function VerticalStepper() {
  const [current, setCurrent] = useState(0);
  const steps = [
    { label: "Account" },
    { label: "Profile" },
    { label: "Billing" },
  ];
  return <Stepper steps={steps} currentStep={current} orientation="vertical" onStepClick={setCurrent} />;
}`;

const CLICKABLE_CODE = `import { useState } from "react";
import { Stepper } from "@/components/ui/Stepper";

function ClickableStepper() {
  const [current, setCurrent] = useState(1);
  const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];
  return <Stepper steps={steps} currentStep={current} onStepClick={setCurrent} />;
}`;

export default function StepperInputPage() {
  const [current, setCurrent] = useState(1);
  const [verticalCurrent, setVerticalCurrent] = useState(0);

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
        <Stepper
          steps={steps}
          currentStep={current}
          onStepClick={setCurrent}
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={STEPPER_SOURCE}
        filename="components/ui/Stepper.tsx"
        defaultExpanded
      />

      <ExampleBlock
        title="Dots Variant"
        description="Dot-based indicators instead of numbers."
        code={DOTS_CODE}
        filename="dots.tsx"
      >
        <Stepper
          steps={steps.slice(0, 3)}
          currentStep={1}
          variant="dots"
        />
      </ExampleBlock>

      <ExampleBlock
        title="Vertical"
        description="Steps arranged vertically with side labels."
        code={VERTICAL_CODE}
        filename="vertical.tsx"
      >
        <Stepper
          steps={steps.slice(0, 3)}
          currentStep={verticalCurrent}
          orientation="vertical"
          onStepClick={setVerticalCurrent}
        />
      </ExampleBlock>

      <ExampleBlock
        title="Clickable Steps"
        description="Users can click any step to navigate."
        code={CLICKABLE_CODE}
        filename="clickable.tsx"
      >
        <Stepper
          steps={steps.slice(0, 3)}
          currentStep={current}
          onStepClick={setCurrent}
        />
      </ExampleBlock>
    </ComponentDocPage>
  );
}
