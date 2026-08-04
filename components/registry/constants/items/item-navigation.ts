import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const itemNavigation: RegistryEntry = entry({
  id: "item-navigation",
  title: "Navigation",
  description: "Items used in navigation menus.",
  source: `import { Item } from "@/components/_item";

function ChevronIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ItemNavigation() {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-2">
      <Item icon={<ChevronIcon />}>Getting Started</Item>
      <Item icon={<ChevronIcon />}>Components</Item>
      <Item icon={<ChevronIcon />}>Documentation</Item>
      <Item icon={<ChevronIcon />}>Examples</Item>
    </div>
  );
}`,
});
