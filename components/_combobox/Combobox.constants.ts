export const COMBOBOX_STYLES: Record<string, string> = {
  base: "relative w-full",
  trigger: "flex min-h-[42px] w-full items-center justify-between gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 text-left text-sm transition-all duration-150 hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  popover: "absolute z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-border/60 bg-popover py-0 text-sm shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] animate-in fade-in-0 zoom-in-95 duration-150",
  option: "flex items-center gap-2 px-2.5 py-1.5 cursor-pointer rounded-md transition-colors duration-75 hover:bg-accent hover:text-accent-foreground",
  itemSelected: "bg-accent/50 font-medium text-accent-foreground",
  itemDisabled: "pointer-events-none opacity-40",
  search: "w-full rounded-md bg-muted/50 px-2.5 py-1.5 text-sm outline-none placeholder:text-muted-foreground/50",
  badge: "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground",
};
