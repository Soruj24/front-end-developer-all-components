import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxWithDescription: RegistryEntry = entry({
  id: "checkbox-with-description",
  title: "With Description",
  description: "Checkboxes with descriptive text below.",
  source: `import { useState } from "react";
import { Checkbox } from "@/components/_checkbox";

export default function CheckboxWithDescription() {
  const [terms, setTerms] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mt-1"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Accept terms and conditions</span>
          <span className="text-xs text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox className="mt-1" defaultChecked />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Enable dark mode</span>
          <span className="text-xs text-muted-foreground">
            Switch to a darker color scheme for better visibility in low light.
          </span>
        </div>
      </div>
    </div>
  );
}`,
});
