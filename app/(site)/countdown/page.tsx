"use client";

import { useState, useEffect } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Countdown } from "@/components/ui";

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

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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
  sm: {
    digit: "h-11 w-11 text-lg",
    label: "text-[10px]",
    separator: "text-lg",
    gap: "gap-1.5",
    padding: "p-1",
  },
  md: {
    digit: "h-14 w-14 text-2xl",
    label: "text-[11px]",
    separator: "text-2xl",
    gap: "gap-2",
    padding: "p-1.5",
  },
  lg: {
    digit: "h-18 w-18 text-4xl sm:h-20 sm:w-20 sm:text-5xl",
    label: "text-xs",
    separator: "text-3xl sm:text-4xl",
    gap: "gap-2.5 sm:gap-3",
    padding: "p-2 sm:p-2.5",
  },
} as const;

const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  ({ targetDate, onComplete, showLabels = true, showSeparators = true, variant = "card", size = "md", className, ...props }, ref) => {
    const target = useRef(new Date(targetDate));
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(target.current));
    const [isComplete, setIsComplete] = useState(false);

    const handleComplete = useCallback(() => {
      setIsComplete(true);
      onComplete?.();
    }, [onComplete]);

    useEffect(() => {
      target.current = new Date(targetDate);
      setIsComplete(false);
      setTimeLeft(calculateTimeLeft(target.current));
    }, [targetDate]);

    useEffect(() => {
      const timer = setInterval(() => {
        const tl = calculateTimeLeft(target.current);
        setTimeLeft(tl);
        if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
          clearInterval(timer);
          handleComplete();
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate, handleComplete]);

    const config = sizeConfig[size];
    const items = [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Min", value: timeLeft.minutes },
      { label: "Sec", value: timeLeft.seconds },
    ];

    return (
      <div ref={ref} role="timer" aria-label="Countdown timer" className={cn("inline-flex items-center", config.gap, className)} {...props}>
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn("flex items-center justify-center rounded-xl border border-border/60 bg-card font-mono font-bold tabular-nums tracking-tight shadow-sm ring-1 ring-black/[0.04]", config.digit, config.padding)}>
                {String(item.value).padStart(2, "0")}
              </div>
              {showLabels && <span className={cn("font-medium uppercase tracking-wider text-muted-foreground/70", config.label)}>{item.label}</span>}
            </div>
            {showSeparators && i < items.length - 1 && <span className={cn("mx-0.5 font-bold text-muted-foreground/30", config.separator)} aria-hidden="true">:</span>}
          </div>
        ))}
      </div>
    );
  },
);`;

function DynamicCountdown() {
  const [target] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    d.setHours(d.getHours() + 5);
    return d;
  });
  return <Countdown targetDate={target} variant="card" size="lg" />;
}

export default function CountdownPage() {
  const [target] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d;
  });

  const [target10s] = useState(() => new Date(Date.now() + 10 * 1000));

  return (
    <ComponentDocPage
      name="Countdown"
      category="Feedback"
      description="A countdown timer that displays days, hours, minutes, and seconds remaining until a target date. Supports card, pill, and default variants with three sizes and smooth digit transitions."
    >
      <PreviewPanel filename="countdown-preview.tsx">
        <DynamicCountdown />
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

        <ExampleBlock
          title="Card Variant"
          description="The default card style with border, shadow, and subtle ring."
          code={`import { Countdown } from "@/components/ui";\n\nconst target = new Date();\ntarget.setDate(target.getDate() + 30);\n\n<Countdown targetDate={target} variant="card" />`}
          filename="card.tsx"
        >
          <Countdown targetDate={target} variant="card" />
        </ExampleBlock>

        <ExampleBlock
          title="Pill Variant"
          description="Rounded pill style with primary-tinted background."
          code={`<Countdown targetDate={target} variant="pill" />`}
          filename="pill.tsx"
        >
          <Countdown targetDate={target} variant="pill" />
        </ExampleBlock>

        <ExampleBlock
          title="Default Variant"
          description="Minimal text-only style without containers."
          code={`<Countdown targetDate={target} variant="default" />`}
          filename="default.tsx"
        >
          <Countdown targetDate={target} variant="default" />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three sizes: sm, md (default), lg."
          code={`<Countdown targetDate={target} size="sm" />\n<Countdown targetDate={target} size="md" />\n<Countdown targetDate={target} size="lg" />`}
          filename="sizes.tsx"
        >
          <div className="flex flex-col items-start gap-6">
            <Countdown targetDate={target} size="sm" variant="card" />
            <Countdown targetDate={target} size="md" variant="card" />
            <Countdown targetDate={target} size="lg" variant="card" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Without Labels"
          description="Hide the day/hour/min/sec labels for a compact look."
          code={`<Countdown targetDate={target} showLabels={false} />`}
          filename="no-labels.tsx"
        >
          <Countdown targetDate={target} showLabels={false} variant="card" />
        </ExampleBlock>

        <ExampleBlock
          title="Without Separators"
          description="Hide the colon separators between digits."
          code={`<Countdown targetDate={target} showSeparators={false} />`}
          filename="no-separators.tsx"
        >
          <Countdown targetDate={target} showSeparators={false} variant="card" />
        </ExampleBlock>

        <ExampleBlock
          title="Completed State"
          description="Shows a green success state when the countdown reaches zero."
          code={`<Countdown targetDate={new Date()} variant="card" />`}
          filename="completed.tsx"
        >
          <Countdown targetDate={new Date()} variant="card" />
        </ExampleBlock>

        <ExampleBlock
          title="All Variants Comparison"
          description="Side-by-side comparison of all three variants."
          code={`<Countdown targetDate={target} variant="default" />\n<Countdown targetDate={target} variant="card" />\n<Countdown targetDate={target} variant="pill" />`}
          filename="all-variants.tsx"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2">
              <span className="text-xs font-medium text-muted-foreground">Default</span>
              <Countdown targetDate={target} variant="default" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-xs font-medium text-muted-foreground">Card</span>
              <Countdown targetDate={target} variant="card" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-xs font-medium text-muted-foreground">Pill</span>
              <Countdown targetDate={target} variant="pill" />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="10 Second Demo"
          description="A short countdown that triggers onComplete after 10 seconds."
          code={`const [target] = useState(() => new Date(Date.now() + 10 * 1000));\n\n<Countdown\n  targetDate={target}\n  variant="card"\n  size="lg"\n  onComplete={() => alert("Time's up!")}\n/>`}
          filename="ten-second.tsx"
        >
          <CountdownDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Large Event Countdown"
          description="Large countdown for event landing pages."
          code={`<Countdown targetDate={target} variant="card" size="lg" />`}
          filename="large-event.tsx"
        >
          <div className="flex items-center justify-center rounded-xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/20 p-6 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Launching in</span>
              <Countdown targetDate={target} variant="card" size="lg" />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Compact Inline"
          description="Small countdown for inline use within text or badges."
          code={`<span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/[0.04]">\n  <Countdown targetDate={target} size="sm" showLabels={false} variant="default" />\n</span>`}
          filename="compact-inline.tsx"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
            <span className="text-xs text-muted-foreground">Ends in</span>
            <Countdown targetDate={target} size="sm" showLabels={false} variant="default" />
          </span>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}

function CountdownDemo() {
  const [target] = useState(() => new Date(Date.now() + 10 * 1000));
  const [complete, setComplete] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Countdown
        targetDate={target}
        variant="card"
        size="lg"
        onComplete={() => setComplete(true)}
        key={complete ? "done" : "running"}
      />
      {complete && (
        <span className="text-sm font-medium text-success">Time's up!</span>
      )}
    </div>
  );
}
