import { ArrowRightIcon } from "lucide-react";

const zone =
  "flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10";

const frame =
  "flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs";

/** Full-height hero copy centred in the viewport. */
export function CenteredHeroDemo() {
  return (
    <div className={frame}>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <h3 className="text-base font-semibold tracking-tight">Build faster</h3>
        <p className="max-w-xs text-xs text-muted-foreground">
          Compose production-ready layouts from a handful of primitives.
        </p>
        <span className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            Get started
          </button>
          <button
            type="button"
            className="rounded-md border border-input px-3 py-1.5 text-[11px] font-medium transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            Docs
          </button>
        </span>
      </div>
    </div>
  );
}

/** Header, flanking sidebars, main column and footer. */
export function HolyGrailDemo() {
  return (
    <div className={frame}>
      <div className="flex h-8 shrink-0 items-center border-b border-border bg-background px-3 text-xs font-semibold tracking-tight">
        Header
      </div>
      <div className="flex flex-1">
        <div className="w-16 shrink-0 border-r border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          Left
        </div>
        <div className={zone}>Main</div>
        <div className="w-16 shrink-0 border-l border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          Right
        </div>
      </div>
      <div className="flex h-7 shrink-0 items-center border-t border-border bg-background px-3 text-[10px] text-muted-foreground/70">
        Footer
      </div>
    </div>
  );
}

/** Two equal panes divided by a vertical rule. */
export function SplitDemo() {
  return (
    <div className={frame}>
      <div className={zone}>Editor</div>
      <div className="w-px shrink-0 bg-border" />
      <div className={zone}>Preview</div>
    </div>
  );
}

/** Responsive card grid filling the page body. */
export function CardGridDemo() {
  const cards = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className={frame}>
      <div className="grid flex-1 auto-rows-min grid-cols-3 gap-2 p-3">
        {cards.map((card) => (
          <div
            key={card}
            className="rounded-lg border border-border bg-card p-2 shadow-xs transition-colors duration-150 hover:border-ring/30"
          >
            <span className="block h-10 rounded-md bg-muted" />
            <span className="mt-2 block h-2 w-3/4 rounded-full bg-muted" />
            <span className="mt-1 block h-2 w-1/2 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Scrolling body with an always-visible action footer. */
export function StickyFooterDemo() {
  return (
    <div className={frame}>
      <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
        {["Draft saved", "Sync complete", "Deploy queued"].map((row) => (
          <div key={row} className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 text-[11px] shadow-xs">
            <ArrowRightIcon className="h-3 w-3 text-muted-foreground/60" aria-hidden="true" />
            {row}
          </div>
        ))}
      </div>
      <div className="flex h-9 shrink-0 items-center justify-between border-t border-border bg-background px-3">
        <span className="text-[11px] text-muted-foreground">3 items</span>
        <button
          type="button"
          className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
