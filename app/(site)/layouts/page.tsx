"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PreviewPanel, SourceCodeViewer } from "@/components/docs";
import {
  SidebarMainDemo,
  SidebarListDemo,
  HeaderContentDemo,
  StackedSidebarDemo,
  ThreeColumnDemo,
} from "./patterns/shell-demos";
import {
  CenteredHeroDemo,
  HolyGrailDemo,
  SplitDemo,
  CardGridDemo,
  StickyFooterDemo,
} from "./patterns/page-demos";
import {
  RightPanelDemo,
  MasonryDemo,
  SidebarTabsDemo,
  OverlaySidebarDemo,
} from "./patterns/panel-demos";
import {
  MinimalBlogDemo,
  ModalSheetDemo,
  WizardDemo,
  TerminalDemo,
} from "./patterns/content-demos";
import {
  EmailClientDemo,
  KanbanDemo,
  MobileChatDemo,
} from "./patterns/workspace-demos";
import {
  ProfileDemo,
  EmptyStateDemo,
  LoadingSkeletonDemo,
} from "./patterns/status-demos";
import { AppShellPreview } from "./patterns/AppShellPreview";
import { LayoutPlayground } from "./patterns/LayoutPlayground";
import { SIDEBAR_MAIN_SOURCE, HOLY_GRAIL_SOURCE } from "./sources/shell-sources";
import {
  OVERLAY_SIDEBAR_SOURCE,
  WIZARD_SOURCE,
} from "./sources/stateful-sources";

const installCommand = `npx component-library@latest add layouts`;

const usageCode = `import { AppShell } from "@/components/layouts";

<AppShell sidebar={<Sidebar />} header={<Header />}>
  <main>{/* your content */}</main>
</AppShell>`;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      {children}
    </section>
  );
}

const examples: Array<{ id: string; label: string; demo: React.ReactNode }> = [
  { id: "layout-sidebar-main", label: "Icon rail and labelled list sidebars", demo: (
    <div className="flex w-full flex-col gap-4">
      <SidebarMainDemo />
      <SidebarListDemo />
    </div>
  ) },
  { id: "layout-header-content", label: "Top navigation bar", demo: <HeaderContentDemo /> },
  { id: "layout-stacked-sidebar", label: "Stacked top bar with icon rail", demo: <StackedSidebarDemo /> },
  { id: "layout-three-column", label: "Rail, main pane, details panel", demo: <ThreeColumnDemo /> },
  { id: "layout-centered-hero", label: "Centred hero", demo: <CenteredHeroDemo /> },
  { id: "layout-holy-grail", label: "Holy grail", demo: <HolyGrailDemo /> },
  { id: "layout-split", label: "Split view", demo: <SplitDemo /> },
  { id: "layout-card-grid", label: "Card grid", demo: <CardGridDemo /> },
  { id: "layout-sticky-footer", label: "Sticky footer actions", demo: <StickyFooterDemo /> },
  { id: "layout-right-panel", label: "Right inspector panel", demo: <RightPanelDemo /> },
  { id: "layout-masonry", label: "Masonry columns", demo: <MasonryDemo /> },
  { id: "layout-sidebar-tabs", label: "Tabbed sidebar", demo: <SidebarTabsDemo /> },
  { id: "layout-overlay-sidebar", label: "Overlay drawer", demo: <OverlaySidebarDemo /> },
  { id: "layout-minimal-blog", label: "Minimal blog post", demo: <MinimalBlogDemo /> },
  { id: "layout-modal-sheet", label: "Bottom sheet", demo: <ModalSheetDemo /> },
  { id: "layout-wizard", label: "Multi-step wizard", demo: <WizardDemo /> },
  { id: "layout-terminal", label: "Terminal panel", demo: <TerminalDemo /> },
  { id: "layout-email-client", label: "Email tripane", demo: <EmailClientDemo /> },
  { id: "layout-kanban", label: "Kanban board", demo: <KanbanDemo /> },
  { id: "layout-profile", label: "Profile tabs", demo: <ProfileDemo /> },
  { id: "layout-mobile-chat", label: "Mobile chat", demo: <MobileChatDemo /> },
  { id: "layout-empty-state", label: "Empty state", demo: <EmptyStateDemo /> },
  { id: "layout-loading-skeleton", label: "Loading skeleton", demo: <LoadingSkeletonDemo /> },
];

export default function LayoutsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Layouts</h1>
          <Badge variant="primary">23 patterns</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Production-ready layout compositions — app shells, holy grail pages,
          split views, inspectors, wizards, boards, and state screens. Every
          pattern is token-driven, keyboard accessible, and theme aware.
        </p>
      </header>

      {/* Installation */}
      <Section title="Installation">
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </Section>

      {/* Usage */}
      <Section title="Usage">
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </Section>

      {/* Live Preview */}
      <Section title="Live Preview">
        <p className="max-w-2xl text-sm text-muted-foreground">
          A live app shell — collapse the sidebar, switch sections, or open the
          drawer on a small viewport (Escape closes it).
        </p>
        <PreviewPanel filename="app-shell-preview.tsx">
          <AppShellPreview />
        </PreviewPanel>
      </Section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        {examples.map(({ id, label, demo }) => (
          <ComponentPreview key={id} id={id} title={label}>
            {demo}
          </ComponentPreview>
        ))}
      </section>

      {/* Playground */}
      <Section title="Playground">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Recompose a shell live — toggle regions and tune density and radius.
        </p>
        <PreviewPanel filename="layout-playground.tsx">
          <LayoutPlayground />
        </PreviewPanel>
      </Section>

      {/* Code Viewer */}
      <Section title="Code Viewer">
        <p className="max-w-2xl text-sm text-muted-foreground">
          The actual updated Tailwind CSS source behind the redesign — every
          color, radius, shadow, and motion curve comes from the design tokens.
          Each example above also exposes its full source in the Code tab.
        </p>
        <SourceCodeViewer
          source={SIDEBAR_MAIN_SOURCE}
          filename="layouts/patterns/shell-demos.tsx — SidebarMainDemo"
          defaultExpanded
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <SourceCodeViewer source={HOLY_GRAIL_SOURCE} filename="layouts/patterns/page-demos.tsx — HolyGrailDemo" />
          <SourceCodeViewer source={OVERLAY_SIDEBAR_SOURCE} filename="layouts/patterns/panel-demos.tsx — OverlaySidebarDemo" />
          <SourceCodeViewer source={WIZARD_SOURCE} filename="layouts/patterns/content-demos.tsx — WizardDemo" />
        </div>
      </Section>
    </div>
  );
}
