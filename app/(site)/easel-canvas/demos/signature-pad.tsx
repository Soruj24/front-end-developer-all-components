"use client";

import { Check } from "lucide-react";
import { useFreehandLines } from "./use-freehand";

export function SignaturePadDemo() {
  const { lines, start, extend, stop, clear } = useFreehandLines();
  const signed = lines.length > 0;

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <h3 className="mb-2 text-sm font-semibold">Sign Here</h3>
      <div className="relative">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label={signed ? "Signature captured." : "Signature area. Draw your signature with a mouse, pen, or finger."}
          onPointerDown={(e) => start(e)}
          onPointerMove={extend}
          onPointerUp={stop}
          onPointerLeave={stop}
          className="block h-24 w-full cursor-crosshair touch-none rounded-lg border border-dashed bg-white outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/[.25]"
        >
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#000000" strokeWidth={2.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {!signed && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] text-muted-foreground transition-opacity duration-200">
            Draw your signature
          </span>
        )}
        <span aria-live="polite" className="sr-only">
          {signed ? "Signature captured" : "Signature area is empty"}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={clear}
          disabled={!signed}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
        >
          Clear
        </button>
        <button
          type="button"
          disabled={!signed}
          aria-disabled={!signed}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium shadow-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
            signed
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "cursor-not-allowed bg-muted text-muted-foreground"
          }`}
        >
          {signed ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Confirm signature
            </>
          ) : (
            "Sign to continue"
          )}
        </button>
      </div>
    </div>
  );
}
