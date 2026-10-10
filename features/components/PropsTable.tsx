"use client";

import type { RegistryComponent } from "@/features/registry";

export function PropsTable({ props }: { props: RegistryComponent["props"] }) {
  if (!props || props.length === 0) {
    return (
      <section aria-labelledby="props-heading" className="flex flex-col gap-3" id="props">
        <h2 id="props-heading" className="text-lg font-semibold tracking-tight text-foreground">
          Props
        </h2>
        <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
          This component accepts standard HTML attributes. Typed props are
          documented in the source file above.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="props-heading" className="flex flex-col gap-3" id="props">
      <h2 id="props-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Props
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th scope="col" className="px-4 py-2.5 font-mono text-xs font-semibold">Prop</th>
              <th scope="col" className="px-4 py-2.5 font-mono text-xs font-semibold">Type</th>
              <th scope="col" className="px-4 py-2.5 font-mono text-xs font-semibold">Default</th>
              <th scope="col" className="px-4 py-2.5 text-xs font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs font-medium text-foreground">
                  {prop.name}
                  {prop.required && (
                    <span className="ml-1.5 rounded bg-danger/10 px-1 py-0.5 text-[10px] text-danger">
                      required
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{prop.type}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {prop.default ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
