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
    digit: "h-12 w-12 text-xl",
    label: "text-[10px]",
    separator: "text-xl",
    gap: "gap-2",
    card: "px-1 py-1",
  },
  md: {
    digit: "h-16 w-16 text-3xl",
    label: "text-[11px]",
    separator: "text-3xl",
    gap: "gap-3",
    card: "px-2 py-2",
  },
  lg: {
    digit: "h-20 w-20 sm:h-24 sm:w-24 text-4xl sm:text-5xl",
    label: "text-xs",
    separator: "text-4xl sm:text-5xl",
    gap: "gap-3 sm:gap-4",
    card: "px-3 py-3 sm:px-4 sm:py-4",
  },
} as const;

const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      targetDate,
      onComplete,
      showLabels = true,
      showSeparators = true,
      variant = "default",
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
    }, [targetDate, handleComplete]);

    const config = sizeConfig[size];

    const items: { label: string; value: number }[] = [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Min", value: timeLeft.minutes },
      { label: "Sec", value: timeLeft.seconds },
    ];

    const renderDigit = (value: number, label: string) => {
      const digitText = String(value).padStart(2, "0");

      if (variant === "card") {
        return (
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "flex items-center justify-center rounded-xl border border-border bg-card font-mono font-bold tabular-nums tracking-tight shadow-sm",
                config.digit,
                config.card,
                isComplete && "border-emerald-500/30 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
              )}
            >
              {digitText}
            </div>
            {showLabels && (
              <span
                className={cn(
                  "font-medium uppercase tracking-wider text-muted-foreground",
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
                "flex items-center justify-center rounded-full bg-primary/10 font-mono font-bold tabular-nums tracking-tight text-primary",
                config.digit,
                config.card,
                isComplete && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
              )}
            >
              {digitText}
            </div>
            {showLabels && (
              <span
                className={cn(
                  "font-medium uppercase tracking-wider text-muted-foreground",
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
              config.digit,
              isComplete && "text-emerald-600 dark:text-emerald-400",
            )}
          >
            {digitText}
          </span>
          {showLabels && (
            <span
              className={cn(
                "font-medium uppercase tracking-wider text-muted-foreground",
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
        className={cn("inline-flex items-center", config.gap, className)}
        {...props}
      >
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {renderDigit(item.value, item.label)}
            {showSeparators && i < items.length - 1 && (
              <span
                className={cn(
                  "mx-1 font-bold text-muted-foreground/40 sm:mx-1.5",
                  config.separator,
                  variant !== "default" && "mb-5",
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
