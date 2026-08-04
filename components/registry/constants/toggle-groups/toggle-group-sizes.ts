import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const toggleGroupSizes: RegistryEntry = entry({
  id: "toggle-group-sizes",
  title: "Sizes",
  description: "Different sizes for the toggle group.",
  source: `import { ToggleGroup, ToggleGroupItem } from "@/components/_toggle-group";

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" size="sm" defaultValue="a">
        <ToggleGroupItem value="a">Small</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="md" defaultValue="a">
        <ToggleGroupItem value="a">Medium</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="a">
        <ToggleGroupItem value="a">Large</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`,
});
