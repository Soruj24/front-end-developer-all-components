export interface NavItem {
  label: string;
  href: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  annualPrice: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  image: string;
}

export interface FAQ {
  id: number;
  q: string;
  a: string;
}

export interface Integration {
  id: number;
  name: string;
  category: string;
  logo: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
}

export interface CaseStudy {
  id: number;
  company: string;
  industry: string;
  metric: string;
  description: string;
  image: string;
}

export interface HowItWorks {
  id: number;
  step: string;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface ChangelogEntry {
  id: number;
  version: string;
  date: string;
  title: string;
  description: string;
  type: "feature" | "improvement" | "fix";
}

export interface TrustLogo {
  id: number;
  name: string;
}
