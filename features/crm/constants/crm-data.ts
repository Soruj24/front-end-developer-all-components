import type {
  Contact,
  Lead,
  PipelineStage,
  Company,
  TimelineEvent,
  EmailTemplate,
  CallLog,
  Meeting,
  Task,
  Note,
  Segment,
  SalesDataPoint,
  DashboardMetric,
  LeaderboardEntry,
  Report,
  Enrichment,
  HealthScore,
  SupportTicket,
  KBArticle,
  Contract,
  Invoice,
  Quote,
  CRMProduct,
  Territory,
  Goal,
  Commission,
  ChurnRisk,
  NPSSurvey,
  Campaign,
  Email,
  Customer360,
} from "../types";

export const contacts: Contact[] = [
  { id: 1, name: "Alice Johnson", company: "Acme Corp", email: "alice@acme.com", phone: "+1 (555) 123-4567", status: "Active", dealValue: 45000, avatar: "AJ", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Bob Smith", company: "Globex Inc", email: "bob@globex.com", phone: "+1 (555) 234-5678", status: "New", dealValue: 28000, avatar: "BS", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Carol White", company: "Initech", email: "carol@initech.com", phone: "+1 (555) 345-6789", status: "Active", dealValue: 62000, avatar: "CW", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: 4, name: "David Lee", company: "Umbrella Corp", email: "david@umbrella.com", phone: "+1 (555) 456-7890", status: "Inactive", dealValue: 15000, avatar: "DL", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "Eva Martinez", company: "Hooli", email: "eva@hooli.com", phone: "+1 (555) 567-8901", status: "Active", dealValue: 89000, avatar: "EM", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
];

export const leads: Lead[] = [
  { id: 1, name: "Frank Ocean", company: "Oceanic Ventures", score: 92, source: "Referral", interest: "Enterprise", status: "Hot", avatar: "FO", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Grace Kim", company: "Kim & Co", score: 78, source: "Website", interest: "Pro", status: "Warm", avatar: "GK", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Henry Brown", company: "Brown Industries", score: 45, source: "LinkedIn", interest: "Starter", status: "Cold", avatar: "HB", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { id: 4, name: "Iris Chang", company: "Chang Tech", score: 88, source: "Conference", interest: "Enterprise", status: "Hot", avatar: "IC", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "Jack Wilson", company: "Wilson Group", score: 63, source: "Ad", interest: "Pro", status: "Warm", avatar: "JW", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 6, name: "Kate Davis", company: "Davis Digital", score: 35, source: "Cold Call", interest: "Starter", status: "Cold", avatar: "KD", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
];

export const pipelineStages: PipelineStage[] = [
  { name: "Discovery", color: "bg-blue-500", deals: [{ title: "Acme Corp Platform", value: "$45,000", owner: "Alice" }, { title: "Globex Migration", value: "$28,000", owner: "Bob" }] },
  { name: "Proposal", color: "bg-purple-500", deals: [{ title: "Initech SaaS", value: "$62,000", owner: "Carol" }, { title: "Umbrella Security", value: "$15,000", owner: "David" }, { title: "Hooli Enterprise", value: "$89,000", owner: "Eva" }] },
  { name: "Negotiation", color: "bg-amber-500", deals: [{ title: "Oceanic Analytics", value: "$120,000", owner: "Frank" }, { title: "Kim Platform", value: "$35,000", owner: "Grace" }] },
  { name: "Closed Won", color: "bg-green-500", deals: [{ title: "Brown Consulting", value: "$55,000", owner: "Henry" }, { title: "Chang AI Suite", value: "$200,000", owner: "Iris" }] },
  { name: "Closed Lost", color: "bg-red-500", deals: [{ title: "Wilson Tools", value: "$18,000", owner: "Jack" }] },
];

export const companies: Company[] = [
  { id: 1, name: "Acme Corp", industry: "Technology", employees: "1,200", revenue: "$340M", location: "San Francisco, CA", tier: "Enterprise" },
  { id: 2, name: "Globex Inc", industry: "Manufacturing", employees: "4,500", revenue: "$1.2B", location: "Detroit, MI", tier: "Enterprise" },
  { id: 3, name: "Initech", industry: "Software", employees: "320", revenue: "$85M", location: "Austin, TX", tier: "Mid-Market" },
  { id: 4, name: "Umbrella Corp", industry: "Pharmaceuticals", employees: "8,000", revenue: "$2.8B", location: "Racoon City, OR", tier: "Enterprise" },
  { id: 5, name: "Hooli", industry: "Technology", employees: "2,100", revenue: "$780M", location: "Palo Alto, CA", tier: "Enterprise" },
];

export const timelineEvents: TimelineEvent[] = [
  { id: 1, type: "call", description: "Discovery call with Alice Johnson", date: "Today, 10:30 AM", user: "Sarah M." },
  { id: 2, type: "email", description: "Sent proposal to Bob Smith", date: "Today, 9:15 AM", user: "Sarah M." },
  { id: 3, type: "meeting", description: "Product demo with Carol White", date: "Yesterday, 2:00 PM", user: "John D." },
  { id: 4, type: "note", description: "Follow-up notes - interested in API integration", date: "Yesterday, 11:45 AM", user: "John D." },
  { id: 5, type: "task", description: "Completed security questionnaire for Hooli", date: "2 days ago", user: "Sarah M." },
  { id: 6, type: "deal", description: "Deal closed - Acme Corp Platform", date: "3 days ago", user: "Alice" },
];

export const emailTemplates: EmailTemplate[] = [
  { id: 1, name: "Cold Outreach - Enterprise", subject: "Improving your sales workflow", opens: "24%", clicks: "8%", lastUsed: "2 days ago" },
  { id: 2, name: "Follow-up after Demo", subject: "Next steps with [Company]", opens: "42%", clicks: "15%", lastUsed: "1 week ago" },
  { id: 3, name: "Proposal Delivery", subject: "Your custom proposal from our team", opens: "68%", clicks: "31%", lastUsed: "3 days ago" },
  { id: 4, name: "Re-engagement Campaign", subject: "We haven't spoken in a while", opens: "18%", clicks: "4%", lastUsed: "2 weeks ago" },
  { id: 5, name: "Customer Satisfaction Survey", subject: "How was your experience?", opens: "35%", clicks: "12%", lastUsed: "5 days ago" },
];

export const callLogs: CallLog[] = [
  { id: 1, contact: "Alice Johnson", duration: "12:34", direction: "Outbound", result: "Connected - interested", date: "Today, 10:30 AM" },
  { id: 2, contact: "Bob Smith", duration: "5:12", direction: "Inbound", result: "Left voicemail", date: "Today, 8:45 AM" },
  { id: 3, contact: "Carol White", duration: "23:08", direction: "Outbound", result: "Demo scheduled", date: "Yesterday, 3:15 PM" },
  { id: 4, contact: "David Lee", duration: "3:45", direction: "Outbound", result: "No answer", date: "Yesterday, 1:00 PM" },
  { id: 5, contact: "Eva Martinez", duration: "8:22", direction: "Inbound", result: "Support issue resolved", date: "2 days ago" },
];

export const meetings: Meeting[] = [
  { id: 1, title: "Product Demo - Acme Corp", date: "Today, 2:00 PM", duration: "45 min", with: "Alice Johnson", type: "Video Call" },
  { id: 2, title: "Proposal Review - Globex", date: "Tomorrow, 10:00 AM", duration: "60 min", with: "Bob Smith, Steve R.", type: "In-Person" },
  { id: 3, title: "Quarterly Review", date: "Nov 15, 2026, 11:00 AM", duration: "90 min", with: "Internal Team", type: "Video Call" },
  { id: 4, title: "Contract Negotiation - Hooli", date: "Nov 18, 2026, 1:00 PM", duration: "60 min", with: "Eva Martinez, Legal", type: "Video Call" },
  { id: 5, title: "Customer Check-in - Initech", date: "Nov 20, 2026, 9:30 AM", duration: "30 min", with: "Carol White", type: "Phone Call" },
];

export const tasks: Task[] = [
  { id: 1, title: "Send proposal to Globex", priority: "High", due: "Today", assignee: "Sarah M.", status: "In Progress" },
  { id: 2, title: "Follow up with Alice Johnson", priority: "High", due: "Tomorrow", assignee: "Sarah M.", status: "Pending" },
  { id: 3, title: "Update CRM records for Q4", priority: "Medium", due: "Nov 14", assignee: "John D.", status: "Pending" },
  { id: 4, title: "Prepare quarterly report", priority: "High", due: "Nov 15", assignee: "Alice", status: "In Progress" },
  { id: 5, title: "Review contract terms - Hooli", priority: "Medium", due: "Nov 18", assignee: "Legal Team", status: "Pending" },
  { id: 6, title: "Clean up old leads", priority: "Low", due: "Nov 30", assignee: "John D.", status: "Done" },
];

export const notes: Note[] = [
  { id: 1, title: "Acme Corp - Discovery Call Notes", content: "Alice is interested in the enterprise plan. Key concerns are API integration and SLA guarantees. Follow up with technical spec.", author: "Sarah M.", date: "Today, 10:30 AM", pinned: true },
  { id: 2, title: "Hooli - Product Feedback", content: "Eva mentioned they need better reporting features. Suggested adding custom dashboards. Product team is aware.", author: "John D.", date: "Yesterday, 2:15 PM", pinned: true },
  { id: 3, title: "Q4 Strategy Brainstorm", content: "Target 20% growth in enterprise segment. Focus on healthcare and finance verticals. Allocate additional SDR resources.", author: "Alice", date: "3 days ago", pinned: false },
  { id: 4, title: "Competitive Analysis - Notes", content: "Main competitor offering similar features at 15% lower price. Differentiate on support quality and onboarding.", author: "Sarah M.", date: "1 week ago", pinned: false },
];

export const segments: Segment[] = [
  { name: "Enterprise", count: 48, revenue: "$4.2M", growth: "+12%", color: "bg-blue-500" },
  { name: "Mid-Market", count: 124, revenue: "$2.8M", growth: "+18%", color: "bg-purple-500" },
  { name: "Small Business", count: 312, revenue: "$1.1M", growth: "+8%", color: "bg-green-500" },
  { name: "Startup", count: 89, revenue: "$0.6M", growth: "+24%", color: "bg-amber-500" },
  { name: "Enterprise Plus", count: 12, revenue: "$3.5M", growth: "+5%", color: "bg-red-500" },
];

export const salesData: SalesDataPoint[] = [
  { month: "Jan", actual: 320000, forecast: 300000 },
  { month: "Feb", actual: 340000, forecast: 350000 },
  { month: "Mar", actual: 380000, forecast: 370000 },
  { month: "Apr", actual: 360000, forecast: 390000 },
  { month: "May", actual: 420000, forecast: 400000 },
  { month: "Jun", actual: 450000, forecast: 430000 },
  { month: "Jul", actual: 410000, forecast: 450000 },
  { month: "Aug", actual: 480000, forecast: 460000 },
  { month: "Sep", actual: 520000, forecast: 500000 },
  { month: "Oct", actual: 490000, forecast: 530000 },
  { month: "Nov", actual: null, forecast: 560000 },
  { month: "Dec", actual: null, forecast: 600000 },
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Total Revenue", value: "$4.8M", change: "+14.2%", icon: "revenue", positive: true },
  { label: "Active Deals", value: "247", change: "+8.3%", icon: "deals", positive: true },
  { label: "Win Rate", value: "34.2%", change: "+2.1%", icon: "winrate", positive: true },
  { label: "Avg Deal Size", value: "$38,500", change: "-4.7%", icon: "dealsize", positive: false },
  { label: "Sales Cycle", value: "62 days", change: "-8 days", icon: "cycle", positive: true },
  { label: "Customer Count", value: "1,847", change: "+21.3%", icon: "customers", positive: true },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Mitchell", deals: 24, revenue: "$720,000", target: "$650,000", attainment: "111%", avatar: "SM", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
  { rank: 2, name: "John Davis", deals: 19, revenue: "$580,000", target: "$550,000", attainment: "105%", avatar: "JD", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { rank: 3, name: "Emily Chen", deals: 21, revenue: "$495,000", target: "$500,000", attainment: "99%", avatar: "EC", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { rank: 4, name: "Michael Park", deals: 15, revenue: "$420,000", target: "$480,000", attainment: "88%", avatar: "MP", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { rank: 5, name: "Jessica Lopez", deals: 12, revenue: "$310,000", target: "$420,000", attainment: "74%", avatar: "JL", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { rank: 6, name: "Tom Baker", deals: 9, revenue: "$195,000", target: "$380,000", attainment: "51%", avatar: "TB", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
];

export const reports: Report[] = [
  { name: "Monthly Sales Summary", type: "PDF", size: "2.4 MB", lastRun: "Nov 1, 2026", frequency: "Monthly" },
  { name: "Pipeline Health Report", type: "Excel", size: "1.8 MB", lastRun: "Oct 28, 2026", frequency: "Weekly" },
  { name: "Team Performance Review", type: "PDF", size: "3.1 MB", lastRun: "Oct 25, 2026", frequency: "Quarterly" },
  { name: "Forecast Accuracy", type: "Excel", size: "1.2 MB", lastRun: "Oct 20, 2026", frequency: "Monthly" },
  { name: "Customer Segmentation", type: "PDF", size: "4.5 MB", lastRun: "Oct 15, 2026", frequency: "Quarterly" },
];

export const enrichments: Enrichment[] = [
  { field: "Company Size", source: "LinkedIn", status: "Enriched", confidence: 95 },
  { field: "Tech Stack", source: "BuiltWith", status: "Enriched", confidence: 88 },
  { field: "Decision Makers", source: "Zoominfo", status: "Enriched", confidence: 92 },
  { field: "Social Profiles", source: "Twitter/LinkedIn", status: "Enriched", confidence: 97 },
  { field: "Funding History", source: "Crunchbase", status: "Pending", confidence: 0 },
  { field: "News Mentions", source: "Google News", status: "Processing", confidence: 0 },
];

export const healthScores: HealthScore[] = [
  { company: "Acme Corp", score: 92, usage: "High", support: "Low", sentiment: "Positive", risk: "Low" },
  { company: "Globex Inc", score: 75, usage: "Medium", support: "Medium", sentiment: "Neutral", risk: "Medium" },
  { company: "Initech", score: 88, usage: "High", support: "Low", sentiment: "Positive", risk: "Low" },
  { company: "Umbrella Corp", score: 45, usage: "Low", support: "High", sentiment: "Negative", risk: "High" },
  { company: "Hooli", score: 68, usage: "Medium", support: "High", sentiment: "Neutral", risk: "Medium" },
];

export const supportTickets: SupportTicket[] = [
  { id: "TKT-001", subject: "API rate limit exceeded", customer: "Acme Corp", priority: "High", status: "Open", age: "2h", agent: "Support Team" },
  { id: "TKT-002", subject: "Billing discrepancy on invoice", customer: "Globex Inc", priority: "Medium", status: "In Progress", age: "1d", agent: "Billing Team" },
  { id: "TKT-003", subject: "Feature request: custom reports", customer: "Initech", priority: "Low", status: "Open", age: "3d", agent: "Product Team" },
  { id: "TKT-004", subject: "Integration failure with Slack", customer: "Hooli", priority: "Urgent", status: "In Progress", age: "4h", agent: "Support Team" },
  { id: "TKT-005", subject: "Account setup assistance", customer: "Umbrella Corp", priority: "Medium", status: "Resolved", age: "5d", agent: "Onboarding Team" },
];

export const kbArticles: KBArticle[] = [
  { title: "Getting Started Guide", category: "Onboarding", views: 1240, helpful: 92, updated: "2 days ago" },
  { title: "API Integration Documentation", category: "Developer", views: 890, helpful: 88, updated: "1 week ago" },
  { title: "Setting Up Automated Workflows", category: "Automation", views: 675, helpful: 95, updated: "3 days ago" },
  { title: "Billing and Subscription FAQ", category: "Billing", views: 1432, helpful: 90, updated: "5 days ago" },
  { title: "Security Best Practices", category: "Security", views: 543, helpful: 97, updated: "2 weeks ago" },
  { title: "Team Collaboration Features", category: "Product", views: 789, helpful: 85, updated: "1 week ago" },
];

export const contracts: Contract[] = [
  { id: "CT-001", client: "Acme Corp", type: "Enterprise License", value: "$45,000/yr", start: "Jan 1, 2026", end: "Dec 31, 2026", status: "Active" },
  { id: "CT-002", client: "Hooli", type: "Enterprise Plus", value: "$89,000/yr", start: "Mar 15, 2026", end: "Mar 14, 2027", status: "Active" },
  { id: "CT-003", client: "Globex Inc", type: "Professional", value: "$28,000/yr", start: "Jun 1, 2026", end: "May 31, 2027", status: "Pending" },
  { id: "CT-004", client: "Umbrella Corp", type: "Enterprise License", value: "$150,000/yr", start: "Feb 1, 2025", end: "Jan 31, 2026", status: "Expiring" },
  { id: "CT-005", client: "Brown Industries", type: "Starter", value: "$12,000/yr", start: "Aug 1, 2025", end: "Jul 31, 2026", status: "Expired" },
];

export const invoices: Invoice[] = [
  { id: "INV-2026-001", client: "Acme Corp", amount: "$45,000", issued: "Jan 1, 2026", due: "Jan 31, 2026", status: "Paid" },
  { id: "INV-2026-042", client: "Hooli", amount: "$89,000", issued: "Mar 15, 2026", due: "Apr 14, 2026", status: "Paid" },
  { id: "INV-2026-089", client: "Initech", amount: "$62,000", issued: "Oct 1, 2026", due: "Oct 31, 2026", status: "Overdue" },
  { id: "INV-2026-112", client: "Globex Inc", amount: "$28,000", issued: "Nov 1, 2026", due: "Nov 30, 2026", status: "Pending" },
  { id: "INV-2026-118", client: "Acme Corp", amount: "$45,000", issued: "Nov 15, 2026", due: "Dec 15, 2026", status: "Draft" },
];

export const quotes: Quote[] = [
  { id: "Q-001", client: "Acme Corp", items: 3, total: "$52,000", status: "Sent", validUntil: "Dec 1, 2026", probability: "75%" },
  { id: "Q-002", client: "Hooli", items: 5, total: "$95,000", status: "Draft", validUntil: "Dec 15, 2026", probability: "60%" },
  { id: "Q-003", client: "Initech", items: 2, total: "$18,500", status: "Negotiating", validUntil: "Nov 28, 2026", probability: "85%" },
  { id: "Q-004", client: "Globex Inc", items: 4, total: "$31,200", status: "Accepted", validUntil: "Nov 20, 2026", probability: "100%" },
  { id: "Q-005", client: "Umbrella Corp", items: 6, total: "$165,000", status: "Draft", validUntil: "Jan 15, 2027", probability: "40%" },
];

export const products: CRMProduct[] = [
  { name: "CRM Enterprise", category: "Software", price: "$45,000/yr", features: "Unlimited contacts, API access, custom reports", tier: "Enterprise" },
  { name: "CRM Professional", category: "Software", price: "$28,000/yr", features: "Up to 10K contacts, automation, integrations", tier: "Professional" },
  { name: "CRM Starter", category: "Software", price: "$12,000/yr", features: "Up to 2K contacts, email tracking, pipeline", tier: "Starter" },
  { name: "Onboarding Package", category: "Services", price: "$8,000", features: "Implementation, training, data migration", tier: "One-Time" },
  { name: "Premium Support", category: "Services", price: "$15,000/yr", features: "24/7 support, dedicated account manager, SLA", tier: "Add-on" },
];

export const territories: Territory[] = [
  { region: "North America", rep: "Sarah Mitchell", deals: 38, revenue: "$1.8M", quota: "$2.0M", attainment: "90%", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
  { region: "Europe", rep: "John Davis", deals: 29, revenue: "$1.2M", quota: "$1.5M", attainment: "80%", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { region: "Asia Pacific", rep: "Emily Chen", deals: 22, revenue: "$0.9M", quota: "$1.2M", attainment: "75%", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { region: "Latin America", rep: "Michael Park", deals: 12, revenue: "$0.4M", quota: "$0.6M", attainment: "67%", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { region: "Middle East & Africa", rep: "Jessica Lopez", deals: 8, revenue: "$0.3M", quota: "$0.5M", attainment: "60%", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
];

export const goals: Goal[] = [
  { metric: "Annual Recurring Revenue", target: "$12M", current: "$8.5M", progress: 71, deadline: "Dec 31, 2026" },
  { metric: "New Enterprise Customers", target: "40", current: "27", progress: 68, deadline: "Dec 31, 2026" },
  { metric: "Customer Retention Rate", target: "95%", current: "91%", progress: 82, deadline: "Ongoing" },
  { metric: "Product Qualified Leads", target: "500", current: "312", progress: 62, deadline: "Dec 31, 2026" },
  { metric: "NPS Score", target: "65", current: "58", progress: 78, deadline: "Q4 2026" },
];

export const commissions: Commission[] = [
  { rep: "Sarah Mitchell", deals: 24, commission: "$72,000", rate: "10%", tier: "Platinum", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
  { rep: "John Davis", deals: 19, commission: "$52,200", rate: "9%", tier: "Gold", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { rep: "Emily Chen", deals: 21, commission: "$44,550", rate: "9%", tier: "Gold", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { rep: "Michael Park", deals: 15, commission: "$33,600", rate: "8%", tier: "Silver", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { rep: "Jessica Lopez", deals: 12, commission: "$24,800", rate: "8%", tier: "Silver", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { rep: "Tom Baker", deals: 9, commission: "$14,625", rate: "7.5%", tier: "Bronze", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
];

export const churnRisks: ChurnRisk[] = [
  { company: "Umbrella Corp", risk: "High", reason: "Decreased usage, open support tickets", contacts: 2, value: "$150K" },
  { company: "Wilson Group", risk: "Medium", reason: "Contract expiring, no renewal discussion", contacts: 1, value: "$18K" },
  { company: "Brown Industries", risk: "Medium", reason: "Competitor outreach detected", contacts: 3, value: "$55K" },
  { company: "Globex Inc", risk: "Low", reason: "Usage dip but recent engagement", contacts: 4, value: "$28K" },
];

export const npsSurveys: NPSSurvey[] = [
  { customer: "Acme Corp", score: 9, comment: "Excellent platform, love the new reporting features!", date: "2 days ago" },
  { customer: "Initech", score: 8, comment: "Good overall, API could use better documentation.", date: "5 days ago" },
  { customer: "Globex Inc", score: 6, comment: "Product works but support response times need improvement.", date: "1 week ago" },
  { customer: "Umbrella Corp", score: 3, comment: "Experiencing frequent downtime, very dissatisfied.", date: "3 days ago" },
];

export const campaigns: Campaign[] = [
  { name: "Q4 Enterprise Outreach", type: "Email", sent: 12400, opens: "32%", clicks: "8%", leads: 89, revenue: "$380K", status: "Completed" },
  { name: "Product Launch Webinar", type: "Event", sent: 3400, opens: "58%", clicks: "22%", leads: 145, revenue: "$520K", status: "Completed" },
  { name: "Holiday Promo 2026", type: "Email + Social", sent: 28000, opens: "18%", clicks: "4%", leads: 210, revenue: "$290K", status: "Completed" },
  { name: "Free Trial Campaign", type: "Multi-channel", sent: 5600, opens: "41%", clicks: "14%", leads: 312, revenue: "$610K", status: "In Progress" },
  { name: "Year-end Renewal Drive", type: "Email", sent: 1800, opens: "52%", clicks: "19%", leads: 0, revenue: "$0", status: "Scheduled" },
];

export const emails: Email[] = [
  { from: "Alice Johnson", subject: "RE: Proposal - Next Steps", preview: "Thanks for the proposal. We'd like to discuss the pricing options...", time: "10 min ago", unread: true, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { from: "Carol White", subject: "Integration Question", preview: "We're looking to integrate with our existing ERP system. Can you...", time: "1 hour ago", unread: true, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { from: "Eva Martinez", subject: "Contract Renewal Discussion", preview: "Our contract is coming up for renewal next quarter. Let's schedule...", time: "3 hours ago", unread: false, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { from: "Bob Smith", subject: "Account Setup Help", preview: "We're having trouble setting up our team accounts. Can someone...", time: "Yesterday", unread: false, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { from: "David Lee", subject: "Billing Inquiry", preview: "I noticed a discrepancy on our latest invoice. The amount...", time: "2 days ago", unread: false, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
];

export const customer360: Customer360 = {
  name: "Alice Johnson",
  title: "VP of Engineering at Acme Corp",
  company: "Acme Corp",
  tier: "Enterprise Customer",
  annualValue: "$45K",
  healthScore: 92,
  interactions: 14,
  openDeals: 2,
  email: "alice@acme.com",
  phone: "+1 (555) 123-4567",
  lastContact: "Today, 10:30 AM",
  avatar: "AJ",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  activities: [
    "Attended product demo with Sarah M. - Today",
    "Submitted feature request: Custom dashboards - 2 days ago",
    "Renewed enterprise license - 1 week ago",
    "Completed NPS survey - Score: 9 - 2 weeks ago",
  ],
};
