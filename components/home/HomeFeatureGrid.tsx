import { MoonIcon } from "@/components/layout/icons";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/design-system/Card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import {
  CodeIcon,
  CopyIcon,
  LayersIcon,
  PackageIcon,
  ShieldCheckIcon,
} from "./icons";

const features = [
  {
    icon: CopyIcon,
    title: "Copy-paste ready",
    description:
      "Every component is a self-contained file. Copy, paste into your project, and ship in seconds.",
  },
  {
    icon: LayersIcon,
    title: "Single design token",
    description:
      "One CSS variable system drives spacing, color, and radius across every component and page.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Accessible by default",
    description:
      "Keyboard navigation, focus rings, ARIA attributes, and semantic markup baked into each piece.",
  },
  {
    icon: CodeIcon,
    title: "Fully typed",
    description:
      "Written in TypeScript with first-class props, so autocomplete and refactors stay predictable.",
  },
  {
    icon: MoonIcon,
    title: "Dark mode first",
    description:
      "Every example ships with a considered light and dark palette. No half-baked dark themes.",
  },
  {
    icon: PackageIcon,
    title: "Zero dependencies",
    description:
      "Built on Next.js, React, and Tailwind CSS v4 only. No prop-drilling libraries or lock-in.",
  },
];

/** Feature grid highlighting what makes the library different. */
export function HomeFeatureGrid() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Features">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Why it's different"
            title="Everything you need, nothing you don't"
            description="A curated set of primitives and patterns that work together, built to be owned entirely by you."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 60}>
              <Card className="group h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-card">
                <CardHeader>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/40 text-foreground transition-colors group-hover:border-accent/30 group-hover:bg-accent-soft group-hover:text-accent">
                    <feature.icon className="h-4.5 w-4.5" />
                  </span>
                  <CardTitle className="mt-3">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
