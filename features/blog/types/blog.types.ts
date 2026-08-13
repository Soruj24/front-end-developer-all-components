export interface BlogAuthor {
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: BlogCategory;
  author: BlogAuthor;
  date: string;
  readTime: string;
  featured?: boolean;
  tags?: string[];
  coverImage?: string;
  views?: number;
  likes?: number;
  comments?: BlogComment[];
}

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  replies?: BlogComment[];
}

export interface TocEntry {
  id: string;
  title: string;
  level: number;
}

export type BlogCategory =
  | "All"
  | "Technology"
  | "Design"
  | "Business"
  | "AI"
  | "Security";

export interface BlogCategoryCount {
  name: BlogCategory;
  count: number;
}

export interface BlogTag {
  name: string;
  count: number;
}

export interface BlogShareData {
  title: string;
  url: string;
  excerpt: string;
}
