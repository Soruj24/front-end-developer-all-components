export const STEPPROGRESS_SOURCE = `"use client";

import { Check, Circle, Loader2 } from "lucide-react";

interface StepProgressProps {
  steps: { label: string; description?: string }[];
  current: number;
  variant?: "default" | "numbered" | "minimal" | "animated";
  orientation?: "horizontal" | "vertical";
}

export function StepProgress({ steps, current, variant = "default", orientation = "horizontal" }: StepProgressProps) {
  const isHorizontal = orientation === "horizontal";
  const isNumbered = variant === "numbered";
  const isMinimal = variant === "minimal";
  const isAnimated = variant === "animated";

  return (
    <div className={\`flex \${isHorizontal ? "items-start" : "flex-col"}\`}>
      {steps.map((step, i) => {
        const completed = i < current;
        const active = i === current;

        return (
          <div key={i} className={\`flex \${isHorizontal ? "flex-1 flex-col items-center" : "flex-row items-start gap-3"}\`}>
            <div className="flex items-center gap-2">
              <div
                className={\`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-all \${
                  completed
                    ? "bg-emerald-500 text-white"
                    : active
                    ? "bg-foreground text-background ring-2 ring-foreground/20 dark:bg-muted dark:text-zinc-900 dark:ring-muted/20"
                    : isMinimal
                    ? "border border-border text-muted-foreground"
                    : "border-2 border-border text-muted-foreground"
                }\`}
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
                <div className={\`w-px self-stretch \${completed ? "bg-emerald-500" : "bg-border"}\`} style={{ minHeight: "24px" }} />
              )}
            </div>
            <div className={\`\${isHorizontal ? "mt-2 text-center" : "flex-1 pb-6"}\`}>
              <p className={\`text-sm \${completed || active ? "font-medium text-foreground" : "text-muted-foreground"}\`}>{step.label}</p>
              {step.description && <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>}
            </div>
            {isHorizontal && i < steps.length - 1 && (
              <div className={\`absolute left-[calc(50%+16px)] right-[calc(-50%+16px)] top-4 h-0.5 \${completed ? "bg-emerald-500" : "bg-border"}\`} />
            )}
          </div>
        );
      })}
    </div>
  );
}`;
