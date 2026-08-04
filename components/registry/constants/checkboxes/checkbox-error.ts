import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxError: RegistryEntry = entry({
  id: "checkbox-error",
  title: "Error",
  description: "Checkboxes with error state.",
  source: `import { Checkbox } from "@/components/_checkbox";

export default function CheckboxError() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox error label="This field is required" />
      <Checkbox error defaultChecked label="Invalid selection" />
      <p className="text-xs text-red-500">Please fix the errors above before continuing.</p>
    </div>
  );
}`,
});
