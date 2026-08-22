import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationBasic: RegistryEntry = entry({
    id: "navigation-basic",
    title: "Basic Horizontal Nav",
    description: "Simple inline link navigation bar with pill links and an active state.",
    source: `import Link from "next/link";

const navItems = ["Home", "Products", "About", "Contact"];

const linkBase =
  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export default function NavigationBasic() {
  return (
    <nav
      aria-label="Main"
      className="flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-2.5 shadow-xs"
    >
      <span className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground shadow-xs">
          CL
        </span>
        <span className="text-sm font-semibold tracking-tight text-foreground">Logo</span>
      </span>
      <div className="flex flex-wrap items-center gap-1">
        {navItems.map((item, i) => (
          <Link
            key={item}
            href="#"
            aria-current={i === 0 ? "page" : undefined}
            className={\`\${linkBase} \${
              i === 0
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }\`}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}`,
    });
