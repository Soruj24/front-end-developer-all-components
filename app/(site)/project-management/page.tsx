"use client";

import { useState } from "react";

const projects = [
  { id: 1, name: "Website Redesign", status: "In Progress", priority: "High", deadline: "Aug 15, 2026", progress: 65, team: 6, tasks: 24, completed: 14 },
  { id: 2, name: "Mobile App v2", status: "Planning", priority: "Medium", deadline: "Oct 1, 2026", progress: 20, team: 4, tasks: 18, completed: 3 },
  { id: 3, name: "API Integration", status: "Review", priority: "High", deadline: "Jul 30, 2026", progress: 85, team: 3, tasks: 12, completed: 10 },
  { id: 4, name: "Data Migration", status: "Completed", priority: "Low", deadline: "Jun 20, 2026", progress: 100, team: 2, tasks: 8, completed: 8 },
  { id: 5, name: "Security Audit", status: "In Progress", priority: "Critical", deadline: "Aug 5, 2026", progress: 45, team: 5, tasks: 30, completed: 13 },
];

const kanbanColumns = [
  {
    title: "Backlog", color: "bg-muted/400", tasks: [
      { id: 1, title: "Research competitor tools", priority: "Low", assignee: "Alice" },
      { id: 2, title: "Draft user stories", priority: "Medium", assignee: "Bob" },
    ],
  },
  {
    title: "In Progress", color: "bg-blue-500", tasks: [
      { id: 3, title: "Implement auth flow", priority: "High", assignee: "Charlie" },
      { id: 4, title: "Design dashboard layout", priority: "High", assignee: "Diana" },
      { id: 5, title: "Write API endpoints", priority: "Medium", assignee: "Eve" },
    ],
  },
  {
    title: "Review", color: "bg-amber-500", tasks: [
      { id: 6, title: "Code review PR #142", priority: "Medium", assignee: "Frank" },
    ],
  },
  {
    title: "Done", color: "bg-green-500", tasks: [
      { id: 7, title: "Setup CI/CD pipeline", priority: "High", assignee: "Grace" },
      { id: 8, title: "Database schema design", priority: "High", assignee: "Heidi" },
    ],
  },
];

const teamMembers = [
  { name: "Alice Johnson", role: "Product Manager", avatar: "A", color: "bg-blue-500", tasks: 4, active: true },
  { name: "Bob Smith", role: "Frontend Dev", avatar: "B", color: "bg-green-500", tasks: 6, active: true },
  { name: "Charlie Lee", role: "Backend Dev", avatar: "C", color: "bg-purple-500", tasks: 3, active: false },
  { name: "Diana Ross", role: "Designer", avatar: "D", color: "bg-pink-500", tasks: 5, active: true },
  { name: "Eve Chen", role: "QA Engineer", avatar: "E", color: "bg-amber-500", tasks: 2, active: true },
  { name: "Frank Miller", role: "DevOps", avatar: "F", color: "bg-cyan-500", tasks: 1, active: false },
  { name: "Grace Kim", role: "UX Researcher", avatar: "G", color: "bg-red-500", tasks: 3, active: true },
  { name: "Heidi Park", role: "Full Stack Dev", avatar: "H", color: "bg-indigo-500", tasks: 4, active: true },
];

const activityFeed = [
  { user: "Alice Johnson", action: "completed task", target: "Design system setup", time: "2 min ago", type: "done" },
  { user: "Bob Smith", action: "commented on", target: "API rate limiting", time: "15 min ago", type: "comment" },
  { user: "Charlie Lee", action: "opened PR", target: "Feature/auth-flow", time: "1 hr ago", type: "pr" },
  { user: "Diana Ross", action: "uploaded", target: "mockups-v3.fig", time: "2 hr ago", type: "file" },
  { user: "Eve Chen", action: "found bug in", target: "Login form validation", time: "3 hr ago", type: "bug" },
  { user: "Frank Miller", action: "deployed", target: "staging environment", time: "5 hr ago", type: "deploy" },
  { user: "Grace Kim", action: "started sprint", target: "Sprint 12", time: "1 day ago", type: "sprint" },
  { user: "Heidi Park", action: "updated status of", target: "Database optimization", time: "1 day ago", type: "update" },
];

