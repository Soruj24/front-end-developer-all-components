import Link from "next/link";
import { cn } from "@/lib/cn";
import type { DocNavItem } from "@/utils/docs";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

interface DocsPrevNextProps {
  prev?: DocNavItem;
  next?: DocNavItem;
}

/** Previous / next page navigation cards. */
export function DocsPrevNext({ prev, next }: DocsPrevNextProps) {
  return (
    <nav
      aria-label="Page navigation"
      className={cn("mt-12 grid gap-3 border-t border-border pt-6", prev && next ? "sm:grid-cols-2" : "grid-cols-1")}
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1.5 rounded-xl border border-border bg-background p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-card"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            {prev.label}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1.5 rounded-xl border border-border bg-background p-4 text-right transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-card"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Next
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            {next.label}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}
    </nav>
  );
}
