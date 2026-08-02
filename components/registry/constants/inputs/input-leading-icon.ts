import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputLeadingIcon: RegistryEntry = entry({
    id: "input-leading-icon",
    title: "With Leading Icon",
    description: "Inputs with an icon anchored to the left edge.",
    source: `const SearchIcon = () => (
  <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const base =
  "w-full rounded-lg border border-black/[.08] px-3 py-2 pl-10 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500";

export default function InputLeadingIcon() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
        <input type="text" placeholder="Search..." className={base} />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
        <input type="email" placeholder="you@example.com" className={base} />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2"><UserIcon /></span>
        <input type="text" placeholder="Username" className={base} />
      </div>
    </div>
  );
}`,
  });
