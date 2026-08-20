"use client";

import { ButtonGroup } from "../ButtonGroup";

export default function VerticalExample() {
  return (
    <ButtonGroup orientation="vertical">
      <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Top</button>
      <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Middle</button>
      <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Bottom</button>
    </ButtonGroup>
  );
}
