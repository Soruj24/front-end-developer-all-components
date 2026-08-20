"use client";

import { Bubble } from "../Bubble";

export default function VariantsExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Bubble variant="default">Default bubble</Bubble>
      <Bubble variant="primary">Primary bubble</Bubble>
      <Bubble variant="secondary">Secondary bubble</Bubble>
      <Bubble variant="muted">Muted bubble</Bubble>
    </div>
  );
}
