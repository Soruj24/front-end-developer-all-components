import { cn } from "@/lib/cn";
import type { StepsProps, StepProps, StepIndicatorProps, StepStatus } from "./Steps.types";

const statusClasses: Record<StepStatus, string> = {
  completed: "bg-green-500 text-white",
  current: "bg-blue-500 text-white",
  upcoming: "bg-zinc-200 text-zinc-500 dark:bg-zinc-700",
};

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {children}
    </div>
  );
}

export function Step({ title, description, status = "upcoming", icon, className }: StepProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <StepIndicator status={status} icon={icon} />
      <div className="ml-3">
        <p className={cn("text-sm font-medium", status === "upcoming" && "text-zinc-400")}>{title}</p>
        {description && <p className="text-xs text-zinc-500">{description}</p>}
      </div>
    </div>
  );
}

export function StepIndicator({ status, icon, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium", statusClasses[status], className)}>
      {icon ?? (status === "completed" ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      ) : null)}
    </div>
  );
}
