"use client";

import type { BoxValue } from "../../types";
import type { ControlProps } from "./types";

const SIDES = ["top", "right", "bottom", "left"] as const;

function toBox(value: unknown, fallback: BoxValue): BoxValue {
  return typeof value === "object" && value !== null
    ? (value as BoxValue)
    : fallback;
}

/** Four-side padding/margin/border-radius with a link toggle. */
export function BoxControl({ value, onChange, onBegin, onEnd }: ControlProps) {
  const box = toBox(value, { top: 0, right: 0, bottom: 0, left: 0, linked: true });

  const setSide = (side: (typeof SIDES)[number], next: number) => {
    if (box.linked) {
      onChange({ ...box, top: next, right: next, bottom: next, left: next });
    } else {
      onChange({ ...box, [side]: next });
    }
  };

  const toggleLink = () => {
    if (!box.linked) {
      const valueToSpread = box.top;
      onChange({ ...box, linked: true, right: valueToSpread, bottom: valueToSpread, left: valueToSpread });
    } else {
      onChange({ ...box, linked: false });
    }
  };

  return (
    <div onFocus={onBegin} onBlur={onEnd}>
      <div className="flex items-center gap-2">
        <div className="grid flex-1 grid-cols-4 gap-1">
          {SIDES.map((side) => (
            <label key={side} className="flex items-center gap-1 rounded border border-input bg-background px-1.5 py-1 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
              <span className="text-[10px] uppercase text-muted-foreground">
                {side[0]}
              </span>
              <input
                type="number"
                className="w-full min-w-0 bg-transparent text-sm text-foreground focus:outline-none"
                value={box[side]}
                onChange={(event) => setSide(side, Number(event.target.value) || 0)}
              />
            </label>
          ))}
        </div>
        <button
          type="button"
          aria-label={box.linked ? "Link values" : "Unlink values"}
          title={box.linked ? "Link values" : "Unlink values"}
          onClick={toggleLink}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors ${
            box.linked
              ? "border-ring bg-foreground text-background"
              : "border-input bg-background text-muted-foreground hover:text-foreground"
          }`}
        >
          {box.linked ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3 21 9" />
              <path d="M10 14 21 3" />
              <path d="M18 13l3 6-6-3" />
            </svg>
          )}
        </button>
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>T</span>
        <span>R</span>
        <span>B</span>
        <span>L</span>
      </div>
    </div>
  );
}
