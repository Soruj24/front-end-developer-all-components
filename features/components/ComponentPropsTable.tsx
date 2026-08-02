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
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
            <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border last:border-b-0">
              <td className="whitespace-nowrap px-4 py-3">
                <code className="font-mono text-xs font-medium text-primary">{prop.name}</code>
                {prop.required && (
                  <span className="ml-1.5 text-[10px] font-medium text-danger">required</span>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                {prop.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-[13px] text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
