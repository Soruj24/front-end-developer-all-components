import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_45%_at_50%_0%,black,transparent)] dark:opacity-15"
      />

      <div className="relative z-10 mx-auto flex h-14 w-full max-w-[1200px] items-center px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to site
        </Link>
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-4 sm:px-6">
        <div className="mb-8 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
            {siteConfig.shortName}
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </div>

        <div className="w-full max-w-[400px]">
          <div className="rounded-lg border border-border/60 bg-surface p-6 shadow-card sm:p-8">
            <header className="mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            </header>
            {children}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </main>
    </div>
  );
}
