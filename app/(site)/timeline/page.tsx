"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TIMELINE_SOURCE = `import { ReactNode } from "react";

interface TimelineEvent { date: string; title: string; description: string; type?: string; icon?: ReactNode; }
interface TimelineProps { events: TimelineEvent[]; variant?: "vertical" | "horizontal"; onEventClick?: (i: number) => void; expandedIndex?: number | null; }

const typeColors: Record<string, string> = { work: "bg-info", personal: "bg-success", milestone: "bg-warning", default: "bg-muted-foreground" };

export default function Timeline({ events, variant = "vertical", onEventClick, expandedIndex }: TimelineProps) {
  if (variant === "horizontal") {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-0 min-w-max">
          {events.map((event, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center">
                <div className={\`flex h-8 w-8 shrink-0 items-center justify-center rounded-full \${typeColors[event.type || "default"]} text-white\`}>
                  {event.icon || <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                {i < events.length - 1 && <div className="h-0.5 w-24 bg-muted" />}
              </div>
              <div onClick={() => onEventClick?.(i)} className="mt-2 w-48 cursor-pointer rounded-xl border border-border bg-surface p-3">
                <span className="text-xs text-muted-foreground">{event.date}</span>
                <h4 className="mt-1 text-sm font-medium text-foreground">{event.title}</h4>
                <p className={\`mt-1 text-xs text-muted-foreground \${expandedIndex !== i ? "line-clamp-2" : ""}\`}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-muted" />
      <div className="flex flex-col gap-6">
        {events.map((event, i) => (
          <div key={i} className="relative flex items-start">
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
              <div className={\`flex h-10 w-10 items-center justify-center rounded-full \${typeColors[event.type || "default"]} text-white\`}>
                {event.icon || <div className="h-3 w-3 rounded-full bg-white" />}
              </div>
            </div>
            <div className="hidden md:flex flex-1" />
            <div onClick={() => onEventClick?.(i)} className="cursor-pointer rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-muted md:w-[calc(50%-28px)] flex-1 md:flex-none">
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">{event.date}</span>
              </div>
              <h4 className="mt-2 text-sm font-medium text-foreground">{event.title}</h4>
              <p className={\`mt-1 text-xs text-muted-foreground \${expandedIndex !== i ? "line-clamp-2" : ""}\`}>{event.description}</p>
            </div>
            <div className="hidden md:block flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}`;

const VERT_SRC = `import Timeline from "@/components/ui/Timeline";
const events = [
  { date: "Jan 2026", title: "Project Kickoff", description: "Initial planning.", type: "work" },
  { date: "Mar 2026", title: "Beta Launch", description: "First public release.", type: "milestone" },
  { date: "Jun 2026", title: "General Availability", description: "Full public launch.", type: "personal" },
];
export default function VerticalExample() {
  return <Timeline events={events} variant="vertical" />;
}`;

const HORIZ_SRC = `import Timeline from "@/components/ui/Timeline";
const events = [
  { date: "Week 1", title: "Research", description: "User interviews.", type: "work" },
  { date: "Week 2", title: "Design", description: "Wireframes created.", type: "work" },
  { date: "Week 3", title: "Build", description: "Core implementation.", type: "milestone" },
];
export default function HorizontalExample() {
  return <Timeline events={events} variant="horizontal" />;
}`;

const TYPES_SRC = `import Timeline from "@/components/ui/Timeline";
const events = [
  { date: "Work", title: "Sprint Planning", description: "Backlog grooming.", type: "work" },
  { date: "Personal", title: "Team Lunch", description: "Monthly outing.", type: "personal" },
  { date: "Milestone", title: "v2.0 Release", description: "Major version shipped.", type: "milestone" },
  { date: "Default", title: "Meeting", description: "Weekly sync.", type: "default" },
];
export default function TypeColorsExample() {
  return <Timeline events={events} />;
}`;

const EVENTS = [
  { date: "Jan 2026", title: "Project Kickoff", description: "Initial planning.", type: "work" },
  { date: "Mar 2026", title: "Beta Launch", description: "First public release.", type: "milestone" },
  { date: "Jun 2026", title: "General Availability", description: "Full public launch.", type: "personal" },
];
const HORIZ_EVENTS = [
  { date: "Week 1", title: "Research", description: "User interviews.", type: "work" },
  { date: "Week 2", title: "Design", description: "Wireframes created.", type: "work" },
  { date: "Week 3", title: "Build", description: "Core implementation.", type: "milestone" },
];
const TYPE_EVENTS = [
  { date: "Work", title: "Sprint Planning", description: "Backlog grooming.", type: "work" },
  { date: "Personal", title: "Team Lunch", description: "Monthly outing.", type: "personal" },
  { date: "Milestone", title: "v2.0 Release", description: "Major version shipped.", type: "milestone" },
];

const tc: Record<string, string> = { work: "bg-info", personal: "bg-success", milestone: "bg-warning", default: "bg-muted-foreground" };

function InlineTimeline({ events, variant = "vertical" }: { events: typeof EVENTS; variant?: "vertical" | "horizontal" }) {
  if (variant === "horizontal") {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-0 min-w-max">
          {events.map((e, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${tc[e.type || "default"]} text-white`}>
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                {i < events.length - 1 && <div className="h-0.5 w-24 bg-muted" />}
              </div>
              <div className="mt-2 w-48 rounded-xl border border-border bg-surface p-3">
                <span className="text-xs text-muted-foreground">{e.date}</span>
                <h4 className="mt-1 text-sm font-medium text-foreground">{e.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-muted" />
      <div className="flex flex-col gap-6">
        {events.map((e, i) => (
          <div key={i} className="relative flex items-start">
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tc[e.type || "default"]} text-white`}>
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>
            </div>
            <div className="hidden md:flex flex-1" />
            <div className="rounded-xl border border-border bg-surface p-4 md:w-[calc(50%-28px)] flex-1 md:flex-none">
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">{e.date}</span>
              </div>
              <h4 className="mt-2 text-sm font-medium text-foreground">{e.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{e.description}</p>
            </div>
            <div className="hidden md:block flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <ComponentDocPage
      name="Timeline"
      category="Data Display"
      description="A vertical or horizontal timeline component for displaying chronological events with type-based color coding."
    >
      <PreviewPanel filename="timeline-preview.tsx">
        <InlineTimeline events={EVENTS} />
      </PreviewPanel>
      <SourceCodeViewer source={TIMELINE_SOURCE} filename="components/ui/Timeline.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Vertical Timeline" description="Default vertical layout with event cards." code={VERT_SRC} filename="vertical-example.tsx">
          <InlineTimeline events={EVENTS} />
        </ExampleBlock>
        <ExampleBlock title="Horizontal Timeline" description="Horizontal scrollable layout for sequential events." code={HORIZ_SRC} filename="horizontal-example.tsx">
          <InlineTimeline events={HORIZ_EVENTS} variant="horizontal" />
        </ExampleBlock>
        <ExampleBlock title="Type Colors" description="Color-coded events based on type: work, personal, milestone, default." code={TYPES_SRC} filename="type-colors.tsx">
          <InlineTimeline events={TYPE_EVENTS} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
