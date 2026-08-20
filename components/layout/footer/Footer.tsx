import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { BORDER, BG, LAYOUT } from "@/constants/tokens";
import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterSocials } from "./FooterSocials";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterBottom } from "./FooterBottom";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
      { label: "Playground", href: "/playground" },
      { label: "Registry", href: "/registry" },
      { label: "AI Generator", href: "/ai" },
      { label: "Visual Builder", href: "/visual-builder" },
      { label: "CLI", href: "/cli" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Guides", href: "/guides" },
      { label: "Examples", href: "/examples" },
      { label: "Changelog", href: "/changelog" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API", href: "/api" },
      { label: "SDK", href: "/sdk" },
      { label: "CLI", href: "/cli" },
      { label: "MCP", href: "/mcp" },
      { label: "Registry", href: "/registry" },
      { label: "GitHub", href: siteConfig.github },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={cn("border-t", BORDER.default, BG.base)} role="contentinfo">
      <div className={cn("mx-auto", LAYOUT.maxWidth, LAYOUT.px)}>
        <div className="grid gap-10 py-12 sm:gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:py-16">
          <FooterBrand />
          {footerSections.map((section) => (
            <FooterLinks
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        <FooterSocials />

        <div className="py-6">
          <FooterNewsletter />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
