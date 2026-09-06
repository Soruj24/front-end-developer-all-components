import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-14rem] h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary-soft blur-3xl dark:bg-primary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_60%_45%_at_50%_0%,black,transparent)] dark:opacity-20" />
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
            CL
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Component Library
          </span>
        </Link>

        <div className="w-full max-w-[400px]">
          <div className="rounded-lg border border-border/60 bg-surface p-6 shadow-card sm:p-8">
            <header className="mb-8 text-center">
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
