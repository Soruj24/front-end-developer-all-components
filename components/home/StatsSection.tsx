import { formatNumber } from "@/features/registry";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

interface StatsSectionProps {
  componentCount: number;
  categoryCount: number;
  totalDownloads: number;
}

export function StatsSection({ componentCount, categoryCount, totalDownloads }: StatsSectionProps) {
  const stats = [
    { value: componentCount, label: "Components" },
    { value: categoryCount, label: "Categories" },
    { value: totalDownloads, label: "Downloads" },
    { value: 500, label: "Stars" },
  ];

  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Stats"
            title="Built for Scale"
            description="A growing registry trusted by developers worldwide."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {formatNumber(s.value)}+
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
