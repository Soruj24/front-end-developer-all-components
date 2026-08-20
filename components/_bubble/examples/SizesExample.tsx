"use client";

import { Bubble } from "../Bubble";

export default function SizesExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Bubble variant="default" size="sm">Small message</Bubble>
      <Bubble variant="primary" size="md">Medium message</Bubble>
      <Bubble variant="default" size="lg">Large message with more content</Bubble>
    </div>
  );
}
