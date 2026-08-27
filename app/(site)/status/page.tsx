"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Status = "operational" | "degraded" | "outage" | "maintenance";

const statusConfig: Record<Status, { label: string; color: string; bg: string; dot: string }> = {
  operational: { label: "Operational", color: "text-success", bg: "bg-success/10", dot: "bg-success" },
  degraded: { label: "Degraded Performance", color: "text-warning", bg: "bg-warning/10", dot: "bg-warning" },
  outage: { label: "Major Outage", color: "text-danger", bg: "bg-danger/10", dot: "bg-danger" },
  maintenance: { label: "Maintenance", color: "text-info", bg: "bg-info/10", dot: "bg-info" },
};

const services = [
  { name: "API", status: "operational", uptime: 99.98, responseTime: 42 },
  { name: "Web Application", status: "operational", uptime: 99.99, responseTime: 128 },
  { name: "CDN", status: "operational", uptime: 100, responseTime: 18 },
  { name: "Database", status: "operational", uptime: 99.97, responseTime: 12 },
  { name: "Authentication", status: "operational", uptime: 99.99, responseTime: 89 },
  { name: "Search", status: "degraded", uptime: 99.52, responseTime: 245 },
];

const overallStatus: Status = "degraded";

const uptimeHistory = [
  { day: "Mon", uptime: 100 },
  { day: "Tue", uptime: 100 },
  { day: "Wed", uptime: 99.8 },
  { day: "Thu", uptime: 100 },
  { day: "Fri", uptime: 99.9 },
  { day: "Sat", uptime: 100 },
  { day: "Sun", uptime: 99.5 },
];

const responseTimes = [
  { day: "Mon", ms: 45 },
  { day: "Tue", ms: 42 },
  { day: "Wed", ms: 68 },
  { day: "Thu", ms: 44 },
  { day: "Fri", ms: 48 },
  { day: "Sat", ms: 41 },
  { day: "Sun", ms: 52 },
];

const incidents = [
  {
    id: 1,
    title: "Search service degraded performance",
    status: "investigating" as const,
    severity: "minor" as const,
    created: "2 hours ago",
    updates: [
      { time: "2 hours ago", message: "We are investigating increased response times in the search service." },
      { time: "1 hour ago", message: "The issue has been identified. A database query optimization is in progress." },
    ],
  },
  {
    id: 2,
    title: "Scheduled maintenance - Database upgrade",
    status: "scheduled" as const,
    severity: "maintenance" as const,
    created: "Aug 28, 2026 at 02:00 UTC",
    updates: [
      { time: "3 days ago", message: "We will be performing a database upgrade on Aug 28. Expected downtime: 15 minutes." },
    ],
  },
  {
    id: 3,
    title: "API rate limiting issue resolved",
    status: "resolved" as const,
    severity: "major" as const,
    created: "3 days ago",
    updates: [
      { time: "3 days ago", message: "We received reports of API rate limiting affecting some users." },
      { time: "3 days ago", message: "The issue was caused by a misconfigured load balancer. It has been corrected." },
      { time: "3 days ago", message: "This incident has been resolved. All services are operating normally." },
    ],
  },
];

const severityConfig = {
  minor: { label: "Minor", color: "text-warning", bg: "bg-warning/10" },
  major: { label: "Major", color: "text-danger", bg: "bg-danger/10" },
  maintenance: { label: "Maintenance", color: "text-info", bg: "bg-info/10" },
};

const statusTimeline = [
  { period: "90 days ago", status: "operational" as Status },
  { period: "60 days ago", status: "operational" as Status },
  { period: "30 days ago", status: "degraded" as Status },
  { period: "14 days ago", status: "operational" as Status },
  { period: "7 days ago", status: "operational" as Status },
  { period: "Today", status: "degraded" as Status },
];

function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", config.bg, config.color)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}

function UptimeBar({ history }: { history: typeof uptimeHistory }) {
  return (
    <div className="flex gap-0.5">
      {history.map((day) => (
        <div
          key={day.day}
          className={cn(
            "h-8 w-full rounded-sm transition-colors",
            day.uptime === 100
              ? "bg-success/60 hover:bg-success/80"
              : day.uptime >= 99.5
                ? "bg-warning/60 hover:bg-warning/80"
                : "bg-danger/60 hover:bg-danger/80"
          )}
          title={`${day.day}: ${day.uptime}% uptime`}
        />
      ))}
    </div>
  );
}

