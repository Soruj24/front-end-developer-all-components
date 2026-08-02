import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarCta: RegistryEntry = entry({
    id: "navbar-cta",
    title: "CTA & Ghost Buttons",
    description: "Action-heavy navs with call-to-action buttons.",
    source: `export default function NavbarCta() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">Site</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">Login</span>
          <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
        </div>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">App</span>
        <div className="flex gap-2">
          <span className="rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-black/[.04]">Features</span>
          <span className="rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-black/[.04]">Pricing</span>
          <span className="rounded-md bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
        </div>
      </nav>
    </div>
  );
}`,
  });
