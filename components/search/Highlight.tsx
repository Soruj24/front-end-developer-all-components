"use client";

import type { ReactNode } from "react";

/**
 * Renders `text` with the fuzzy-matched `indices` wrapped in highlighted
 * `<mark>` spans. Safe to call with a bare string when nothing matches.
 */
export function Highlight({
  text,
  indices,
}: {
  text: string;
  indices: number[];
}) {
  if (!indices.length) return <>{text}</>;

  const parts: ReactNode[] = [];
  let last = 0;
  indices.forEach((i, k) => {
    if (i < last || i >= text.length) return;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <mark
        key={`${i}-${k}`}
        className="rounded-[2px] bg-accent-soft px-px text-accent"
      >
        {text[i]}
      </mark>
    );
    last = i + 1;
  });
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
