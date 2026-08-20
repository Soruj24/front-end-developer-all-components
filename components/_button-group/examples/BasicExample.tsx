"use client";

import { ButtonGroup } from "../ButtonGroup";

export default function BasicExample() {
  return (
    <ButtonGroup>
      <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Left</button>
      <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Center</button>
      <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Right</button>
    </ButtonGroup>
  );
}
