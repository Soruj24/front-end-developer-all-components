"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { User, Mail, Phone, MapPin, Calendar, Globe, Briefcase, Shield } from "lucide-react";

const installCommand = `npx component-library@latest add description-list`;

const usageCode = `import { DescriptionList } from "@/components/description-list";

<DescriptionList items={[
  { label: "Name", value: "John Doe" },
  { label: "Email", value: "john@example.com" },
]} />`;

const profileData = [
  { label: "Full Name", value: "Sarah Chen", icon: User },
  { label: "Email", value: "sarah.chen@company.com", icon: Mail },
  { label: "Phone", value: "+1 (555) 123-4567", icon: Phone },
  { label: "Location", value: "San Francisco, CA", icon: MapPin },
  { label: "Joined", value: "January 15, 2023", icon: Calendar },
  { label: "Website", value: "sarahchen.dev", icon: Globe },
];

const orderData = [
  { label: "Order ID", value: "#ORD-2024-3847" },
  { label: "Status", value: "Processing" },
  { label: "Date", value: "Aug 18, 2026" },
  { label: "Total", value: "$1,234.56" },
  { label: "Payment", value: "Visa ending in 4242" },
  { label: "Shipping", value: "Express (2-3 days)" },
];

const settingsData = [
  { label: "Theme", value: "Dark Mode" },
  { label: "Language", value: "English (US)" },
  { label: "Timezone", value: "Pacific Time (UTC-8)" },
  { label: "Email Notifications", value: "Enabled" },
  { label: "Two-Factor Auth", value: "Enabled" },
  { label: "API Access", value: "Pro Plan" },
];

export default function DescriptionListPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Description List</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Key-value pair lists for displaying structured data like profiles, orders, and settings. Clean and scannable layout.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="description-list-profile">
        <div className="w-full max-w-lg overflow-hidden rounded-lg border border-border">
          <div className="border-b border-border bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                SC
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground">Senior Engineer</p>
              </div>
            </div>
          </div>
          <dl className="divide-y divide-border">
            {profileData.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center px-6 py-3">
                  <dt className="flex w-36 flex-shrink-0 items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </dt>
                  <dd className="flex-1 text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </ComponentPreview>

      <ComponentPreview id="description-list-order">
        <div className="w-full max-w-lg overflow-hidden rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
            <h3 className="text-base font-semibold text-foreground">Order Details</h3>
            <Badge variant="warning">Processing</Badge>
          </div>
          <dl className="divide-y divide-border">
            {orderData.map((item) => (
              <div key={item.label} className="flex items-center px-6 py-3">
                <dt className="w-36 flex-shrink-0 text-sm text-muted-foreground">{item.label}</dt>
                <dd className="flex-1 text-sm font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </ComponentPreview>

      <ComponentPreview id="description-list-grid">
        <div className="w-full grid gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border bg-muted/30 px-6 py-3">
              <h3 className="text-sm font-semibold text-foreground">Account Settings</h3>
            </div>
            <dl className="divide-y divide-border">
              {settingsData.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-2.5">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border bg-muted/30 px-6 py-3">
              <h3 className="text-sm font-semibold text-foreground">Team Members</h3>
            </div>
            <dl className="divide-y divide-border">
              {[
                { label: "Owner", value: "Sarah Chen" },
                { label: "Admin", value: "Marcus Johnson" },
                { label: "Editor", value: "Aria Patel" },
                { label: "Viewer", value: "Tom Wilson" },
                { label: "Total Seats", value: "4 / 10" },
                { label: "Billing", value: "Pro Plan" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-2.5">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="description-list-bordered">
        <div className="w-full max-w-lg">
          <dl className="grid grid-cols-2 gap-4">
            {profileData.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-border p-4">
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="h-3 w-3" />
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">{"{ label: string; value: string; icon?: LucideIcon }[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">layout</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;list&quot; | &quot;grid&quot; | &quot;bordered&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;list&quot;</td>
                <td className="px-4 py-3">No</td>
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
