"use client";

import { cn } from "@/lib/cn";
import { CHECKOUT_STEPS, type CheckoutStep } from "../types/checkout.types";

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
  onStepClick?: (step: CheckoutStep) => void;
  className?: string;
}

export function CheckoutSteps({ currentStep, onStepClick, className }: CheckoutStepsProps) {
  const currentIndex = CHECKOUT_STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted" />
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500"
          style={{ width: `${(currentIndex / (CHECKOUT_STEPS.length - 1)) * 100}%` }}
        />

        {CHECKOUT_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isClickable = index < currentIndex;

          return (
            <button
              key={step.key}
              onClick={() => isClickable && onStepClick?.(step.key)}
              disabled={!isClickable}
              className={cn(
                "relative z-10 flex flex-col items-center gap-2",
                isClickable && "cursor-pointer",
                !isClickable && !isCurrent && "cursor-default"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-background text-primary shadow-lg shadow-primary/20",
                  !isCompleted && !isCurrent && "border-border bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
