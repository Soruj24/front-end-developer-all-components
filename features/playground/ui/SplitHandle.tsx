import { useCallback, useRef } from "react";

interface SplitHandleProps {
  direction: "vertical" | "horizontal";
  onMove: (delta: number) => void;
  className?: string;
}

/** Draggable divider that reports pointer deltas to a parent resize handler. */
export function SplitHandle({ direction, onMove, className = "" }: SplitHandleProps) {
  const last = useRef<number | null>(null);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      last.current = direction === "vertical" ? event.clientX : event.clientY;
      event.currentTarget.setPointerCapture(event.pointerId);
      const onMoveEvent = (moveEvent: PointerEvent) => {
        if (last.current === null) return;
        const next = direction === "vertical" ? moveEvent.clientX : moveEvent.clientY;
        onMove(next - last.current);
        last.current = next;
      };
      const onUp = () => {
        last.current = null;
        window.removeEventListener("pointermove", onMoveEvent);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMoveEvent);
      window.addEventListener("pointerup", onUp);
    },
    [direction, onMove]
  );

  return (
    <div
      role="separator"
      aria-orientation={direction === "vertical" ? "vertical" : "horizontal"}
      onPointerDown={onPointerDown}
      className={`group relative z-10 shrink-0 touch-none ${
        direction === "vertical" ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"
      } ${className}`}
    >
      <div
        className={`absolute rounded-full bg-transparent transition-colors group-hover:bg-[#2b7de9]/70 group-active:bg-[#2b7de9] ${
          direction === "vertical" ? "inset-y-0 left-1/2 w-0.5 -translate-x-1/2" : "inset-x-0 top-1/2 h-0.5 -translate-y-1/2"
        }`}
      />
    </div>
  );
}
