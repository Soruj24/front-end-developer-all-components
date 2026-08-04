import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupSizes: RegistryEntry = entry({
  id: "button-group-sizes",
  title: "Sizes",
  description: "Three size options — small, medium, and large.",
  source: `import { ButtonGroup } from "@/components/_button-group";

const sizes = ["sm", "md", "lg"] as const;

export default function ButtonGroupSizes() {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground capitalize">{size}</p>
          <ButtonGroup size={size}>
            <button type="button" className="px-4 py-2 text-sm font-medium">Small</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Medium</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Large</button>
          </ButtonGroup>
        </div>
      ))}
    </div>
  );
}`,
});
