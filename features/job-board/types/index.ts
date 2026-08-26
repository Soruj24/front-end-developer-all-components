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

export interface JobAlert {
  id: string;
  query: string;
  location: string;
  types: string[];
  levels: string[];
  salaryMin: number;
  salaryMax: number;
  frequency: "daily" | "weekly" | "instant";
  createdAt: string;
  active: boolean;
}

export interface JobNote {
  jobId: number;
  note: string;
  updatedAt: string;
}

export interface SalaryInsight {
  title: string;
  location: string;
  median: number;
  p25: number;
  p75: number;
  p90: number;
  growth: number;
  openRoles: number;
}

export interface InterviewQuestion {
  id: number;
  category: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tips: string;
  timeLimit: string;
}

export interface CompanyInsight {
  name: string;
  logo: string;
  workLifeBalance: number;
  compensation: number;
  culture: number;
  careerGrowth: number;
  diversity: number;
  recommendToFriend: number;
  totalReviews: number;
  ceo: string;
  ceoApproval: number;
  pros: string[];
  cons: string[];
}

export type SortOption = "relevance" | "salary-high" | "salary-low" | "date-new" | "date-old";

export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}

export interface BookmarkCategory {
  id: string;
  name: string;
  color: string;
  jobIds: number[];
}

export interface SearchHistoryEntry {
  id: string;
  query: string;
  location: string;
  timestamp: string;
}

export interface SalaryCalculation {
  baseSalary: number;
  bonus: number;
  equity: number;
  totalComp: number;
  monthlyGross: number;
  monthlyNet: number;
  taxRate: number;
}

export interface CareerPathNode {
  id: number;
  title: string;
  level: string;
  salaryRange: string;
  yearsExp: string;
  skills: string[];
  next: number[];
}

export interface JobMarketReport {
  category: string;
  totalJobs: number;
  avgSalary: number;
  growth: number;
  topSkills: string[];
  topCompanies: string[];
  demandLevel: "High" | "Medium" | "Low";
}

export interface CompanyDirectoryEntry {
  name: string;
  logo: string;
  industry: string;
  size: string;
  headquarters: string;
  openRoles: number;
  rating: number;
  founded: string;
  website: string;
  description: string;
}
