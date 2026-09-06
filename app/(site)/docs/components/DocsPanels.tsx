import { DocsCodeBlock, DocsCopyButton } from "./DocsCodeBlock";
import { FOCUS } from "@/constants/tokens";
import { cn } from "@/lib/cn";
import {
  CUSTOMIZATION_TIPS,
  FAQ_ITEMS,
  INSTALL_STEPS,
  PROJECT_STRUCTURE,
  STRUCTURE_CARDS,
  USAGE_EXAMPLES,
} from "../docs-data";

function PanelHeading({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

export function InstallationPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeading
        title="Quick Start"
        body="Get up and running in under 2 minutes. Follow these steps to set up your project."
      />
      <ol className="flex list-none flex-col gap-4">
        {INSTALL_STEPS.map((s) => (
          <li
            key={s.step}
            className="overflow-hidden rounded-lg border border-border/60 bg-background shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3 border-b border-border/60 bg-muted/30 px-4 py-3">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
              >
                {s.step}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                <span className="mr-2 font-mono text-[11px] text-muted-foreground">
                  Step {s.step}
                </span>
                {s.title}
              </span>
              <DocsCopyButton value={s.code} label={s.filename} />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
              <code className="text-foreground/80">{s.code}</code>
            </pre>
          </li>
        ))}
      </ol>
      <div className="flex items-start gap-3 rounded-lg bg-success-soft px-4 py-3">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">You&apos;re all set!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm run dev</code> to start your development server.
          </p>
        </div>
      </div>
    </div>
  );
}

export function StructurePanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeading
        title="Project Structure"
        body="The library follows a clean, modular structure. Here's how files are organized."
      />
      <DocsCodeBlock code={PROJECT_STRUCTURE} filename="Project Structure" />
      <div className="grid gap-4 sm:grid-cols-2">
        {STRUCTURE_CARDS.map((card) => (
          <div key={card.title} className="rounded-lg border border-border/60 bg-muted/20 p-4">
            <h3 className="font-mono text-[13px] font-semibold text-foreground">{card.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UsagePanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeading
        title="How to Use"
        body="Learn the basic patterns for using components in your project."
      />
      <div className="flex flex-col gap-8">
        {USAGE_EXAMPLES.map((example, i) => (
          <section key={example.title} aria-labelledby={`usage-${i}`}>
            <h3 id={`usage-${i}`} className="text-base font-semibold text-foreground">
              {example.title}
            </h3>
            <p className="mb-3 mt-1 text-sm text-muted-foreground">{example.description}</p>
            <DocsCodeBlock code={example.code} filename={example.filename} />
          </section>
        ))}
      </div>
    </div>
  );
}

export function CustomizationPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeading
        title="Customization"
        body="Make the components your own. Customize colors, spacing, and more."
      />
      <div className="flex flex-col gap-8">
        {CUSTOMIZATION_TIPS.map((tip, i) => (
          <section key={tip.title} aria-labelledby={`custom-${i}`}>
            <h3 id={`custom-${i}`} className="text-base font-semibold text-foreground">
              {tip.title}
            </h3>
            <p className="mb-3 mt-1 text-sm text-muted-foreground">{tip.description}</p>
            <DocsCodeBlock code={tip.code} filename={tip.filename} />
          </section>
        ))}
      </div>
    </div>
  );
}

export function FaqPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeading
        title="Frequently Asked Questions"
        body="Common questions about using the component library."
      />
      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-border/60 bg-muted/20"
          >
            <summary
              className={cn(
                "flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 [&::-webkit-details-marker]:hidden",
                FOCUS.ring,
                "rounded-lg",
              )}
            >
              {item.question}
              <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="border-t border-border/60 px-4 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
