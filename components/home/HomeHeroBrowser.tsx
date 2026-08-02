import { siteConfig } from "@/config/site";
import { ArrowUpRightIcon, ActivityIcon, SparklesIcon } from "./icons";

const statCards = [
  { label: "Pages", value: siteConfig.stats.pages, delta: "+12 this month" },
  { label: "Components", value: siteConfig.stats.components, delta: "+6 this month" },
  { label: "Categories", value: siteConfig.stats.categories, delta: "curated" },
];

const chartBars = [42, 58, 46, 72, 61, 88, 54, 76, 95, 82, 68, 90];

function BrowserMockup() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="overflow-hidden rounded-xl border border-border bg-background/90 shadow-2xl shadow-black/[0.08] backdrop-blur dark:shadow-black/40">
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center gap-1.5 rounded-md border border-border bg-background text-[11px] text-muted-foreground">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            component-library.dev/overview
          </div>
        </div>

        <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[176px_1fr]">
          <div className="hidden flex-col gap-5 border-r border-border bg-muted/30 p-3.5 sm:flex">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80 text-[9px] font-bold text-primary-foreground">
                {siteConfig.shortName}
              </span>
              <span className="text-xs font-semibold tracking-tight">Acme</span>
            </div>
            <nav className="flex flex-col gap-1" aria-hidden="true">
              {[{ label: "Overview", active: true }, { label: "Analytics", active: false }, { label: "Components", active: false }, { label: "Settings", active: false }].map((item) => (
                <span
                  key={item.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                    item.active
                      ? "bg-accent-soft font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${item.active ? "bg-accent" : "bg-muted-foreground/30"}`} />
                  {item.label}
                </span>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Good morning
                </p>
                <p className="text-base font-semibold tracking-tight">Adrian</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-full bg-foreground px-3 text-[11px] font-medium text-background">
                  + New
                </span>
                <span className="inline-flex h-7 items-center rounded-full border border-border px-3 text-[11px] text-muted-foreground">
                  Export
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-background p-2.5 sm:p-3"
                >
                  <span className="text-[10px] text-muted-foreground sm:text-[11px]">{stat.label}</span>
                  <span className="text-base font-semibold tracking-tight sm:text-lg">
                    {stat.value}
                  </span>
                  <span className="text-[9px] text-success dark:text-success sm:text-[10px]">
                    {stat.delta}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-medium">
                  <ActivityIcon className="h-3.5 w-3.5 text-accent" />
                  Usage over time
                </span>
                <span className="flex items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                  Last 12 weeks
                </span>
              </div>
              <div className="flex h-16 items-end gap-1 sm:h-20" aria-hidden="true">
                {chartBars.map((height, index) => (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-t-sm ${
                      index === chartBars.length - 1
                        ? "bg-gradient-to-t from-primary to-primary/70"
                        : "bg-muted-foreground/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-2 bottom-10 hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-card md:flex">
        <SparklesIcon className="h-3.5 w-3.5 text-accent" />
        <span className="font-medium">1-click copy</span>
      </div>
      <div className="absolute -right-2 top-16 hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-card md:flex">
        <span className="font-mono text-xs text-muted-foreground">⌘K</span>
        <span className="text-xs font-medium">Command menu</span>
      </div>
    </div>
  );
}

export { BrowserMockup, statCards, chartBars };
