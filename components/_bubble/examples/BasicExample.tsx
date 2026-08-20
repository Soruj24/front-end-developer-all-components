"use client";

import { Bubble } from "../Bubble";

export default function BasicExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Bubble variant="default">Hey, how&apos;s the project going?</Bubble>
      <Bubble variant="primary">It&apos;s going well! Just finished the new components.</Bubble>
      <Bubble variant="default">Nice! Can you show me a demo?</Bubble>
    </div>
  );
}
