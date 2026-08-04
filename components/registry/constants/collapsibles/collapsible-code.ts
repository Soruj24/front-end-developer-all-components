import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleCode: RegistryEntry = entry({
  id: "collapsible-code",
  title: "Code Block",
  description: "Collapsible code file viewer.",
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

export default function CollapsibleCode() {
  return (
    <Collapsible>
      <CollapsibleHeader className="rounded-md bg-zinc-950 px-4 py-2">
        <CollapsibleTitle className="font-mono text-xs text-zinc-400">package.json</CollapsibleTitle>
        <CollapsibleTrigger>
          <ChevronIcon />
        </CollapsibleTrigger>
      </CollapsibleHeader>
      <CollapsibleContent>
        <pre className="overflow-auto rounded-b-md bg-zinc-950 p-4 text-xs text-zinc-100">
{JSON.stringify({
  name: "my-project",
  version: "1.0.0",
  scripts: { dev: "next dev", build: "next build", start: "next start" },
  dependencies: { next: "^14.0.0", react: "^18.2.0" }
}, null, 2)}
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
}`,
});
