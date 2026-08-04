import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const toggleGroupMultiple: RegistryEntry = entry({
  id: "toggle-group-multiple",
  title: "Multiple",
  description: "Multi-select toggle group.",
  source: `import { ToggleGroup, ToggleGroupItem } from "@/components/_toggle-group";

export default function ToggleGroupMultiple() {
  return (
    <ToggleGroup type="multiple" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  );
}`,
});
