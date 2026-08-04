import { Card, CardHeader } from "@/components/design-system/Card";
import { Badge } from "@/components/design-system/Badge";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import {
  CheckIcon,
  GlobeIcon,
  GitBranchIcon,
  LayersIcon,
  ZapIcon,
} from "./icons";

const dxPoints = [
  {
    icon: ZapIcon,
    title: "Instant feedback",
    description: "Hot reload keeps your preview and code in perfect sync.",
  },
  {
    icon: LayersIcon,
    title: "Predictable theming",
    description: "Override a single token set and every component follows.",
  },
  {
    icon: GitBranchIcon,
    title: "Ships like your code",
    description: "Plain files under version control. Review, branch, merge.",
  },
  {
    icon: GlobeIcon,
    title: "Works anywhere",
    description: "Next.js, Vite, Remix — anywhere React and Tailwind run.",
  },
];

const tree = [
  { line: "component-library/", folder: true },
  { line: "├─ components/", folder: true },
  { line: "│  └─ ui/", folder: true },
  { line: "│     ├─ button.tsx", active: true },
  { line: "│     ├─ card.tsx" },
  { line: "│     ├─ input.tsx" },
  { line: "│     ├─ badge.tsx" },
  { line: "│     └─ index.ts" },
  { line: "├─ tokens/" },
  { line: "│  ├─ colors.css" },
  { line: "│  └─ radius.css" },
  { line: "└─ globals.css" },
];

/** Developer experience: checklist copy beside a file-tree visual. */
export function HomeDeveloperExperience() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Developer experience">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal>
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="Developer experience"
              title="Feels like it was built for your workflow"
              description="No generated abstractions, no config maze. The library stays out of your way from scaffold to deploy."
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {dxPoints.map((point) => (
                <li key={point.title} className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-7 w-7 justify-center p-0">
                      <point.icon className="h-3.5 w-3.5" />
                    </Badge>
                    <span className="text-sm font-medium text-foreground">{point.title}</span>
                  </span>
                  <p className="pl-9 text-[13px] leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Card className="overflow-hidden shadow-card">
            <CardHeader className="flex-row items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
              <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-success/20 text-success dark:text-success">
                <CheckIcon className="h-1.5 w-1.5" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Your project — ready to go
              </span>
            </CardHeader>
            <div className="scrollbar-thin overflow-x-auto p-4 font-mono text-[13px] leading-6">
              {tree.map((entry, index) => (
                <div
                  key={index}
                  className={`whitespace-pre ${entry.active ? "rounded-md bg-accent-soft px-1.5 font-medium text-foreground" : ""}`}
                >
                  {entry.active ? (
                    <span className="text-accent">{entry.line}</span>
                  ) : entry.line.endsWith("/") ? (
                    <span className="text-warning dark:text-warning">{entry.line}</span>
                  ) : (
                    <span className="text-muted-foreground">{entry.line}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
