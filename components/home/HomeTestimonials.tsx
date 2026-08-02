import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { StarIcon } from "./icons";

const testimonials = [
  {
    quote:
      "The first component library that feels designed for how I actually build. I copied a card pattern and shipped it in under a minute.",
    name: "Alex Rivera",
    role: "Staff Engineer",
    company: "Nimbus",
    initials: "AR",
    gradient: "from-primary to-primary/80",
  },
  {
    quote:
      "Dark mode genuinely works out of the box. I had a themed toggle live in ten minutes, and the tokens made it effortless to keep consistent.",
    name: "Priya Patel",
    role: "Product Engineer",
    company: "Vertex",
    initials: "PP",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    quote:
      "Every component is copy-paste friendly and the source is genuinely readable. No fighting opaque abstractions to make a small tweak.",
    name: "Marcus Chen",
    role: "Founder",
    company: "Quanta",
    initials: "MC",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    quote:
      "The templates look like real products, not throwaway demos. I use them as a starting point for nearly all of my client work.",
    name: "Sofia Nguyen",
    role: "Independent Designer",
    company: "Polar",
    initials: "SN",
    gradient: "from-rose-500 to-orange-400",
  },
  {
    quote:
      "Best-in-class documentation. I rarely have to leave the page to understand a component, and the examples cover the edge cases.",
    name: "Jordan Lee",
    role: "Frontend Lead",
    company: "Fathom",
    initials: "JL",
    gradient: "from-violet-500 to-fuchsia-400",
  },
  {
    quote:
      "We replaced our entire internal design system over a weekend. Our engineers were instantly faster, and nobody misses the old one.",
    name: "Elena Rossi",
    role: "Engineering Manager",
    company: "Loop",
    initials: "ER",
    gradient: "from-amber-500 to-orange-400",
  },
];

/** Masonry-style testimonial grid. */
export function HomeTestimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Testimonials">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Loved by developers"
            title="Don't take our word for it"
            description="Thousands of developers ship faster with the library every day."
          />
        </Reveal>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={(index % 3) * 70} className="mb-4 break-inside-avoid">
              <figure className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5 transition-colors duration-200 hover:border-ring/40">
                <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5 text-accent" />
                  ))}
                </div>
                <blockquote className="text-[13px] leading-relaxed text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white",
                      testimonial.gradient
                    )}
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
