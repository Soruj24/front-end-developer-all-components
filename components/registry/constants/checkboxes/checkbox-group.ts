import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxGroup: RegistryEntry = entry({
  id: "checkbox-group",
  title: "Group",
  description: "Checkbox group with select all functionality.",
  source: `import { useState } from "react";
import { Checkbox } from "@/components/_checkbox";

export default function CheckboxGroup() {
  const [allChecked, setAllChecked] = useState(false);
  const [features, setFeatures] = useState({ notifications: true, marketing: false, updates: true });

  function toggleAll() {
    const next = !allChecked;
    setAllChecked(next);
    setFeatures({ notifications: next, marketing: next, updates: next });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b pb-2">
        <Checkbox
          checked={allChecked}
          onChange={toggleAll}
        />
        <span className="text-sm font-medium">Select all</span>
      </div>
      <div className="flex flex-col gap-2 pl-6">
        <Checkbox
          checked={features.notifications}
          onChange={(e) => setFeatures((f) => ({ ...f, notifications: e.target.checked }))}
          label="Notifications"
        />
        <Checkbox
          checked={features.marketing}
          onChange={(e) => setFeatures((f) => ({ ...f, marketing: e.target.checked }))}
          label="Marketing emails"
        />
        <Checkbox
          checked={features.updates}
          onChange={(e) => setFeatures((f) => ({ ...f, updates: e.target.checked }))}
          label="Product updates"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Selected: {Object.entries(features).filter(([, v]) => v).map(([k]) => k).join(", ") || "none"}
      </p>
    </div>
  );
}`,
});
