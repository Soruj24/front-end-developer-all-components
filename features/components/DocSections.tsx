"use client";

import type { RegistryComponent } from "@/features/registry";

export function UsageSection({ component }: { component: RegistryComponent }) {
  const usage = `import { ${toPascal(component.slug)} } from "@/components/ui/${component.slug}";

export default function Example() {
  return <${toPascal(component.slug)} />;
}`;

  return (
    <section aria-labelledby="usage-heading" className="flex flex-col gap-3" id="usage">
      <h2 id="usage-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Usage
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4">
        <pre className="font-mono text-[13px] leading-relaxed">
          <code>{usage}</code>
        </pre>
      </div>
      {component.dependencies.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Dependencies:{" "}
          {component.dependencies.map((dep) => (
            <code key={dep} className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
              {dep}
            </code>
          ))}
        </p>
      )}
    </section>
  );
}

function toPascal(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function AccessibilitySection({ component }: { component: RegistryComponent }) {
  return (
    <section aria-labelledby="a11y-heading" className="flex flex-col gap-3" id="accessibility">
      <h2 id="a11y-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Accessibility
      </h2>
      <ul className="flex list-disc flex-col gap-1.5 rounded-xl border border-border bg-muted/30 px-4 py-3 pl-9 text-sm text-muted-foreground">
        <li>Fully keyboard navigable with visible focus indicators.</li>
        <li>Uses semantic roles and accessible names — verify labels in your usage.</li>
        <li>Respects <code className="font-mono text-xs">prefers-reduced-motion</code> via the global stylesheet.</li>
        <li>Test contrast in both light and dark themes before shipping.</li>
        <li className="list-none text-xs text-muted-foreground/70">
          Component: {component.name} · files: {component.files.join(", ")}
        </li>
      </ul>
    </section>
  );
}
