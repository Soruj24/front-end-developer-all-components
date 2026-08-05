export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export type ProjectCategory = "Web App" | "Mobile" | "E-Commerce" | "Dashboard" | "SaaS" | "Open Source";

export interface Skill {
  name: string;
  level: number;
  category: "Frontend" | "Backend" | "DevOps" | "Design";
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logo: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socials: { platform: string; url: string; icon: string }[];
}

export interface NavItem {
  label: string;
  href: string;
}
