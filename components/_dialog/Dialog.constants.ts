export const DIALOG_STYLES: Record<string, string> = {
  overlay: "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out",
  content: "fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "h-full w-full max-w-none translate-x-0 translate-y-0 rounded-none border-none",
};
