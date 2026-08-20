"use client";

import { ButtonGroup } from "../ButtonGroup";

export default function GhostExample() {
  return (
    <ButtonGroup variant="ghost">
      <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Left</button>
      <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Center</button>
      <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Right</button>
    </ButtonGroup>
  );
}
