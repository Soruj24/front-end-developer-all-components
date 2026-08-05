import type { Company, CompanyReview, Application, Recruiter } from "../types";

export const COMPANIES: Company[] = [
  { name: "Google", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", coverImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop", openRoles: 24, rating: 4.6, size: "100,000+", industry: "Technology", founded: "1998", headquarters: "Mountain View, CA" },
  { name: "Airbnb", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", coverImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop", openRoles: 18, rating: 4.4, size: "5,000 - 10,000", industry: "Travel", founded: "2008", headquarters: "San Francisco, CA" },
  { name: "Netflix", logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=100&h=100&fit=crop", coverImage: "https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=400&h=200&fit=crop", openRoles: 15, rating: 4.5, size: "10,000 - 20,000", industry: "Entertainment", founded: "1997", headquarters: "Los Gatos, CA" },
  { name: "Stripe", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", coverImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop", openRoles: 12, rating: 4.7, size: "5,000 - 10,000", industry: "FinTech", founded: "2010", headquarters: "San Francisco, CA" },
  { name: "Figma", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", coverImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop", openRoles: 8, rating: 4.8, size: "1,000 - 2,000", industry: "Design Tools", founded: "2012", headquarters: "San Francisco, CA" },
  { name: "Notion", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", coverImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop", openRoles: 10, rating: 4.5, size: "500 - 1,000", industry: "Productivity", founded: "2013", headquarters: "San Francisco, CA" },
];

export const COMPANY_REVIEWS: CompanyReview[] = [
  { company: "Google", companyLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", rating: 4.6, text: "Amazing engineering culture with cutting-edge projects. Great benefits and work-life balance.", role: "Senior Software Engineer", date: "2 months ago", pros: "Great culture, smart colleagues, excellent benefits", cons: "Can be bureaucratic at times" },
  { company: "Airbnb", companyLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", rating: 4.4, text: "Incredible mission and creative environment. Strong focus on design and user experience.", role: "Product Designer", date: "1 month ago", pros: "Mission-driven, creative freedom, travel benefits", cons: "Fast-paced, can be demanding" },
];

export const APPLICATIONS: Application[] = [
  { id: 1, title: "Senior Frontend Engineer", company: "Google", companyLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", status: "Interview", stage: "Technical Screen", date: "Aug 5, 2026" },
  { id: 2, title: "Product Designer", company: "Airbnb", companyLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", status: "Applied", stage: "Under Review", date: "Jul 28, 2026" },
  { id: 3, title: "DevOps Engineer", company: "Netflix", companyLogo: "https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=100&h=100&fit=crop", status: "Rejected", stage: "Closed", date: "Jul 20, 2026" },
  { id: 4, title: "Backend Engineer", company: "Stripe", companyLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", status: "Offer", stage: "Negotiation", date: "Aug 1, 2026" },
];

export const RECRUITER: Recruiter = {
  name: "Sarah Mitchell",
  title: "Senior Tech Recruiter",
  company: "Google",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  email: "sarah@google.com",
  phone: "+1 (555) 123-4567",
};
