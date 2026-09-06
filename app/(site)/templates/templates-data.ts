export interface TemplateEntry {
  title: string;
  description: string;
  category: string;
  pages: number;
  components: number;
  /** Live demo route — every href resolves to a real page. */
  href: string;
}

export const TEMPLATES: TemplateEntry[] = [
  {
    title: "SaaS Dashboard",
    description: "Admin dashboard with analytics, users, and billing.",
    category: "Dashboard",
    pages: 12,
    components: 45,
    href: "/dashboard",
  },
  {
    title: "Admin Panel",
    description: "Full admin panel with project tracking and management.",
    category: "Dashboard",
    pages: 8,
    components: 32,
    href: "/project-management",
  },
  {
    title: "E-commerce Store",
    description: "Product listing, cart, checkout, and order management.",
    category: "E-Commerce",
    pages: 15,
    components: 52,
    href: "/e-commerce",
  },
  {
    title: "AI SaaS",
    description: "AI-powered SaaS with chat interface and billing.",
    category: "SaaS",
    pages: 10,
    components: 38,
    href: "/saas",
  },
  {
    title: "Portfolio",
    description: "Personal portfolio with project showcase.",
    category: "Portfolio",
    pages: 6,
    components: 20,
    href: "/portfolio",
  },
  {
    title: "Documentation",
    description: "Technical documentation site with search and navigation.",
    category: "Documentation",
    pages: 20,
    components: 28,
    href: "/docs",
  },
];

export const TEMPLATE_CATEGORIES = [
  "All",
  ...Array.from(new Set(TEMPLATES.map((t) => t.category))),
];
