import { forwardRef, HTMLAttributes } from "react";

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
        className={`flex ${isHorizontal ? "flex-row items-start" : "flex-col items-start gap-0"} ${className}`}
        {...props}
      >
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          const isClickable = !!onStepClick && (isCompleted || !steps.some((_, j) => j < i && j > currentStep));
          return (
            <div
              key={i}
              className={`flex ${isHorizontal ? "flex-1 flex-col items-center" : "flex-row items-start"} ${!isHorizontal && i < steps.length - 1 ? "pb-0" : ""}`}
            >
              <div className={`flex ${isHorizontal ? "flex-col items-center" : "flex-row items-start"}`}>
                <button
                  type="button"
                  disabled={!onStepClick}
                  onClick={() => onStepClick?.(i)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    isCompleted
                      ? "bg-foreground text-background"
                      : isActive
                        ? "border-2 border-foreground bg-transparent text-foreground"
                        : "border-2 border-border bg-transparent text-muted-foreground"
                  } ${isClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                >
                  {isCompleted ? "✓" : variant === "dots" ? "" : variant === "numbered" ? i + 1 : ""}
                </button>
                <div className={`${isHorizontal ? "mt-2 text-center" : "ml-3"}`}>
                  <div className={`text-sm font-medium ${isActive ? "text-foreground" : isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`${isHorizontal ? "mt-0 h-0.5 w-full self-center" : "ml-4 h-8 w-0.5"} ${isCompleted ? "bg-foreground" : "bg-muted"}`}
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
export { Stepper };
