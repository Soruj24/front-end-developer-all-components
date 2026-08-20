"use client";

import { Button } from "../../Button";

export function AllSizesExample() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
}
