import type { RegistryComponent } from "@/features/registry";

export function ComponentDescription({
  component,
}: {
  component: RegistryComponent;
}) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-sm leading-relaxed text-muted-foreground">
        {component.longDescription || component.description}
      </p>
      {component.features.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {component.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
