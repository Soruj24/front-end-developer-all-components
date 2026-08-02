import { forwardRef, HTMLAttributes, useState, useEffect } from "react";

export interface CountdownProps extends HTMLAttributes<HTMLDivElement> {
  targetDate: Date | string | number;
  onComplete?: () => void;
  showLabels?: boolean;
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

const unitSizeClasses = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
};

const labelSizeClasses = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};

const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  ({ targetDate, onComplete, showLabels = true, size = "md", className = "", ...props }, ref) => {
    const target = new Date(targetDate);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(target));

    useEffect(() => {
      const timer = setInterval(() => {
        const tl = calculateTimeLeft(target);
        setTimeLeft(tl);
        if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
          clearInterval(timer);
          onComplete?.();
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    const items: { label: string; value: number }[] = [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Min", value: timeLeft.minutes },
      { label: "Sec", value: timeLeft.seconds },
    ];

    return (
      <div ref={ref} className={`inline-flex items-center gap-3 ${className}`} {...props}>
        {items.map((item, i) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className={`font-bold tabular-nums tracking-tight ${unitSizeClasses[size]}`}>
              {String(item.value).padStart(2, "0")}
            </span>
            {showLabels && (
              <span className={`mt-0.5 uppercase text-muted-foreground ${labelSizeClasses[size]}`}>
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <span className={`mx-1 font-bold text-subtle ${unitSizeClasses[size]}`}>:</span>
            )}
          </div>
        ))}
      </div>
    );
  }
);
Countdown.displayName = "Countdown";

export default Countdown;
export { Countdown };
