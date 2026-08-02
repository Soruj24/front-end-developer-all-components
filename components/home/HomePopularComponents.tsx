import Link from "next/link";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "./icons";
import { popular } from "./popularData";

/** Grid of popular components rendered with miniature live previews. */
export function HomePopularComponents() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Popular components">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Popular"
              title="The components you'll reach for first"
              description="Small, focused pieces that compose into any interface."
            />
            <Link
              href="/buttons"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse all
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((item, index) => (
            <Reveal key={item.name} delay={index * 50}>
              <Link
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-card"
              >
                {item.preview}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="text-xs text-muted-foreground" aria-hidden="true">
                      {item.glyph}
                    </span>
                    {item.name}
                  </span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
