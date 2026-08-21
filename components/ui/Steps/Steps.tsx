import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import { cn } from "@/lib/cn";
import type {
  StepsProps,
  StepProps,
  StepIndicatorProps,
  StepStatus,
} from "./Steps.types";

const STATUS_INDICATOR: Record<StepStatus, string> = {
  completed: "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
  current:
    "bg-background text-primary ring-2 ring-primary shadow-sm shadow-primary/10",
  upcoming: "bg-muted text-muted-foreground",
};

export function Steps({ children, className, orientation = "horizontal" }: StepsProps) {
  const isHorizontal = orientation === "horizontal";
  const childArray = Children.toArray(children);
  const validSteps = childArray.filter(
    (child): child is ReactElement<StepProps> =>
      isValidElement(child) &&
      typeof child.type !== "string" &&
      "displayName" in child.type &&
      (child.type as { displayName?: string }).displayName === "Step",
  );

  return (
    <div
      role="list"
      aria-label="Progress steps"
      className={cn(
        isHorizontal ? "flex items-start" : "flex flex-col",
        className,
      )}
    >
      {validSteps.map((child, i) => {
        const isLast = i === validSteps.length - 1;
        return cloneElement(child, {
          key: i,
          status: child.props.status ?? "upcoming",
          className: cn(child.props.className, !isLast && (isHorizontal ? "" : "pb-0")),
          _isLast: isLast,
          _isHorizontal: isHorizontal,
        } as StepProps & { _isLast: boolean; _isHorizontal: boolean });
      })}
    </div>
  );
}

export function Step({
  title,
  description,
  status = "upcoming",
  icon,
  className,
  _isLast = true,
  _isHorizontal = true,
}: StepProps & { _isLast?: boolean; _isHorizontal?: boolean }) {
  return (
    <div
      role="listitem"
      className={cn(
        "flex",
        _isHorizontal
          ? "flex-1 flex-col items-center"
          : "flex-row items-start",
        !_isHorizontal && !_isLast && "pb-0",
        className,
      )}
    >
      <div
        className={cn(
          "flex",
          _isHorizontal
            ? "flex-col items-center"
            : "flex-row items-start",
        )}
      >
        <StepIndicator status={status} icon={icon} />

        <div
          className={cn(
            _isHorizontal ? "mt-3 text-center" : "ml-4 pt-1",
          )}
        >
          <p
            className={cn(
              "text-sm font-medium transition-colors",
              status === "current"
                ? "text-foreground"
                : status === "completed"
                  ? "text-foreground"
                  : "text-muted-foreground",
            )}
          >
            {title}
          </p>
          {description && (
            <p
              className={cn(
                "mt-0.5 text-xs",
                status === "current"
                  ? "text-muted-foreground"
                  : "text-muted-foreground/70",
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Connector */}
      {!_isLast && (
        <div
          className={cn(
            _isHorizontal
              ? "mx-3 mt-0 h-0.5 flex-1 self-center"
              : "ml-[19px] h-8 w-0.5",
            "rounded-full transition-colors",
            status === "completed" ? "bg-primary" : "bg-border",
          )}
        />
      )}
    </div>
  );
}
Step.displayName = "Step";

export function StepIndicator({ status, icon, className }: StepIndicatorProps) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
        STATUS_INDICATOR[status],
        status === "current" && "animate-pulse-slow",
        className,
      )}
    >
      {icon ??
        (status === "completed" ? (
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
        ) : status === "current" ? (
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        ) : (
          <span className="text-xs font-bold opacity-60" />
        ))}
    </div>
  );
}
