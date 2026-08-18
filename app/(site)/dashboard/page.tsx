"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add dashboard`;

const usageCode = `import { Dashboard } from "@/features/dashboard";

<Dashboard />`;

const periods = ["1D", "7D", "30D", "90D", "1Y"];

const kpiCards = [
  {
    label: "Total Revenue",
    value: "$284,000",
    change: "+12.5%",
    up: true,
    icon: (
      <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: "Active Users",
    value: "24,563",
    change: "+8.3%",
    up: true,
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    label: "Orders",
    value: "1,892",
    change: "+18.7%",
    up: true,
    icon: (
      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    up: true,
    icon: (
      <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: "Avg Order Value",
    value: "$89.50",
    change: "-2.1%",
    up: false,
    icon: (
      <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    label: "Churn Rate",
    value: "2.1%",
    change: "-0.3%",
    up: false,
    icon: (
      <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
];

const revenueMonths = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 38 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 48 },
  { label: "May", value: 62 },
  { label: "Jun", value: 58 },
  { label: "Jul", value: 71 },
  { label: "Aug", value: 65 },
  { label: "Sep", value: 78 },
  { label: "Oct", value: 72 },
  { label: "Nov", value: 89 },
  { label: "Dec", value: 95 },
];

const categoryData = [
  { label: "Electronics", pct: 38, color: "bg-blue-500" },
  { label: "Clothing", pct: 28, color: "bg-emerald-500" },
  { label: "Home", pct: 20, color: "bg-amber-500" },
  { label: "Books", pct: 14, color: "bg-violet-500" },
];

const activityGroups = [
  {
    group: "Today",
    items: [
      { user: "Alice Johnson", action: "placed order #3821", time: "2 min ago", color: "bg-blue-500" },
      { user: "Bob Smith", action: "created a new account", time: "18 min ago", color: "bg-emerald-500" },
      { user: "Carol Williams", action: "upgraded to Pro plan", time: "1 hour ago", color: "bg-purple-500" },
    ],
  },
  {
    group: "Yesterday",
    items: [
      { user: "David Brown", action: "submitted support ticket", time: "1 day ago", color: "bg-amber-500" },
      { user: "Eve Davis", action: "completed onboarding", time: "1 day ago", color: "bg-cyan-500" },
      { user: "Frank Miller", action: "cancelled subscription", time: "1 day ago", color: "bg-rose-500" },
    ],
  },
  {
    group: "This Week",
    items: [
      { user: "Grace Lee", action: "referred 3 friends", time: "3 days ago", color: "bg-indigo-500" },
      { user: "Henry Wilson", action: "made first purchase", time: "4 days ago", color: "bg-pink-500" },
    ],
  },
];

const orders = [
  { id: "#3821", customer: "Alice Johnson", product: "Wireless Headphones", status: "Delivered", amount: "$129.99", date: "2026-07-30" },
  { id: "#3820", customer: "Bob Smith", product: "Mechanical Keyboard", status: "Shipped", amount: "$89.99", date: "2026-07-29" },
  { id: "#3819", customer: "Carol Williams", product: "USB-C Hub", status: "Processing", amount: "$34.99", date: "2026-07-29" },
  { id: "#3818", customer: "David Brown", product: "Monitor Stand", status: "Pending", amount: "$59.99", date: "2026-07-28" },
  { id: "#3817", customer: "Eve Davis", product: "Desk Lamp", status: "Delivered", amount: "$44.99", date: "2026-07-27" },
  { id: "#3816", customer: "Frank Miller", product: "Webcam HD", status: "Shipped", amount: "$79.99", date: "2026-07-27" },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  Delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
};

const quickActions = [
  {
    label: "Add Product",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    label: "Create Coupon",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
  },
  {
    label: "View Reports",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: "Send Notification",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
];

const trafficSources = [
  { label: "Organic", pct: 45, color: "#3b82f6" },
  { label: "Direct", pct: 25, color: "#10b981" },
  { label: "Social", pct: 18, color: "#f59e0b" },
  { label: "Referral", pct: 8, color: "#8b5cf6" },
  { label: "Email", pct: 4, color: "#ec4899" },
];

const notifications = [
  {
    text: "New order #3821 received from Alice Johnson",
    time: "2 min ago",
    read: false,
    icon: (
      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    text: "Your weekly report is ready for review",
    time: "1 hour ago",
    read: false,
    icon: (
      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    text: "Server load threshold exceeded (85%)",
    time: "3 hours ago",
    read: false,
    icon: (
      <svg className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    text: "New user Carol Williams completed onboarding",
    time: "5 hours ago",
    read: true,
    icon: (
      <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    text: "Payment received from David Brown — $59.99",
    time: "8 hours ago",
    read: true,
    icon: (
      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  const [activePeriod, setActivePeriod] = useState("30D");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dashboard</h1>
          <Badge variant="primary">6 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Business metrics dashboard with KPI cards, revenue charts, orders, activity feeds, and notifications.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">KPI Cards</h3>
          <p className="text-sm text-muted-foreground">Display key business metrics with trend indicators and icons.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-6 rounded-lg border border-border bg-background">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-border bg-background p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground dark:text-muted-foreground/70 uppercase tracking-wider">{card.label}</span>
                  <div className="rounded-lg bg-muted/40 dark:bg-muted p-2">{card.icon}</div>
                </div>
                <div className="text-2xl font-bold text-foreground">{card.value}</div>
                <div className={`mt-1 flex items-center gap-1 text-sm font-medium ${card.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {card.up ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                  )}
                  {card.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Revenue Chart</h3>
          <p className="text-sm text-muted-foreground">Monthly revenue visualization with category breakdown.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 rounded-lg border border-border bg-background">
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground mb-4">Revenue Over Time</h2>
              <div className="flex items-end gap-1.5 h-56 sm:h-64">
                {revenueMonths.map((m) => (
                  <div key={m.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 hover:from-blue-600 hover:to-blue-500 transition-all min-h-[4px]"
                      style={{ height: `${m.value}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground/70 dark:text-muted-foreground">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground mb-4">Sales by Category</h2>
              <div className="flex flex-col gap-5">
                {categoryData.map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="w-24 text-sm text-muted-foreground text-right">{c.label}</span>
                    <div className="flex-1 h-5 bg-muted dark:bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.color} transition-all`} style={{ width: `${c.pct}%` }} />
                    </div>
                    <span className="w-10 text-sm font-medium text-zinc-800 dark:text-zinc-200">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">Track order status, customer details, and amounts.</p>
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="text-left py-3 px-2 font-medium text-muted-foreground dark:text-muted-foreground/70 text-xs uppercase tracking-wider">Order</th>
                    <th scope="col" className="text-left py-3 px-2 font-medium text-muted-foreground dark:text-muted-foreground/70 text-xs uppercase tracking-wider">Customer</th>
                    <th scope="col" className="text-left py-3 px-2 font-medium text-muted-foreground dark:text-muted-foreground/70 text-xs uppercase tracking-wider hidden sm:table-cell">Product</th>
                    <th scope="col" className="text-left py-3 px-2 font-medium text-muted-foreground dark:text-muted-foreground/70 text-xs uppercase tracking-wider">Status</th>
                    <th scope="col" className="text-right py-3 px-2 font-medium text-muted-foreground dark:text-muted-foreground/70 text-xs uppercase tracking-wider">Amount</th>
                    <th scope="col" className="text-right py-3 px-2 font-medium text-muted-foreground dark:text-muted-foreground/70 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/40 dark:hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2 font-medium text-foreground">{o.id}</td>
                      <td className="py-3 px-2 text-muted-foreground">{o.customer}</td>
                      <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{o.product}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[o.status] || ""}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-medium text-foreground">{o.amount}</td>
                      <td className="py-3 px-2 text-right text-muted-foreground dark:text-muted-foreground/70 text-xs hidden md:table-cell">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Activity & Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Monitor user activity and access common actions quickly.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 rounded-lg border border-border bg-background">
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-5 max-h-[380px] overflow-y-auto pr-1">
                {activityGroups.map((group) => (
                  <div key={group.group}>
                    <p className="text-xs font-semibold text-muted-foreground/70 dark:text-muted-foreground uppercase tracking-wider mb-2">{group.group}</p>
                    <div className="space-y-3">
                      {group.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${item.color}`} />
                          <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{item.user}</span> {item.action}
                            </p>
                            <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground mt-0.5">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted dark:hover:bg-muted hover:border-foreground/20 transition-all cursor-pointer group"
                  >
                    <div className="text-muted-foreground dark:text-muted-foreground/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {action.icon}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground dark:group-hover:text-zinc-100 transition-colors">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Traffic Sources</h3>
          <p className="text-sm text-muted-foreground">Visualize traffic distribution with a conic gradient chart.</p>
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div
                className="h-40 w-40 shrink-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    ${trafficSources.map((s, i) => {
                      const start = trafficSources.slice(0, i).reduce((sum, t) => sum + t.pct, 0);
                      return `${s.color} ${start}% ${start + s.pct}%`;
                    }).join(", ")}
                  )`,
                }}
              />
              <div className="flex flex-col gap-2.5">
                {trafficSources.map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <span className="text-sm font-semibold text-foreground">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <p className="text-sm text-muted-foreground">Real-time notification feed with read/unread states.</p>
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <div className="space-y-1">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    !n.read ? "bg-blue-50/50 dark:bg-blue-950/20 border-l-2 border-blue-500" : "hover:bg-muted/40 dark:hover:bg-muted/50"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                      {n.text}
                    </p>
                    <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">kpiCards</td>
                <td className="px-4 py-3 text-muted-foreground">KpiCard[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">revenueMonths</td>
                <td className="px-4 py-3 text-muted-foreground">RevenueMonth[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orders</td>
                <td className="px-4 py-3 text-muted-foreground">Order[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">periods</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
