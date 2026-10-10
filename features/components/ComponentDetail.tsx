"use client";

import { useMemo } from "react";
import type { RegistryComponent } from "@/features/registry";
import { buildCopyPackage, CopyPackageViewer, SetupChecklist } from "@/features/copyable";
import { ComponentHeader } from "./ComponentHeader";
import { ComponentDescription } from "./ComponentDescription";
import { ComponentLivePreview } from "./ComponentLivePreview";
import { ExampleSection } from "./ExampleSection";
import { ComponentInstall } from "./ComponentInstall";
import { ComponentRelated } from "./ComponentRelated";
import { PropsTable } from "./PropsTable";
import { UsageSection, AccessibilitySection } from "./DocSections";
import { ApiDocsSection } from "./ApiDocsSection";
import { buildComponentExamples } from "./example-builder";

export function ComponentDetail({
  component,
  related,
}: {
  component: RegistryComponent;
  related: RegistryComponent[];
}) {
  const examples = useMemo(
    () => buildComponentExamples(component),
    [component]
  );
  const pkg = useMemo(() => buildCopyPackage(component), [component]);

  return (
    <article className="flex flex-col gap-10">
      <ComponentHeader component={component} />

      <ComponentDescription component={component} />

      <nav aria-label="On this page" className="flex flex-wrap gap-2 text-xs">
        {["Preview", "Code", "Examples", "Props", "Install", "Usage", ...(component.api ? ["API"] : []), "Accessibility"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-border px-3 py-1 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item}
            </a>
          ),
        )}
      </nav>

      <ComponentLivePreview component={component} />

      <CopyPackageViewer pkg={pkg} />

      <SetupChecklist pkg={pkg} />

      <div id="examples">
        <ExampleSection examples={examples} />
      </div>

      <PropsTable props={component.props} />

      <section aria-labelledby="install-heading" id="install" className="flex flex-col gap-3">
        <h2 id="install-heading" className="text-lg font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <ComponentInstall component={component} />
      </section>

      <UsageSection component={component} />

      <ApiDocsSection component={component} />

      <AccessibilitySection component={component} />

      <ComponentRelated component={component} related={related} />
    </article>
  );
}
