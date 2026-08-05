export type TemplateCategory =
  | "Landing"
  | "SaaS"
  | "E-Commerce"
  | "Blog"
  | "Dashboard"
  | "Auth"
  | "Pricing"
  | "Documentation"
  | "Portfolio"
  | "Error"
  | "Coming Soon";

export type TemplateDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Template {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: TemplateCategory;
  difficulty: TemplateDifficulty;
  image: string;
  tags: string[];
  techStack: string[];
  author: string;
  authorAvatar: string;
  downloads: number;
  rating: number;
  reviews: number;
  price: "free" | "pro";
  features: string[];
  previewUrl: string;
  githubUrl: string;
  lastUpdated: string;
}

export interface TemplateFilter {
  category: TemplateCategory | "All";
  difficulty: TemplateDifficulty | "All";
  price: "all" | "free" | "pro";
  search: string;
}
