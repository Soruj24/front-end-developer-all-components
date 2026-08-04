import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const itemDisabled: RegistryEntry = entry({
  id: "item-disabled",
  title: "Disabled",
  description: "Item with disabled state.",
  source: `import { Item } from "@/components/_item";

export default function ItemDisabled() {
  return (
    <div className="flex flex-col gap-1">
      <Item>Active Item</Item>
      <Item disabled>Disabled Item</Item>
      <Item>Another Active Item</Item>
    </div>
  );
}`,
});
