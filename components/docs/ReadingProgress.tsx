interface ReadingProgressProps {
  /** Scroll progress from 0 to 1. */
  value: number;
}

/** Thin reading progress bar fixed below the sticky header. */
export function ReadingProgress({ value }: ReadingProgressProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[2px]"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/80 transition-[width] duration-150 ease-out"
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}
