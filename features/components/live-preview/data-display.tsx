"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  Calendar,
  Carousel,
  JsonTreeViewer,
  Pagination,
  ScrollArea,
  Skeleton,
  SkeletonCard,
  Table,
  Timeline,
} from "@/components/ui";
import { Button } from "@/components/ui";

export const dataDisplay: Record<string, () => ReactNode> = {
  table: () => (
    <div className="w-full max-w-xl">
      <Table
        striped
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "role", label: "Role" },
          { key: "status", label: "Status" },
        ]}
        data={[
          { id: "1", name: "Ada Lovelace", role: "Engineer", status: "Active" },
          { id: "2", name: "Grace Hopper", role: "Lead", status: "Active" },
          { id: "3", name: "Alan Turing", role: "Researcher", status: "Away" },
        ]}
        rowKey="id"
      />
    </div>
  ),

  pagination: () => <PaginationDemo />,

  timeline: () => (
    <div className="w-full max-w-md">
      <Timeline
        events={[
          { date: "2026-06-01", title: "Design tokens defined", description: "Palette and spacing shipped.", type: "success" },
          { date: "2026-06-10", title: "Core primitives built", description: "Button, Input, Badge released.", type: "info" },
          { date: "2026-06-20", title: "Registry live", description: "1,000+ components published.", type: "warning" },
        ]}
      />
    </div>
  ),

  calendar: () => (
    <Calendar
      month={new Date(2026, 6, 1)}
      events={{
        3: [{ title: "Release v2.1", type: "primary" }],
        12: [{ title: "Team sync", type: "warning" }],
        21: [{ title: "Ship day", type: "success" }],
      }}
    />
  ),

  carousel: () => (
    <div className="w-full max-w-xl">
      <Carousel
        autoPlay
        interval={2800}
        slides={[
          { content: <SlideCard label="Introduction" text="Component Library overview." /> },
          { content: <SlideCard label="Primitives" text="Accessible, dependency-free building blocks." /> },
          { content: <SlideCard label="Templates" text="Full application pages and layouts." /> },
        ]}
      />
    </div>
  ),

  "json-tree-viewer": () => (
    <JsonTreeViewer
      data={{
        name: "component-library",
        version: "2.1.0",
        contributors: ["ada", "grace", "alan"],
        features: { dark: true, a11y: true },
      }}
      height={240}
      defaultExpandedDepth={1}
    />
  ),

  "scroll-area": () => (
    <ScrollArea maxHeight="180px" className="w-full max-w-sm rounded-lg border border-border">
      <div className="flex flex-col gap-2 p-4 text-sm text-muted-foreground">
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index}>Scrollable row {index + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),

  skeleton: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <SkeletonCard className="w-full" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    </div>
  ),
};

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />;
}

function SlideCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex h-40 flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-soft to-info-soft px-6 text-center">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="max-w-xs text-xs text-muted-foreground">{text}</p>
      <Button size="sm" variant="outline" className="mt-1">
        Learn more
      </Button>
    </div>
  );
}
