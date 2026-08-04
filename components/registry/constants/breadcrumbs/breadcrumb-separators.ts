import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const breadcrumbSeparators: RegistryEntry = entry({
  id: "breadcrumb-separators",
  title: "Separators",
  description: "Different separator styles between breadcrumb items.",
  source: `import { Breadcrumb } from "@/components/_breadcrumb";

const separators = ["/", ">", "→", "|", "•"] as const;

export default function BreadcrumbSeparators() {
  return (
    <div className="flex flex-col gap-4">
      {separators.map((sep) => (
        <div key={sep} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground">
            Separator: <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{sep}</code>
          </p>
          <Breadcrumb
            separator={sep}
            items={[
              { label: "Home", href: "/" },
              { label: "Library", href: "/library" },
              { label: "Components" },
            ]}
          />
        </div>
      ))}
    </div>
  );
}`,
});
