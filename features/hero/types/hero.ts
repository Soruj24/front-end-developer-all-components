export interface HeroPattern {
  id: string;
  title: string;
  category: HeroCategory;
  description: string;
  tags: string[];
}

export type HeroCategory =
  | "Centered"
  | "Split"
  | "Stats"
  | "Industry"
  | "Layout"
  | "Visual"
  | "Content"
  | "CTA"
  | "Mini"
  | "Animated"
  | "Media"
  | "Interactive";
