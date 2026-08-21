"use client";

import { useState, useCallback } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import Countdown from "@/components/ui/Countdown";

const COUNTDOWN_SOURCE = `import { forwardRef, HTMLAttributes, useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CountdownProps extends HTMLAttributes<HTMLDivElement> {
  targetDate: Date | string | number;
  onComplete?: () => void;
  showLabels?: boolean;
  showSeparators?: boolean;
  variant?: "default" | "card" | "pill";
  size?: "sm" | "md" | "lg";
}

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const sizeConfig = {
  sm: { digit: "h-12 w-12 text-xl", label: "text-[10px]", separator: "text-xl", gap: "gap-2", card: "px-1 py-1" },
  md: { digit: "h-16 w-16 text-3xl", label: "text-[11px]", separator: "text-3xl", gap: "gap-3", card: "px-2 py-2" },
  lg: { digit: "h-20 w-20 sm:h-24 sm:w-24 text-4xl sm:text-5xl", label: "text-xs", separator: "text-4xl sm:text-5xl", gap: "gap-3 sm:gap-4", card: "px-3 py-3 sm:px-4 sm:py-4" },
} as const;

const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  ({ targetDate, onComplete, showLabels = true, showSeparators = true, variant = "default", size = "md", className, ...props }, ref) => {
    const target = useRef(new Date(targetDate));
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(target.current));
    const [isComplete, setIsComplete] = useState(false);

    const handleComplete = useCallback(() => { setIsComplete(true); onComplete?.(); }, [onComplete]);
    useEffect(() => { target.current = new Date(targetDate); setIsComplete(false); setTimeLeft(calculateTimeLeft(target.current)); }, [targetDate]);
    useEffect(() => {
      const timer = setInterval(() => {
        const tl = calculateTimeLeft(target.current); setTimeLeft(tl);
        if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) { clearInterval(timer); handleComplete(); }
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate, handleComplete]);

    const config = sizeConfig[size];
    const items = [{ label: "Days", value: timeLeft.days }, { label: "Hours", value: timeLeft.hours }, { label: "Min", value: timeLeft.minutes }, { label: "Sec", value: timeLeft.seconds }];

    const renderDigit = (value: number, label: string) => {
      const digit = String(value).padStart(2, "0");
      if (variant === "card") return (
        <div className="flex flex-col items-center gap-1.5">
          <div className={cn("flex items-center justify-center rounded-xl border border-border bg-card font-mono font-bold tabular-nums tracking-tight shadow-sm", config.digit, config.card, isComplete && "border-emerald-500/30 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400")}>{digit}</div>
          {showLabels && <span className={cn("font-medium uppercase tracking-wider text-muted-foreground", config.label)}>{label}</span>}
        </div>);
      if (variant === "pill") return (
        <div className="flex flex-col items-center gap-1.5">
          <div className={cn("flex items-center justify-center rounded-full bg-primary/10 font-mono font-bold tabular-nums tracking-tight text-primary", config.digit, config.card, isComplete && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400")}>{digit}</div>
          {showLabels && <span className={cn("font-medium uppercase tracking-wider text-muted-foreground", config.label)}>{label}</span>}
        </div>);
      return (
        <div className="flex flex-col items-center gap-1.5">
          <span className={cn("font-mono font-bold tabular-nums tracking-tight text-foreground", config.digit, isComplete && "text-emerald-600 dark:text-emerald-400")}>{digit}</span>
          {showLabels && <span className={cn("font-medium uppercase tracking-wider text-muted-foreground", config.label)}>{label}</span>}
        </div>);
    };

    return (
      <div ref={ref} role="timer" aria-label="Countdown timer" className={cn("inline-flex items-center", config.gap, className)} {...props}>
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {renderDigit(item.value, item.label)}
            {showSeparators && i < items.length - 1 && <span className={cn("mx-1 font-bold text-muted-foreground/40 sm:mx-1.5", config.separator, variant !== "default" && "mb-5")} aria-hidden="true">:</span>}
          </div>
        ))}
      </div>
    );
  }
);
Countdown.displayName = "Countdown";
export default Countdown;`;

const BASIC_CODE = `import Countdown from "@/components/ui/Countdown";

<Countdown targetDate="2027-12-31T23:59:59" />`;

const CARD_CODE = `import Countdown from "@/components/ui/Countdown";

<Countdown targetDate="2027-12-31T23:59:59" variant="card" />`;

const PILL_CODE = `import Countdown from "@/components/ui/Countdown";

<Countdown targetDate="2027-12-31T23:59:59" variant="pill" />`;

