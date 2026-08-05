export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  image: string;
  tasks: number;
  active: boolean;
  allocation?: number;
  project?: string;
}

export interface Project {
  id: number;
  name: string;
  status: "In Progress" | "Planning" | "Review" | "Completed" | "On Hold";
  priority: "Critical" | "High" | "Medium" | "Low";
  deadline: string;
  progress: number;
  team: number;
  tasks: number;
  completed: number;
  image: string;
}

export interface KanbanTask {
  id: number;
  title: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  assignee: string;
  image: string;
  tags?: string[];
}

export interface KanbanColumn {
  title: string;
  color: string;
  tasks: KanbanTask[];
}

export interface ActivityFeedItem {
  id: number;
  user: TeamMember;
  action: string;
  target: string;
  time: string;
  type: "done" | "comment" | "pr" | "file" | "bug" | "deploy" | "sprint" | "update";
}

export interface Milestone {
  id: number;
  name: string;
  date: string;
  status: "Completed" | "In Progress" | "At Risk" | "Planned";
  icon: string;
}

export interface Issue {
  id: string;
  title: string;
  severity: "Critical" | "Major" | "Minor" | "Trivial";
  status: "Open" | "In Progress" | "Closed";
  assignee: string;
  image: string;
}

export interface TimeEntry {
  id: number;
  user: string;
  task: string;
  hours: number;
  date: string;
  image: string;
}

export interface Risk {
  id: number;
  risk: string;
  likelihood: "High" | "Medium" | "Low";
  impact: "Critical" | "High" | "Medium" | "Low";
  owner: string;
  mitigation: string;
}

export interface Sprint {
  id: number;
  name: string;
  goal: string;
  start: string;
  end: string;
  total: number;
  done: number;
  status: "On Track" | "Planning" | "Completed" | "At Risk";
}

export interface PMMeeting {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: number;
  type: "Planning" | "Standup" | "Review" | "Retro";
}

export interface Document {
  id: number;
  name: string;
  author: string;
  size: string;
  updated: string;
  icon: string;
}

export interface Template {
  id: number;
  name: string;
  tasks: number;
  duration: string;
  usedBy: number;
}

export interface BudgetItem {
  id: number;
  category: string;
  budget: number;
  spent: number;
  remaining: number;
}

export interface RoadmapPhase {
  id: number;
  phase: string;
  items: string[];
  status: "current" | "upcoming";
}

export interface ProjectComment {
  id: number;
  user: TeamMember;
  text: string;
  time: string;
  replies: number;
}

export interface PMNotification {
  id: number;
  text: string;
  time: string;
  unread: boolean;
}

export interface BurndownPoint {
  day: string;
  planned: number;
  actual: number;
}

export interface PriorityItem {
  id: number;
  item: string;
  urgency: number;
  importance: number;
  quadrant: "Do First" | "Schedule" | "Delegate" | "Eliminate";
}
