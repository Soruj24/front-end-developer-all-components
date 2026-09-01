import Link from "next/link";
import type { RegistryComponent } from "@/features/registry";
import { SectionHeading } from "./SectionHeading";
import { ComponentCard } from "./ComponentCard";
import { Reveal } from "./Reveal";

interface FeaturedComponentsProps {
  components: RegistryComponent[];
}

export function FeaturedComponents({ components }: FeaturedComponentsProps) {
  if (components.length === 0) return null;

  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Featured"
            title="Popular components."
            description="Hand-picked components loved by the community."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <ComponentCard key={component.slug} component={component} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <Link
              href="/components"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              View All Components
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
