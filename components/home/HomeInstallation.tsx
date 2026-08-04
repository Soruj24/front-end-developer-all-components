import { Card } from "@/components/design-system/Card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CodeBlock } from "./CodeBlock";
import { PackageIcon, RocketIcon, TerminalIcon } from "./icons";

const terminalCode = `$ npx component-library@latest init

✔ Installed @component-library/tokens
✔ Configured globals.css
✔ Added font stack

  Done in 2.4s

$ npx component-library@latest add button

✔ components/ui/button.tsx created
✔ components/ui/icons.tsx created

  Next → npm run dev`;

const steps = [
  {
    icon: TerminalIcon,
    step: "01",
    title: "Install",
    description:
      "Run a single command to wire design tokens, fonts, and Tailwind utilities into your project.",
  },
  {
    icon: PackageIcon,
    step: "02",
    title: "Copy a component",
    description:
      "Browse the library, open any component, and copy the self-contained file straight into your app.",
  },
  {
    icon: RocketIcon,
    step: "03",
    title: "Customize and ship",
    description:
      "Own every line. Change variants, extend tokens, and ship to production without any lock-in.",
  },
];

/** Installation guide: terminal window plus a numbered how-it-works. */
export function HomeInstallation() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Installation">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Installation"
            title="From zero to shipped in 30 seconds"
            description="No complicated setup, no dependency wrangling. Just copy, paste, and own."
          />
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Reveal>
            <Card className="overflow-hidden">
              <CodeBlock
                code={terminalCode}
                filename="terminal"
                label="bash"
                variant="terminal"
                className="[&_pre]:text-[13px]"
              />
            </Card>
          </Reveal>

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <Reveal key={step.step} delay={index * 90}>
                <div className="relative flex gap-4 pb-8 last:pb-0">
                  {index < steps.length - 1 && (
                    <span
                      className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 text-foreground">
                    <step.icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-medium text-accent">
                        {step.step}
                      </span>
                      <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
