import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<string, { icon: string; title: string; desc: string; pad: string }> = {
  sm: { icon: "h-8 w-8", title: "text-base", desc: "text-sm", pad: "py-8" },
  md: { icon: "h-12 w-12", title: "text-xl", desc: "text-sm", pad: "py-12" },
  lg: { icon: "h-16 w-16", title: "text-2xl", desc: "text-base", pad: "py-16" },
};

function EmptyState({ icon, title, description, action, size = "md" }: EmptyStateProps) {
  const s = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-center",
        s.pad,
        "px-6",
      )}
    >
      {icon && (
        <div className={cn(s.icon, "text-muted-foreground/40")}>
          {icon}
        </div>
      )}
      <h3 className={cn(s.title, "font-semibold text-foreground")}>
        {title}
      </h3>
      {description && (
        <p className={cn(s.desc, "max-w-sm text-muted-foreground")}>
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;
