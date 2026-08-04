import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleNested: RegistryEntry = entry({
  id: "collapsible-nested",
  title: "Nested",
  description: "Multiple collapsibles stacked together.",
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

export default function CollapsibleNested() {
  return (
    <div className="flex flex-col gap-2">
      <Collapsible>
        <CollapsibleHeader>
          <CollapsibleTitle>Getting Started</CollapsibleTitle>
          <CollapsibleTrigger>
            <ChevronIcon />
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <CollapsibleContent>
          <div className="space-y-2 pl-4 text-sm">
            <p>1. Install the package</p>
            <p>2. Configure your project</p>
            <p>3. Import components</p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleHeader>
          <CollapsibleTitle>Configuration</CollapsibleTitle>
          <CollapsibleTrigger>
            <ChevronIcon />
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <CollapsibleContent>
          <div className="space-y-2 pl-4 text-sm">
            <p>• Theme settings</p>
            <p>• API endpoints</p>
            <p>• Authentication</p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleHeader>
          <CollapsibleTitle>Advanced</CollapsibleTitle>
          <CollapsibleTrigger>
            <ChevronIcon />
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <CollapsibleContent>
          <div className="space-y-2 pl-4 text-sm">
            <p>• Custom hooks</p>
            <p>• Performance optimization</p>
            <p>• Deployment</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}`,
});
