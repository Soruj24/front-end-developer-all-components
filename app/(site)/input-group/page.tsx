"use client";

import { Badge } from "@/components/design-system/Badge";
import { InputGroup } from "@/components/_input-group";

export default function InputGroupPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">InputGroup</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="text-muted-foreground">Input with prepended/appended content.</p>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>Input with prepended/appended content.</p>
      </div>
    </div>
  );
}
