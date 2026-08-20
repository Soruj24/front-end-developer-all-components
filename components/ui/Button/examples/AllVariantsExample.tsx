"use client";

import { Button } from "../../Button";

export function AllVariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="destructive-outline">Destructive Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
