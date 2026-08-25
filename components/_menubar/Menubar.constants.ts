export const MENUBAR_STYLES: Record<string, string> = {
  base: "inline-flex h-9 items-center gap-0.5 rounded-lg border border-border/60 bg-card p-0.5 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
  item: "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:bg-accent hover:text-accent-foreground cursor-pointer",
  itemSelected: "bg-accent text-accent-foreground",
  itemDisabled: "pointer-events-none opacity-40",
  shortcut: "ml-auto font-mono text-[11px] tracking-wider text-muted-foreground/60",
  icon: "flex-shrink-0 h-4 w-4",
  separator: "-mx-1 my-1 h-px bg-border/60",
};
