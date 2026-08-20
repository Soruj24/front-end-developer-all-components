"use client";

import { Bubble } from "../Bubble";

export default function ChatLayoutExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Alice</span>
        <Bubble variant="default" size="sm" tail>Hey!</Bubble>
        <Bubble variant="default" tail>How&apos;s the new component library coming along?</Bubble>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Bob</span>
        <Bubble variant="primary" size="sm" tail>Going great!</Bubble>
        <Bubble variant="primary" tail>Just finished the Bubble component redesign.</Bubble>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Alice</span>
        <Bubble variant="default" tail>Awesome, can&apos;t wait to see it.</Bubble>
      </div>
    </div>
  );
}
