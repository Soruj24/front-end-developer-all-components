import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const badgeWithIcon: RegistryEntry = entry({
    id: "badge-with-icon",
    title: "With Icon",
    description: "Badges that pair a leading icon with the label.",
    source: `const Star = () => (
  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Check = () => (
  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"><Star />default</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100"><Star />primary</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-100"><Star />secondary</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-100"><Check />success</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"><Star />warning</span>
    </div>
  );
}`,
  });