const milestones = [
  { name: "Design Approval", date: "Jul 10, 2026", status: "Completed", icon: "✓" },
  { name: "MVP Release", date: "Aug 1, 2026", status: "In Progress", icon: "●" },
  { name: "Beta Launch", date: "Sep 15, 2026", status: "At Risk", icon: "!" },
  { name: "Public Release", date: "Nov 1, 2026", status: "Planned", icon: "○" },
];

const issues = [
  { id: "BUG-101", title: "Login fails on Safari", severity: "Critical", status: "Open", assignee: "Eve" },
  { id: "BUG-102", title: "Broken image paths in blog", severity: "Minor", status: "In Progress", assignee: "Bob" },
  { id: "BUG-103", title: "Memory leak on dashboard", severity: "Major", status: "Open", assignee: "Charlie" },
  { id: "BUG-104", title: "Typos in onboarding flow", severity: "Trivial", status: "Closed", assignee: "Diana" },
  { id: "BUG-105", title: "API timeout on reports", severity: "Critical", status: "In Progress", assignee: "Charlie" },
  { id: "BUG-106", title: "Mobile responsive issues", severity: "Major", status: "Open", assignee: "Bob" },
];

const timeEntries = [
  { user: "Alice J.", task: "Sprint planning", hours: 2, date: "Jul 28" },
  { user: "Bob S.", task: "Frontend components", hours: 6.5, date: "Jul 28" },
  { user: "Charlie L.", task: "API development", hours: 7, date: "Jul 28" },
  { user: "Diana R.", task: "UI mockups", hours: 4, date: "Jul 28" },
  { user: "Eve C.", task: "Test automation", hours: 5.5, date: "Jul 28" },
];

const risks = [
  { risk: "Third-party API deprecation", likelihood: "High", impact: "High", owner: "Charlie", mitigation: "Build fallback service" },
  { risk: "Team member availability", likelihood: "Medium", impact: "High", owner: "Alice", mitigation: "Cross-train developers" },
  { risk: "Scope creep", likelihood: "High", impact: "Medium", owner: "Alice", mitigation: "Strict change control" },
  { risk: "Server capacity limits", likelihood: "Low", impact: "Critical", owner: "Frank", mitigation: "Auto-scaling setup" },
];

const sprints = [
  { name: "Sprint 10", goal: "Payment integration", start: "Jul 15", end: "Jul 28", total: 40, done: 28, status: "On Track" },
  { name: "Sprint 11", goal: "Notification system", start: "Jul 29", end: "Aug 11", total: 35, done: 0, status: "Planning" },
  { name: "Sprint 12", goal: "Search & filtering", start: "Aug 12", end: "Aug 25", total: 30, done: 0, status: "Planning" },
];

const meetings = [
  { title: "Sprint Planning", date: "Mon, Jul 28", time: "10:00 AM", attendees: 8, type: "Planning" },
  { title: "Daily Standup", date: "Daily", time: "9:30 AM", attendees: 12, type: "Standup" },
  { title: "Design Review", date: "Wed, Jul 30", time: "2:00 PM", attendees: 5, type: "Review" },
  { title: "Retrospective", date: "Fri, Aug 1", time: "4:00 PM", attendees: 10, type: "Retro" },
];

const documents = [
  { name: "PRD-v2.pdf", author: "Alice", size: "2.4 MB", updated: "2 days ago" },
  { name: "Tech-Specs.docx", author: "Charlie", size: "1.1 MB", updated: "5 days ago" },
  { name: "UI-Kit.fig", author: "Diana", size: "8.7 MB", updated: "1 day ago" },
  { name: "API-Reference.md", author: "Charlie", size: "340 KB", updated: "3 days ago" },
  { name: "Test-Plans.xlsx", author: "Eve", size: "560 KB", updated: "1 week ago" },
  { name: "Deployment-Guide.pdf", author: "Frank", size: "1.8 MB", updated: "2 weeks ago" },
];

const templates = [
  { name: "Web App Launch", tasks: 24, duration: "4 weeks", usedBy: 45 },
  { name: "Mobile MVP", tasks: 18, duration: "6 weeks", usedBy: 32 },
  { name: "API Development", tasks: 12, duration: "3 weeks", usedBy: 28 },
  { name: "Design Sprint", tasks: 8, duration: "2 weeks", usedBy: 51 },
  { name: "Migration Project", tasks: 20, duration: "8 weeks", usedBy: 19 },
];

