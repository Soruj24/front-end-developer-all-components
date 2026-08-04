import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const togglePressed: RegistryEntry = entry({
  id: "toggle-pressed",
  title: "Pressed",
  description: "Controlled pressed state.",
  source: `import { Toggle } from "@/components/_toggle";

export default function TogglePressed() {
  return (
    <div className="flex items-center gap-4">
      <Toggle pressed>Pressed</Toggle>
      <Toggle>Not Pressed</Toggle>
    </div>
  );
}`,
});
