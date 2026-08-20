import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  { label: "Component Library", desc: "Choose from 1000+ components" },
  { label: "Visual Canvas", desc: "Drag, drop, and arrange" },
  { label: "Props & Style Controls", desc: "Adjust visually in real-time" },
  { label: "Generated Code", desc: "Clean Tailwind CSS output" },
];

const features = [
  { icon: "⊕", label: "Drag & Drop" },
  { icon: "⊞", label: "Visual Props" },
  { icon: "↻", label: "Responsive Design" },
  { icon: "≡", label: "Tailwind Classes" },
  { icon: "▶", label: "Live Preview" },
  { icon: "</>", label: "Code Generation" },
];

export function VisualBuilderSection() {
  return (
    <section className="border-b border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Visual Builder"
            title="Design First. Generate Code Automatically."
            description="Build components visually and get clean, production-ready code."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 mx-auto max-w-4xl">
            <div className="rounded-lg border border-border/60 bg-background p-6 sm:p-8">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 rounded-md border border-border/40 bg-muted/30 px-3 py-2">
                      <span className="text-sm text-muted-foreground">{f.icon}</span>
                      <span className="text-xs font-medium text-foreground">{f.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {steps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-foreground">{step.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{step.desc}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <svg className="h-4 w-4 shrink-0 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/visual-builder"
                    className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  >
                    Open Visual Builder
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
