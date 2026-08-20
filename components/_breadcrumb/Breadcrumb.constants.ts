export const BREADCRUMB_STYLES: Record<string, string> = {
  base: "flex items-center gap-1.5 text-sm",
  basePill: "flex items-center gap-1.5 text-sm",
  baseMuted: "flex items-center gap-1.5 text-sm",
  item: "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  itemActive: "font-medium text-foreground",
  itemActivePill: "font-medium text-foreground bg-muted",
  itemDisabled: "cursor-not-allowed opacity-40 pointer-events-none",
  separator: "flex-shrink-0 text-muted-foreground/40",
  icon: "flex-shrink-0 h-3.5 w-3.5",
  link: "cursor-pointer",
};
