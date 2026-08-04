import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupVariants: RegistryEntry = entry({
  id: "button-group-variants",
  title: "Variants",
  description: "Three visual styles — default, outline, and ghost.",
  source: `import { ButtonGroup } from "@/components/_button-group";

const variants = ["default", "outline", "ghost"] as const;

export default function ButtonGroupVariants() {
  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground capitalize">{variant}</p>
          <ButtonGroup variant={variant}>
            <button type="button" className="px-4 py-2 text-sm font-medium">One</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Two</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Three</button>
          </ButtonGroup>
        </div>
      ))}
    </div>
  );
}`,
});
