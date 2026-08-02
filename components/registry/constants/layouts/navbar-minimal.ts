import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarMinimal: RegistryEntry = entry({
    id: "navbar-minimal",
    title: "Minimal & Border Bottom",
    description: "Bare-bones and underline-only navigation bars.",
    source: `export default function NavbarMinimal() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-8 w-full items-center justify-center rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">Minimal</span>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between border-b border-black/[.08] px-4 dark:border-white/[.145]">
        <span className="text-sm font-bold">Logo</span>
        <div className="flex gap-6 text-xs font-medium text-zinc-500">
          <span className="text-zinc-950 dark:text-zinc-50">Home</span>
          <span>Features</span>
          <span>Pricing</span>
          <span>FAQ</span>
        </div>
        <span className="text-xs text-zinc-500">Login</span>
      </nav>
    </div>
  );
}`,
  });
