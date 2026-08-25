import { forwardRef, HTMLAttributes, useState, useEffect, useCallback, useRef } from "react";
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
  (
    {
      targetDate,
      onComplete,
      showLabels = true,
      showSeparators = true,
      variant = "card",
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const target = useRef(new Date(targetDate));
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
      calculateTimeLeft(target.current),
    );
    const [isComplete, setIsComplete] = useState(false);
    const [prevValues, setPrevValues] = useState<TimeLeft>(timeLeft);

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
        setPrevValues(timeLeft);
        setTimeLeft(tl);
        if (
          tl.days === 0 &&
          tl.hours === 0 &&
          tl.minutes === 0 &&
          tl.seconds === 0
        ) {
          clearInterval(timer);
          handleComplete();
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate, handleComplete, timeLeft]);

    const config = sizeConfig[size];

    const items: { label: string; value: number; key: keyof TimeLeft }[] = [
      { label: "Days", value: timeLeft.days, key: "days" },
      { label: "Hours", value: timeLeft.hours, key: "hours" },
      { label: "Min", value: timeLeft.minutes, key: "minutes" },
      { label: "Sec", value: timeLeft.seconds, key: "seconds" },
    ];

    const renderDigit = (value: number, label: string, key: keyof TimeLeft) => {
      const digitText = String(value).padStart(2, "0");
      const changed = prevValues[key] !== value;

      if (variant === "card") {
        return (
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "relative flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-card font-mono font-bold tabular-nums tracking-tight",
                "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
                "transition-all duration-300 ease-out",
                "hover:border-border hover:shadow-md hover:ring-black/[0.06] dark:hover:ring-white/[0.12]",
                config.digit,
                config.padding,
                isComplete && "border-success/30 bg-success/5 text-success ring-success/10",
                changed && !isComplete && "scale-[1.02]",
              )}
            >
              {digitText}
            </div>
            {showLabels && (
              <span
                className={cn(
                  "font-medium uppercase tracking-wider text-muted-foreground/70",
                  config.label,
                )}
              >
                {label}
              </span>
            )}
          </div>
        );
      }

      if (variant === "pill") {
        return (
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "relative flex items-center justify-center overflow-hidden rounded-full",
                "bg-primary/10 font-mono font-bold tabular-nums tracking-tight text-primary",
                "ring-1 ring-primary/10",
                "transition-all duration-300 ease-out",
                "hover:bg-primary/15 hover:ring-primary/20",
                config.digit,
                config.padding,
                isComplete && "bg-success/10 text-success ring-success/20",
                changed && !isComplete && "scale-[1.02]",
              )}
            >
              {digitText}
            </div>
            {showLabels && (
              <span
                className={cn(
                  "font-medium uppercase tracking-wider text-muted-foreground/70",
                  config.label,
                )}
              >
                {label}
              </span>
            )}
          </div>
        );
      }

      // default
      return (
        <div className="flex flex-col items-center gap-1.5">
          <span
            className={cn(
              "font-mono font-bold tabular-nums tracking-tight text-foreground",
              "transition-colors duration-300",
              config.digit,
              isComplete && "text-success",
              changed && !isComplete && "text-primary",
            )}
          >
            {digitText}
          </span>
          {showLabels && (
            <span
              className={cn(
                "font-medium uppercase tracking-wider text-muted-foreground/70",
                config.label,
              )}
            >
              {label}
            </span>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        role="timer"
        aria-label="Countdown timer"
        aria-live="polite"
        className={cn("inline-flex items-center", config.gap, className)}
        {...props}
      >
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {renderDigit(item.value, item.label, item.key)}
            {showSeparators && i < items.length - 1 && (
              <span
                className={cn(
                  "mx-0.5 font-bold text-muted-foreground/30 sm:mx-1",
                  "transition-colors duration-300",
                  config.separator,
                  variant !== "default" && "mb-5",
                  isComplete && "text-success/40",
                )}
                aria-hidden="true"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    );
  },
);
Countdown.displayName = "Countdown";

export default Countdown;
export { Countdown };
