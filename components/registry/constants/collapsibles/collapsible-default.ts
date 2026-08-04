import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleDefault: RegistryEntry = entry({
  id: "collapsible-default",
  title: "Default",
  description: "Basic collapsible panel with toggle.",
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

export default function CollapsibleDefault() {
  return (
    <Collapsible>
      <CollapsibleHeader>
        <CollapsibleTitle>Click to toggle</CollapsibleTitle>
        <CollapsibleTrigger>
          <ChevronIcon />
        </CollapsibleTrigger>
      </CollapsibleHeader>
      <CollapsibleContent>
        <div className="rounded-md border p-4 text-sm">
          This is the collapsible content. You can put anything here — text,
          forms, images, or other components.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}`,
});
