import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const toggleGroupVariants: RegistryEntry = entry({
  id: "toggle-group-variants",
  title: "Variants",
  description: "Different visual styles.",
  source: `import { ToggleGroup, ToggleGroupItem } from "@/components/_toggle-group";

export default function ToggleGroupVariants() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" variant="default" defaultValue="a">
        <ToggleGroupItem value="a">Default</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline" defaultValue="a">
        <ToggleGroupItem value="a">Outline</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="ghost" defaultValue="a">
        <ToggleGroupItem value="a">Ghost</ToggleGroupItem>
        <ToggleGroupItem value="b">Option</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`,
});
