import Link from "next/link";
import { getLatestComponents } from "@/features/registry/server";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "./icons";

const RECENT_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

/** Recently added components pulled live from the database. */
export async function HomeLatestComponents() {
  const latest = await getLatestComponents(6);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Latest components">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Fresh out"
            title="Latest components"
            description="New additions land every week. Here's what shipped recently."
          />
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <ul className="divide-y divide-border">
              {latest.map((item) => {
                const created = new Date(item.createdAt).getTime();
                const isNew = Date.now() - created < RECENT_WINDOW_MS;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/components/${item.slug}`}
                      className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/40 sm:gap-5 sm:px-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-sm text-muted-foreground transition-colors group-hover:border-accent/30 group-hover:bg-accent-soft group-hover:text-accent">
                        <span aria-hidden="true">▣</span>
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-foreground">
                            {item.name}
                          </span>
                          {isNew && (
                            <span className="inline-flex h-4.5 items-center rounded-full bg-accent-soft px-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                              New
                            </span>
                          )}
                        </div>
                        <span className="truncate text-[13px] text-muted-foreground">
                          {item.description}
                        </span>
                      </div>
                      <span className="hidden shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground md:inline-flex">
                        {item.category}
                      </span>
                      <span className="hidden shrink-0 text-[11px] text-muted-foreground/70 sm:block">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
