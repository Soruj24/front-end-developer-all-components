import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { TemplateCard } from "./TemplateCard";
import { Reveal } from "./Reveal";

// Hrefs point at live demo routes — every template opens a real page.
const templates = [
  { title: "SaaS Dashboard", description: "Admin dashboard with analytics, users, and billing.", category: "Dashboard", pages: 12, components: 45, href: "/dashboard" },
  { title: "Admin Panel", description: "Full admin panel with project tracking and management.", category: "Dashboard", pages: 8, components: 32, href: "/project-management" },
  { title: "E-commerce Store", description: "Product listing, cart, checkout, and order management.", category: "E-Commerce", pages: 15, components: 52, href: "/e-commerce" },
  { title: "AI SaaS", description: "AI-powered SaaS with chat interface and billing.", category: "SaaS", pages: 10, components: 38, href: "/saas" },
  { title: "Portfolio", description: "Personal portfolio with project showcase.", category: "Portfolio", pages: 6, components: 20, href: "/portfolio" },
  { title: "Documentation", description: "Technical documentation site with search and navigation.", category: "Documentation", pages: 20, components: 28, href: "/docs" },
];

export function TemplatesSection() {
  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Templates"
            title="Production-ready Templates"
            description="Start with a complete template and customize it to your needs."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard key={t.href} {...t} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 text-center">
            <Link
              href="/templates"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View All Templates
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
