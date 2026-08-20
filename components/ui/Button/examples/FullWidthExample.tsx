"use client";

import { Button } from "../../Button";

export function FullWidthExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button className="w-full">Full Width Primary</Button>
      <Button variant="outline" className="w-full">Full Width Outline</Button>
      <Button variant="secondary" className="w-full">Full Width Secondary</Button>
    </div>
  );
}
