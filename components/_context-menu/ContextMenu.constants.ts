export const CONTEXT_MENU_STYLES: Record<string, string> = {
  overlay: "fixed inset-0 z-50 bg-transparent",
  content: "fixed z-50 min-w-[10rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50",
  item: "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors duration-100 hover:bg-accent hover:text-accent-foreground cursor-pointer",
  itemDisabled: "pointer-events-none opacity-40",
  itemDangerous: "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
  shortcut: "ml-auto font-mono text-[11px] tracking-wider text-muted-foreground/50",
  icon: "flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground/70",
  separator: "-mx-1 my-1 h-px bg-border/60",
  group: "px-2.5 py-1.5 text-xs font-semibold text-muted-foreground/70",
};
