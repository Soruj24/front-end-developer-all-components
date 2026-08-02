import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfNavigation: RegistryEntry = entry({
    id: "nf-navigation",
    title: "Navigation 404s",
    description: "Sitemap, suggested, and masonry layouts to guide lost visitors.",
    source: `export default function NfNavigation() {
  const sitemapLinks = [
    { category: "Getting Started", links: ["Home", "About", "Features"] },
    { category: "Components", links: ["Charts", "Tooltips", "Dialogs", "Drawers"] },
    { category: "Resources", links: ["Docs", "Blog", "Support", "API"] },
  ];
  const popularPages = [
    { href: "#", label: "Home", desc: "Back to start" },
    { href: "#", label: "Charts", desc: "Visual data" },
    { href: "#", label: "Tooltips", desc: "Helpful hints" },
    { href: "#", label: "Timeline", desc: "Events in order" },
    { href: "#", label: "Dialog", desc: "Conversations" },
    { href: "#", label: "Drawer", desc: "Slide panels" },
    { href: "#", label: "Accordion", desc: "Collapsible" },
    { href: "#", label: "Carousel", desc: "Sliding cards" },
  ];
  const gridItems = popularPages.map((p, i) => ({ ...p, id: i }));

  return (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
        <h1 className="text-4xl font-bold text-zinc-300 dark:text-zinc-600">404</h1>
        <p className="mt-1 text-xs text-zinc-500">Page not found. Try one of these:</p>
        <div className="mt-5 grid grid-cols-3 gap-4 text-left">
          {sitemapLinks.map((section) => (
            <div key={section.category}>
              <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{section.category}</h3>
              <ul className="space-y-1.5">
                {section.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs text-indigo-500 hover:text-primary hover:underline">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
        <h1 className="text-4xl font-bold text-zinc-300 dark:text-zinc-600">404</h1>
        <p className="mt-1 text-xs text-zinc-500">Try these instead</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          {popularPages.slice(0, 4).map((p) => (
            <a key={p.href} href={p.href} className="group rounded-xl border-2 border-transparent bg-zinc-50 p-3 transition-all hover:border-indigo-300 hover:shadow-md dark:bg-zinc-700 dark:hover:border-indigo-400">
              <h3 className="text-sm font-semibold text-zinc-800 group-hover:text-primary dark:text-zinc-100 dark:group-hover:text-indigo-300">{p.label}</h3>
              <p className="mt-0.5 text-[10px] text-zinc-400">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
        <h1 className="text-4xl font-bold text-zinc-300 dark:text-zinc-600">404</h1>
        <p className="mt-1 text-xs text-zinc-500">Looking for something? Try these:</p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-left">
          {gridItems.map((item, i) => (
            <a
              key={item.id}
              href={item.href}
              className="rounded-lg border bg-zinc-50 p-2.5 transition-all hover:border-indigo-300 hover:shadow-md dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-indigo-400"
              style={{ gridRow: \`span \${i % 2 + 1}\` }}
            >
              <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">{item.label}</div>
              <div className="mt-0.5 text-[9px] text-zinc-400">{item.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
