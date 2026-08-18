import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  MetricsGrid,
  ContactTable,
  LeadCards,
  PipelineBoard,
  CompanyGrid,
  ActivityTimeline,
  EmailTemplateList,
  CallLogList,
  MeetingList,
  TaskList,
  NoteList,
  SegmentGrid,
  SalesForecast,
  Leaderboard,
  CommissionTable,
  ReportBuilder,
  ImportExport,
  EnrichmentStatus,
  HealthScoreCard,
  ChurnPrediction,
  SatisfactionSurvey,
  SupportTicketList,
  KnowledgeBase,
  ContractList,
  InvoiceList,
  QuoteList,
  ProductCatalog,
  TerritoryMap,
  GoalTracker,
  PipelineAnalytics,
  DealComparison,
  PerformanceDashboard,
  CampaignHistory,
  EmailInbox,
  Customer360View,
} from "@/features/crm";

const installCommand = `npx component-library@latest add crm`;

const usageCode = `import { MetricsGrid, ContactTable, PipelineBoard } from "@/features/crm";

<MetricsGrid />
<ContactTable />
<PipelineBoard />`;

export default function CrmPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">CRM Dashboard</h1>
          <Badge variant="primary">20 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Full CRM dashboard with contacts, deals, pipeline, reports, and customer insights.
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
          <h3 className="text-lg font-semibold text-foreground">Metrics & Contacts</h3>
          <p className="text-sm text-muted-foreground">Key metrics grid and contact management table.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <MetricsGrid />
            <ContactTable />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Pipeline & Leads</h3>
          <p className="text-sm text-muted-foreground">Deal pipeline board and lead card management.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <LeadCards />
            <PipelineBoard />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Activity & Communications</h3>
          <p className="text-sm text-muted-foreground">Activity timeline, calls, meetings, and email templates.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <ActivityTimeline />
            <EmailTemplateList />
            <div className="grid gap-6 lg:grid-cols-2">
              <CallLogList />
              <MeetingList />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Analytics & Reports</h3>
          <p className="text-sm text-muted-foreground">Sales forecasts, leaderboards, and performance dashboards.</p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <SegmentGrid />
            <SalesForecast />
            <div className="grid gap-6 lg:grid-cols-2">
              <Leaderboard />
              <CommissionTable />
            </div>
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
                <td className="px-4 py-3 font-mono text-xs">contacts</td>
                <td className="px-4 py-3 text-muted-foreground">Contact[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">deals</td>
                <td className="px-4 py-3 text-muted-foreground">Deal[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">metrics</td>
                <td className="px-4 py-3 text-muted-foreground">Metric[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">activities</td>
                <td className="px-4 py-3 text-muted-foreground">Activity[]</td>
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
