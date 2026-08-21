"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import Timeline from "@/components/ui/Timeline";
import type { TimelineProps } from "@/components/ui/Timeline";

const TIMELINE_SOURCE = `"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type?: string;
  icon?: ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  variant?: "vertical" | "horizontal";
  onEventClick?: (index: number) => void;
  expandedIndex?: number | null;
}

const TYPE_STYLES: Record<string, { dot: string; badge: string }> = {
  work:      { dot: "bg-blue-500 text-white",    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  personal:  { dot: "bg-emerald-500 text-white",  badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  milestone: { dot: "bg-amber-500 text-white",    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  default:   { dot: "bg-muted-foreground text-white", badge: "bg-muted text-muted-foreground" },
};

// Vertical: gradient-faded line, ring-2 ring-background nodes,
//           rounded-xl cards, type badges, focus-visible ring
// Horizontal: gradient connector, ring nodes, scrollable layout`;

const EVENTS: TimelineProps["events"] = [
  { date: "Jan 2026", title: "Project Kickoff", description: "Initial planning and team formation. Defined scope, milestones, and success criteria for the first phase of the project.", type: "work" },
  { date: "Mar 2026", title: "Beta Launch", description: "First public release to early adopters. Gathered feedback from 200+ users and iterated on core features.", type: "milestone" },
  { date: "Jun 2026", title: "General Availability", description: "Full public launch with production-ready infrastructure, documentation, and support channels.", type: "personal" },
  { date: "Aug 2026", title: "v2.0 Release", description: "Major version shipped with new architecture, performance improvements, and expanded API surface.", type: "milestone" },
];

const HORIZ_EVENTS: TimelineProps["events"] = [
  { date: "Week 1", title: "Research", description: "User interviews and competitive analysis.", type: "work" },
  { date: "Week 2", title: "Design", description: "Wireframes and high-fidelity mockups created.", type: "work" },
  { date: "Week 3", title: "Build", description: "Core implementation and unit tests.", type: "milestone" },
  { date: "Week 4", title: "Ship", description: "Deploy to production and monitor.", type: "personal" },
];

const TYPE_EVENTS: TimelineProps["events"] = [
  { date: "Work", title: "Sprint Planning", description: "Backlog grooming and story point estimation.", type: "work" },
  { date: "Personal", title: "Team Lunch", description: "Monthly team outing and social event.", type: "personal" },
  { date: "Milestone", title: "v2.0 Release", description: "Major version shipped with breaking changes.", type: "milestone" },
  { date: "Default", title: "Meeting", description: "Weekly sync with stakeholders.", type: "default" },
];

const VERT_SRC = `import Timeline from "@/components/ui/Timeline";

const events = [
  { date: "Jan 2026", title: "Kickoff", description: "Project started.", type: "work" },
  { date: "Mar 2026", title: "Beta", description: "First release.", type: "milestone" },
];

<Timeline events={events} variant="vertical" />`;

const HORIZ_SRC = `import Timeline from "@/components/ui/Timeline";

const events = [
  { date: "Week 1", title: "Research", description: "Discovery phase.", type: "work" },
  { date: "Week 2", title: "Design", description: "UI/UX phase.", type: "work" },
];

<Timeline events={events} variant="horizontal" />`;

const TYPES_SRC = `import Timeline from "@/components/ui/Timeline";

const events = [
  { date: "Work", title: "Sprint", description: "Backlog.", type: "work" },
  { date: "Personal", title: "Lunch", description: "Team event.", type: "personal" },
  { date: "Milestone", title: "v2.0", description: "Major release.", type: "milestone" },
];

<Timeline events={events} />`;

const EXPAND_SRC = `import { useState } from "react";
import Timeline from "@/components/ui/Timeline";

function ExpandableTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <Timeline
      events={events}
      expandedIndex={expanded}
      onEventClick={(i) => setExpanded(expanded === i ? null : i)}
    />
  );
}`;

const ICONS_SRC = `import Timeline from "@/components/ui/Timeline";

const events = [
  { date: "Q1", title: "Launch", description: "...", type: "milestone", icon: <StarIcon className="h-4 w-4" /> },
];

<Timeline events={events} />`;

export default function TimelinePage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ComponentDocPage
      name="Timeline"
      category="Data Display"
      description="A vertical or horizontal timeline for chronological events with type-based color coding, expand/collapse, keyboard navigation, and custom icons."
    >
      <PreviewPanel filename="timeline-preview.tsx">
        <Timeline
          events={EVENTS}
          expandedIndex={expanded}
          onEventClick={(i) => setExpanded(expanded === i ? null : i)}
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={TIMELINE_SOURCE}
        filename="components/ui/Timeline.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Vertical"
          description="Default vertical layout with gradient-faded timeline line and type-colored nodes."
          code={VERT_SRC}
          filename="vertical.tsx"
        >
          <Timeline events={EVENTS} />
        </ExampleBlock>

        <ExampleBlock
          title="Horizontal"
          description="Horizontal scrollable layout with gradient connectors."
          code={HORIZ_SRC}
          filename="horizontal.tsx"
        >
          <Timeline events={HORIZ_EVENTS} variant="horizontal" />
        </ExampleBlock>

        <ExampleBlock
          title="Type Colors"
          description="Color-coded events: work (blue), personal (emerald), milestone (amber), default (muted)."
          code={TYPES_SRC}
          filename="type-colors.tsx"
        >
          <Timeline events={TYPE_EVENTS} />
        </ExampleBlock>

        <ExampleBlock
          title="Expandable"
          description="Click events to expand or collapse their description."
          code={EXPAND_SRC}
          filename="expandable.tsx"
        >
          <Timeline
            events={EVENTS}
            expandedIndex={expanded}
            onEventClick={(i) => setExpanded(expanded === i ? null : i)}
          />
          <p className="mt-3 text-xs text-muted-foreground">
            {expanded !== null ? `Expanded: ${EVENTS[expanded].title}` : "Click an event to expand"}
          </p>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Icons"
          description="Pass custom icon nodes to timeline events."
          code={ICONS_SRC}
          filename="custom-icons.tsx"
        >
          <Timeline
            events={EVENTS.map((e, i) => ({
              ...e,
              icon: (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {i === 0 && <path d="M12 2L2 7l10 5 10-5-10-5z" />}
                  {i === 1 && <path d="M12 22V8M5 12l7-7 7 7" />}
                  {i === 2 && <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />}
                  {i === 3 && <path d="M22 4L12 14.01l-3-3" />}
                </svg>
              ),
            }))}
          />
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">events</td>
                <td className="px-4 py-3 text-muted-foreground">TimelineEvent[]</td>
                <td className="px-4 py-3 text-muted-foreground">&mdash;</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot; | &quot;horizontal&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onEventClick</td>
                <td className="px-4 py-3 text-muted-foreground">(index: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">&mdash;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">expandedIndex</td>
                <td className="px-4 py-3 text-muted-foreground">number | null</td>
                <td className="px-4 py-3 text-muted-foreground">&mdash;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Event Property</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">date</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">Date or period label</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">Event title</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">Event description (supports line-clamp)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">type</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;work&quot; | &quot;personal&quot; | &quot;milestone&quot; | &quot;default&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">Color coding type</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">Custom icon override for the node</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
