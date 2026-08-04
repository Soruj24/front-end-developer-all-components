import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupDefault: RegistryEntry = entry({
  id: "button-group-default",
  title: "Default",
  description: "Basic button group with shared styling.",
  source: `import { ButtonGroup } from "@/components/_button-group";

export default function ButtonGroupDefault() {
  return (
    <ButtonGroup>
      <button type="button" className="px-4 py-2 text-sm font-medium">Left</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">Center</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">Right</button>
    </ButtonGroup>
  );
}`,
});
