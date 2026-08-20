"use client";

import { Button } from "../../Button";

export function DisabledStateExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="soft" disabled>Soft</Button>
    </div>
  );
}
