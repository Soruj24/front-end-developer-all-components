import { forwardRef, HTMLAttributes } from "react";
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

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep,
      variant = "numbered",
      orientation = "horizontal",
      onStepClick,
      className,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="Progress"
        className={cn(
          isHorizontal ? "flex flex-row items-start" : "flex flex-col",
          className,
        )}
        {...props}
      >
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          const isLast = i === steps.length - 1;
          const isClickable =
            !!onStepClick &&
            (isCompleted ||
              !steps.some((_, j) => j < i && j > currentStep));

          return (
            <div
              key={i}
              className={cn(
                "flex",
                isHorizontal
                  ? "flex-1 flex-col items-center"
                  : "flex-row items-start",
                !isHorizontal && !isLast && "pb-0",
              )}
            >
              {/* Step indicator + label */}
              <div
                className={cn(
                  "flex",
                  isHorizontal ? "flex-col items-center" : "flex-row items-start",
                )}
              >
                {/* Indicator */}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => onStepClick?.(i)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Step ${i + 1}: ${step.label}`}
                  className={cn(
                    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
                    isCompleted &&
                      "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
                    isActive &&
                      "bg-background text-primary ring-2 ring-primary shadow-sm shadow-primary/10",
                    !isCompleted &&
                      !isActive &&
                      "bg-muted text-muted-foreground",
                    isClickable
                      ? "cursor-pointer hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      : "cursor-default",
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : variant === "dots" ? (
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        isActive ? "bg-primary" : "bg-current",
                      )}
                    />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </button>

                {/* Label */}
                <div
                  className={cn(
                    isHorizontal ? "mt-3 text-center" : "ml-4 pt-1",
                  )}
                >
                  <div
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        "mt-0.5 text-xs",
                        isActive
                          ? "text-muted-foreground"
                          : "text-muted-foreground/70",
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={cn(
                    isHorizontal
                      ? "mx-3 mt-0 h-0.5 flex-1 self-center"
                      : "ml-[19px] h-8 w-0.5",
                    "rounded-full transition-colors",
                    isCompleted ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";

export default Stepper;
export { Stepper };
