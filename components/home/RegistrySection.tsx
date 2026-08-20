import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  { label: "Discover", description: "Browse the registry" },
  { label: "Customize", description: "Edit props and styles" },
  { label: "Preview", description: "See live results" },
  { label: "Validate", description: "Test accessibility & perf" },
  { label: "Publish", description: "One-click to registry" },
  { label: "Share", description: "Share via URL or CLI" },
];

export function RegistrySection() {
  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Registry"
            title="One Registry. Every Component."
            description="Discover, customize, fork, publish, version, share, and reuse components."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1 rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{step.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{step.description}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <svg className="h-4 w-4 shrink-0 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
