import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationScrollspy: RegistryEntry = entry({
    id: "navigation-scrollspy",
    title: "Scroll Spy & Section Highlights",
    description: "Section pills and panels that highlight while scrolling.",
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
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Page sections">
        {sections.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeSection === id}
            onClick={() => scrollTo(id)}
            className={\`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 \${
              activeSection === id
                ? "bg-foreground text-background shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }\`}
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
            className={\`rounded-xl border p-5 transition-colors duration-300 \${
              activeSection === id
                ? "border-foreground/20 bg-muted/40 dark:border-ring/40 dark:bg-muted/60"
                : "border-border"
            }\`}
          >
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <span
                className={\`h-2 w-2 rounded-full transition-colors duration-300 \${
                  activeSection === id ? "bg-primary" : "bg-muted-foreground/30"
                }\`}
                aria-hidden="true"
              />
              Section: {label(id)}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              This section is {activeSection === id ? "currently active" : "not active"} in the scroll spy.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}`,
    });
