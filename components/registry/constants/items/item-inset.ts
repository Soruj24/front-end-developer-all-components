import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const itemInset: RegistryEntry = entry({
  id: "item-inset",
  title: "Inset",
  description: "Item with inset padding for nested layouts.",
  source: `import { Item } from "@/components/_item";

export default function ItemInset() {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-2">
      <Item>Normal Item</Item>
      <Item inset>Inset Item</Item>
      <Item>Another Normal Item</Item>
      <Item inset>Another Inset Item</Item>
    </div>
  );
}`,
});
