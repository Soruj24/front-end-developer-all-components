import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationScrollspy: RegistryEntry = entry({
    id: "navigation-scrollspy",
    title: "Scroll Spy & Section Highlights",
    description: "Section buttons and panels that highlight on scroll.",
    source: `import { useEffect, useState } from "react";

const sections = ["section-home", "section-features", "section-pricing", "section-contact"];

const label = (id: string) => id.replace("section-", "").replace(/^\\w/, (c) => c.toUpperCase());

export default function NavigationScrollSpy() {
  const [activeSection, setActiveSection] = useState("section-home");

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {sections.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={\`rounded-md px-3 py-1.5 text-xs font-medium transition-colors \${activeSection === id ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}\`}
          >
            {label(id)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {sections.map((id) => (
          <section
            key={id}
            id={id}
            className={\`rounded-lg border p-6 transition-colors \${activeSection === id ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800/50" : "border-black/[.08] dark:border-white/[.145]"}\`}
          >
            <h3 className="font-semibold">Section: {label(id)}</h3>
            <p className="mt-1 text-sm text-zinc-500">
              This section is {activeSection === id ? "currently active" : "not active"} in the scroll spy.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}`,
  });
