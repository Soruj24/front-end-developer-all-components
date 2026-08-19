export const FLOATINGTOOLBAR_SOURCE = `import * as React from "react";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FloatingToolbarAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  active?: boolean;
}

export interface FloatingToolbarProps {
  className?: string;
  groups: FloatingToolbarAction[][];
  onAction?: (action: FloatingToolbarAction) => void;
  selectionLabel?: string;
  disabled?: boolean;
  activeItemId?: string;
  position?: "fixed" | "absolute" | "sticky";
  collapsible?: boolean;
  ariaLabel?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

export function FloatingToolbar({
  className,
  groups,
  onAction,
  selectionLabel,
  disabled = false,
  activeItemId,
  position = "fixed",
  collapsible = true,
  ariaLabel = "Floating toolbar",
}: FloatingToolbarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [rowWidth, setRowWidth] = useState<number | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const flatActions = useMemo(() => groups.flat(), [groups]);
  const groupStarts = useMemo(() => {
    const starts = [0];
    let count = 0;
    for (const group of groups) {
      count += group.length;
      starts.push(count);
    }
    return starts;
  }, [groups]);

  // — rendering & interaction handlers (drag, keyboard nav, action clicks) —
  return (
    <div
      ref={pillRef}
      role="toolbar"
      aria-label={ariaLabel}
      className={cn(
        "z-50 flex w-max max-w-full select-none items-center gap-1 rounded-2xl border border-black/[0.08] bg-white/80 p-1.5 shadow-card backdrop-blur-xl dark:border-white/[0.1] dark:bg-zinc-900/80",
        position === "fixed" && "fixed",
        position === "absolute" && "absolute",
        position === "sticky" && "sticky top-4 mx-auto",
        "transition-[width,left,top,transform] duration-300 ease-spring",
        dragging && "transition-none",
        className
      )}
    >
      <div ref={rowRef} className="flex items-center gap-1">
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && <span className="mx-0.5 h-6 w-px shrink-0 bg-black/[0.08] dark:bg-white/[0.12]" />}
            {group.map((action, actionIndex) => {
              const index = groupStarts[groupIndex] + actionIndex;
              const isActive = action.active === true || action.id === activeItemId;
              const isDisabled = disabled || action.disabled;
              return (
                <div key={action.id} className="group/tooltip relative">
                  <button
                    type="button"
                    aria-label={action.label}
                    aria-pressed={isActive}
                    onClick={() => onAction?.(action)}
                    disabled={isDisabled}
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl text-zinc-600 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/70 sm:size-10",
                      isActive
                        ? "bg-foreground text-background"
                        : "hover:bg-black/[0.05] hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-zinc-50",
                      isDisabled && "cursor-not-allowed opacity-40"
                    )}
                  >
                    {action.icon}
                  </button>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}`;

export const draftLines = [
  "Spring had come late that year, but it had come. The orchards along the river bank were swelling with blossom and the air carried the sweet, heavy smell of new growth.",
  "Ada leaned back in her chair and watched the dust motes drift through a shaft of afternoon light. The cursor blinked patiently on the last line of her notes.",
  "She had learned, slowly, that writing was less about finding the right words than about clearing the space for them — removing everything that got in the way.",
  "A paragraph broke the page in half. A question mark held the whole chapter together. The margin, she decided, was where the real story lived.",
  "Outside, a blackbird sang three notes and fell silent. Ada smiled, saved her file, and started the next paragraph.",
];

export const stickyToolbarCode = `<FloatingToolbar
  position="sticky"
  groups={noteActions}
  selectionLabel="Draft"
/>`;

export const fixedToolbarCode = `<FloatingToolbar
  position="absolute"
  groups={formatActions}
  selectionLabel="Paragraph"
  activeItemId={active}
  onAction={(a) => toggleActive(a.id)}
/>`;

export const collapsibleToolbarCode = `const [selection, setSelection] = useState(0);

<FloatingToolbar
  position="sticky"
  groups={selectionActions}
  selectionLabel={selection > 0 ? \`\${selection} selected\` : undefined}
  disabled={selection === 0}
/>;`;
