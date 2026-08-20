import Link from "next/link";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const features = [
  { title: "AI Component Generator", description: "Describe what you need and get a complete component.", href: "/ai", icon: "✦" },
  { title: "AI Explain", description: "Understand any component's structure and logic.", href: "/ai/explain", icon: "◎" },
  { title: "AI Refactor", description: "Improve component code with AI suggestions.", href: "/ai/refactor", icon: "↻" },
  { title: "AI Accessibility", description: "Scan and fix accessibility issues automatically.", href: "/ai/accessibility", icon: "♿" },
  { title: "AI Performance", description: "Analyze and optimize component performance.", href: "/ai/performance", icon: "⚡" },
  { title: "AI Responsive", description: "Detect and fix responsive design issues.", href: "/ai/responsive", icon: "⊞" },
];

export function AIFeaturesSection() {
  return (
    <section className="border-b border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="AI Powered"
            title="Intelligent Component Tools"
            description="AI that understands your components and helps you build better."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className={cn(
                  "group flex flex-col gap-3 rounded-lg border border-border/60 bg-background p-5",
                  "transition-all duration-200 hover:border-ring/40 hover:shadow-sm",
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{f.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
