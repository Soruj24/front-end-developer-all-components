import Link from "next/link";
import { cn } from "@/lib/cn";
import { RADIUS, BG, TEXT, BORDER, TRANSITION } from "@/constants/tokens";

interface HeaderLogoProps {
  className?: string;
  version?: string;
}

export function HeaderLogo({ className, version }: HeaderLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 shrink-0",
        `${TRANSITION.opacity} hover:opacity-80`,
        className,
      )}
      aria-label="Component Registry - Home"
    >
      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center",
          RADIUS.lg,
          BG.primary,
          "text-background",
          `${TRANSITION.transform} hover:scale-105`,
        )}
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>

      <span
        className={cn(
          "hidden font-semibold tracking-tight text-foreground sm:block",
          TEXT.brand,
        )}
      >
        Sun UI
      </span>

      {version && (
        <span
          className={cn(
            "hidden border px-1.5 py-0.5 font-medium text-muted-foreground sm:block",
            RADIUS.sm,
            BORDER.default,
            TEXT.tiny,
          )}
        >
          {version}
        </span>
      )}
    </Link>
  );
}