const NO_LABELS_CODE = `import Countdown from "@/components/ui/Countdown";

<Countdown targetDate="2027-12-31T23:59:59" showLabels={false} />`;

const NO_SEPARATORS_CODE = `import Countdown from "@/components/ui/Countdown";

<Countdown targetDate="2027-12-31T23:59:59" showSeparators={false} />`;

const SIZES_CODE = `import Countdown from "@/components/ui/Countdown";

<div className="flex flex-col items-center gap-4">
  <Countdown targetDate="2027-12-31T23:59:59" size="sm" />
  <Countdown targetDate="2027-12-31T23:59:59" size="md" />
  <Countdown targetDate="2027-12-31T23:59:59" size="lg" />
</div>`;

const VARIANTS_CODE = `import Countdown from "@/components/ui/Countdown";

<div className="flex flex-col items-center gap-6">
  <Countdown targetDate="2027-12-31T23:59:59" variant="default" />
  <Countdown targetDate="2027-12-31T23:59:59" variant="card" />
  <Countdown targetDate="2027-12-31T23:59:59" variant="pill" />
</div>`;

const ON_COMPLETE_CODE = `"use client";
import { useState } from "react";
import Countdown from "@/components/ui/Countdown";

function CountdownWithCallback() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Countdown targetDate="2027-12-31T23:59:59" onComplete={() => setDone(true)} variant="card" />
      {done && <p className="text-sm text-emerald-600 font-medium">Time is up!</p>}
    </div>
  );
}`;

export default function TimerCountdownPage() {
  const [done, setDone] = useState(false);
  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <ComponentDocPage
      name="Timer Countdown"
      category="Data Display"
      description="A countdown timer that displays the time remaining until a target date with three variants (default, card, pill), size options, separators, labels, and completion callbacks."
    >
      <PreviewPanel filename="countdown-preview.tsx">
        <div className="flex justify-center py-4">
          <Countdown targetDate="2027-12-31T23:59:59" variant="card" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={COUNTDOWN_SOURCE}
        filename="components/ui/Countdown.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic" description="Default countdown with labels and separators." code={BASIC_CODE} filename="basic.tsx">
          <div className="flex justify-center py-4">
            <Countdown targetDate="2027-12-31T23:59:59" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Card Variant" description="Each digit displayed in a bordered card with shadow." code={CARD_CODE} filename="card.tsx">
          <div className="flex justify-center py-4">
            <Countdown targetDate="2027-12-31T23:59:59" variant="card" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Pill Variant" description="Each digit in a rounded-full pill with primary tint." code={PILL_CODE} filename="pill.tsx">
          <div className="flex justify-center py-4">
            <Countdown targetDate="2027-12-31T23:59:59" variant="pill" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Variants Comparison" description="All three variants side by side." code={VARIANTS_CODE} filename="variants.tsx">
          <div className="flex flex-col items-center gap-8 py-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Default</span>
              <Countdown targetDate="2027-12-31T23:59:59" variant="default" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Card</span>
              <Countdown targetDate="2027-12-31T23:59:59" variant="card" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pill</span>
              <Countdown targetDate="2027-12-31T23:59:59" variant="pill" />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Three size options: sm, md, and lg." code={SIZES_CODE} filename="sizes.tsx">
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Small</span>
              <Countdown targetDate="2027-12-31T23:59:59" size="sm" variant="card" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Medium</span>
              <Countdown targetDate="2027-12-31T23:59:59" size="md" variant="card" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Large</span>
              <Countdown targetDate="2027-12-31T23:59:59" size="lg" variant="card" />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Without Labels" description="Display only the numeric values without labels." code={NO_LABELS_CODE} filename="no-labels.tsx">
          <div className="flex justify-center py-4">
            <Countdown targetDate="2027-12-31T23:59:59" showLabels={false} variant="card" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Without Separators" description="Display digits without colon separators." code={NO_SEPARATORS_CODE} filename="no-separators.tsx">
          <div className="flex justify-center py-4">
            <Countdown targetDate="2027-12-31T23:59:59" showSeparators={false} variant="card" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="On Complete" description="Callback fires when the countdown reaches zero." code={ON_COMPLETE_CODE} filename="on-complete.tsx">
          <div className="flex flex-col items-center gap-4 py-4">
            <Countdown targetDate="2027-12-31T23:59:59" onComplete={handleComplete} variant="card" />
            {done && (
              <p className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                Time is up!
              </p>
            )}
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
