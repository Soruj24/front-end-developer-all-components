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

export default function CrmPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">CRM Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage contacts, deals, and sales operations.</p>
      </div>

      <MetricsGrid />
      <ContactTable />
      <LeadCards />
      <PipelineBoard />
      <CompanyGrid />
      <ActivityTimeline />
      <EmailTemplateList />

      <div className="grid gap-6 lg:grid-cols-2">
        <CallLogList />
        <MeetingList />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TaskList />
        <NoteList />
      </div>

      <SegmentGrid />
      <SalesForecast />

      <div className="grid gap-6 lg:grid-cols-2">
        <Leaderboard />
        <CommissionTable />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReportBuilder />
        <ImportExport />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <EnrichmentStatus />
        <HealthScoreCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChurnPrediction />
        <SatisfactionSurvey />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SupportTicketList />
        <KnowledgeBase />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ContractList />
        <InvoiceList />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <QuoteList />
        <ProductCatalog />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TerritoryMap />
        <GoalTracker />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PipelineAnalytics />
        <DealComparison />
      </div>

      <PerformanceDashboard />
      <CampaignHistory />
      <EmailInbox />
      <Customer360View />
    </div>
  );
}
