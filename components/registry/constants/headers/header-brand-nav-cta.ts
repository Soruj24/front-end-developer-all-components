import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerBrandNavCta: RegistryEntry = entry({
    id: "header-brand-nav-cta",
    title: "Brand, Nav & CTA",
    description: "Brand, navigation, and call-to-action layouts — centered, split, and button-only variants.",
    source: `export default function HeaderBrandNavCta() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-[10px] font-bold text-background">L</span>
            <span className="text-sm font-bold">Brand</span>
          </div>
          <nav className="flex gap-4 text-xs text-zinc-500">
            {["Home", "Features", "Pricing", "About"].map((l) => (
              <span key={l} className="hover:text-zinc-950 dark:hover:text-zinc-50">{l}</span>
            ))}
          </nav>
          <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Get Started</button>
        </header>
        <div className={content}>Page Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-14 items-center justify-between border-b border-black/[.08] bg-white px-6 dark:border-white/[.145] dark:bg-black">
          <div />
          <nav className="flex gap-8 text-sm text-zinc-500">
            {["Home", "Features", "Pricing", "FAQ"].map((l, i) => (
              <span key={l} className={\`\${i === 0 ? "font-medium text-zinc-950 dark:text-zinc-50" : ""} hover:text-zinc-950 dark:hover:text-zinc-50\`}>{l}</span>
            ))}
          </nav>
          <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Sign Up</button>
        </header>
        <div className={content}>Hero Section</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-6 dark:border-white/[.145] dark:bg-black">
          <nav className="flex gap-6 text-xs text-zinc-500">
            <span className="font-medium text-zinc-950 dark:text-zinc-50">Home</span>
            <span>Products</span>
            <span>About</span>
          </nav>
          <span className="text-sm font-bold tracking-wider">BRAND</span>
          <nav className="flex gap-6 text-xs text-zinc-500">
            <span>Blog</span>
            <span>Contact</span>
            <span className="font-medium text-zinc-950 dark:text-zinc-50">Cart</span>
          </nav>
        </header>
        <div className={content}>Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-bold">Landing</span>
          <nav className="flex items-center gap-4 text-xs text-zinc-500">
            <span>Features</span>
            <span>Pricing</span>
            <span className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Get Started</span>
          </nav>
        </header>
        <div className={content}>Hero Section</div>
      </div>
    </div>
  );
}`,
  });
