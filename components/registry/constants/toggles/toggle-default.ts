import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const toggleDefault: RegistryEntry = entry({
  id: "toggle-default",
  title: "Default",
  description: "Default toggle button.",
  source: `import { Toggle } from "@/components/_toggle";

export default function ToggleDefault() {
  return <Toggle>Toggle</Toggle>;
}`,
});
