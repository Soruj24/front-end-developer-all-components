import type { ComponentProp } from "@/features/registry";

export function ComponentPropsTable({ props }: { props: ComponentProp[] }) {
  if (props.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
        No public props are exposed by this component.
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Prop</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Default</th>
              <th className="px-4 py-3 text-left font-medium">Required</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr
                key={prop.name}
                className={index < props.length - 1 ? "border-b" : ""}
              >
                <td className="px-4 py-3 font-mono text-xs">{prop.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {prop.values && prop.values.length > 0
                    ? prop.values.map((v) => `"${v}"`).join(" | ")
                    : prop.type}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {prop.default ?? "—"}
                </td>
                <td className="px-4 py-3">{prop.required ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
