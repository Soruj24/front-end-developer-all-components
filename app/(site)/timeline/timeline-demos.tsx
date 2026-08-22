"use client";

import { useState } from "react";
import { Timeline } from "@/components/ui/Timeline";
import type { TimelineEvent } from "@/components/ui/Timeline";

export const EVENTS: TimelineEvent[] = [
  { date: "Jan 2026", title: "Project Kickoff", description: "Initial planning and team formation. Defined scope, milestones, and success criteria for the first phase of the project.", type: "work" },
  { date: "Mar 2026", title: "Beta Launch", description: "First public release to early adopters. Gathered feedback from 200+ users and iterated on core features.", type: "milestone" },
  { date: "Jun 2026", title: "General Availability", description: "Full public launch with production-ready infrastructure, documentation, and support channels.", type: "personal" },
  { date: "Aug 2026", title: "v2.0 Release", description: "Major version shipped with new architecture, performance improvements, and expanded API surface.", type: "milestone" },
];

const HORIZ_EVENTS: TimelineEvent[] = [
  { date: "Week 1", title: "Research", description: "User interviews and competitive analysis.", type: "work" },
  { date: "Week 2", title: "Design", description: "Wireframes and high-fidelity mockups created.", type: "work" },
  { date: "Week 3", title: "Build", description: "Core implementation and unit tests.", type: "milestone" },
  { date: "Week 4", title: "Ship", description: "Deploy to production and monitor.", type: "personal" },
];

const TYPE_EVENTS: TimelineEvent[] = [
  { date: "Work", title: "Sprint Planning", description: "Backlog grooming and story point estimation.", type: "work" },
  { date: "Personal", title: "Team Lunch", description: "Monthly team outing and social event.", type: "personal" },
  { date: "Milestone", title: "v2.0 Release", description: "Major version shipped with breaking changes.", type: "milestone" },
  { date: "Default", title: "Meeting", description: "Weekly sync with stakeholders." },
];

function EventIcon({ index }: { index: number }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {index === 0 && <path d="M12 2L2 7l10 5 10-5-10-5z" />}
      {index === 1 && <path d="M12 22V8M5 12l7-7 7 7" />}
      {index === 2 && <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />}
      {index === 3 && <path d="M22 4L12 14.01l-3-3" />}
    </svg>
  );
}

export function VerticalDemo() {
  return <Timeline events={EVENTS} />;
}

export function HorizontalDemo() {
  return <Timeline events={HORIZ_EVENTS} variant="horizontal" />;
}

export function TypeColorsDemo() {
  return <Timeline events={TYPE_EVENTS} />;
}

export function ExpandableDemo() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div>
      <Timeline
        events={EVENTS}
        expandedIndex={expanded}
        onEventClick={(i) => setExpanded(expanded === i ? null : i)}
      />
      <p className="mt-3 text-xs text-muted-foreground">
        {expanded !== null ? `Expanded: ${EVENTS[expanded].title}` : "Click an event to expand"}
      </p>
    </div>
  );
}

export function CustomIconsDemo() {
  return (
    <Timeline
      events={EVENTS.map((e, i) => ({ ...e, icon: <EventIcon index={i} /> }))}
    />
  );
}
