"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const DASHBOARD_CARD_SOURCE = `"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

export interface DashboardCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: ReactNode;
}

export function DashboardCard({ title, value, change, icon }: DashboardCardProps) {
  const up = (change ?? 0) >= 0;
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{title}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {up ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
          <span className={"text-xs font-medium " + (up ? "text-green-600" : "text-red-600")}>
            {up ? "+" : ""}{change}%
          </span>
        </div>
      )}
    </div>
  );
}`;

export default function DashboardCardPage() {
  return (
    <ComponentDocPage
      name="Dashboard Card"
      category="Data Display"
      description="A dashboard metric card for displaying KPIs, statistics, and key numbers with trend indicators and charts."
    >
      <PreviewPanel filename="dashboard-card.tsx">
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Revenue", value: "$45,231", change: 12.5, up: true },
              { title: "Users", value: "2,350", change: 8.2, up: true },
              { title: "Orders", value: "1,247", change: -3.1, up: false },
              { title: "Conversion", value: "3.2%", change: 0.8, up: true },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {card.up ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                  <span className={`text-xs font-medium ${card.up ? "text-green-600" : "text-red-600"}`}>{card.up ? "+" : ""}{card.change}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={DASHBOARD_CARD_SOURCE}
        filename="components/ui/DashboardCard/DashboardCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="With Mini Chart"
          description="Dashboard card with a sparkline chart."
          code={`<DashboardCard title="Monthly Revenue" value="$124,563" change={18} />`}
        >
          <div className="w-full">
            <div className="max-w-sm rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <span className="text-xs text-green-600 font-medium">+18%</span>
              </div>
              <p className="text-3xl font-bold">$124,563</p>
              <svg className="w-full h-12 mt-3" viewBox="0 0 200 40">
                <polyline fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" points="0,35 20,28 40,32 60,15 80,20 100,10 120,18 140,8 160,12 180,5 200,10" />
              </svg>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Status Card"
          description="Card with a status indicator and uptime stats."
          code={`<DashboardCard title="System Status" status="operational" />`}
        >
          <div className="w-full">
            <div className="max-w-sm rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-sm font-medium">System Status</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
              <div className="mt-4 space-y-2">
                {[
                  { label: "API", value: "99.9%" },
                  { label: "Database", value: "99.8%" },
                  { label: "CDN", value: "100%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}