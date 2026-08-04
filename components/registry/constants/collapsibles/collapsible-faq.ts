import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleFaq: RegistryEntry = entry({
  id: "collapsible-faq",
  title: "FAQ",
  description: "Frequently asked questions accordion.",
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

const faqs = [
  { q: "What is this component?", a: "A collapsible is an interactive element that expands and collapses to show or hide content." },
  { q: "When should I use it?", a: "Use collapsibles for FAQs, navigation menus, settings panels, or anywhere you want to progressively disclose content." },
  { q: "Is it accessible?", a: "Yes! It uses proper ARIA attributes and keyboard navigation to ensure accessibility for all users." },
  { q: "Can I nest them?", a: "Absolutely! You can nest collapsibles inside each other for hierarchical content structures." },
];

export default function CollapsibleFaq() {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((item, i) => (
        <Collapsible key={i}>
          <CollapsibleHeader className="rounded-md border px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <CollapsibleTitle className="text-sm font-medium">{item.q}</CollapsibleTitle>
            <CollapsibleTrigger>
              <ChevronIcon />
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleContent>
            <div className="px-4 pb-4 text-sm text-muted-foreground">
              {item.a}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}`,
});
