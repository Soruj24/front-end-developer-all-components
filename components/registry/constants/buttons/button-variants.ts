import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonVariants: RegistryEntry = entry({
    id: "button-variants",
    title: "Variants",
    description:
      "Five visual styles — primary, secondary, outline, ghost, and destructive.",
    source: `import { Button } from "@/components/ui";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`,
  });
