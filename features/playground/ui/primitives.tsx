import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./icons";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  active?: boolean;
}

export function IconButton({ icon, label, active, className = "", ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40 ${
        active ? "bg-accent text-foreground" : ""
      } ${className}`}
      {...props}
    >
      <Icon name={icon} width={15} height={15} />
    </button>
  );
}

export function VDivider({ className = "" }: { className?: string }) {
  return <div className={`mx-1 h-4 w-px shrink-0 bg-border ${className}`} aria-hidden="true" />;
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

export function Spinner({ className = "", width, height }: { className?: string; width?: number; height?: number }) {
  return <Icon name="loader" width={width} height={height} className={`animate-spin ${className}`} />;
}
