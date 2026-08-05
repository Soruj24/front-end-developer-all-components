import {
  ProjectGrid,
  KanbanBoard,
  TeamGrid,
  ActivityFeedList,
  MilestoneTimeline,
  IssueTracker,
  TimeTracking,
  RiskMatrix,
  SprintBoard,
  MeetingSchedule,
  DocumentList,
  TemplateList,
  BudgetOverview,
  RoadmapTimeline,
  BurndownChart,
  PriorityMatrixView,
  CommentThread,
  NotificationList,
} from "@/features/project-management";

export default function ProjectManagementPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">Project Management</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Track projects, sprints, and team progress.</p>
      </div>

      <ProjectGrid />
      <KanbanBoard />
      <TeamGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityFeedList />
        <MilestoneTimeline />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <IssueTracker />
        <BurndownChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SprintBoard />
        <RiskMatrix />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TimeTracking />
        <MeetingSchedule />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DocumentList />
        <TemplateList />
      </div>

      <BudgetOverview />
      <RoadmapTimeline />

      <div className="grid gap-6 lg:grid-cols-2">
        <PriorityMatrixView />
        <CommentThread />
      </div>

      <NotificationList />
    </div>
  );
}
