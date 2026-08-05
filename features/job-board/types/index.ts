export interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  type: string;
  remote: boolean;
  urgent: boolean;
  skills: string[];
  posted: string;
  description: string;
  benefits: string[];
  experience: string;
  category: string;
}

export interface FeaturedJob {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  type: string;
  remote: boolean;
  urgent: boolean;
  gradient: string;
}

export interface Company {
  name: string;
  logo: string;
  coverImage: string;
  openRoles: number;
  rating: number;
  size: string;
  industry: string;
  founded: string;
  headquarters: string;
}

export interface CompanyReview {
  company: string;
  companyLogo: string;
  rating: number;
  text: string;
  role: string;
  date: string;
  pros: string;
  cons: string;
}

export interface Application {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  status: string;
  stage: string;
  date: string;
}

export interface SimilarJob {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  type: string;
}

export interface RecommendedJob {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  match: number;
  skills: string[];
}

export interface CareerResource {
  title: string;
  reads: string;
  image: string;
  category: string;
}

export interface Recruiter {
  name: string;
  title: string;
  company: string;
  avatar: string;
  email: string;
  phone: string;
}
