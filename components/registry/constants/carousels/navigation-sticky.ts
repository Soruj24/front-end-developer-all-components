import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationSticky: RegistryEntry = entry({
    id: "navigation-sticky",
    title: "Sticky Nav with Dropdown, Mega Menu & Cmd+K",
    description: "Sticky bar with hover mega menu, dropdown, command button, and mobile menu.",
    source: `import { useState } from "react";
import Link from "next/link";

const megaMenuProducts = [
  {
    category: "Analytics",
    items: ["Dashboards", "Reports", "Insights", "Forecasts"],
  },
  {
    category: "Developer",
    items: ["API", "Documentation", "SDKs", "Changelog"],
  },
  {
    category: "Marketing",
    items: ["Email", "Social", "SEO", "Ads"],
  },
];

export default function NavigationSticky() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="sticky top-0 z-30 flex w-full items-center justify-between rounded-lg border border-black/[.08] bg-white/80 px-4 py-3 backdrop-blur-md dark:border-white/[.145] dark:bg-zinc-900/80">
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold tracking-tight">Logo</span>
          <Link href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
            Home
          </Link>
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
              Products
              <span className="text-xs">▾</span>
            </button>
            {megaOpen && (
              <div className="absolute left-0 top-full mt-2 w-[500px] rounded-lg border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                <div className="grid grid-cols-3 gap-6">
                  {megaMenuProducts.map((group) => (
                    <div key={group.category} className="flex flex-col gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{group.category}</span>
                      {group.items.map((item) => (
                        <Link key={item} href="#" className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
                          {item}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                  <Link href="#" className="text-sm font-medium text-primary hover:text-primary dark:text-blue-400">
                    View all products →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setNavDropdown(true)} onMouseLeave={() => setNavDropdown(false)}>
            <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
              More
              <span className="text-xs">▾</span>
            </button>
            {navDropdown && (
              <div className="absolute left-0 top-full mt-2 w-44 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <button onClick={() => setNavDropdown(false)} className="w-full px-4 py-1.5 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Features</button>
                <button onClick={() => setNavDropdown(false)} className="w-full px-4 py-1.5 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Pricing</button>
                <button onClick={() => setNavDropdown(false)} className="w-full px-4 py-1.5 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Contact</button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => alert("Command palette would open here (Ctrl+K)")} className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
            ⌘K
          </button>
          <div className="flex items-center gap-2 sm:hidden">
            <button onClick={() => setMobileOpen((v) => !v)} className="flex h-8 w-8 flex-col items-center justify-center gap-1">
              <span className={\`block h-0.5 w-5 bg-zinc-600 transition-all dark:bg-zinc-300 \${mobileOpen ? "translate-y-[3px] rotate-45" : ""}\`} />
              <span className={\`block h-0.5 w-5 bg-zinc-600 transition-all dark:bg-zinc-300 \${mobileOpen ? "opacity-0" : ""}\`} />
              <span className={\`block h-0.5 w-5 bg-zinc-600 transition-all dark:bg-zinc-300 \${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}\`} />
            </button>
          </div>
        </div>
      </nav>
      <div className={\`overflow-hidden rounded-lg border border-black/[.08] transition-all dark:border-white/[.145] \${mobileOpen ? "max-h-40" : "max-h-0"} sm:hidden\`}>
        <div className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <Link key={item} href="#" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
