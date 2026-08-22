import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutHeaderContent: RegistryEntry = entry({
    id: "layout-header-content",
    title: "Header + Content",
    description: "Brand bar with inline navigation above a content area.",
    source: `const links = ["Home", "About", "Contact"];

const zone =
  "flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10";

export default function LayoutHeaderContent() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-border bg-background px-3">
        <span className="text-xs font-semibold tracking-tight">Brand</span>
        <nav aria-label="Primary" className="flex items-center gap-0.5">
          {links.map((link, i) => (
            <button
              key={link}
              type="button"
              aria-current={i === 0 ? "page" : undefined}
              className={\`rounded-md px-2 py-1 text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 \${
                i === 0
                  ? "bg-primary-soft font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }\`}
            >
              {link}
            </button>
          ))}
        </nav>
      </div>
      <div className={zone}>Content</div>
    </div>
  );
}`,
  });
