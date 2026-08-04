import Link from "next/link";
import { Badge } from "@/components/design-system/Badge";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "./icons";

const reasons = [
  {
    number: "01",
    title: "Design consistency",
    description:
      "One token system drives spacing, radius, color, and typography across every component, page, and template. Nothing drifts.",
  },
  {
    number: "02",
    title: "Production quality",
    description:
      "Each pattern is exercised against real-world edge cases: long text, empty states, loading, keyboard users, and mobile viewports.",
  },
  {
    number: "03",
    title: "No lock-in",
    description:
      "The code is yours. No proprietary runtime, no black-box registry, no license traps. Fork it, change it, ship it anywhere.",
  },
  {
    number: "04",
    title: "Constant growth",
    description:
      "New components, templates, and refinements land every single week. The library gets better without you doing a thing.",
  },
];

/** Editorial "why us" list with oversized numerals. */
export function HomeWhyUs() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Why choose us">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal>
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Why choose us"
              title="Built to be owned, not rented"
              description="A component library should disappear into your workflow. Here's how we make that happen."
            />
            <Link
              href="/routing"
              className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Read the docs
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {reasons.map((reason, index) => (
            <Reveal key={reason.number} delay={index * 80}>
              <div className="group flex gap-5 border-b border-border py-6 transition-colors first:border-t first:pt-0 hover:bg-muted/30 sm:gap-8 sm:px-3">
                <Badge variant="primary" className="w-10 shrink-0 justify-center pt-0.5 font-mono">
                  {reason.number}
                </Badge>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                    {reason.title}
                  </h3>
                  <p className="max-w-lg text-[13px] leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
