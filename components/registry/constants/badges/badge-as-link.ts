import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const badgeAsLink: RegistryEntry = entry({
    id: "badge-as-link",
    title: "As Link",
    description: "Clickable badges that navigate somewhere.",
    source: `export default function BadgeAsLink() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a href="#" className="rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800">
        Documentation
      </a>
      <a href="#" className="rounded-full bg-purple-100 px-2 py-1 text-sm font-medium text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800">
        API Reference
      </a>
      <a href="#" className="rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800">
        Changelog
      </a>
    </div>
  );
}`,
  });
