import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const itemSelected: RegistryEntry = entry({
  id: "item-selected",
  title: "Selected",
  description: "Item with selected state.",
  source: `import { Item } from "@/components/_item";

export default function ItemSelected() {
  return (
    <div className="flex flex-col gap-1">
      <Item selected>Selected Item</Item>
      <Item>Unselected Item</Item>
      <Item>Another Item</Item>
    </div>
  );
}`,
});
