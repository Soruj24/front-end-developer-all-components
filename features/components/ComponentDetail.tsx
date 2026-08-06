"use client";

import type { RegistryComponent } from "@/features/registry";
import { ComponentHeader } from "./ComponentHeader";
import { ComponentActions } from "./ComponentActions";
import { ComponentPreview } from "./ComponentPreview";
import { ComponentInstall } from "./ComponentInstall";
import { ComponentPropsTable } from "./ComponentPropsTable";
import { ComponentVersions } from "./ComponentVersions";
import { ComponentComments } from "./ComponentComments";
import { ComponentRelated } from "./ComponentRelated";

/** Full single-component page composed from small, focused sections. */
export function ComponentDetail({
  component,
  related,
}: {
  component: RegistryComponent;
  related: RegistryComponent[];
}) {
  return (
    <article className="flex flex-col gap-10">
      <ComponentHeader component={component} />
      <ComponentActions component={component} />
      <ComponentPreview component={component} />

      <Section title="Installation">
        <ComponentInstall component={component} />
      </Section>

      <Section title="Documentation">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {component.longDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {component.features.map((feature) => (
            <span key={feature} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              {feature}
            </span>
          ))}
        </div>
      </Section>

      <ComponentPropsTable props={component.props} />

      <Section title="Source Code">
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground">
          <code>{component.source}</code>
        </pre>
      </Section>

      <Section title="Changelog">
        <ComponentVersions component={component} />
      </Section>

      <Section title={`Comments (${component.stats.comments})`}>
        <ComponentComments componentSlug={component.slug} />
      </Section>

      <ComponentRelated component={component} related={related} />
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <section className="flex flex-col gap-4" id={id}>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        <a
          className="group no-underline"
          href={`#${id}`}
        >
          <span className="underline-offset-4 group-hover:underline">{title}</span>
          <span
            aria-hidden="true"
            className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            #
          </span>
        </a>
      </h2>
      {children}
    </section>
  );
}
