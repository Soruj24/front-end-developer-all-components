"use client";

import { ButtonGroup } from "../ButtonGroup";

export default function SizesExample() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup size="sm">
        <button type="button" className="rounded-md bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-background/80">Small</button>
        <button type="button" className="rounded-md bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-background/80">Group</button>
      </ButtonGroup>
      <ButtonGroup size="md">
        <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Medium</button>
        <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Group</button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <button type="button" className="rounded-xl bg-background px-5 py-2.5 text-base font-medium shadow-sm transition-colors hover:bg-background/80">Large</button>
        <button type="button" className="rounded-xl bg-background px-5 py-2.5 text-base font-medium shadow-sm transition-colors hover:bg-background/80">Group</button>
      </ButtonGroup>
    </div>
  );
}
