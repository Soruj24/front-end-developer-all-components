import type { ReactNode } from "react";

interface DocsPageProps {
  title: string;
  description?: string;
  /** Optional breadcrumb-style eyebrow shown above the title. */
  eyebrow?: string;
  children: ReactNode;
}

/**
 * Standard shell for a documentation/demo page.
 * Provides a refined, consistent page header and reading column.
 */
export function DocsPage({ title, description, eyebrow, children }: DocsPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </header>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}
