import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
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

const installCommand = `npx component-library@latest add project-management`;

const usageCode = `import { KanbanBoard, ProjectGrid, IssueTracker } from "@/features/project-management";

<ProjectGrid />
<KanbanBoard />
<IssueTracker />`;

export default function ProjectManagementPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Project Management</h1>
          <Badge variant="primary">18 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Project management dashboard with kanban boards, sprints, issues, time tracking, and roadmaps.
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
          <h3 className="text-lg font-semibold text-foreground">Projects & Kanban</h3>
          <p className="text-sm text-muted-foreground">Project grid overview and kanban board for task management.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <ProjectGrid />
            <KanbanBoard />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Team & Activity</h3>
          <p className="text-sm text-muted-foreground">Team members grid and activity feed timeline.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <TeamGrid />
            <div className="grid gap-6 lg:grid-cols-2">
              <ActivityFeedList />
              <MilestoneTimeline />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Issues & Sprints</h3>
          <p className="text-sm text-muted-foreground">Issue tracker, sprint board, and burndown chart.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <IssueTracker />
              <BurndownChart />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <SprintBoard />
              <RiskMatrix />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Time & Resources</h3>
          <p className="text-sm text-muted-foreground">Time tracking, meetings, documents, and templates.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <TimeTracking />
              <MeetingSchedule />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <DocumentList />
              <TemplateList />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Budget & Roadmap</h3>
          <p className="text-sm text-muted-foreground">Budget overview and roadmap timeline visualization.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <BudgetOverview />
            <RoadmapTimeline />
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
                <td className="px-4 py-3 font-mono text-xs">projects</td>
                <td className="px-4 py-3 text-muted-foreground">Project[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">tasks</td>
                <td className="px-4 py-3 text-muted-foreground">Task[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">team</td>
                <td className="px-4 py-3 text-muted-foreground">TeamMember[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onTaskMove</td>
                <td className="px-4 py-3 text-muted-foreground">(taskId: string, status: string) =&gt; void</td>
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
