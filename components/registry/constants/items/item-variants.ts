import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const itemVariants: RegistryEntry = entry({
  id: "item-variants",
  title: "Variants",
  description: "Different visual states of the item.",
  source: `import { Item } from "@/components/_item";

export default function ItemVariants() {
  return (
    <div className="flex flex-col gap-1">
      <Item>Default</Item>
      <Item selected>Selected</Item>
      <Item disabled>Disabled</Item>
      <Item selected disabled>Selected & Disabled</Item>
    </div>
  );
}`,
});
