import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  { num: 1, label: "Discover", icon: "⊕" },
  { num: 2, label: "Customize", icon: "⚙" },
  { num: 3, label: "Preview", icon: "▶" },
  { num: 4, label: "Generate Code", icon: "</>" },
  { num: 5, label: "Validate", icon: "✓" },
  { num: 6, label: "Publish", icon: "↑" },
  { num: 7, label: "Reuse", icon: "↻" },
];

export function WorkflowSection() {
  return (
    <section className="border-b border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Workflow"
            title="Developer Workflow"
            description="From discovery to production in a few steps."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {steps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/60 bg-background text-lg">
                    {step.icon}
                  </span>
                  <span className="text-xs font-medium text-foreground">{step.label}</span>
                  {i < steps.length - 1 && (
                    <svg className="hidden lg:block h-3 w-3 text-muted-foreground/30 -mt-6 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
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
