import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxDefault: RegistryEntry = entry({
  id: "checkbox-default",
  title: "Default",
  description: "Basic checkbox with label, checked, and disabled states.",
  source: `import { Checkbox } from "@/components/_checkbox";

export default function CheckboxDefault() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="Accept terms and conditions" />
      <Checkbox label="Send me marketing emails" defaultChecked />
      <Checkbox label="Enable notifications" disabled />
    </div>
  );
}`,
});
