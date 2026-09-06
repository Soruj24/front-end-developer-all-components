import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: boolean;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs = false,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {breadcrumbs ? (
        <Breadcrumbs className="mb-3" />
      ) : eyebrow ? (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
