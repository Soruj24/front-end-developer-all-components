import Link from "next/link";
import { getCategories } from "@/features/registry/server";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "./icons";

/** Grid of registry categories with live component counts from the database. */
export async function HomeCategories() {
  const categories = await getCategories();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Categories">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Explore"
            title="Browse by category"
            description="From primitives to full application templates, everything is organized and searchable."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={(index % 3) * 60}>
              <Link
                href={`/categories/${category.id}`}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/40 text-sm text-foreground transition-colors group-hover:border-accent/30 group-hover:bg-accent-soft group-hover:text-accent">
                      <span aria-hidden="true">{category.icon}</span>
                    </span>
                    <div>
                      <h3 className="font-medium text-foreground">{category.label}</h3>
                      <p className="text-[11px] text-muted-foreground">
                        {category.count} {category.count === 1 ? "component" : "components"}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>

                {category.description && (
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border border-border bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground",
                      "transition-colors group-hover:border-muted group-hover:text-foreground/80"
                    )}
                  >
                    View all {category.count}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
