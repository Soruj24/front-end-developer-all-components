import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const toggleGroupSingle: RegistryEntry = entry({
  id: "toggle-group-single",
  title: "Single",
  description: "Single-select toggle group.",
  source: `import { ToggleGroup, ToggleGroupItem } from "@/components/_toggle-group";

export default function ToggleGroupSingle() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}`,
});
