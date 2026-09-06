import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";

interface SettingsRowProps {
  href: string;
  icon: string;
  label: string;
  description: string;
  badge?: string;
}

export function SettingsRow({ href, icon, label, description, badge }: SettingsRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex min-h-[44px] items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted",
        FOCUS.ring,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-background"
      >
        <svg
          className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">{label}</span>
          {badge && (
            <span className="shrink-0 rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary">
              {badge}
            </span>
          )}
        </span>
        <span className="block truncate text-xs text-muted-foreground">{description}</span>
      </span>
      <svg
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  );
}
