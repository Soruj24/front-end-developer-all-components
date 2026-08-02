import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarLogo: RegistryEntry = entry({
    id: "navbar-logo",
    title: "Logo Positions",
    description: "Left-aligned and centered logo navigation bars.",
    source: `export default function NavbarLogo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">Logo</span>
        <div className="flex gap-4 text-xs text-zinc-500">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <div />
        <span className="text-sm font-bold tracking-widest uppercase">Brand</span>
        <span className="text-xs text-zinc-400">☰</span>
      </nav>
    </div>
  );
}`,
  });
