"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add timeline`;

const usageCode = `import { Timeline, TimelineItem, TimelineConnector, TimelineContent } from "@/components/_timeline"

<Timeline>
  <TimelineItem>
    <TimelineConnector />
    <TimelineContent>
      <h3>Step 1</h3>
      <p>Description</p>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;

export default function TimelinePage() {
  const [step, setStep] = useState(1);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Timeline</h1>
          <Badge variant="primary">12 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of timeline patterns — vertical, horizontal, cards,
          status tracking, and more. Use the tabs to switch between the live
          preview, source code, CLI, installation, and dependency details for
          each example.
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

      <ComponentPreview id="timeline-basic">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-6">
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
              {["Jan", "Feb", "Mar"].map((m, i) => (
                <div key={m} className="relative mb-6 last:mb-0">
                  <span className={`absolute -left-5 mt-1 flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 ${i === 1 ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-border bg-white dark:border-border dark:bg-black"}`} />
                  <div className="text-xs font-medium">{m} 2026</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Event {i + 1} description</div>
                </div>
              ))}
            </div>
            <div className="relative pl-10">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
              {[
                { icon: "⌂", label: "Homepage launched", time: "Jan 15" },
                { icon: "📊", label: "Analytics added", time: "Feb 20" },
                { icon: "✉", label: "Email system live", time: "Mar 10" },
                { icon: "⚙", label: "Settings panel", time: "Apr 5" },
              ].map((e, i) => (
                <div key={i} className="relative mb-5 last:mb-0">
                  <span className={`absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${i === 0 ? "bg-indigo-100 text-primary dark:bg-indigo-900 dark:text-indigo-400" : "bg-muted text-muted-foreground/70 dark:bg-muted"}`}>{e.icon}</span>
                  <div className="text-xs font-medium">{e.label}</div>
                  <div className="text-[10px] text-muted-foreground/70">{e.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-alternating">
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-px bg-muted" />
          {["Q1 Planning", "Design Sprint", "Dev Cycle", "Testing"].map((item, i) => (
            <div key={item} className={`relative mb-6 w-[45%] ${i % 2 === 0 ? "mr-auto text-right" : "ml-auto text-left"}`}>
              <span className={`absolute top-1 h-3 w-3 rounded-full border-2 ${i % 2 === 0 ? "-right-1.5" : "-left-1.5"} ${i === 2 ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-border bg-white dark:border-border dark:bg-black"}`} />
              <span className="text-xs font-medium">{item}</span>
              <p className="text-[10px] text-muted-foreground/70">Details here</p>
            </div>
          ))}
          <div className="mt-10 overflow-x-auto pb-2">
            <div className="flex gap-8" style={{ minWidth: "400px" }}>
              {["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"].map((s, i) => (
                <div key={s} className="flex w-24 shrink-0 flex-col items-center">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i === 2 ? "bg-foreground text-background" : "border-2 border-border text-muted-foreground/70"}`}>{i + 1}</span>
                  {i < 3 && <div className="mt-3 h-0.5 w-full bg-muted" style={{ marginTop: "-2px", marginLeft: "50%", width: "calc(100% + 2rem)" }} />}
                  <span className="mt-2 text-xs font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-cards">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { title: "Research", desc: "Market analysis complete", date: "Week 1" },
              { title: "Design", desc: "Wireframes approved", date: "Week 2" },
              { title: "Develop", desc: "Core features built", date: "Week 3-4" },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className={`absolute -left-5 mt-3 h-2.5 w-2.5 rounded-full border-2 ${i === 1 ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-border bg-white dark:border-border dark:bg-black"}`} />
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{item.title}</span>
                    <span className="text-[10px] text-muted-foreground/70">{item.date}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { title: "Discovered", desc: "Identified the problem", color: "border-l-blue-500" },
              { title: "Prototyped", desc: "Built initial solution", color: "border-l-purple-500" },
              { title: "Tested", desc: "Validated with users", color: "border-l-emerald-500" },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className="absolute -left-5 mt-3 h-2.5 w-2.5 rounded-full border-2 border-border bg-background" />
                <div className={`rounded-lg border border-l-4 ${item.color} border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-black`}>
                  <div className="text-xs font-medium">{item.title}</div>
                  <div className="text-[10px] text-muted-foreground/70">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { label: "MVP Launch", date: "Q1 2026" },
              { label: "10K Users", date: "Q2 2026" },
              { label: "Profitability", date: "Q3 2026" },
            ].map((item, i) => (
              <div key={i} className="relative mb-6 last:mb-0">
                <span className={`absolute -left-5 mt-1 flex h-3 w-3 items-center justify-center rounded-full ${i === 2 ? "bg-warning" : "border-2 border-border bg-background"}`}>
                  {i === 2 && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <div className="inline-block rounded-lg border border-black/[.08] bg-muted/40 px-3 py-1.5 dark:border-white/[.145] dark:bg-zinc-900">
                  <div className="text-xs font-medium">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground/70">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <div className="grid grid-cols-3 gap-2">
              {[
                { day: "Mon", event: "Kickoff" },
                { day: "Wed", event: "Review" },
                { day: "Fri", event: "Ship" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center rounded-lg border border-black/[.08] p-2 dark:border-white/[.145]">
                  <span className="text-[10px] font-medium text-muted-foreground/70">{item.day}</span>
                  <span className={`mt-1 h-2 w-2 rounded-full ${i === 1 ? "bg-warning" : i === 2 ? "bg-success" : "bg-primary"}`} />
                  <span className="mt-1 text-xs font-medium">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-status">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
            {[
              { label: "Order placed", status: "done", time: "2 hours ago" },
              { label: "Payment confirmed", status: "done", time: "1 hour ago" },
              { label: "Preparing shipment", status: "active", time: "30 min ago" },
              { label: "Out for delivery", status: "pending", time: "—" },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className={`absolute -left-6 mt-1 h-3 w-3 rounded-full ${
                  item.status === "done" ? "bg-success" : item.status === "active" ? "bg-primary ring-2 ring-primary/20" : "border-2 border-border bg-background"
                }`} />
                <div className="text-xs font-medium">{item.label}</div>
                <div className="text-[10px] text-muted-foreground/70">{item.time}</div>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { label: "Order placed", done: true },
              { label: "Payment confirmed", done: true },
              { label: "Processing", done: true },
              { label: "Shipped", done: false, active: true },
              { label: "Delivered", done: false },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className={`absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full ${
                  item.done ? "bg-success" : item.active ? "bg-primary ring-2 ring-primary/20 animate-pulse" : "border-2 border-border bg-background"
                }`} />
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${item.done ? "font-medium text-foreground" : item.active ? "font-medium text-primary" : "text-muted-foreground/70"}`}>{item.label}</span>
                  {item.done && <span className="text-[10px] text-success">✓</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { label: "Choose template", done: true },
              { label: "Customize design", done: true },
              { label: "Add content", done: false },
              { label: "Publish", done: false },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className={`absolute -left-5 mt-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 ${
                  item.done ? "border-success bg-success" : "border-border bg-white dark:border-border dark:bg-black"
                }`}>
                  {item.done && <span className="text-[7px] text-white">✓</span>}
                </span>
                <span className={`text-xs ${item.done ? "text-muted-foreground/70 line-through" : "font-medium"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-color-coded">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { label: "Design review", color: "bg-primary" },
              { label: "Frontend build", color: "bg-purple-500" },
              { label: "Backend API", color: "bg-emerald-500" },
              { label: "QA Testing", color: "bg-warning" },
            ].map((item, i) => (
              <div key={i} className="relative mb-5 last:mb-0">
                <span className={`absolute -left-5 mt-1 h-3 w-3 rounded-full ${item.color} ring-2 ring-background`} />
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
            {["Ideation", "Prototype", "MVP", "Launch"].map((item, i) => (
              <div key={item} className="relative mb-6 last:mb-0">
                <span className={`absolute -left-5 mt-1 h-3 w-3 rounded-full ${i === 3 ? "bg-pink-500 ring-2 ring-pink-200" : "bg-white border-2 border-border"}`} />
                <span className="text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 border-l-2 border-dashed border-border" />
            {["Draft", "Review", "Final", "Published"].map((item, i) => (
              <div key={item} className="relative mb-5 last:mb-0">
                <span className={`absolute -left-[9px] mt-1 h-3 w-3 rounded-full border-2 ${i === 3 ? "border-success bg-green-100 dark:bg-green-900" : "border-border bg-white dark:border-border dark:bg-black"}`} />
                <span className="text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-avatars">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
            {[
              { name: "Alex Rivera", action: "created task", time: "2h ago", emoji: "👨💻" },
              { name: "Sarah Chen", action: "approved design", time: "4h ago", emoji: "👩🎨" },
              { name: "James Wilson", action: "merged PR", time: "6h ago", emoji: "👨🔧" },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">{item.emoji}</span>
                <div className="text-xs"><span className="font-medium">{item.name}</span> {item.action}</div>
                <div className="text-[10px] text-muted-foreground/70">{item.time}</div>
              </div>
            ))}
          </div>
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
            {[
              { icon: "📝", label: "Brief received" },
              { icon: "🎨", label: "Design sent" },
              { icon: "👍", label: "Client approved" },
              { icon: "🚀", label: "Project live" },
            ].map((item, i) => (
              <div key={i} className="relative mb-5 last:mb-0">
                <span className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { label: "Invoice #001", amount: "$1,200", status: "paid" },
              { label: "Invoice #002", amount: "$850", status: "paid" },
              { label: "Invoice #003", amount: "$2,100", status: "pending" },
              { label: "Invoice #004", amount: "$450", status: "overdue" },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className={`absolute -left-5 mt-1.5 h-2.5 w-2.5 rounded-full ${
                  item.status === "paid" ? "bg-success" : item.status === "pending" ? "bg-warning" : "bg-danger"
                }`} />
                <div className="flex items-center justify-between">
                  <span className="text-xs">{item.label}</span>
                  <span className={`text-xs font-medium ${
                    item.status === "paid" ? "text-success" : item.status === "pending" ? "text-warning" : "text-danger"
                  }`}>{item.amount}</span>
                </div>
                <span className="text-[10px] capitalize text-muted-foreground/70">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-compact">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 h-full w-px bg-muted" />
            {["Committed", "Pushed", "Deployed", "Verified"].map((item, i) => (
              <div key={item} className="relative mb-3 last:mb-0">
                <span className={`absolute -left-[7px] mt-1 h-1.5 w-1.5 rounded-full ${i < 3 ? "bg-muted" : "bg-success"}`} />
                <span className="text-[10px] text-muted-foreground">{item}</span>
                <span className="ml-2 text-[10px] text-muted-foreground/70">{i + 1}m ago</span>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-1">
              {["Draft", "Review", "Approved", "Live"].map((item, i) => (
                <div key={item} className="flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${i < 3 ? i === 2 ? "bg-success" : "bg-primary/70" : "bg-muted"}`} />
                  <span className={`text-[10px] ${i === 2 ? "font-medium text-success" : "text-muted-foreground"}`}>{item}</span>
                  {i < 3 && <span className="text-[10px] text-zinc-300">—</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { date: "Today", items: ["Morning standup", "Code review", "Deploy v2.1"] },
              { date: "Yesterday", items: ["Sprint planning", "API design"] },
            ].map((day) => (
              <div key={day.date} className="relative mb-4 last:mb-0">
                <span className="absolute -left-5 mt-0.5 h-2.5 w-2.5 rounded-full border-2 border-border bg-background" />
                <span className="text-xs font-semibold text-muted-foreground">{day.date}</span>
                {day.items.map((item) => (
                  <div key={item} className="mt-1 text-xs text-muted-foreground">{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-numbered">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
            {["Register", "Verify", "Setup", "Done"].map((item, i) => (
              <div key={item} className="relative mb-6 last:mb-0">
                <span className={`absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold ${i < 3 ? "bg-muted text-muted-foreground" : "bg-success text-success-foreground"}`}>{i + 1}</span>
                <span className="text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            {["Step 1", "Step 2", "Step 3"].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${i === 2 ? "bg-success text-success-foreground" : i === 0 ? "bg-foreground text-background" : "border-2 border-border text-muted-foreground/70"}`}>
                  {i === 2 ? "✓" : i + 1}
                </span>
                <span className="mt-1 text-xs font-medium">{item}</span>
                {i < 2 && <div className="my-1 h-6 w-0.5 bg-muted" />}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-0 sm:col-span-2">
            {["Plan", "Build", "Ship", "Scale"].map((item, i) => (
              <div key={item} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i < 2 ? "bg-foreground text-background" : "border-2 border-border text-muted-foreground/70"}`}>
                    {i < 2 ? "✓" : i + 1}
                  </span>
                  <span className="mt-1 text-[10px] font-medium">{item}</span>
                </div>
                {i < 3 && <div className={`h-0.5 w-8 ${i < 1 ? "bg-foreground" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-progress">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { label: "Research", pct: "100%" },
              { label: "Design", pct: "100%" },
              { label: "Development", pct: "65%" },
              { label: "Testing", pct: "20%" },
            ].map((item, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <span className={`absolute -left-5 mt-2 h-2.5 w-2.5 rounded-full ${item.pct === "100%" ? "bg-success" : "bg-warning"}`} />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium w-24">{item.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted dark:bg-muted">
                    <div className={`h-full rounded-full ${item.pct === "100%" ? "bg-success" : "bg-warning"}`} style={{ width: item.pct }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground/70">{item.pct}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted dark:bg-muted animate-pulse" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <div className="absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full bg-muted animate-pulse" />
                <div className="h-3 w-24 rounded bg-muted dark:bg-muted animate-pulse" />
                <div className="mt-1 h-2 w-32 rounded bg-muted dark:bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-history">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { year: "2020", event: "Founded" },
              { year: "2021", event: "Seed round" },
              { year: "2022", event: "100K users" },
              { year: "2023", event: "Series A" },
              { year: "2024", event: "IPO" },
            ].map((item, i) => (
              <div key={i} className="relative mb-5 last:mb-0">
                <span className={`absolute -left-5 mt-1 h-3 w-3 rounded-full border-2 ${i === 4 ? "border-amber-500 bg-amber-100 dark:bg-amber-900" : "border-border bg-white dark:border-border dark:bg-black"}`} />
                <span className="text-xs font-bold text-primary dark:text-indigo-400">{item.year}</span>
                <span className="ml-2 text-xs text-muted-foreground">{item.event}</span>
              </div>
            ))}
          </div>
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
            {[
              { year: "2024", events: ["Company founded", "Seed funding"] },
              { year: "2025", events: ["Product launch", "100 customers"] },
              { year: "2026", events: ["Series A", "Global expansion"] },
            ].map((item) => (
              <div key={item.year} className="relative mb-5 last:mb-0">
                <span className="absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[8px] font-bold text-background">{item.year[2]}{item.year[3]}</span>
                <span className="text-xs font-bold text-primary dark:text-indigo-400">{item.year}</span>
                {item.events.map((ev) => (
                  <div key={ev} className="text-xs text-muted-foreground">{ev}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2">
            {[
              { phase: "Q1", items: ["Research", "Planning"], color: "bg-primary/70" },
              { phase: "Q2", items: ["Design", "Prototype"], color: "bg-purple-400" },
              { phase: "Q3", items: ["Development", "Testing"], color: "bg-warning" },
              { phase: "Q4", items: ["Launch", "Marketing"], color: "bg-emerald-400" },
            ].map((q) => (
              <div key={q.phase} className="flex items-center gap-3">
                <span className="w-6 text-xs font-bold text-muted-foreground">{q.phase}</span>
                <div className="flex flex-1 gap-1">
                  {q.items.map((item) => (
                    <span key={item} className={`rounded ${q.color} px-2 py-0.5 text-[10px] font-medium text-white`}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-feed">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { text: "Alex liked your post", time: "2m", dot: true },
              { text: "New comment on your photo", time: "15m", dot: true },
              { text: "Sarah started following you", time: "1h", dot: false },
              { text: "Your post reached 100 likes", time: "3h", dot: false },
            ].map((item, i) => (
              <div key={i} className="relative mb-3 last:mb-0">
                {item.dot && <span className="absolute -left-[7px] mt-1.5 h-2 w-2 rounded-full bg-primary" />}
                <div className="text-xs">{item.text}</div>
                <div className="text-[10px] text-muted-foreground/70">{item.time}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {[
              { user: "Alex", action: "pushed to main", time: "2m ago" },
              { user: "Sarah", action: "opened PR #42", time: "15m ago" },
              { user: "Bob", action: "deployed to prod", time: "1h ago" },
              { user: "Carol", action: "created issue #128", time: "3h ago" },
              { user: "Dave", action: "merged PR #40", time: "5h ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] dark:bg-muted">{item.user[0]}</span>
                <span><span className="font-medium">{item.user}</span> {item.action}</span>
                <span className="ml-auto text-[10px] text-muted-foreground/70">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
            {[
              { msg: "fix: resolve login redirect", branch: "main", hash: "a1b2c3" },
              { msg: "feat: add user dashboard", branch: "feature/dash", hash: "d4e5f6" },
              { msg: "chore: update dependencies", branch: "main", hash: "g7h8i9" },
              { msg: "feat: implement search", branch: "feature/search", hash: "j0k1l2" },
            ].map((item, i) => (
              <div key={i} className="relative mb-3 last:mb-0">
                <span className="absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full border-2 border-border bg-background" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground/70">{item.hash}</span>
                  <span className="text-xs">{item.msg}</span>
                </div>
                <span className="text-[10px] text-muted-foreground/70">{item.branch}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-full">
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-24 shrink-0 flex-col border-r border-black/[.08] bg-muted/40 p-3 dark:border-white/[.145] dark:bg-black">
              <span className="mb-2 text-xs font-bold">2026</span>
              {["Jan", "Feb", "Mar", "Apr"].map((m, i) => (
                <button key={m} className={`rounded px-2 py-1 text-left text-[10px] ${i === 2 ? "bg-muted font-medium dark:bg-muted" : "text-muted-foreground/70"}`}>{m}</button>
              ))}
            </div>
            <div className="flex flex-1 flex-col p-3">
              <span className="text-xs font-bold">March 2026</span>
              <div className="mt-2 flex flex-col gap-2">
                {[
                  { day: "Mar 10", event: "Design review" },
                  { day: "Mar 15", event: "Client meeting" },
                  { day: "Mar 22", event: "Sprint demo" },
                ].map((item) => (
                  <div key={item.day} className="flex items-center gap-2 rounded-md bg-muted/40 px-2 py-1.5 dark:bg-zinc-900">
                    <span className="text-[10px] font-medium text-primary dark:text-indigo-400">{item.day}</span>
                    <span className="text-xs text-muted-foreground">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { task: "Setup CI/CD", assignee: "Alex", days: "Mon-Wed", done: true },
              { task: "API Integration", assignee: "Bob", days: "Tue-Thu", done: true },
              { task: "UI Components", assignee: "Carol", days: "Wed-Fri", done: false, active: true },
              { task: "Testing", assignee: "Dave", days: "Fri-Sun", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-black/[.08] px-3 py-2 dark:border-white/[.145]">
                <span className={`h-2 w-2 rounded-full ${item.done ? "bg-success" : item.active ? "bg-primary animate-pulse" : "bg-muted"}`} />
                <span className={`flex-1 text-xs ${item.done ? "text-muted-foreground/70 line-through" : "font-medium"}`}>{item.task}</span>
                <span className="text-[10px] text-muted-foreground/70">{item.assignee}</span>
                <span className="text-[10px] text-muted-foreground/70">{item.days}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-wizard">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center">
            {["Info", "Payment", "Confirm"].map((s, i) => (
              <div key={s} className="flex items-center">
                <button onClick={() => setStep(i + 1)} className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i + 1 <= step ? "bg-foreground text-background" : "border-2 border-border text-muted-foreground/70"
                }`}>{i + 1}</button>
                {i < 2 && <div className={`h-0.5 w-8 ${i + 1 < step ? "bg-foreground" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">Step {step} of 3</div>
          <div className="flex gap-2">
            <button onClick={() => setStep(Math.max(1, step - 1))} className="rounded border border-black/[.08] px-3 py-1 text-xs dark:border-white/[.145]">Back</button>
            <button onClick={() => setStep(Math.min(3, step + 1))} className="rounded bg-foreground px-3 py-1 text-xs text-background">Next</button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-expandable">
        <div className="relative pl-8">
          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />
          {[
            { title: "Discovery", detail: "User research and market analysis completed. Identified top 3 pain points and validated solution approach." },
            { title: "Development", detail: "Frontend and backend implementation across 8 sprints. 120+ features delivered." },
            { title: "Launch", detail: "Production deployment with zero downtime. Marketing campaign reached 50K impressions in first week." },
          ].map((item, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              <span className={`absolute -left-5 mt-2 h-2.5 w-2.5 rounded-full border-2 ${expanded === i ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-border bg-white dark:border-border dark:bg-black"}`} />
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className={`w-full rounded-lg border border-black/[.08] p-3 text-left transition-shadow hover:shadow-sm dark:border-white/[.145] ${expanded === i ? "shadow-sm ring-1 ring-indigo-500/20" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground/70">{expanded === i ? "▾" : "▸"}</span>
                </div>
                {expanded === i && (
                  <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground/70">{item.detail}</p>
                )}
              </button>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-dark">
        <div className="relative rounded-lg bg-zinc-900 p-4 pl-8">
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-zinc-700" />
          {["Initialized", "Processed", "Completed"].map((item, i) => (
            <div key={item} className="relative mb-4 last:mb-0">
              <span className={`absolute -left-5 mt-1 h-2 w-2 rounded-full ${i === 2 ? "bg-success ring-2 ring-success/30" : i === 1 ? "bg-primary/70" : "bg-muted/400"}`} />
              <span className={`text-xs ${i === 2 ? "font-medium text-green-400" : "text-zinc-300"}`}>{item}</span>
              <span className="ml-2 text-[10px] text-muted-foreground">{i + 1}s ago</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="timeline-responsive">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={mobile} onChange={() => setMobile(!mobile)} className="h-3.5 w-3.5" />
            <span className="text-xs text-muted-foreground">Mobile view</span>
          </label>
          <div className={`relative ${mobile ? "pl-8" : ""}`}>
            {mobile && <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />}
            <div className={mobile ? "" : "flex gap-4"}>
              {["Sign up", "Profile", "Dashboard"].map((item, i) => (
                <div key={item} className={`${mobile ? "relative mb-4" : "flex-1"} flex ${mobile ? "" : "flex-col items-center"}`}>
                  {mobile && <span className={`absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full border-2 ${i === 2 ? "border-success bg-green-100 dark:bg-green-900" : "border-border bg-white dark:border-border dark:bg-black"}`} />}
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${i === 2 ? "bg-success text-success-foreground" : "border-2 border-border text-muted-foreground/70"}`}>
                    {i === 2 ? "✓" : i + 1}
                  </span>
                  <span className={`${mobile ? "ml-2" : "mt-1"} text-xs`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;compact&quot; | &quot;detailed&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot; | &quot;horizontal&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;done&quot; | &quot;active&quot; | &quot;pending&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pending&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">color</td>
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
