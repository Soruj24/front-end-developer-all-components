export const standardPlans = [
  { name: "Free", price: "$0", period: "/mo", desc: "Perfect for getting started", features: ["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"], cta: "Get Started", popular: false },
  { name: "Pro", price: "$19", period: "/mo", desc: "For growing teams", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains", "API access"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: "$99", period: "/mo", desc: "For large organizations", features: ["Everything in Pro", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM", "Dedicated account manager", "Custom contract"], cta: "Contact Sales", popular: false },
];

export const fourTierPlans = [
  { name: "Starter", price: "$9", period: "/mo", desc: "For small side projects", features: ["3 projects", "10,000 requests/mo", "Community support", "Basic analytics", "10 team members"], cta: "Start Free Trial", popular: false },
  { name: "Free", price: "$0", period: "/mo", desc: "Perfect for getting started", features: ["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"], cta: "Get Started", popular: false },
  { name: "Pro", price: "$29", period: "/mo", desc: "For growing teams", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: "$99", period: "/mo", desc: "For large organizations", features: ["Unlimited everything", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM", "Dedicated account manager"], cta: "Contact Sales", popular: false },
];

export const featureComparisonData = {
  features: ["Projects", "Requests / month", "Team members", "Support", "Analytics", "Custom domains", "API access", "SSO / SCIM", "SLA", "Dedicated manager"],
  plans: [
    { name: "Starter", values: ["3", "10K", "10", "Email", "Basic", false, false, false, false, false] },
    { name: "Free", values: ["1", "1K", "2", "Community", "Basic", false, false, false, false, false] },
    { name: "Pro", values: ["Unlimited", "100K", "Unlimited", "Priority", "Advanced", true, true, false, false, false] },
    { name: "Enterprise", values: ["Unlimited", "Unlimited", "Unlimited", "24/7 Dedicated", "Advanced + AI", true, true, true, true, true] },
  ],
};

export function CheckIcon({ className = "h-4 w-4 text-emerald-500" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function CrossIcon({ className = "h-4 w-4 text-muted-foreground" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function DashIcon({ className = "h-4 w-4 text-muted-foreground" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  );
}

export const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    {subtitle && <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">{subtitle}</p>}
  </div>
);
