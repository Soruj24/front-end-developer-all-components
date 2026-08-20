"use client";

import { Bubble } from "../Bubble";

export default function TailExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Bubble variant="default" tail>With tail (default)</Bubble>
      <Bubble variant="primary" tail>With tail</Bubble>
      <Bubble variant="default" tail={false}>Without tail</Bubble>
    </div>
  );
}
