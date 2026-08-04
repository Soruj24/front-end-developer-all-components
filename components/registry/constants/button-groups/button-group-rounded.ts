import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupRounded: RegistryEntry = entry({
  id: "button-group-rounded",
  title: "Rounded",
  description: "Rounded vs square button groups.",
  source: `import { ButtonGroup } from "@/components/_button-group";

export default function ButtonGroupRounded() {
  return (
    <div className="flex gap-4">
      <ButtonGroup rounded>
        <button type="button" className="px-4 py-2 text-sm font-medium">Rounded</button>
        <button type="button" className="px-4 py-2 text-sm font-medium">Group</button>
        <button type="button" className="px-4 py-2 text-sm font-medium">Buttons</button>
      </ButtonGroup>
      <ButtonGroup rounded={false}>
        <button type="button" className="px-4 py-2 text-sm font-medium">Square</button>
        <button type="button" className="px-4 py-2 text-sm font-medium">Group</button>
        <button type="button" className="px-4 py-2 text-sm font-medium">Buttons</button>
      </ButtonGroup>
    </div>
  );
}`,
});
