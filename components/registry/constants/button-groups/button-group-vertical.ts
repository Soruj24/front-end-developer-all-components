import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupVertical: RegistryEntry = entry({
  id: "button-group-vertical",
  title: "Vertical",
  description: "Vertically stacked button group.",
  source: `import { ButtonGroup } from "@/components/_button-group";

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <button type="button" className="px-4 py-2 text-sm font-medium">Top</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">Middle</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">Bottom</button>
    </ButtonGroup>
  );
}`,
});
