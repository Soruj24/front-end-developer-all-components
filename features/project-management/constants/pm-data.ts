import type {
  TeamMember,
  Project,
  KanbanColumn,
  ActivityFeedItem,
  Milestone,
  Issue,
  TimeEntry,
  Risk,
  Sprint,
  PMMeeting,
  Document,
  Template,
  BudgetItem,
  RoadmapPhase,
  ProjectComment,
  PMNotification,
  BurndownPoint,
  PriorityItem,
} from "../types";

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Alice Johnson", role: "Product Manager", avatar: "AJ", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", tasks: 4, active: true, allocation: 100, project: "Website Redesign" },
  { id: 2, name: "Bob Smith", role: "Frontend Dev", avatar: "BS", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", tasks: 6, active: true, allocation: 80, project: "Website Redesign" },
  { id: 3, name: "Charlie Lee", role: "Backend Dev", avatar: "CL", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", tasks: 3, active: false, allocation: 100, project: "API Integration" },
  { id: 4, name: "Diana Ross", role: "Designer", avatar: "DR", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", tasks: 5, active: true, allocation: 60, project: "Mobile App v2" },
  { id: 5, name: "Eve Chen", role: "QA Engineer", avatar: "EC", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", tasks: 2, active: true, allocation: 50, project: "Security Audit" },
  { id: 6, name: "Frank Miller", role: "DevOps", avatar: "FM", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", tasks: 1, active: false, allocation: 30, project: "Infrastructure" },
  { id: 7, name: "Grace Kim", role: "UX Researcher", avatar: "GK", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", tasks: 3, active: true },
  { id: 8, name: "Heidi Park", role: "Full Stack Dev", avatar: "HP", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face", tasks: 4, active: true },
];

export const projects: Project[] = [
  { id: 1, name: "Website Redesign", status: "In Progress", priority: "High", deadline: "Aug 15, 2026", progress: 65, team: 6, tasks: 24, completed: 14, image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop" },
  { id: 2, name: "Mobile App v2", status: "Planning", priority: "Medium", deadline: "Oct 1, 2026", progress: 20, team: 4, tasks: 18, completed: 3, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop" },
  { id: 3, name: "API Integration", status: "Review", priority: "High", deadline: "Jul 30, 2026", progress: 85, team: 3, tasks: 12, completed: 10, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop" },
  { id: 4, name: "Data Migration", status: "Completed", priority: "Low", deadline: "Jun 20, 2026", progress: 100, team: 2, tasks: 8, completed: 8, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" },
  { id: 5, name: "Security Audit", status: "In Progress", priority: "Critical", deadline: "Aug 5, 2026", progress: 45, team: 5, tasks: 30, completed: 13, image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=250&fit=crop" },
];

export const kanbanColumns: KanbanColumn[] = [
  { title: "Backlog", color: "bg-zinc-400", tasks: [
    { id: 1, title: "Research competitor tools", priority: "Low", assignee: "Alice", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
    { id: 2, title: "Draft user stories", priority: "Medium", assignee: "Bob", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  ]},
  { title: "In Progress", color: "bg-blue-500", tasks: [
    { id: 3, title: "Implement auth flow", priority: "High", assignee: "Charlie", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
    { id: 4, title: "Design dashboard layout", priority: "High", assignee: "Diana", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
    { id: 5, title: "Write API endpoints", priority: "Medium", assignee: "Eve", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  ]},
  { title: "Review", color: "bg-amber-500", tasks: [
    { id: 6, title: "Code review PR #142", priority: "Medium", assignee: "Frank", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
  ]},
  { title: "Done", color: "bg-green-500", tasks: [
    { id: 7, title: "Setup CI/CD pipeline", priority: "High", assignee: "Grace", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face" },
    { id: 8, title: "Database schema design", priority: "High", assignee: "Heidi", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face" },
  ]},
];

export const activityFeed: ActivityFeedItem[] = [
  { id: 1, user: teamMembers[0], action: "completed task", target: "Design system setup", time: "2 min ago", type: "done" },
  { id: 2, user: teamMembers[1], action: "commented on", target: "API rate limiting", time: "15 min ago", type: "comment" },
  { id: 3, user: teamMembers[2], action: "opened PR", target: "Feature/auth-flow", time: "1 hr ago", type: "pr" },
  { id: 4, user: teamMembers[3], action: "uploaded", target: "mockups-v3.fig", time: "2 hr ago", type: "file" },
  { id: 5, user: teamMembers[4], action: "found bug in", target: "Login form validation", time: "3 hr ago", type: "bug" },
  { id: 6, user: teamMembers[5], action: "deployed", target: "staging environment", time: "5 hr ago", type: "deploy" },
  { id: 7, user: teamMembers[6], action: "started sprint", target: "Sprint 12", time: "1 day ago", type: "sprint" },
  { id: 8, user: teamMembers[7], action: "updated status of", target: "Database optimization", time: "1 day ago", type: "update" },
];

export const milestones: Milestone[] = [
  { id: 1, name: "Design Approval", date: "Jul 10, 2026", status: "Completed", icon: "✓" },
  { id: 2, name: "MVP Release", date: "Aug 1, 2026", status: "In Progress", icon: "●" },
  { id: 3, name: "Beta Launch", date: "Sep 15, 2026", status: "At Risk", icon: "!" },
  { id: 4, name: "Public Release", date: "Nov 1, 2026", status: "Planned", icon: "○" },
];

export const issues: Issue[] = [
  { id: "BUG-101", title: "Login fails on Safari", severity: "Critical", status: "Open", assignee: "Eve", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { id: "BUG-102", title: "Broken image paths in blog", severity: "Minor", status: "In Progress", assignee: "Bob", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { id: "BUG-103", title: "Memory leak on dashboard", severity: "Major", status: "Open", assignee: "Charlie", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
  { id: "BUG-104", title: "Typos in onboarding flow", severity: "Trivial", status: "Closed", assignee: "Diana", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
  { id: "BUG-105", title: "API timeout on reports", severity: "Critical", status: "In Progress", assignee: "Charlie", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
  { id: "BUG-106", title: "Mobile responsive issues", severity: "Major", status: "Open", assignee: "Bob", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
];

export const timeEntries: TimeEntry[] = [
  { id: 1, user: "Alice J.", task: "Sprint planning", hours: 2, date: "Jul 28", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
  { id: 2, user: "Bob S.", task: "Frontend components", hours: 6.5, date: "Jul 28", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { id: 3, user: "Charlie L.", task: "API development", hours: 7, date: "Jul 28", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
  { id: 4, user: "Diana R.", task: "UI mockups", hours: 4, date: "Jul 28", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
  { id: 5, user: "Eve C.", task: "Test automation", hours: 5.5, date: "Jul 28", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
];

export const risks: Risk[] = [
  { id: 1, risk: "Third-party API deprecation", likelihood: "High", impact: "High", owner: "Charlie", mitigation: "Build fallback service" },
  { id: 2, risk: "Team member availability", likelihood: "Medium", impact: "High", owner: "Alice", mitigation: "Cross-train developers" },
  { id: 3, risk: "Scope creep", likelihood: "High", impact: "Medium", owner: "Alice", mitigation: "Strict change control" },
  { id: 4, risk: "Server capacity limits", likelihood: "Low", impact: "Critical", owner: "Frank", mitigation: "Auto-scaling setup" },
];

export const sprints: Sprint[] = [
  { id: 1, name: "Sprint 10", goal: "Payment integration", start: "Jul 15", end: "Jul 28", total: 40, done: 28, status: "Completed" },
  { id: 2, name: "Sprint 11", goal: "Notification system", start: "Jul 29", end: "Aug 11", total: 35, done: 12, status: "On Track" },
  { id: 3, name: "Sprint 12", goal: "Search & filtering", start: "Aug 12", end: "Aug 25", total: 30, done: 0, status: "Planning" },
];

export const meetings: PMMeeting[] = [
  { id: 1, title: "Sprint Planning", date: "Mon, Jul 28", time: "10:00 AM", attendees: 8, type: "Planning" },
  { id: 2, title: "Daily Standup", date: "Daily", time: "9:30 AM", attendees: 12, type: "Standup" },
  { id: 3, title: "Design Review", date: "Wed, Jul 30", time: "2:00 PM", attendees: 5, type: "Review" },
  { id: 4, title: "Retrospective", date: "Fri, Aug 1", time: "4:00 PM", attendees: 10, type: "Retro" },
];

export const documents: Document[] = [
  { id: 1, name: "PRD-v2.pdf", author: "Alice", size: "2.4 MB", updated: "2 days ago", icon: "pdf" },
  { id: 2, name: "Tech-Specs.docx", author: "Charlie", size: "1.1 MB", updated: "5 days ago", icon: "doc" },
  { id: 3, name: "UI-Kit.fig", author: "Diana", size: "8.7 MB", updated: "1 day ago", icon: "fig" },
  { id: 4, name: "API-Reference.md", author: "Charlie", size: "340 KB", updated: "3 days ago", icon: "code" },
  { id: 5, name: "Test-Plans.xlsx", author: "Eve", size: "560 KB", updated: "1 week ago", icon: "sheet" },
  { id: 6, name: "Deployment-Guide.pdf", author: "Frank", size: "1.8 MB", updated: "2 weeks ago", icon: "pdf" },
];

export const templates: Template[] = [
  { id: 1, name: "Web App Launch", tasks: 24, duration: "4 weeks", usedBy: 45 },
  { id: 2, name: "Mobile MVP", tasks: 18, duration: "6 weeks", usedBy: 32 },
  { id: 3, name: "API Development", tasks: 12, duration: "3 weeks", usedBy: 28 },
  { id: 4, name: "Design Sprint", tasks: 8, duration: "2 weeks", usedBy: 51 },
  { id: 5, name: "Migration Project", tasks: 20, duration: "8 weeks", usedBy: 19 },
];

export const budgetItems: BudgetItem[] = [
  { id: 1, category: "Engineering", budget: 120000, spent: 85000, remaining: 35000 },
  { id: 2, category: "Design", budget: 45000, spent: 32000, remaining: 13000 },
  { id: 3, category: "Infrastructure", budget: 30000, spent: 28000, remaining: 2000 },
  { id: 4, category: "Marketing", budget: 25000, spent: 10000, remaining: 15000 },
  { id: 5, category: "Operations", budget: 20000, spent: 12000, remaining: 8000 },
];

export const roadmapPhases: RoadmapPhase[] = [
  { id: 1, phase: "Q3 2026", items: ["Design System Complete", "Core Features MVP", "User Testing Round 1"], status: "current" },
  { id: 2, phase: "Q4 2026", items: ["Beta Release", "Analytics Dashboard", "Performance Optimization"], status: "upcoming" },
  { id: 3, phase: "Q1 2027", items: ["Public Launch", "Enterprise Features", "Mobile App v1"], status: "upcoming" },
  { id: 4, phase: "Q2 2027", items: ["AI Integration", "Marketplace", "Internationalization"], status: "upcoming" },
];

export const projectComments: ProjectComment[] = [
  { id: 1, user: teamMembers[1], text: "The API rate limiting needs to be reviewed before we proceed with the integration.", time: "2 hr ago", replies: 3 },
  { id: 2, user: teamMembers[3], text: "Updated the mockups with the new color scheme. Please review.", time: "4 hr ago", replies: 1 },
  { id: 3, user: teamMembers[2], text: "PR #142 is ready for review. @bob @diana please take a look when you can.", time: "6 hr ago", replies: 5 },
];

export const pmNotifications: PMNotification[] = [
  { id: 1, text: "Eve mentioned you in BUG-101", time: "5 min ago", unread: true },
  { id: 2, text: "PR #142 requires your review", time: "1 hr ago", unread: true },
  { id: 3, text: "Sprint 10 starts tomorrow", time: "3 hr ago", unread: false },
  { id: 4, text: "Charlie completed Database optimization", time: "5 hr ago", unread: false },
  { id: 5, text: "Meeting reminder: Design Review at 2pm", time: "1 day ago", unread: false },
];

export const burndownData: BurndownPoint[] = [
  { day: "Mon", planned: 40, actual: 40 },
  { day: "Tue", planned: 35, actual: 33 },
  { day: "Wed", planned: 30, actual: 28 },
  { day: "Thu", planned: 25, actual: 20 },
  { day: "Fri", planned: 20, actual: 15 },
  { day: "Sat", planned: 15, actual: 10 },
  { day: "Sun", planned: 10, actual: 5 },
];

export const priorityMatrix: PriorityItem[] = [
  { id: 1, item: "Payment gateway", urgency: 5, importance: 5, quadrant: "Do First" },
  { id: 2, item: "Email templates", urgency: 4, importance: 3, quadrant: "Schedule" },
  { id: 3, item: "Dark mode", urgency: 2, importance: 4, quadrant: "Schedule" },
  { id: 4, item: "Logo redesign", urgency: 1, importance: 2, quadrant: "Delegate" },
  { id: 5, item: "Browser extension", urgency: 1, importance: 1, quadrant: "Eliminate" },
  { id: 6, item: "Performance opt.", urgency: 3, importance: 5, quadrant: "Do First" },
  { id: 7, item: "Analytics setup", urgency: 2, importance: 3, quadrant: "Schedule" },
  { id: 8, item: "Legacy cleanup", urgency: 1, importance: 1, quadrant: "Eliminate" },
];
