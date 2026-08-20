import Link from "next/link";
import { cn } from "@/lib/cn";
import type { RegistryCategory } from "@/features/registry";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

interface CategoriesSectionProps {
  categories: (RegistryCategory & { count: number })[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  if (categories.length === 0) return null;

  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Categories"
            title="Explore by Category"
            description="Find the right components for your project."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className={cn(
                  "group flex items-start gap-4 rounded-lg border border-border/60 bg-background p-4",
                  "transition-all duration-200 hover:border-ring/40 hover:shadow-sm",
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-lg">
                  {cat.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{cat.label}</h3>
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {cat.count}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{cat.description}</p>
                </div>
                <svg className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
