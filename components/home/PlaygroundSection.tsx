import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const tools = [
  { label: "Code Editor", icon: "⟨/⟩" },
  { label: "Live Preview", icon: "▶" },
  { label: "Device Selector", icon: "⊞" },
  { label: "Tailwind Inspector", icon: "≡" },
  { label: "Props Editor", icon: "⚙" },
  { label: "Dark Mode", icon: "◐" },
  { label: "Responsive Preview", icon: "↻" },
];

export function PlaygroundSection() {
  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Playground"
              title="Code. Preview. Iterate."
              description="A real development environment in your browser. Edit code, see changes instantly."
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="rounded-lg border border-border/60 bg-background shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-4 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                </div>
                <span className="ml-2 text-[11px] text-muted-foreground font-mono">playground.tsx</span>
              </div>
              <div className="grid sm:grid-cols-2">
                <div className="border-r border-border/40 bg-muted/10 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                  <div><span className="text-info">import</span> {'{ Button }'} <span className="text-info">from</span> <span className="text-success">{"'@/components/ui'"}</span>;</div>
                  <div className="mt-2"><span className="text-info">export default function</span> <span className="text-warning">App</span>() {'{'}</div>
                  <div className="pl-4"><span className="text-info">return</span> (</div>
                  <div className="pl-8">&lt;<span className="text-danger">Button</span> <span className="text-warning">variant</span>=<span className="text-success">{'"outline"'}</span>&gt;</div>
                  <div className="pl-12">Click me</div>
                  <div className="pl-8">&lt;/<span className="text-danger">Button</span>&gt;</div>
                  <div className="pl-4">);</div>
                  <div>{'}'}</div>
                </div>
                <div className="flex items-center justify-center bg-muted/5 p-4">
                  <div className="flex h-9 items-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground">
                    Click me
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border/40 bg-muted/20 px-4 py-3">
                {tools.map((t) => (
                  <span key={t.label} className="flex items-center gap-1 rounded-md border border-border/40 bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    <span>{t.icon}</span>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/playground"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Open Playground
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
