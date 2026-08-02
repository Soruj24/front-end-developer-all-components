"use client";

import { useState } from "react";
import { contacts, leads, pipelineStages, companies, timelineEvents, emailTemplates, callLogs, meetings, tasks, notes, segments, salesData, dashboardMetrics, leaderboard, reports, enrichments, healthScores, supportTickets, kbArticles, contracts, invoices, quotes, products, territories, goals, commissions } from "./data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export default function CrmPage() {
  const [activeLeadFilter, setActiveLeadFilter] = useState("All");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const filteredLeads = activeLeadFilter === "All" ? leads : leads.filter((l) => l.status === activeLeadFilter);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">CRM Dashboard</h1>
        <p className="text-muted-foreground">Manage contacts, deals, and sales operations.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {dashboardMetrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-white p-4 transition-colors hover:border-blue-200 dark:border-border dark:bg-zinc-900 dark:hover:border-blue-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground/70">{m.label}</span>
              <span className="text-lg">{m.icon}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{m.value}</p>
            <span className={`text-xs font-medium ${m.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {m.change}
            </span>
          </div>
        ))}
      </div>

      <SectionCard title="Contact List" description="5 contacts with key details and deal values">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground dark:border-border dark:text-muted-foreground/70">
                <th scope="col" className="pb-3 pr-4 font-medium">Contact</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Company</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Email</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Phone</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Status</th>
                <th scope="col" className="pb-3 text-right font-medium">Deal Value</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 dark:border-border">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{c.avatar}</div>
                      <span className="font-medium text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{c.company}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{c.email}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{c.phone}</td>
                  <td className="py-3 pr-4"><Badge variant={c.status.toLowerCase()}>{c.status}</Badge></td>
                  <td className="py-3 text-right font-medium text-foreground">${c.dealValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Lead Cards" description="Qualified leads ranked by score">
        <div className="flex gap-2 pb-4">
          {["All", "Hot", "Warm", "Cold"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveLeadFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeLeadFilter === f
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLeads.map((l) => (
            <div key={l.id} className="rounded-lg border border-border p-4 transition-colors hover:border-blue-200 dark:border-border dark:hover:border-blue-800">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{l.name}</h3>
                <Badge variant={l.status.toLowerCase()}>{l.status}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground/70">{l.company}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${l.score}%` }} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{l.score}</span>
              </div>
              <div className="mt-3 flex justify-between text-xs text-muted-foreground dark:text-muted-foreground/70">
                <span>{l.source}</span>
                <span>{l.interest}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Deal Pipeline" description="Kanban view of sales stages">
        <div className="grid gap-4 overflow-x-auto md:grid-cols-5" style={{ minWidth: "800px" }}>
          {pipelineStages.map((stage) => (
            <div key={stage.name} className="flex flex-col gap-3">
              <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white ${stage.color}`}>
                <span>{stage.name}</span>
                <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs">{stage.deals.length}</span>
              </div>
              {stage.deals.map((deal) => (
                <div key={deal.title} className="rounded-lg border border-border bg-white p-3 shadow-sm dark:border-border dark:bg-muted">
                  <p className="text-sm font-medium text-foreground">{deal.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground/70">{deal.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground/70 dark:text-muted-foreground">{deal.owner}</p>
                </div>
              ))}
              <button className="mt-auto rounded-lg border-2 border-dashed border-border py-2 text-xs text-muted-foreground/70 transition-colors hover:border-blue-400 hover:text-blue-500 dark:border-border dark:hover:border-blue-500">
                + Add Deal
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Company Profiles" description="Key accounts overview">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {companies.map((c) => (
            <div key={c.id} className="rounded-lg border border-border p-4 dark:border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {c.name.charAt(0)}
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{c.name}</h3>
              <Badge variant={c.tier === "Enterprise" ? "enterprise" : "default"}>{c.tier}</Badge>
              <div className="mt-3 space-y-1 text-xs text-muted-foreground dark:text-muted-foreground/70">
                <p>{c.industry} · {c.employees} employees</p>
                <p>{c.revenue} revenue</p>
                <p>{c.location}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Activity Timeline" description="Recent interactions across accounts">
        <div className="relative space-y-0">
          {timelineEvents.map((e, i) => (
            <div key={e.id} className="relative flex gap-4 pb-6">
              {i < timelineEvents.length - 1 && <div className="absolute left-[11px] top-5 h-full w-0.5 bg-muted" />}
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white text-xs dark:border-zinc-900 ${
                e.type === "call" ? "bg-green-500" : e.type === "email" ? "bg-blue-500" : e.type === "meeting" ? "bg-purple-500" : e.type === "note" ? "bg-amber-500" : e.type === "task" ? "bg-cyan-500" : "bg-muted/400"
              }`}>
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{e.description}</p>
                  <span className="text-xs text-muted-foreground/70 dark:text-muted-foreground">{e.date}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground dark:text-muted-foreground/70">by {e.user}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Email Templates" description="Performance metrics for sales templates">
        <div className="space-y-3">
          {emailTemplates.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-4 dark:border-border">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="truncate text-xs text-muted-foreground dark:text-muted-foreground/70">{t.subject}</p>
              </div>
              <div className="ml-4 flex items-center gap-6 text-xs">
                <div className="text-center">
                  <p className="font-medium text-foreground">{t.opens}</p>
                  <p className="text-muted-foreground">Opens</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{t.clicks}</p>
                  <p className="text-muted-foreground">Clicks</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground/70">{t.lastUsed}</p>
                </div>
                <button className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted">Use</button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Call Logs" description="Recent phone activity">
          <div className="space-y-3">
            {callLogs.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.contact}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{c.date}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground/70">
                  <span className="font-mono">{c.duration}</span>
                  <Badge variant={c.direction === "Outbound" ? "new" : "default"}>{c.direction}</Badge>
                  <span className="max-w-[140px] truncate">{c.result}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Meeting Scheduler" description="Upcoming appointments">
          <div className="space-y-3">
            {meetings.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{m.with} · {m.type}</p>
                </div>
                <div className="ml-4 text-right text-xs">
                  <p className="font-medium text-foreground">{m.date}</p>
                  <p className="text-muted-foreground">{m.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Task Manager" description="Pending and in-progress tasks">
          <div className="space-y-2">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
                <input type="checkbox" defaultChecked={t.status === "Done"} className="h-4 w-4 rounded border-border text-blue-600 dark:border-border" />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${t.status === "Done" ? "text-muted-foreground/70 line-through" : "text-foreground"}`}>{t.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Due {t.due}</span>
                    <span>·</span>
                    <span>{t.assignee}</span>
                  </div>
                </div>
                <Badge variant={t.priority.toLowerCase()}>{t.priority}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Notes Section" description="Pinned and recent notes">
          <div className="space-y-3">
            {notes.map((n) => (
              <div key={n.id} className="rounded-lg border border-border p-4 dark:border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                    {n.pinned && <span className="text-xs">📌</span>}
                  </div>
                  <span className="text-xs text-muted-foreground/70">{n.date}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{n.content}</p>
                <p className="mt-2 text-xs text-muted-foreground">By {n.author}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Customer Segments" description="Revenue breakdown by segment">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {segments.map((s) => (
            <div key={s.name} className="rounded-lg border border-border p-4 text-center dark:border-border">
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${s.color} text-white text-sm font-bold`}>
                {s.name.charAt(0)}
              </div>
              <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
              <p className="mt-1 text-2xl font-bold text-foreground">{s.count}</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{s.revenue}</p>
              <span className="text-xs font-medium text-green-600 dark:text-green-400">{s.growth}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Sales Forecast" description="Actual vs forecasted revenue">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground dark:border-border dark:text-muted-foreground/70">
                {salesData.map((d) => (
                  <th scope="col" key={d.month} className="pb-2 pr-2 font-medium">{d.month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                {salesData.map((d) => (
                  <td key={d.month} className="py-2 pr-2">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{d.actual ? `$${(d.actual / 1000).toFixed(0)}K` : "—"}</span>
                      <div className="mt-1 h-12 w-full rounded-t border border-border" style={{ alignSelf: "flex-end" }}>
                        <div className="h-full rounded-t bg-blue-500" style={{ height: `${(d.forecast / 6000) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                {salesData.map((d) => (
                  <td key={d.month} className="pt-2 pr-2 text-xs text-muted-foreground/70">Forecast: ${(d.forecast / 1000).toFixed(0)}K</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Team Leaderboard" description="Sales rep performance ranking">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground dark:border-border dark:text-muted-foreground/70">
                <th scope="col" className="pb-3 pr-2 font-medium">#</th>
                <th scope="col" className="pb-3 pr-2 font-medium">Rep</th>
                <th scope="col" className="pb-3 pr-2 font-medium">Deals</th>
                <th scope="col" className="pb-3 pr-2 font-medium">Revenue</th>
                <th scope="col" className="pb-3 text-right font-medium">Attainment</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((r) => (
                <tr key={r.rank} className="border-b border-border last:border-0 dark:border-border">
                  <td className="py-2.5 pr-2">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      r.rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" :
                      r.rank === 2 ? "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70" :
                      r.rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" : "bg-muted/40 text-muted-foreground/70 dark:bg-zinc-900 dark:text-muted-foreground"
                    }`}>{r.rank}</span>
                  </td>
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{r.avatar}</div>
                      <span className="font-medium text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-2 text-muted-foreground">{r.deals}</td>
                  <td className="py-2.5 pr-2 font-medium text-foreground">{r.revenue}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-green-500" style={{ width: r.attainment }} />
                      </div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">{r.attainment}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Commission Calculator" description="Estimated commissions per rep">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground dark:border-border dark:text-muted-foreground/70">
                <th scope="col" className="pb-3 pr-2 font-medium">Rep</th>
                <th scope="col" className="pb-3 pr-2 font-medium">Deals</th>
                <th scope="col" className="pb-3 pr-2 font-medium">Rate</th>
                <th scope="col" className="pb-3 text-right font-medium">Commission</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((c) => (
                <tr key={c.rep} className="border-b border-border last:border-0 dark:border-border">
                  <td className="py-2.5 pr-2 font-medium text-foreground">{c.rep}</td>
                  <td className="py-2.5 pr-2 text-muted-foreground">{c.deals}</td>
                  <td className="py-2.5 pr-2"><Badge variant={c.tier.toLowerCase() === "platinum" ? "active" : c.tier.toLowerCase() === "gold" ? "new" : "default"}>{c.rate}</Badge></td>
                  <td className="py-2.5 text-right font-semibold text-green-600 dark:text-green-400">{c.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Report Builder" description="Available reports and schedule">
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.name} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.type} · {r.size}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{r.frequency}</span>
                  <button className="rounded bg-blue-100 px-2 py-1 font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60">Run</button>
                  <button className="rounded bg-muted px-2 py-1 font-medium text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted">Export</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Import / Export UI" description="Data management tools">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-blue-400 dark:border-border dark:hover:border-blue-500">
              <p className="text-2xl">📁</p>
              <p className="mt-2 text-sm font-medium text-foreground">Drop CSV files here</p>
              <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
              <button className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">Upload File</button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Export Contacts</button>
              <button className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Export Deals</button>
              <button className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Export All</button>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Contact Enrichment" description="Data enrichment status">
          <div className="space-y-3">
            {enrichments.map((e) => (
              <div key={e.field} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{e.field}</p>
                  <p className="text-xs text-muted-foreground">{e.source}</p>
                </div>
                <div className="flex items-center gap-3">
                  {e.confidence > 0 && (
                    <span className="text-xs text-muted-foreground/70">{e.confidence}% confidence</span>
                  )}
                  <Badge variant={e.status === "Enriched" ? "active" : e.status === "Processing" ? "new" : "default"}>
                    {e.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Customer Health Score" description="Risk assessment per account">
          <div className="space-y-3">
            {healthScores.map((h) => (
              <div key={h.company} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{h.company}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${h.score >= 80 ? "bg-green-500" : h.score >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${h.score}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${h.score >= 80 ? "text-green-600 dark:text-green-400" : h.score >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                      {h.score}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                  <span>Usage: {h.usage}</span>
                  <span>Support: {h.support}</span>
                  <span>Sentiment: {h.sentiment}</span>
                  <Badge variant={h.risk === "Low" ? "active" : h.risk === "Medium" ? "medium" : "urgent"}>{h.risk} Risk</Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Churn Prediction" description="At-risk accounts requiring attention">
          <div className="space-y-3">
            {[
              { company: "Umbrella Corp", risk: "High", reason: "Decreased usage, open support tickets", contacts: 2, value: "$150K" },
              { company: "Wilson Group", risk: "Medium", reason: "Contract expiring, no renewal discussion", contacts: 1, value: "$18K" },
              { company: "Brown Industries", risk: "Medium", reason: "Competitor outreach detected", contacts: 3, value: "$55K" },
              { company: "Globex Inc", risk: "Low", reason: "Usage dip but recent engagement", contacts: 4, value: "$28K" },
            ].map((p) => (
              <div key={p.company} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{p.company}</p>
                  <Badge variant={p.risk === "High" ? "urgent" : p.risk === "Medium" ? "medium" : "active"}>{p.risk} Risk</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground/70">{p.reason}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground/70">
                  <span>{p.contacts} contacts</span>
                  <span>{p.value} at risk</span>
                  <button className="ml-auto rounded bg-blue-100 px-2 py-1 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Create Task</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Satisfaction Survey" description="Latest NPS and CSAT responses">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-950/30 dark:to-blue-950/30">
              <div>
                <p className="text-sm font-medium text-foreground">Current NPS Score</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">+58</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Responses: 1,247</p>
                <p className="text-xs text-muted-foreground">Response rate: 34%</p>
              </div>
            </div>
            {[
              { customer: "Acme Corp", score: 9, comment: "Excellent platform, love the new reporting features!", date: "2 days ago" },
              { customer: "Initech", score: 8, comment: "Good overall, API could use better documentation.", date: "5 days ago" },
              { customer: "Globex Inc", score: 6, comment: "Product works but support response times need improvement.", date: "1 week ago" },
              { customer: "Umbrella Corp", score: 3, comment: "Experiencing frequent downtime, very dissatisfied.", date: "3 days ago" },
            ].map((s) => (
              <div key={s.customer} className="flex items-start gap-3 rounded-lg border border-border p-3 dark:border-border">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${s.score >= 9 ? "bg-green-500" : s.score >= 7 ? "bg-blue-500" : "bg-red-500"}`}>
                  {s.score}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{s.customer}</p>
                    <span className="text-xs text-muted-foreground/70">{s.date}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">"{s.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Support Tickets" description="Open and in-progress tickets">
          <div className="space-y-3">
            {supportTickets.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground/70">{t.id}</span>
                    <p className="truncate text-sm font-medium text-foreground">{t.subject}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{t.customer}</span>
                    <span>·</span>
                    <span>{t.agent}</span>
                  </div>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground/70">{t.age}</span>
                  <Badge variant={t.priority.toLowerCase()}>{t.priority}</Badge>
                  <Badge variant={t.status === "Open" ? "new" : t.status === "In Progress" ? "warm" : t.status === "Resolved" ? "active" : "default"}>
                    {t.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Knowledge Base" description="Top articles and documentation">
          <div className="grid gap-3">
            {kbArticles.map((a) => (
              <div key={a.title} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-blue-200 dark:border-border dark:hover:border-blue-800">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <Badge variant="default">{a.category}</Badge>
                </div>
                <div className="ml-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="text-center">
                    <p className="font-medium text-foreground">{a.views.toLocaleString()}</p>
                    <p>Views</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600 dark:text-green-400">{a.helpful}%</p>
                    <p>Helpful</p>
                  </div>
                  <span className="text-muted-foreground/70">Updated {a.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Contract Management" description="Active, pending, and expiring contracts">
          <div className="space-y-3">
            {contracts.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.client}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{c.type} · {c.value}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="text-right">
                    <p className="text-muted-foreground dark:text-muted-foreground/70">{c.start} → {c.end}</p>
                  </div>
                  <Badge variant={c.status === "Active" ? "active" : c.status === "Pending" ? "new" : c.status === "Expiring" ? "urgent" : "default"}>
                    {c.status}
                  </Badge>
                  <button className="rounded bg-muted px-2 py-1 font-medium text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted">View</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Invoice Preview" description="Recent invoices and payment status">
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div>
                  <p className="text-xs font-mono text-muted-foreground/70">{inv.id}</p>
                  <p className="text-sm font-medium text-foreground">{inv.client}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-semibold text-foreground">{inv.amount}</span>
                  <Badge variant={inv.status === "Paid" ? "active" : inv.status === "Overdue" ? "urgent" : inv.status === "Draft" ? "default" : "pending"}>
                    {inv.status}
                  </Badge>
                  <button className="rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground">PDF</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Quote Builder" description="Sent, draft, and negotiated quotes">
          <div className="space-y-3">
            {quotes.map((q) => (
              <div key={q.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{q.client}</p>
                  <p className="text-xs text-muted-foreground">{q.id} · {q.items} items · Valid until {q.validUntil}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-semibold text-foreground">{q.total}</span>
                  <Badge variant={q.status === "Accepted" ? "active" : q.status === "Sent" ? "new" : q.status === "Negotiating" ? "warm" : "default"}>
                    {q.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground/70">{q.probability}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Product Catalog" description="CRM products and services">
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.name} className="rounded-lg border border-border p-4 dark:border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{p.price}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="default">{p.category}</Badge>
                  <Badge variant="new">{p.tier}</Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground/70">{p.features}</p>
                <button className="mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700">Add to Quote</button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Territory Map" description="Regional performance and quota attainment">
          <div className="space-y-3">
            {territories.map((t) => (
              <div key={t.region} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{t.region}</p>
                  <span className="text-xs text-muted-foreground">{t.rep}</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{t.deals} deals</span>
                  <span>{t.revenue}</span>
                  <span>Quota: {t.quota}</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-green-500" style={{ width: t.attainment }} />
                    </div>
                    <span className="font-medium text-green-600 dark:text-green-400">{t.attainment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Goal Tracker" description="Annual and quarterly targets">
          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.metric}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{g.metric}</span>
                  <span className="text-xs text-muted-foreground">{g.current} / {g.target}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${g.progress >= 80 ? "bg-green-500" : g.progress >= 60 ? "bg-blue-500" : "bg-amber-500"}`} style={{ width: `${g.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{g.progress}%</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground/70">Deadline: {g.deadline}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Pipeline Analytics" description="Conversion metrics across stages">
          <div className="flex flex-col gap-4">
            {[
              { stage: "Discovery → Proposal", rate: 62, value: "62%" },
              { stage: "Proposal → Negotiation", rate: 45, value: "45%" },
              { stage: "Negotiation → Closed Won", rate: 38, value: "38%" },
              { stage: "Overall Win Rate", rate: 34, value: "34%" },
            ].map((m) => (
              <div key={m.stage} className="flex items-center gap-4">
                <span className="w-48 text-sm text-muted-foreground">{m.stage}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${m.rate}%` }} />
                </div>
                <span className="w-12 text-right text-sm font-medium text-foreground">{m.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Deal Comparison" description="Side-by-side deal analysis">
          <div className="space-y-3">
            {[
              { deal: "Acme Corp Platform", rep: "Sarah M.", size: "$45K", stage: "Negotiation", probability: "80%", age: "45 days" },
              { deal: "Hooli Enterprise", rep: "Eva M.", size: "$89K", stage: "Negotiation", probability: "65%", age: "62 days" },
              { deal: "Initech SaaS", rep: "Carol W.", size: "$62K", stage: "Proposal", probability: "55%", age: "28 days" },
              { deal: "Globex Migration", rep: "Bob S.", size: "$28K", stage: "Discovery", probability: "30%", age: "12 days" },
            ].map((d) => (
              <div key={d.deal} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{d.deal}</p>
                  <p className="text-xs text-muted-foreground">{d.rep} · {d.stage}</p>
                </div>
                <div className="ml-4 flex items-center gap-4 text-sm">
                  <span className="font-semibold text-foreground">{d.size}</span>
                  <span className="text-xs text-muted-foreground/70">{d.probability}</span>
                  <span className="text-xs text-muted-foreground/70">{d.age}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Performance Dashboard" description="Key sales metrics at a glance">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Select Metric", options: ["Revenue", "Deals", "Calls", "Emails"], value: selectedMetric, onChange: setSelectedMetric },
          ].map((dd) => (
            <div key={dd.label}>
              <select
                value={dd.value}
                onChange={(e) => dd.onChange(e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100"
              >
                {dd.options.map((o) => <option key={o} value={o.toLowerCase()}>{o}</option>)}
              </select>
            </div>
          ))}
          {[
            { label: "Daily Average", value: selectedMetric === "revenue" ? "$42K" : "18" },
            { label: "Weekly Total", value: selectedMetric === "revenue" ? "$294K" : "126" },
            { label: "Monthly Target", value: selectedMetric === "revenue" ? "$1.2M" : "500" },
            { label: "vs Last Month", value: selectedMetric === "revenue" ? "+12.4%" : "+8.2%" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border p-4 text-center dark:border-border">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{s.label}</p>
              <p className="mt-1 text-xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Campaign History" description="Past marketing and sales campaigns">
        <div className="space-y-3">
          {[
            { name: "Q4 Enterprise Outreach", type: "Email", sent: 12400, opens: "32%", clicks: "8%", leads: 89, revenue: "$380K", status: "Completed" },
            { name: "Product Launch Webinar", type: "Event", sent: 3400, opens: "58%", clicks: "22%", leads: 145, revenue: "$520K", status: "Completed" },
            { name: "Holiday Promo 2026", type: "Email + Social", sent: 28000, opens: "18%", clicks: "4%", leads: 210, revenue: "$290K", status: "Completed" },
            { name: "Free Trial Campaign", type: "Multi-channel", sent: 5600, opens: "41%", clicks: "14%", leads: 312, revenue: "$610K", status: "In Progress" },
            { name: "Year-end Renewal Drive", type: "Email", sent: 1800, opens: "52%", clicks: "19%", leads: 0, revenue: "$0", status: "Scheduled" },
          ].map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.type} · {c.sent.toLocaleString()} sent</p>
              </div>
              <div className="ml-4 flex items-center gap-4 text-xs">
                <div className="text-center">
                  <p className="font-medium text-foreground">{c.opens}</p>
                  <p className="text-muted-foreground">Opens</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{c.clicks}</p>
                  <p className="text-muted-foreground">Clicks</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{c.leads}</p>
                  <p className="text-muted-foreground">Leads</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-green-600 dark:text-green-400">{c.revenue}</p>
                  <p className="text-muted-foreground">Revenue</p>
                </div>
                <Badge variant={c.status === "Completed" ? "active" : c.status === "In Progress" ? "new" : "default"}>{c.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Email Inbox" description="Recent customer emails requiring response">
        <div className="space-y-3">
          {[
            { from: "Alice Johnson", subject: "RE: Proposal - Next Steps", preview: "Thanks for the proposal. We'd like to discuss the pricing options...", time: "10 min ago", unread: true },
            { from: "Carol White", subject: "Integration Question", preview: "We're looking to integrate with our existing ERP system. Can you...", time: "1 hour ago", unread: true },
            { from: "Eva Martinez", subject: "Contract Renewal Discussion", preview: "Our contract is coming up for renewal next quarter. Let's schedule...", time: "3 hours ago", unread: false },
            { from: "Bob Smith", subject: "Account Setup Help", preview: "We're having trouble setting up our team accounts. Can someone...", time: "Yesterday", unread: false },
            { from: "David Lee", subject: "Billing Inquiry", preview: "I noticed a discrepancy on our latest invoice. The amount...", time: "2 days ago", unread: false },
          ].map((e) => (
            <div key={e.subject} className={`flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/40 dark:hover:bg-muted/50 ${e.unread ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20" : "border-border"}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${e.unread ? "bg-blue-500" : "bg-zinc-400"}`}>
                {e.from.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${e.unread ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}>{e.from}</p>
                  <span className="text-xs text-muted-foreground/70">{e.time}</span>
                </div>
                <p className={`text-sm ${e.unread ? "text-zinc-800 dark:text-zinc-200" : "text-muted-foreground dark:text-muted-foreground/70"}`}>{e.subject}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground/70">{e.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Customer 360 View" description="Unified customer profile summary">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/3">
            <div className="flex flex-col items-center rounded-lg border border-border p-6 text-center dark:border-border">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 text-xl font-bold text-white">
                AJ
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">Alice Johnson</h3>
              <p className="text-sm text-muted-foreground">VP of Engineering at Acme Corp</p>
              <Badge variant="active" children="Enterprise Customer" />
              <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center text-sm">
                <div>
                  <p className="font-bold text-foreground">$45K</p>
                  <p className="text-xs text-muted-foreground">Annual Value</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">92</p>
                  <p className="text-xs text-muted-foreground">Health Score</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">14</p>
                  <p className="text-xs text-muted-foreground">Interactions</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">Open Deals</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Email", value: "alice@acme.com" },
                { label: "Phone", value: "+1 (555) 123-4567" },
                { label: "Last Contact", value: "Today, 10:30 AM" },
              ].map((f) => (
                <div key={f.label} className="rounded-lg bg-muted/40 p-3 dark:bg-muted/50">
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                  <p className="text-sm font-medium text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border p-4 dark:border-border">
              <p className="text-sm font-medium text-foreground">Recent Activity</p>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p>• Attended product demo with Sarah M. - Today</p>
                <p>• Submitted feature request: Custom dashboards - 2 days ago</p>
                <p>• Renewed enterprise license - 1 week ago</p>
                <p>• Completed NPS survey - Score: 9 - 2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
