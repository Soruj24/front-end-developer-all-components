"use client";

import { useState, useCallback, useMemo } from "react";
import type { RegistryComponent } from "@/features/registry";
import { ComponentHeader } from "./ComponentHeader";
import { ComponentDescription } from "./ComponentDescription";
import { ComponentLivePreview } from "./ComponentLivePreview";
import { CodeViewer } from "./CodeViewer";
import { ExampleSection } from "./ExampleSection";
import { CustomizationPanel } from "./CustomizationPanel";
import { PlaygroundModal } from "./PlaygroundModal";
import { buildComponentExamples } from "./example-builder";

export function ComponentDetail({
  component,
  related,
}: {
  component: RegistryComponent;
  related: RegistryComponent[];
}) {
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [customStyles, setCustomStyles] = useState<Record<string, string>>({});

  const examples = useMemo(
    () => buildComponentExamples(component),
    [component]
  );

  const handleOpenPlayground = useCallback(() => {
    setPlaygroundOpen(true);
  }, []);

  return (
    <article className="flex flex-col gap-12">
      <ComponentHeader
        component={component}
        onOpenPlayground={handleOpenPlayground}
      />

      <ComponentDescription component={component} />

      <ComponentLivePreview
        component={component}
        onOpenPlayground={handleOpenPlayground}
      />

      <CodeViewer
        source={component.source}
        filename={`${component.slug}.tsx`}
        language="tsx"
        onOpenPlayground={handleOpenPlayground}
      />

      <ExampleSection examples={examples} />

      <CustomizationPanel
        componentSlug={component.slug}
        baseClasses="rounded-lg border bg-background px-4 py-2"
        onCustomize={setCustomStyles}
      />

      <PlaygroundModal
        open={playgroundOpen}
        onClose={() => setPlaygroundOpen(false)}
        componentSlug={component.slug}
        initialCode={component.source}
      />
    </article>
  );
}
