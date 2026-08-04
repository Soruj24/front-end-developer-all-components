import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleSettings: RegistryEntry = entry({
  id: "collapsible-settings",
  title: "Settings",
  description: "Settings panel with collapsible sections.",
  source: `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleHeader,
  CollapsibleTitle,
  CollapsibleContent,
} from "@/components/_collapsible";

function ChevronIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function CollapsibleSettings() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <h3 className="text-sm font-semibold">Advanced Settings</h3>
      <Collapsible>
        <CollapsibleHeader>
          <CollapsibleTitle className="text-sm">Performance</CollapsibleTitle>
          <CollapsibleTrigger>
            <ChevronIcon />
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <CollapsibleContent>
          <div className="space-y-3 pl-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              Enable caching
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Lazy loading
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              Compression
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleHeader>
          <CollapsibleTitle className="text-sm">Security</CollapsibleTitle>
          <CollapsibleTrigger>
            <ChevronIcon />
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <CollapsibleContent>
          <div className="space-y-3 pl-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              Two-factor authentication
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              Session timeout
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleHeader>
          <CollapsibleTitle className="text-sm">Notifications</CollapsibleTitle>
          <CollapsibleTrigger>
            <ChevronIcon />
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <CollapsibleContent>
          <div className="space-y-3 pl-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              Email notifications
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Push notifications
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}`,
});
