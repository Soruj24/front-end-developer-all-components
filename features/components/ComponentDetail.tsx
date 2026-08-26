"use client";

import { useState, useMemo } from "react";
import type { RegistryComponent } from "@/features/registry";
import { ComponentHeader } from "./ComponentHeader";
import { ComponentDescription } from "./ComponentDescription";
import { ComponentLivePreview } from "./ComponentLivePreview";
import { CodeViewer } from "./CodeViewer";
import { ExampleSection } from "./ExampleSection";
import { CustomizationPanel } from "./CustomizationPanel";
import { buildComponentExamples } from "./example-builder";

export function ComponentDetail({
  component,
  related,
}: {
  component: RegistryComponent;
  related: RegistryComponent[];
}) {
  const [customStyles, setCustomStyles] = useState<Record<string, string>>({});

  const examples = useMemo(
    () => buildComponentExamples(component),
    [component]
  );

  return (
    <article className="flex flex-col gap-12">
      <ComponentHeader component={component} />

      <ComponentDescription component={component} />

      <ComponentLivePreview component={component} />

      <CodeViewer
        source={component.source}
        filename={`${component.slug}.tsx`}
        language="tsx"
      />

      <ExampleSection examples={examples} />

      <CustomizationPanel
        componentSlug={component.slug}
        baseClasses="rounded-lg border bg-background px-4 py-2"
        onCustomize={setCustomStyles}
      />
    </article>
  );
}