const budgetItems = [
  { category: "Engineering", budget: 120000, spent: 85000, remaining: 35000 },
  { category: "Design", budget: 45000, spent: 32000, remaining: 13000 },
  { category: "Infrastructure", budget: 30000, spent: 28000, remaining: 2000 },
  { category: "Marketing", budget: 25000, spent: 10000, remaining: 15000 },
  { category: "Operations", budget: 20000, spent: 12000, remaining: 8000 },
];

const totalBudget = budgetItems.reduce((s, i) => s + i.budget, 0);
const totalSpent = budgetItems.reduce((s, i) => s + i.spent, 0);

const roadmapPhases = [
  { phase: "Q3 2026", items: ["Design System Complete", "Core Features MVP", "User Testing Round 1"], status: "current" },
  { phase: "Q4 2026", items: ["Beta Release", "Analytics Dashboard", "Performance Optimization"], status: "upcoming" },
  { phase: "Q1 2027", items: ["Public Launch", "Enterprise Features", "Mobile App v1"], status: "upcoming" },
  { phase: "Q2 2027", items: ["AI Integration", "Marketplace", "Internationalization"], status: "upcoming" },
];

const resources = [
  { name: "Alice Johnson", role: "PM", allocation: 100, project: "Website Redesign" },
  { name: "Bob Smith", role: "Frontend", allocation: 80, project: "Website Redesign" },
  { name: "Charlie Lee", role: "Backend", allocation: 100, project: "API Integration" },
  { name: "Diana Ross", role: "Design", allocation: 60, project: "Mobile App v2" },
  { name: "Eve Chen", role: "QA", allocation: 50, project: "Security Audit" },
  { name: "Frank Miller", role: "DevOps", allocation: 30, project: "Infrastructure" },
];

const comments = [
  { user: "Bob Smith", avatar: "B", text: "The API rate limiting needs to be reviewed before we proceed with the integration.", time: "2 hr ago", replies: 3 },
  { user: "Diana Ross", avatar: "D", text: "Updated the mockups with the new color scheme. Please review.", time: "4 hr ago", replies: 1 },
  { user: "Charlie Lee", avatar: "C", text: "PR #142 is ready for review. @bob @diana please take a look when you can.", time: "6 hr ago", replies: 5 },
];

const notifications = [
  { text: "Eve mentioned you in BUG-101", time: "5 min ago", unread: true },
  { text: "PR #142 requires your review", time: "1 hr ago", unread: true },
  { text: "Sprint 10 starts tomorrow", time: "3 hr ago", unread: false },
  { text: "Charlie completed Database optimization", time: "5 hr ago", unread: false },
  { text: "Meeting reminder: Design Review at 2pm", time: "1 day ago", unread: false },
];

const dependencies = [
  { from: "Auth Flow", to: "User Dashboard", type: "blocking" },
  { from: "Database Schema", to: "API Endpoints", type: "blocking" },
  { from: "API Endpoints", to: "Frontend Integration", type: "blocking" },
  { from: "Design Approval", to: "Component Development", type: "blocking" },
  { from: "Component Dev", to: "Integration Testing", type: "blocking" },
];

const priorityMatrix = [
  { item: "Payment gateway", urgency: 5, importance: 5, quadrant: "Do First" },
  { item: "Email templates", urgency: 4, importance: 3, quadrant: "Schedule" },
  { item: "Dark mode", urgency: 2, importance: 4, quadrant: "Schedule" },
  { item: "Logo redesign", urgency: 1, importance: 2, quadrant: "Delegate" },
  { item: "Browser extension", urgency: 1, importance: 1, quadrant: "Eliminate" },
  { item: "Performance opt.", urgency: 3, importance: 5, quadrant: "Do First" },
  { item: "Analytics setup", urgency: 2, importance: 3, quadrant: "Schedule" },
  { item: "Legacy cleanup", urgency: 1, importance: 1, quadrant: "Eliminate" },
];

const files = [
  { name: "mockups-v3.fig", type: "figma", size: "8.7 MB", shared: "2 hr ago", sharer: "Diana" },
  { name: "presentation-q3.pptx", type: "slides", size: "4.2 MB", shared: "1 day ago", sharer: "Alice" },
  { name: "schema-diagram.png", type: "image", size: "1.3 MB", shared: "3 days ago", sharer: "Charlie" },
  { name: "sprint-10-tasks.csv", type: "spreadsheet", size: "45 KB", shared: "5 days ago", sharer: "Alice" },
  { name: "requirements-v2.pdf", type: "pdf", size: "2.1 MB", shared: "1 week ago", sharer: "Grace" },
];

