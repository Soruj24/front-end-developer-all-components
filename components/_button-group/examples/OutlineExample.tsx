"use client";

import { ButtonGroup } from "../ButtonGroup";

export default function OutlineExample() {
  return (
    <ButtonGroup variant="outline">
      <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Left</button>
      <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Center</button>
      <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Right</button>
    </ButtonGroup>
  );
}
