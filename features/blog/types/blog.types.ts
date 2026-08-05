export interface BlogAuthor {
  name: string;
  avatar?: string;
  role?: string;
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