const burndownData = [
  { day: "Mon", planned: 40, actual: 40 },
  { day: "Tue", planned: 35, actual: 33 },
  { day: "Wed", planned: 30, actual: 28 },
  { day: "Thu", planned: 25, actual: 20 },
  { day: "Fri", planned: 20, actual: 15 },
  { day: "Sat", planned: 15, actual: 10 },
  { day: "Sun", planned: 10, actual: 5 },
];

function Avatar({ name, color, size = "h-8 w-8" }: { name: string; color: string; size?: string }) {
  return (
    <div className={`${size} ${color} flex items-center justify-center rounded-full text-xs font-bold text-white`}>
      {name.charAt(0)}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    Critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    Medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Low: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Trivial: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[priority] || colors.Medium}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Open: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Review: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Completed: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Closed: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70",
    Planning: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    "At Risk": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] || colors.Open}`}>
      {status}
    </span>
  );
}

function ProgressBar({ value, color = "bg-blue-500" }: { value: number; color?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

function SectionCard({ title, icon, children, className = "" }: { title: string; icon: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function ProjectManagementPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Project Management</h1>
          <p className="text-muted-foreground">Manage projects, tasks, and teams all in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search projects..." className="w-56 rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">New Project</button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1 dark:bg-muted">
        {["overview", "board", "list", "timeline", "calendar", "team"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-zinc-100"
                : "text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Projects", value: "12", change: "+2 this month", icon: "📊", color: "text-blue-600" },
          { label: "Open Tasks", value: "47", change: "12 overdue", icon: "📋", color: "text-amber-600" },
          { label: "Team Members", value: "8", change: "3 on leave", icon: "👥", color: "text-green-600" },
          { label: "Completion Rate", value: "76%", change: "+5% vs last week", icon: "📈", color: "text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <SectionCard title="Project Dashboard" icon="📊" className="lg:col-span-2 xl:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="pb-3 font-medium text-muted-foreground dark:text-muted-foreground/70">Project</th>
                  <th scope="col" className="pb-3 font-medium text-muted-foreground dark:text-muted-foreground/70">Status</th>
                  <th scope="col" className="pb-3 font-medium text-muted-foreground dark:text-muted-foreground/70">Priority</th>
                  <th scope="col" className="pb-3 font-medium text-muted-foreground dark:text-muted-foreground/70">Deadline</th>
                  <th scope="col" className="pb-3 font-medium text-muted-foreground dark:text-muted-foreground/70">Progress</th>
                  <th scope="col" className="pb-3 font-medium text-muted-foreground dark:text-muted-foreground/70">Team</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border">
                    <td className="py-3 font-medium text-foreground">{p.name}</td>
                    <td className="py-3"><StatusBadge status={p.status} /></td>
                    <td className="py-3"><PriorityBadge priority={p.priority} /></td>
                    <td className="py-3 text-muted-foreground">{p.deadline}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={p.progress} />
                        <span className="w-8 text-xs text-muted-foreground">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex -space-x-2">
                        {Array.from({ length: Math.min(p.team, 4) }).map((_, i) => (
                          <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-muted dark:border-zinc-900 dark:bg-muted" />
                        ))}
                        {p.team > 4 && <span className="ml-1 text-xs text-muted-foreground">+{p.team - 4}</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Kanban Board" icon="📋">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {kanbanColumns.map((col) => (
              <div key={col.title} className="flex w-44 shrink-0 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <span className="text-xs font-medium text-muted-foreground">{col.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground/70">{col.tasks.length}</span>
                </div>
                {col.tasks.map((task) => (
                  <div key={task.id} className="rounded-lg border border-border bg-muted/40 p-3 dark:border-border dark:bg-muted/50">
                    <p className="text-xs font-medium text-foreground">{task.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <PriorityBadge priority={task.priority} />
                      <span className="text-xs text-muted-foreground/70">{task.assignee}</span>
                    </div>
                  </div>
                ))}
                <button className="mt-1 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground transition-colors hover:border-zinc-400 hover:text-muted-foreground dark:border-border dark:hover:border-foreground/20 dark:hover:text-zinc-300">+ Add Task</button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Task List" icon="✅">
          <div className="flex flex-col gap-2">
            {[
              { title: "Design system setup", assignee: "Diana", due: "Jul 30", done: false },
              { title: "User authentication", assignee: "Charlie", due: "Aug 2", done: false },
              { title: "Dashboard layout", assignee: "Bob", due: "Jul 28", done: true },
              { title: "API rate limiting", assignee: "Charlie", due: "Jul 29", done: false },
              { title: "Database optimization", assignee: "Heidi", due: "Aug 5", done: false },
              { title: "CI/CD pipeline", assignee: "Frank", due: "Jul 25", done: true },
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50">
                <input type="checkbox" checked={task.done} readOnly className="h-4 w-4 rounded border-border text-blue-600 accent-blue-600 dark:border-border" />
                <span className={`flex-1 text-sm ${task.done ? "text-muted-foreground/70 line-through" : "text-foreground"}`}>{task.title}</span>
                <span className="text-xs text-muted-foreground/70">{task.assignee}</span>
                <span className="text-xs text-muted-foreground/70">{task.due}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Gantt Chart" icon="📅">
          <div className="space-y-3">
            {[
              { name: "Research", start: 0, duration: 3, color: "bg-blue-400" },
              { name: "Design", start: 3, duration: 4, color: "bg-purple-400" },
              { name: "Development", start: 7, duration: 8, color: "bg-amber-400" },
              { name: "Testing", start: 15, duration: 3, color: "bg-green-400" },
              { name: "Deployment", start: 18, duration: 2, color: "bg-cyan-400" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="w-24 text-xs font-medium text-muted-foreground">{item.name}</span>
                <div className="relative h-6 flex-1 rounded bg-muted dark:bg-muted">
                  <div
                    className={`absolute top-0 h-full rounded ${item.color} opacity-80`}
                    style={{ left: `${(item.start / 20) * 100}%`, width: `${(item.duration / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Timeline View" icon="📆">
          <div className="relative space-y-4 pl-6 before:absolute before:bottom-0 before:left-2.5 before:top-0 before:w-0.5 before:bg-muted dark:before:bg-zinc-700">
            {[
              { date: "Jul 10", event: "Design approval", type: "milestone" },
              { date: "Jul 20", event: "Development starts", type: "start" },
              { date: "Aug 5", event: "Internal testing", type: "progress" },
              { date: "Aug 15", event: "Beta release", type: "milestone" },
              { date: "Sep 1", event: "Public launch", type: "end" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[18px] top-1 h-3 w-3 rounded-full border-2 border-blue-500 bg-background" />
                <p className="text-xs text-muted-foreground/70">{item.date}</p>
                <p className="text-sm font-medium text-foreground">{item.event}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Calendar Integration" icon="🗓️">
          <div className="rounded-lg border border-border">
            <div className="grid grid-cols-7 border-b border-border">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d} className="p-1.5 text-center text-xs font-medium text-muted-foreground">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <div key={day} className={`p-1.5 text-center text-xs ${day === 15 ? "rounded-full bg-blue-600 font-bold text-white" : "text-muted-foreground"} ${day === 20 ? "rounded-full bg-green-500 text-white" : ""}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { day: "Jul 28", event: "Sprint Planning" },
              { day: "Jul 29", event: "Design Review" },
              { day: "Jul 30", event: "Client Demo" },
            ].map((item) => (
              <div key={item.event} className="flex items-center gap-2 rounded-md bg-blue-50 p-2 text-xs dark:bg-blue-900/20">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">{item.day}</span>
                <span className="font-medium text-muted-foreground">{item.event}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Team Overview" icon="👥">
          <div className="space-y-3">
            {teamMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <Avatar name={m.name} color={m.color} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground/70">{m.tasks} tasks</span>
                  <div className={`h-2 w-2 rounded-full ${m.active ? "bg-green-500" : "bg-muted dark:bg-muted"}`} />
                </div>
              </div>
            ))}
            <button className="mt-1 w-full rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground transition-colors hover:border-zinc-400 hover:text-muted-foreground dark:border-border dark:hover:border-foreground/20 dark:hover:text-zinc-300">+ Invite Member</button>
          </div>
        </SectionCard>

        <SectionCard title="Sprint Planning" icon="🏃">
          <div className="space-y-3">
            {sprints.map((s) => (
              <div key={s.name} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                  <StatusBadge status={s.status} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.goal}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground/70">
                  <span>{s.start}</span>
                  <span>→</span>
                  <span>{s.end}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <ProgressBar value={(s.done / s.total) * 100} />
                  <span className="w-10 text-xs text-muted-foreground">{s.done}/{s.total}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Issue Tracker" icon="🐛">
          <div className="space-y-2">
            {issues.map((issue) => (
              <div key={issue.id} className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
                <span className="w-16 text-xs font-mono text-muted-foreground/70">{issue.id}</span>
                <span className="flex-1 text-sm text-foreground">{issue.title}</span>
                <div className="flex items-center gap-1.5">
                  <PriorityBadge priority={issue.severity} />
                  <StatusBadge status={issue.status} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Milestone Tracker" icon="🏁">
          <div className="space-y-4">
            {milestones.map((m) => (
              <div key={m.name} className="flex items-center gap-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  m.status === "Completed" ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" :
                  m.status === "In Progress" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" :
                  m.status === "At Risk" ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" :
                  "bg-muted text-muted-foreground/70 dark:bg-muted dark:text-muted-foreground"
                }`}>
                  {m.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.date}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Workload View" icon="💪">
          <div className="space-y-3">
            {resources.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="w-24 text-xs font-medium text-muted-foreground">{r.name.split(" ")[0]}</span>
                <div className="flex-1">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${r.allocation > 80 ? "bg-red-500" : "bg-blue-500"}`} style={{ width: `${r.allocation}%` }} />
                  </div>
                </div>
                <span className="w-8 text-right text-xs text-muted-foreground">{r.allocation}%</span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground/70">80%+ is overallocated</p>
          </div>
        </SectionCard>

        <SectionCard title="Project Templates" icon="📄">
          <div className="grid gap-2 sm:grid-cols-2">
            {templates.map((t) => (
              <div key={t.name} className="cursor-pointer rounded-lg border border-border p-3 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-border dark:hover:border-blue-700 dark:hover:bg-blue-900/20">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <div className="mt-1 flex gap-3 text-xs text-muted-foreground/70">
                  <span>{t.tasks} tasks</span>
                  <span>{t.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground/70">Used by {t.usedBy} teams</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Activity Feed" icon="⚡">
          <div className="flex max-h-64 flex-col gap-3 overflow-y-auto">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 dark:border-border">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  item.type === "done" ? "bg-green-500" :
                  item.type === "comment" ? "bg-blue-500" :
                  item.type === "pr" ? "bg-purple-500" :
                  item.type === "file" ? "bg-amber-500" :
                  item.type === "bug" ? "bg-red-500" :
                  item.type === "deploy" ? "bg-cyan-500" :
                  "bg-muted/400"
                }`}>{item.user.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">{item.user}</span> {item.action} <span className="font-medium">{item.target}</span>
                  </p>
                  <span className="text-xs text-muted-foreground/70">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="File Sharing" icon="📁">
          <div className="space-y-2">
            {files.map((f) => (
              <div key={f.name} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm dark:bg-muted">
                  {f.type === "figma" ? "🎨" : f.type === "slides" ? "📽️" : f.type === "image" ? "🖼️" : f.type === "spreadsheet" ? "📊" : "📄"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground/70">{f.size} · shared by {f.sharer} {f.shared}</p>
                </div>
                <button className="rounded p-1 text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-200">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Comments & Threads" icon="💬">
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.text} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="flex items-center gap-2">
                  <Avatar name={c.user} color={c.avatar === "B" ? "bg-green-500" : c.avatar === "D" ? "bg-pink-500" : "bg-purple-500"} size="h-6 w-6" />
                  <span className="text-sm font-medium text-foreground">{c.user}</span>
                  <span className="text-xs text-muted-foreground/70">{c.time}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.text}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground/70">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Reply
                  </button>
                  <span>{c.replies} replies</span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Write a comment..." className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-xs outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
              <button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">Send</button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Status Updates" icon="📢">
          <div className="space-y-3">
            {[
              { user: "Alice Johnson", text: "Sprint 10 is on track. All critical tasks are progressing well.", time: "1 hr ago", emoji: "🟢" },
              { user: "Charlie Lee", text: "API integration is blocked pending design review.", time: "3 hr ago", emoji: "🟡" },
              { user: "Frank Miller", text: "Production server upgraded. Zero downtime.", time: "5 hr ago", emoji: "🟢" },
              { user: "Eve Chen", text: "Found 3 critical bugs in payment flow. Creating tickets.", time: "1 day ago", emoji: "🔴" },
            ].map((u, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3 dark:border-border">
                <span>{u.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{u.user}</span>: {u.text}
                  </p>
                  <span className="text-xs text-muted-foreground/70">{u.time}</span>
                </div>
              </div>
            ))}
            <input type="text" placeholder="Post a status update..." className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          </div>
        </SectionCard>

        <SectionCard title="Priority Matrix" icon="🎯">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { quadrant: "Do First", color: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800", text: "text-red-700 dark:text-red-300" },
              { quadrant: "Schedule", color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800", text: "text-blue-700 dark:text-blue-300" },
              { quadrant: "Delegate", color: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800", text: "text-amber-700 dark:text-amber-300" },
              { quadrant: "Eliminate", color: "bg-muted/40 border-border dark:bg-muted dark:border-border", text: "text-muted-foreground" },
            ].map((q) => (
              <div key={q.quadrant} className={`rounded-lg border p-2 ${q.color}`}>
                <p className={`text-xs font-semibold ${q.text}`}>{q.quadrant}</p>
                {priorityMatrix.filter((p) => p.quadrant === q.quadrant).map((p) => (
                  <p key={p.item} className="mt-0.5 text-xs text-muted-foreground">{p.item}</p>
                ))}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Time Tracking" icon="⏱️">
          <div className="space-y-2">
            {timeEntries.map((e) => (
              <div key={e.user + e.task} className="flex items-center gap-3">
                <span className="w-20 text-xs font-medium text-muted-foreground">{e.user}</span>
                <span className="flex-1 text-xs text-muted-foreground">{e.task}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${(e.hours / 8) * 100}%` }} />
                  </div>
                  <span className="w-10 text-right text-xs font-medium text-muted-foreground">{e.hours}h</span>
                </div>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2 dark:border-border">
              <span className="text-xs font-semibold text-muted-foreground">Total</span>
              <span className="text-xs font-semibold text-muted-foreground">{timeEntries.reduce((s, e) => s + e.hours, 0)}h</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Burndown Chart" icon="📉">
          <div className="flex items-end gap-1" style={{ height: "100px" }}>
            {burndownData.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center justify-end gap-0.5">
                <div className="flex w-full flex-col items-center gap-px">
                  <div className="w-full rounded-t bg-amber-300 dark:bg-amber-600" style={{ height: `${d.actual}px` }} />
                  <div className="w-full rounded-t bg-blue-400 dark:bg-blue-600 opacity-50" style={{ height: `${d.planned}px` }} />
                </div>
                <span className="text-[10px] text-muted-foreground/70">{d.day.charAt(0)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-blue-400" /> Planned</div>
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-amber-300" /> Actual</div>
          </div>
        </SectionCard>

        <SectionCard title="Roadmap View" icon="🗺️">
          <div className="space-y-4">
            {roadmapPhases.map((phase) => (
              <div key={phase.phase}>
                <div className={`mb-1 flex items-center gap-2 ${phase.status === "current" ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground/70"}`}>
                  <div className={`h-2 w-2 rounded-full ${phase.status === "current" ? "bg-blue-500" : "bg-muted dark:bg-muted"}`} />
                  <span className="text-xs font-semibold">{phase.phase}</span>
                  {phase.status === "current" && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Current</span>}
                </div>
                {phase.items.map((item) => (
                  <div key={item} className="ml-4 border-l-2 border-border py-1 pl-3 dark:border-border">
                    <p className="text-xs text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Dependency Graph" icon="🔗">
          <div className="space-y-2">
            {dependencies.map((dep) => (
              <div key={dep.from} className="flex items-center gap-2 text-xs">
                <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground">{dep.from}</span>
                <svg className={`h-4 w-4 ${dep.type === "blocking" ? "text-red-400" : "text-amber-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground">{dep.to}</span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground/70">Arrows indicate dependency direction</p>
          </div>
        </SectionCard>

        <SectionCard title="Resource Allocation" icon="📊">
          <div className="space-y-3">
            {resources.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <Avatar name={r.name} color={r.role === "PM" ? "bg-blue-500" : r.role === "Frontend" ? "bg-green-500" : r.role === "Backend" ? "bg-purple-500" : r.role === "Design" ? "bg-pink-500" : r.role === "QA" ? "bg-amber-500" : "bg-cyan-500"} size="h-7 w-7" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground/70">{r.project}</p>
                </div>
                <span className="text-xs text-muted-foreground">{r.allocation}%</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Budget Tracker" icon="💰">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Total Budget</span>
              <span className="font-bold text-foreground">${(totalBudget / 1000).toFixed(0)}K</span>
            </div>
            <ProgressBar value={(totalSpent / totalBudget) * 100} color="bg-green-500" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Spent: ${(totalSpent / 1000).toFixed(0)}K</span>
              <span className="text-muted-foreground">Remaining: ${((totalBudget - totalSpent) / 1000).toFixed(0)}K</span>
            </div>
            <div className="space-y-2">
              {budgetItems.map((b) => (
                <div key={b.category} className="flex items-center gap-2">
                  <span className="w-24 text-xs text-muted-foreground">{b.category}</span>
                  <div className="flex-1">
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${(b.spent / b.budget) > 0.8 ? "bg-red-500" : (b.spent / b.budget) > 0.5 ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${(b.spent / b.budget) * 100}%` }} />
                    </div>
                  </div>
                  <span className="w-16 text-right text-xs text-muted-foreground">{((b.spent / b.budget) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Risk Register" icon="⚠️">
          <div className="space-y-2">
            {risks.map((r) => (
              <div key={r.risk} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{r.risk}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground/70">Likelihood:</span>
                  <span className={`font-medium ${r.likelihood === "High" ? "text-red-600 dark:text-red-400" : r.likelihood === "Medium" ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}`}>{r.likelihood}</span>
                  <span className="text-muted-foreground/70">Impact:</span>
                  <span className={`font-medium ${r.impact === "Critical" ? "text-red-600 dark:text-red-400" : r.impact === "High" ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}`}>{r.impact}</span>
                  <span className="ml-auto text-muted-foreground/70">Owner: {r.owner}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground/70">Mitigation: {r.mitigation}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Meeting Notes" icon="📝">
          <div className="space-y-3">
            {meetings.map((m) => (
              <div key={m.title} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{m.title}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{m.type}</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground/70">
                  <span>{m.date}</span>
                  <span>{m.time}</span>
                  <span>{m.attendees} attendees</span>
                </div>
                <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">View notes →</button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Document Collaboration" icon="📑">
          <div className="space-y-2">
            {documents.map((d) => (
              <div key={d.name} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-sm dark:from-blue-900/40 dark:to-purple-900/40">
                  {d.name.endsWith(".pdf") ? "📕" : d.name.endsWith(".docx") ? "📘" : d.name.endsWith(".fig") ? "🎨" : d.name.endsWith(".md") ? "📄" : "📗"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground/70">{d.size} · by {d.author} · {d.updated}</p>
                </div>
                <div className="flex -space-x-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-5 w-5 rounded-full border border-white bg-muted dark:border-zinc-900 dark:bg-muted" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Projects" icon="📂">
          <div className="space-y-2">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">{p.name.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    <span>{p.completed}/{p.tasks} tasks</span>
                    <ProgressBar value={p.progress} />
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View all projects →</button>
          </div>
        </SectionCard>

        <SectionCard title="Team Members Online" icon="🟢">
          <div className="flex flex-wrap gap-2">
            {teamMembers.filter((m) => m.active).map((m) => (
              <div key={m.name} className="flex flex-col items-center gap-1 rounded-lg border border-border p-3 dark:border-border">
                <Avatar name={m.name} color={m.color} />
                <p className="text-xs font-medium text-muted-foreground">{m.name.split(" ")[0]}</p>
                <p className="text-[10px] text-muted-foreground/70">{m.role.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Notifications" icon="🔔">
          <div className="space-y-2">
            {notifications.map((n) => (
              <div key={n.text} className={`flex items-start gap-3 rounded-lg border p-3 ${n.unread ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20" : "border-border"}`}>
                <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-blue-500" : "bg-muted dark:bg-muted"}`} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{n.text}</p>
                  <span className="text-[10px] text-muted-foreground/70">{n.time}</span>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">Mark all as read</button>
          </div>
        </SectionCard>

        <SectionCard title="Project Settings" icon="⚙️">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground/70">Email alerts for task updates</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-blue-600 p-0.5 transition-colors">
                <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-assign</p>
                <p className="text-xs text-muted-foreground/70">Assign tasks to available members</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-muted p-0.5 transition-colors dark:bg-muted">
                <div className="ml-auto h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Sprint reminders</p>
                <p className="text-xs text-muted-foreground/70">24h before sprint end</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-blue-600 p-0.5 transition-colors">
                <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <button className="w-full rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Advanced Settings</button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
