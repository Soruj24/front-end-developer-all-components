import Link from "next/link";
import { Search, Sliders, Copy } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Find a component",
    description: "Browse 1000+ reusable components by category, search, or tags.",
    href: "/components",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Sliders,
    title: "Customize it",
    description: "View live preview and change props, Tailwind classes, and content.",
    href: "/components",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Copy,
    title: "Copy and use",
    description: "Copy the complete source and use it in your own project.",
    href: "/components",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export function QuickStart() {
  return (
    <section className="border-b border-border/40 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Getting Started"
          title="New here? Start in 3 steps."
          description="Go from discovery to production in minutes."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Link
              key={step.title}
              href={step.href}
              className="group relative flex flex-col gap-5 rounded-2xl border border-border/60 bg-background p-6 transition-all duration-200 hover:border-border hover:shadow-card"
            >
              <span className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground">
                {i + 1}
              </span>

              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.bg}`}>
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              <span className="mt-auto text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                Get started →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
