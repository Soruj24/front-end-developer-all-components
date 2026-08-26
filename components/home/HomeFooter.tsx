import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/layout/icons";
import { XIcon } from "./icons";
import { Card, CardContent } from "@/components/design-system/Card";

const columns = [
  {
    title: "Components",
    links: [
      { label: "Buttons", href: "/buttons" },
      { label: "Cards", href: "/cards" },
      { label: "Inputs", href: "/inputs" },
      { label: "Table", href: "/table" },
      { label: "Badge", href: "/badge" },
      { label: "Toast", href: "/toast" },
    ],
  },
  {
    title: "Templates",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "E-commerce", href: "/e-commerce" },
      { label: "Chat", href: "/chat" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Routing", href: "/routing" },
      { label: "Data Fetching", href: "/data-fetching" },
      { label: "Styling", href: "/styling" },
      { label: "Command Menu", href: "/command-menu" },
      { label: "404", href: "/404" },
    ],
  },
];

const socials = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: GithubIcon,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: XIcon,
  },
];

/** Multi-column site footer. */
export function HomeFooter() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex max-w-xs flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-[11px] font-bold text-accent-foreground">
                {siteConfig.shortName}
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-ring/40 hover:bg-muted hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-[13px] text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Built for developers, by developers.
          </p>
          <p className="flex items-center gap-1.5">
            Next.js 16
            <span className="h-0.5 w-0.5 rounded-full bg-border" aria-hidden="true" />
            React 19
            <span className="h-0.5 w-0.5 rounded-full bg-border" aria-hidden="true" />
            Tailwind CSS v4
            <span className="h-0.5 w-0.5 rounded-full bg-border" aria-hidden="true" />
            TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
