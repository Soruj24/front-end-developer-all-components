"use client";

import { Alert } from "@/components/_alert";

export default function AlertPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Alert</h1>
        <p className="mt-1 text-muted-foreground">Displays a brief, important message with optional icon and action.</p>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>Displays a brief, important message with optional icon and action.</p>
      </div>
    </div>
  );
}
