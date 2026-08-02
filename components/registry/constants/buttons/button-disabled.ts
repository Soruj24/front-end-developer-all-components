import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonDisabled: RegistryEntry = entry({
    id: "button-disabled",
    title: "Disabled",
    description: "Every variant in its disabled state.",
    source: `import { Button } from "@/components/ui";

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  );
}`,
  });
