interface SidebarToggleProps {
  open: boolean;
  onClick: () => void;
}

/** Floating button that toggles the sidebar on small screens. */
export function SidebarToggle({ open, onClick }: SidebarToggleProps) {
  return (
    <button
      onClick={onClick}
      className="fixed left-4 top-20 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-muted active:scale-95 sm:hidden"
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      aria-expanded={open}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        {open ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
}
