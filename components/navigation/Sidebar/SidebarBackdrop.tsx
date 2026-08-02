interface SidebarBackdropProps {
  onClick: () => void;
}

/** Dimmed, blurred overlay behind the sidebar when open on small screens. */
export function SidebarBackdrop({ onClick }: SidebarBackdropProps) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm animate-[fade-in_0.2s_ease-out] sm:hidden"
      aria-hidden="true"
    />
  );
}
