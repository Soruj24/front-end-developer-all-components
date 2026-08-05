export interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Active" | "New" | "Inactive";
  dealValue: number;
  avatar: string;
  image: string;
}

export interface Lead {
  id: number;
  name: string;
  company: string;
  score: number;
  source: string;
  interest: "Enterprise" | "Pro" | "Starter";
  status: "Hot" | "Warm" | "Cold";
  avatar: string;
  image: string;
}

export interface Deal {
  title: string;
  value: string;
  owner: string;
}

export interface PipelineStage {
  name: string;
  color: string;
  deals: Deal[];
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  employees: string;
  revenue: string;
  location: string;
  tier: "Enterprise" | "Mid-Market" | "Starter";
}

export interface TimelineEvent {
  id: number;
  type: "call" | "email" | "meeting" | "note" | "task" | "deal";
  description: string;
  date: string;
  user: string;
}

export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  opens: string;
  clicks: string;
  lastUsed: string;
}

export interface CallLog {
  id: number;
  contact: string;
  duration: string;
  direction: "Outbound" | "Inbound";
  result: string;
  date: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  duration: string;
  with: string;
  type: "Video Call" | "In-Person" | "Phone Call";
}

export interface Task {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  assignee: string;
  status: "In Progress" | "Pending" | "Done";
}

export interface Note {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  pinned: boolean;
}

export interface Segment {
  name: string;
  count: number;
  revenue: string;
  growth: string;
  color: string;
}

export interface SalesDataPoint {
  month: string;
  actual: number | null;
  forecast: number;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  icon: string;
  positive: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  deals: number;
  revenue: string;
  target: string;
  attainment: string;
  avatar: string;
  image: string;
}

export interface Report {
  name: string;
  type: string;
  size: string;
  lastRun: string;
  frequency: string;
}

export interface Enrichment {
  field: string;
  source: string;
  status: "Enriched" | "Pending" | "Processing";
  confidence: number;
}

export interface HealthScore {
  company: string;
  score: number;
  usage: string;
  support: string;
  sentiment: string;
  risk: "Low" | "Medium" | "High";
}

export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  priority: "High" | "Medium" | "Low" | "Urgent";
  status: "Open" | "In Progress" | "Resolved";
  age: string;
  agent: string;
}

export interface KBArticle {
  title: string;
  category: string;
  views: number;
  helpful: number;
  updated: string;
}

export interface Contract {
  id: string;
  client: string;
  type: string;
  value: string;
  start: string;
  end: string;
  status: "Active" | "Pending" | "Expiring" | "Expired";
}

export interface Invoice {
  id: string;
  client: string;
  amount: string;
  issued: string;
  due: string;
  status: "Paid" | "Overdue" | "Pending" | "Draft";
}

export interface Quote {
  id: string;
  client: string;
  items: number;
  total: string;
  status: "Sent" | "Draft" | "Negotiating" | "Accepted";
  validUntil: string;
  probability: string;
}

export interface CRMProduct {
  name: string;
  category: string;
  price: string;
  features: string;
  tier: string;
}

export interface Territory {
  region: string;
  rep: string;
  deals: number;
  revenue: string;
  quota: string;
  attainment: string;
  image: string;
}

export interface Goal {
  metric: string;
  target: string;
  current: string;
  progress: number;
  deadline: string;
}

export interface Commission {
  rep: string;
  deals: number;
  commission: string;
  rate: string;
  tier: "Platinum" | "Gold" | "Silver" | "Bronze";
  image: string;
}

export interface ChurnRisk {
  company: string;
  risk: "High" | "Medium" | "Low";
  reason: string;
  contacts: number;
  value: string;
}

export interface NPSSurvey {
  customer: string;
  score: number;
  comment: string;
  date: string;
}

export interface Campaign {
  name: string;
  type: string;
  sent: number;
  opens: string;
  clicks: string;
  leads: number;
  revenue: string;
  status: "Completed" | "In Progress" | "Scheduled";
}

export interface Email {
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  image: string;
}

export interface Customer360 {
  name: string;
  title: string;
  company: string;
  tier: string;
  annualValue: string;
  healthScore: number;
  interactions: number;
  openDeals: number;
  email: string;
  phone: string;
  lastContact: string;
  avatar: string;
  image: string;
  activities: string[];
}
