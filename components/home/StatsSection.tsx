import { getHomeStats } from "@/lib/stats";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { StatsGrid } from "./StatsGrid";

export async function StatsSection() {
  const stats = await getHomeStats();

  return (
    <section className="border-b border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Stats"
            title="Trusted by developers."
            description="A growing registry built for scale."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12">
            <StatsGrid
              stats={[
                { value: stats.components, label: "Components", suffix: "+" },
                { value: stats.categories, label: "Categories", suffix: "+" },
                {
                  value: stats.downloads > 0 ? stats.downloads : null,
                  label: "Downloads",
                  suffix: stats.downloads > 0 ? "+" : undefined,
                },
                { value: stats.stars, label: "Stars" },
              ]}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
