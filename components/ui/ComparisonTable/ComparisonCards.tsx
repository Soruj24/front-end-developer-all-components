"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Check, X, ArrowRight } from "lucide-react";
import type { ComparisonCardsProps } from "./ComparisonTable.types";

const ComparisonCards = forwardRef<HTMLDivElement, ComparisonCardsProps>(
  ({ plans, onCtaClick, className }, ref) => {
    return (
      <div ref={ref} className={cn("grid w-full gap-4 sm:grid-cols-3", className)} role="list">
        {plans.map((plan) => (
          <div
            key={plan.name}
            role="listitem"
            className={cn(
              "relative flex flex-col gap-4 rounded-xl border p-6 transition-all duration-200",
              plan.highlighted
                ? "border-primary/60 bg-primary/5 shadow-md shadow-primary/5"
                : "border-border/60 bg-background hover:border-border hover:shadow-sm",
            )}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                {plan.badge}
              </span>
            )}

            <div>
              <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-foreground">
                {plan.price}
                {plan.period && (
                  <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                )}
              </p>
            </div>

            <ul className="flex flex-1 flex-col gap-2.5">
              {plan.features.map((feat) => (
                <li key={feat.label} className="flex items-center gap-2 text-sm">
                  {typeof feat.value === "boolean" ? (
                    feat.value ? (
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                        <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      </span>
                    ) : (
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                        <X className="h-3 w-3 text-muted-foreground/40" />
                      </span>
                    )
                  ) : (
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                      <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    </span>
                  )}
                  <span className={cn(
                    "text-muted-foreground",
                    typeof feat.value === "boolean" && !feat.value && "text-muted-foreground/50",
                  )}>
                    {feat.label}
                    {typeof feat.value === "string" && `: ${feat.value}`}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onCtaClick?.(plan.name)}
              className={cn(
                "mt-auto flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150",
                plan.highlighted
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                "active:scale-[0.98]",
              )}
            >
              {plan.cta || `Choose ${plan.name}`}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    );
  },
);

ComparisonCards.displayName = "ComparisonCards";

export default ComparisonCards;
