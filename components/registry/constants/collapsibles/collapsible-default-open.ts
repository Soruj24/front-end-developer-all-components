import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleDefaultOpen: RegistryEntry = entry({
  id: "collapsible-default-open",
  title: "Default Open",
  description: "Collapsible that starts in the open state.",
  source: `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleHeader,
  CollapsibleTitle,
  CollapsibleContent,
} from "@/components/_collapsible";

function ChevronIcon() {
  return (
    <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function CollapsibleDefaultOpen() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleHeader>
        <CollapsibleTitle>Starts open</CollapsibleTitle>
        <CollapsibleTrigger>
          <ChevronIcon />
        </CollapsibleTrigger>
      </CollapsibleHeader>
      <CollapsibleContent>
        <div className="rounded-md border p-4 text-sm">
          This collapsible is open by default. Click the trigger to close it.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}`,
});
