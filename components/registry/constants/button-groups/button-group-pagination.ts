import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupPagination: RegistryEntry = entry({
  id: "button-group-pagination",
  title: "Pagination",
  description: "Pagination control using button group.",
  source: `import { ButtonGroup } from "@/components/_button-group";

export default function ButtonGroupPagination() {
  return (
    <ButtonGroup variant="outline" size="sm">
      <button type="button" className="px-3 py-2 text-sm font-medium" disabled>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button type="button" className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">1</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">2</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">3</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">...</button>
      <button type="button" className="px-4 py-2 text-sm font-medium">10</button>
      <button type="button" className="px-3 py-2 text-sm font-medium">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </ButtonGroup>
  );
}`,
});
