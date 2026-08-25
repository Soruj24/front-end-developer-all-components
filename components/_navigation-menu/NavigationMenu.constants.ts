export const NAVIGATION_MENU_STYLES: Record<string, string> = {
  base: "flex flex-col gap-0.5 p-2",
  horizontal: "flex-row",
  item: "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-100 hover:bg-accent hover:text-accent-foreground",
  itemActive: "bg-accent text-accent-foreground font-medium",
  itemDisabled: "pointer-events-none opacity-40",
  icon: "flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground/70",
  submenu: "ml-4 border-l border-border/60 pl-4",
};