function ResponseTimeChart({ data }: { data: typeof responseTimes }) {
  const maxMs = Math.max(...data.map((d) => d.ms));

  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((day) => (
        <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm bg-primary/60 transition-colors hover:bg-primary/80"
            style={{ height: `${(day.ms / maxMs) * 100}%` }}
            title={`${day.day}: ${day.ms}ms`}
          />
          <span className="text-[10px] text-muted-foreground">{day.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function StatusPage() {
  const [expandedIncident, setExpandedIncident] = useState<number | null>(1);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Status Page
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            System Status
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Real-time status and performance metrics for all services.
          </p>
        </div>

        {/* Overall Status */}
        <div className={cn(
          "mb-8 rounded-2xl border p-6 text-center sm:p-8",
          overallStatus === "operational"
            ? "border-success/30 bg-success/5"
            : overallStatus === "degraded"
              ? "border-warning/30 bg-warning/5"
              : "border-danger/30 bg-danger/5"
        )}>
          <div className="flex items-center justify-center gap-3">
            <span className={cn(
              "h-3 w-3 rounded-full",
              overallStatus === "operational" ? "bg-success animate-pulse" : overallStatus === "degraded" ? "bg-warning" : "bg-danger"
            )} />
            <span className="text-lg font-semibold text-foreground">
              {overallStatus === "operational"
                ? "All Systems Operational"
                : overallStatus === "degraded"
                  ? "Some Systems Degraded"
                  : "Major Outage Detected"}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()} UTC
          </p>
        </div>

        {/* Service Status Cards */}
        <div className="mb-8 rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Service Status</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const config = statusConfig[service.status as Status];
              return (
                <div
                  key={service.name}
                  className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-all hover:border-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{service.name}</span>
                    <StatusBadge status={service.status as Status} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Uptime: {service.uptime}%</span>
                    <span>{service.responseTime}ms</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        service.uptime === 100 ? "bg-success" : service.uptime >= 99.5 ? "bg-warning" : "bg-danger"
                      )}
                      style={{ width: `${service.uptime}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uptime & Response Time */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Uptime (7 days)</h3>
            <UptimeBar history={uptimeHistory} />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>7 days ago</span>
              <span>Today</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success/60" /> 100%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warning/60" /> {"<99.5%"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-danger/60" /> {"<99%"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Response Time (7 days)</h3>
            <ResponseTimeChart data={responseTimes} />
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Avg: 49ms</span>
              <span>Max: 68ms</span>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mb-8 rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-foreground">90-Day History</h2>
          <div className="flex gap-0.5">
            {statusTimeline.map((entry) => (
              <div
                key={entry.period}
                className={cn(
                  "flex-1 h-10 rounded-sm transition-colors cursor-default",
                  entry.status === "operational"
                    ? "bg-success/60 hover:bg-success/80"
                    : entry.status === "degraded"
                      ? "bg-warning/60 hover:bg-warning/80"
                      : "bg-danger/60 hover:bg-danger/80"
                )}
                title={`${entry.period}: ${statusConfig[entry.status].label}`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Incidents */}
        <div className="rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident) => {
              const sev = severityConfig[incident.severity];
              const isExpanded = expandedIncident === incident.id;

              return (
                <div
                  key={incident.id}
                  className="overflow-hidden rounded-xl border border-border/60 bg-muted/20"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIncident(isExpanded ? null : incident.id)}
                    className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/40"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{incident.title}</span>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", sev.bg, sev.color)}>
                          {sev.label}
                        </span>
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          incident.status === "resolved"
                            ? "bg-success/10 text-success"
                            : incident.status === "investigating"
                              ? "bg-warning/10 text-warning"
                              : "bg-info/10 text-info"
                        )}>
                          {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{incident.created}</p>
                    </div>
                    <svg
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                        isExpanded && "rotate-180"
                      )}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border/60 px-4 pb-4 pt-3">
                      <div className="space-y-3">
                        {incident.updates.map((update, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="relative flex flex-col items-center">
                              <span className={cn(
                                "h-2 w-2 rounded-full",
                                i === 0 ? "bg-primary" : "bg-muted-foreground/30"
                              )} />
                              {i < incident.updates.length - 1 && (
                                <div className="mt-1 w-px flex-1 bg-border" />
                              )}
                            </div>
                            <div className="flex-1 pb-2">
                              <p className="text-xs font-medium text-foreground">{update.time}</p>
                              <p className="mt-0.5 text-sm text-muted-foreground">{update.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscribe */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-background/80 p-6 text-center backdrop-blur sm:p-8">
          <h3 className="text-lg font-semibold text-foreground">Subscribe to Updates</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Get notified when services experience issues or maintenance is scheduled.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="you@example.com"
              className="h-10 w-full max-w-xs rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
            />
            <button
              type="button"
              className="h-10 w-full rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              Subscribe
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
              </svg>
              Email notifications
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Slack integration
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Webhook
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/docs" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
              Read the docs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
