import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const itemGroup: RegistryEntry = entry({
  id: "item-group",
  title: "Group",
  description: "Grouped items with dividers.",
  source: `import { Item } from "@/components/_item";

export default function ItemGroup() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="px-2 text-xs font-medium text-muted-foreground">Account</p>
        <Item>Profile</Item>
        <Item>Settings</Item>
        <Item>Notifications</Item>
      </div>
      <div className="h-px bg-border" />
      <div className="flex flex-col gap-1">
        <p className="px-2 text-xs font-medium text-muted-foreground">Actions</p>
        <Item>Sign Out</Item>
        <Item disabled>Delete Account</Item>
      </div>
    </div>
  );
}`,
});
