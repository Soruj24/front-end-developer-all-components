"use client";

import type { ReactNode } from "react";
import { ExampleCard, type Example } from "./ExampleCard";

interface ExampleSectionProps {
  examples: Example[];
}

export function ExampleSection({ examples }: ExampleSectionProps) {
  if (examples.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore different variations and use cases of this component.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {examples.map((example, index) => (
          <ExampleCard key={index} example={example} />
        ))}
      </div>
    </section>
  );
}
