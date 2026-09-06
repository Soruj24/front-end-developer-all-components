import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { LAYOUT } from "@/constants/tokens";
import { FooterBottom } from "./FooterBottom";

const QUICK_LINKS = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background" role="contentinfo">
      <div className={cn("mx-auto", LAYOUT.maxWidth, LAYOUT.px)}>
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex w-fit items-center gap-2.5" aria-label="Home">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-[11px] font-bold text-background">
              {siteConfig.shortName}
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
