"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { ButtonGroup } from "@/components/ui/ButtonGroup";

const BUTTONGROUP_SOURCE = `import { cn } from "@/lib/cn";

type ButtonGroupOrientation = "horizontal" | "vertical";

interface ButtonGroupProps {
  className?: string;
  children: React.ReactNode;
  orientation?: ButtonGroupOrientation;
}

export function ButtonGroup({
  className,
  children,
  orientation = "horizontal",
}: ButtonGroupProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "flex-row",
        "[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:border-l-0 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
        isVertical &&
          "[&>*:not(:first-child)]:-ml-0 [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-t-0 [&>*:not(:first-child)]:rounded-none [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none",
        className
      )}
    >
      {children}
    </div>
  );
}`;

const DEFAULT_SOURCE = `import { ButtonGroup } from "@/components/ui/ButtonGroup";

<ButtonGroup>
  <button type="button" className="px-4 py-2 text-sm font-medium">Left</button>
  <button type="button" className="px-4 py-2 text-sm font-medium">Center</button>
  <button type="button" className="px-4 py-2 text-sm font-medium">Right</button>
</ButtonGroup>`;

const VERTICAL_SOURCE = `import { ButtonGroup } from "@/components/ui/ButtonGroup";

<ButtonGroup orientation="vertical">
  <button type="button" className="px-4 py-2 text-sm font-medium">Top</button>
  <button type="button" className="px-4 py-2 text-sm font-medium">Middle</button>
  <button type="button" className="px-4 py-2 text-sm font-medium">Bottom</button>
</ButtonGroup>`;

const WITH_ICONS_SOURCE = `import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Pencil, Copy, Trash2 } from "lucide-react";

<ButtonGroup>
  <button type="button" className="px-3 py-2"><Pencil className="h-4 w-4" /></button>
  <button type="button" className="px-3 py-2"><Copy className="h-4 w-4" /></button>
  <button type="button" className="px-3 py-2"><Trash2 className="h-4 w-4" /></button>
</ButtonGroup>`;

const PAGINATION_SOURCE = `import { ButtonGroup } from "@/components/ui/ButtonGroup";

<ButtonGroup>
  <button type="button" className="px-3 py-2" disabled>&larr;</button>
  {[1, 2, 3].map((page) => (
    <button key={page} type="button"
      className={\`px-4 py-2 text-sm font-medium \${
        page === 1 ? "bg-zinc-900 text-white" : ""
      }\`}>
      {page}
    </button>
  ))}
  <button type="button" className="px-3 py-2">&rarr;</button>
</ButtonGroup>`;

const SvgIcon = ({ d, className = "h-4 w-4" }: { d: string; className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const ICONS = {
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
};

export default function ButtonGroupPage() {
  return (
    <ComponentDocPage
      name="Button Group"
      category="Elements"
      description="Groups related buttons together with shared border styling. Supports horizontal and vertical orientations."
    >
      <PreviewPanel filename="button-group-preview.tsx">
        <ButtonGroup>
          <button type="button" className="px-4 py-2 text-sm font-medium">Left</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">Center</button>
          <button type="button" className="px-4 py-2 text-sm font-medium">Right</button>
        </ButtonGroup>
      </PreviewPanel>

      <SourceCodeViewer
        source={BUTTONGROUP_SOURCE}
        filename="components/ui/ButtonGroup/ButtonGroup.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Basic horizontal button group with shared borders." code={DEFAULT_SOURCE} filename="default.tsx">
          <ButtonGroup>
            <button type="button" className="px-4 py-2 text-sm font-medium">Left</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Center</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Right</button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock title="Vertical" description="Stack buttons vertically with top-to-bottom border merging." code={VERTICAL_SOURCE} filename="vertical.tsx">
          <ButtonGroup orientation="vertical">
            <button type="button" className="px-4 py-2 text-sm font-medium">Top</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Middle</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">Bottom</button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock title="With Icons" description="Group icon-only buttons for toolbar actions." code={WITH_ICONS_SOURCE} filename="with-icons.tsx">
          <ButtonGroup>
            {(["edit", "copy", "trash"] as const).map((key) => (
              <button key={key} type="button" className="px-3 py-2 text-sm font-medium">
                <SvgIcon d={ICONS[key]} />
              </button>
            ))}
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock title="Pagination" description="Common pagination pattern using a button group." code={PAGINATION_SOURCE} filename="pagination.tsx">
          <ButtonGroup>
            <button type="button" className="px-3 py-2 text-sm font-medium" disabled>&larr;</button>
            {[1, 2, 3].map((page) => (
              <button key={page} type="button" className={`px-4 py-2 text-sm font-medium ${page === 1 ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}>{page}</button>
            ))}
            <button type="button" className="px-3 py-2 text-sm font-medium">&rarr;</button>
          </ButtonGroup>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
