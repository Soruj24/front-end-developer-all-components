import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const itemBasic: RegistryEntry = entry({
  id: "item-basic",
  title: "Basic",
  description: "A simple item with title and description.",
  source: `import { Item } from "@/components/_item";

export default function ItemBasic() {
  return (
    <div className="flex flex-col gap-1">
      <Item>Profile</Item>
      <Item>Settings</Item>
      <Item>Notifications</Item>
    </div>
  );
}`,
});
