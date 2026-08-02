import { cn } from "@/lib/cn";
import { CheckIcon } from "./icons";

export const previewBg =
  "flex h-24 items-center justify-center gap-2 border-b border-border bg-muted/30 px-4";

export const popular = [
  {
    name: "Buttons",
    href: "/buttons",
    glyph: "▦",
    preview: (
      <div className={previewBg}>
        <span className="inline-flex h-7 items-center rounded-lg bg-foreground px-3.5 text-xs font-medium text-background shadow-sm">
          Primary
        </span>
        <span className="inline-flex h-7 items-center rounded-lg border border-border bg-background px-3.5 text-xs font-medium">
          Secondary
        </span>
        <span className="hidden h-7 w-7 items-center justify-center rounded-lg border border-dashed border-border text-xs sm:inline-flex">
          +
        </span>
      </div>
    ),
  },
  {
    name: "Badge",
    href: "/badge",
    glyph: "⬡",
    preview: (
      <div className={previewBg}>
        {["bg-accent-soft text-accent", "bg-success/15 text-success dark:text-success", "bg-warning/15 text-warning dark:text-warning"].map(
          (tone, i) => (
            <span key={i} className={cn("inline-flex h-5 items-center rounded-full px-2.5 text-[10px] font-medium", tone)}>
              {["New", "Active", "Beta"][i]}
            </span>
          )
        )}
      </div>
    ),
  },
  {
    name: "Avatar",
    href: "/avatar",
    glyph: "◉",
    preview: (
      <div className={previewBg}>
        {[
          ["from-primary to-primary/80", "AC"],
          ["from-sky-500 to-cyan-400", "JM"],
          ["from-emerald-500 to-teal-400", "RK"],
          ["from-rose-500 to-orange-400", "LS"],
        ].map(([gradient, initials], i) => (
          <span
            key={initials}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ring-2 ring-background",
              gradient,
              i > 0 && "-ml-2.5"
            )}
          >
            {initials}
          </span>
        ))}
      </div>
    ),
  },
  {
    name: "Cards",
    href: "/cards",
    glyph: "⊞",
    preview: (
      <div className="flex h-24 w-full items-center justify-center border-b border-border bg-muted/30 px-4">
        <div className="w-28 overflow-hidden rounded-lg border border-border bg-background shadow-sm">
          <div className="h-8 bg-gradient-to-br from-primary/30 to-primary/20" />
          <div className="flex flex-col gap-1 p-2">
            <span className="h-1.5 w-3/4 rounded-full bg-muted-foreground/25" />
            <span className="h-1.5 w-1/2 rounded-full bg-muted-foreground/15" />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Inputs",
    href: "/inputs",
    glyph: "⌨",
    preview: (
      <div className={previewBg}>
        <div className="flex w-36 flex-col gap-1.5">
          <span className="flex h-7 items-center rounded-lg border border-border bg-background px-2.5 text-[10px] text-muted-foreground">
            placeholder…
            <span className="ml-auto h-3 w-px animate-pulse bg-accent" />
          </span>
          <span className="flex h-7 items-center rounded-lg border border-accent/50 bg-accent-soft px-2.5 text-[10px] text-foreground ring-2 ring-accent/15">
            Focused field
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "Skeleton",
    href: "/skeleton",
    glyph: "▯",
    preview: (
      <div className="flex h-24 w-full flex-col items-center justify-center gap-2 border-b border-border bg-muted/30 px-4">
        <div className="w-32 space-y-1.5">
          <div className="h-2 w-1/3 animate-pulse rounded-full bg-muted-foreground/20" />
          <div className="h-2 animate-pulse rounded-full bg-muted-foreground/15" />
          <div className="h-2 w-2/3 animate-pulse rounded-full bg-muted-foreground/15" />
        </div>
      </div>
    ),
  },
  {
    name: "Table",
    href: "/table",
    glyph: "⊟",
    preview: (
      <div className="flex h-24 w-full items-center justify-center border-b border-border bg-muted/30 px-4">
        <div className="w-36 overflow-hidden rounded-lg border border-border bg-background text-[10px]">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-2 py-1 text-muted-foreground">
            <span>Name</span>
            <span>Status</span>
          </div>
          <div className="flex items-center justify-between border-b border-border px-2 py-1">
            <span>Adrian</span>
            <span className="text-success dark:text-success">Online</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1">
            <span>Sofia</span>
            <span className="text-muted-foreground">Away</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Toast",
    href: "/toast",
    glyph: "◊",
    preview: (
      <div className="flex h-24 w-full items-center justify-center border-b border-border bg-muted/30 px-4">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-card">
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-success/15 text-success dark:text-success">
            <CheckIcon className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-medium">Component copied</span>
        </div>
      </div>
    ),
  },
];
