import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared centered column wrapper used by every 404 style. */
export function NotFoundLayout({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center text-center", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/** Default zinc "Go Home" CTA; pass className to fully restyle it. */
export function GoHomeButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={
        className ||
        "rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-muted dark:text-zinc-900"
      }
    >
      Go Home
    </Link>
  );
}
