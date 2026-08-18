export const DROPDOWN_MENU_STYLES: Record<string, string> = {
  trigger: "inline-flex cursor-pointer outline-none",
  content: "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
  item: "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
  itemDisabled: "pointer-events-none opacity-50",
  itemDanger: "text-destructive focus:bg-destructive/10 focus:text-destructive",
  shortcut: "ml-auto text-xs tracking-widest opacity-60",
  icon: "flex h-4 w-4 shrink-0 items-center justify-center",
  separator: "-mx-1 my-1 h-px bg-muted",
  group: "px-2 py-1.5 text-sm font-semibold text-popover-foreground",
};
