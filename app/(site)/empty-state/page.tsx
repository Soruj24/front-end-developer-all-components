"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import EmptyState from "@/components/ui/EmptyState";
import { Button } from "@/components/design-system/Button";

const EMPTYSTATE_SOURCE = `import { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: { icon: "h-8 w-8", title: "text-base", desc: "text-sm", pad: "py-8" },
  md: { icon: "h-12 w-12", title: "text-xl", desc: "text-sm", pad: "py-12" },
  lg: { icon: "h-16 w-16", title: "text-2xl", desc: "text-base", pad: "py-16" },
};

function EmptyState({ icon, title, description, action, size = "md" }: EmptyStateProps) {
  const s = sizeClasses[size];
  return (
    <div className={\`flex flex-col items-center justify-center gap-4 text-center \${s.pad} px-6\`}>
      {icon && <div className={\`\${s.icon} text-subtle\`}>{icon}</div>}
      <h3 className={\`\${s.title} font-semibold text-foreground\`}>{title}</h3>
      {description && <p className={\`\${s.desc} max-w-sm text-muted-foreground\`}>{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;`;

function InboxIcon() {
  return (
    <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
}

const BASIC_EXAMPLE = `<EmptyState
  icon={<InboxIcon />}
  title="No items yet"
  description="Get started by creating your first item."
  action={<Button>Create Item</Button>}
/>`;

const SMALL_EXAMPLE = `<EmptyState
  size="sm"
  icon={<SearchIcon />}
  title="No results"
  description="Try adjusting your search."
  action={<Button size="sm">Clear Filters</Button>}
/>`;

const LARGE_EXAMPLE = `<EmptyState
  size="lg"
  icon={<FolderIcon />}
  title="Create your first project"
  description="Projects help you organize your work. Start one today."
  action={<Button>Create Project</Button>}
/>`;

const WITHOUT_ICON_EXAMPLE = `<EmptyState
  title="Nothing here"
  description="Content will appear soon."
  action={<Button>Refresh</Button>}
/>`;

const WITHOUT_ACTION_EXAMPLE = `<EmptyState
  icon={<UsersIcon />}
  title="No team members"
  description="Invite your team to collaborate."
/>`;

export default function EmptyStatePage() {
  return (
    <ComponentDocPage
      name="Empty State"
      category="Feedback"
      description="Displays a placeholder for pages or sections with no content. Supports size variants, optional icon, description, and action button."
    >
      <PreviewPanel filename="empty-state-preview">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-lg border border-border p-6">
            <EmptyState
              icon={<InboxIcon />}
              title="No items yet"
              description="Get started by creating your first item."
              action={<Button>Create Item</Button>}
            />
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={EMPTYSTATE_SOURCE} filename="EmptyState.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Standard empty state with icon, text, and action." code={BASIC_EXAMPLE}>
          <div className="rounded-lg border border-border">
            <EmptyState
              icon={<InboxIcon />}
              title="No items yet"
              description="Get started by creating your first item."
              action={<Button>Create Item</Button>}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Small" description="Compact size for tight layouts." code={SMALL_EXAMPLE}>
          <div className="rounded-lg border border-border">
            <EmptyState
              size="sm"
              icon={<SearchIcon />}
              title="No results"
              description="Try adjusting your search."
              action={<Button size="sm">Clear Filters</Button>}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Large" description="Larger size for full-page empty states." code={LARGE_EXAMPLE}>
          <div className="rounded-lg border border-border">
            <EmptyState
              size="lg"
              icon={<FolderIcon />}
              title="Create your first project"
              description="Projects help you organize your work. Start one today."
              action={<Button>Create Project</Button>}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Without Icon" description="Empty state without an icon." code={WITHOUT_ICON_EXAMPLE}>
          <div className="rounded-lg border border-border">
            <EmptyState
              title="Nothing here"
              description="Content will appear soon."
              action={<Button>Refresh</Button>}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Without Action" description="Read-only empty state without a button." code={WITHOUT_ACTION_EXAMPLE}>
          <div className="rounded-lg border border-border">
            <EmptyState
              icon={<UsersIcon />}
              title="No team members"
              description="Invite your team to collaborate."
            />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
