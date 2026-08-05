import type {
  PricingPlan,
  Feature,
  Testimonial,
  FAQ,
  Integration,
  Stat,
  CaseStudy,
  HowItWorks,
  FooterSection,
  ChangelogEntry,
} from "../types";

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    price: "$29",
    annualPrice: "$290",
    description: "Perfect for small teams getting started",
    features: ["Up to 5 seats", "100K API requests/mo", "Basic analytics", "Email support", "Community access"],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    id: 2,
    name: "Professional",
    price: "$99",
    annualPrice: "$990",
    description: "Best for growing businesses",
    features: ["Up to 20 seats", "1M API requests/mo", "Advanced analytics", "Priority support", "Custom integrations", "Team workspaces"],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$249",
    annualPrice: "$2,490",
    description: "For large organizations with advanced needs",
    features: ["Unlimited seats", "Unlimited requests", "Real-time analytics", "24/7 dedicated support", "SSO & SAML", "Custom SLA", "On-premise option"],
    popular: false,
    cta: "Contact Sales",
  },
];

export const features: Feature[] = [
  { id: 1, title: "Real-time Dashboards", description: "Monitor your metrics live with customizable dashboards that update in real-time.", icon: "chart" },
  { id: 2, title: "Team Collaboration", description: "Work together seamlessly with shared workspaces, comments, and notifications.", icon: "team" },
  { id: 3, title: "Advanced Analytics", description: "Deep insights powered by ML-driven anomaly detection and predictive forecasting.", icon: "analytics" },
  { id: 4, title: "API Integration", description: "Connect with 200+ tools via our robust API and native integrations.", icon: "api" },
  { id: 5, title: "Role-based Access", description: "Granular permissions and audit logs to keep your data secure and compliant.", icon: "security" },
  { id: 6, title: "Automated Workflows", description: "Build custom automation pipelines with our drag-and-drop workflow builder.", icon: "automation" },
];

export const testimonials: Testimonial[] = [
  { id: 1, name: "Sarah Chen", role: "CTO, TechFlow Inc", content: "FlowState transformed how we analyze our product data. The real-time dashboards are incredible.", rating: 5, avatar: "SC", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Marcus Johnson", role: "VP Engineering, DataSync", content: "The best analytics platform we've used. Setup took minutes, not weeks.", rating: 5, avatar: "MJ", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Emily Rodriguez", role: "Product Lead, ScaleUp", content: "We've seen a 40% improvement in team productivity since switching to FlowState.", rating: 5, avatar: "ER", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: 4, name: "David Kim", role: "Head of Data, CloudBase", content: "The API integrations saved us months of development work.", rating: 4, avatar: "DK", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "Lisa Thompson", role: "CEO, GrowthLab", content: "FlowState's predictive analytics helped us identify trends before they became obvious.", rating: 5, avatar: "LT", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
  { id: 6, name: "James Wilson", role: "Engineering Manager, StackPath", content: "Enterprise-grade security with startup-level simplicity.", rating: 5, avatar: "JW", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
];

export const faqs: FAQ[] = [
  { id: 1, q: "How does the free trial work?", a: "You get full access to all Professional features for 14 days. No credit card required." },
  { id: 2, q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade anytime. Changes take effect immediately with prorated billing." },
  { id: 3, q: "What kind of support do you offer?", a: "All plans include email support. Professional plans get priority support, and Enterprise gets 24/7 dedicated support with a named account manager." },
  { id: 4, q: "Is my data secure?", a: "We use AES-256 encryption at rest and TLS 1.3 in transit. SOC 2 Type II certified with annual third-party audits." },
  { id: 5, q: "Do you offer custom integrations?", a: "Enterprise plans include custom integration development. We also have 200+ native integrations available on all plans." },
  { id: 6, q: "What is your uptime SLA?", a: "We guarantee 99.99% uptime for Professional and Enterprise plans, backed by service credits." },
];

export const integrations: Integration[] = [
  { id: 1, name: "Slack", category: "Communication", logo: "💬" },
  { id: 2, name: "GitHub", category: "Development", logo: "🐙" },
  { id: 3, name: "Jira", category: "Project Mgmt", logo: "📋" },
  { id: 4, name: "AWS", category: "Cloud", logo: "☁️" },
  { id: 5, name: "Salesforce", category: "CRM", logo: "☁️" },
  { id: 6, name: "Stripe", category: "Payments", logo: "💳" },
  { id: 7, name: "Figma", category: "Design", logo: "🎨" },
  { id: 8, name: "Shopify", category: "Commerce", logo: "🛒" },
];

export const stats: Stat[] = [
  { id: 1, label: "Active Users", value: "50K+" },
  { id: 2, label: "Data Points/day", value: "2.1B" },
  { id: 3, label: "Integrations", value: "200+" },
  { id: 4, label: "Uptime SLA", value: "99.99%" },
];

export const caseStudies: CaseStudy[] = [
  { id: 1, company: "TechFlow Inc", industry: "SaaS", metric: "300%", description: "Increase in dashboard adoption after switching to FlowState", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
  { id: 2, company: "DataSync Corp", industry: "Finance", metric: "60%", description: "Reduction in time spent on manual reporting", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
  { id: 3, company: "CloudBase", industry: "E-commerce", metric: "2.5x", description: "Revenue growth attributed to better data insights", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
];

export const howItWorks: HowItWorks[] = [
  { id: 1, step: "01", title: "Connect your data", description: "Integrate with your existing tools in minutes. We support 200+ native integrations." },
  { id: 2, step: "02", title: "Build your dashboard", description: "Drag and drop to create custom dashboards that show exactly what matters." },
  { id: 3, step: "03", title: "Collaborate and decide", description: "Share insights with your team, set alerts, and make data-driven decisions faster." },
];

export const footerSections: FooterSection[] = [
  { title: "Product", links: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Docs", href: "#" },
  ]},
  { title: "Company", links: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
  ]},
  { title: "Resources", links: [
    { label: "Community", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "API Reference", href: "#" },
  ]},
  { title: "Legal", links: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "GDPR", href: "#" },
  ]},
];

export const changelog: ChangelogEntry[] = [
  { id: 1, version: "v2.4.0", date: "Jul 28, 2026", title: "AI-Powered Insights", description: "Natural language queries for your dashboards. Ask questions in plain English.", type: "feature" },
  { id: 2, version: "v2.3.2", date: "Jul 15, 2026", title: "Performance Improvements", description: "Dashboard load times reduced by 40% with new caching layer.", type: "improvement" },
  { id: 3, version: "v2.3.1", date: "Jul 8, 2026", title: "Export Fix", description: "Fixed CSV export for large datasets exceeding 100K rows.", type: "fix" },
];

export const navItems = ["Product", "Features", "Pricing", "Resources", "Enterprise"];
