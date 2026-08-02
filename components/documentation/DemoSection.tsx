import type { ReactNode } from "react";

interface DemoSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** A titled demo block used to group live examples on a documentation page. */
export function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </header>
      <div className="rounded-xl border border-border bg-background p-5 sm:p-6">{children}</div>
    </section>
  );
}
