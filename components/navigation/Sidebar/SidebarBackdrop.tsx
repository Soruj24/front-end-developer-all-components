"use client";

interface SidebarBackdropProps {
  onClick: () => void;
}

/** Dimmed, blurred overlay behind the sidebar when open on small screens. */
export function SidebarBackdrop({ onClick }: SidebarBackdropProps) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-30 animate-fade-in-fast bg-overlay/80 backdrop-blur-sm sm:hidden"
      aria-hidden="true"
    />
  );
}
