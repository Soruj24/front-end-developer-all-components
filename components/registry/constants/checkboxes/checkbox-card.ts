import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxCard: RegistryEntry = entry({
  id: "checkbox-card",
  title: "Card",
  description: "Checkboxes styled as selectable cards.",
  source: `import { Checkbox } from "@/components/_checkbox";

export default function CheckboxCard() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
        <Checkbox className="mt-0.5" defaultChecked />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Professional</span>
          <span className="text-xs text-muted-foreground">Advanced features for teams</span>
        </div>
      </label>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
        <Checkbox className="mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Enterprise</span>
          <span className="text-xs text-muted-foreground">Custom solutions for large orgs</span>
        </div>
      </label>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
        <Checkbox className="mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Startup</span>
          <span className="text-xs text-muted-foreground">Everything you need to launch</span>
        </div>
      </label>
    </div>
  );
}`,
});
