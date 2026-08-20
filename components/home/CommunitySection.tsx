import { siteConfig } from "@/config/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const items = [
  { label: "GitHub", href: siteConfig.github, icon: "⬡" },
  { label: "Community", href: "/community", icon: "◎" },
  { label: "Open Source", href: siteConfig.github, icon: "⊕" },
  { label: "Submit Component", href: "/registry/new", icon: "↑" },
];

export function CommunitySection() {
  return (
    <section className="border-b border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Community"
            title="Built for Developers"
            description="Open source, community-driven, and built to be extended."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-background p-4 text-center transition-all duration-200 hover:border-ring/40 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg text-muted-foreground">
                  {item.icon}
                </span>
                <span className="text-xs font-medium text-foreground">{item.label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
