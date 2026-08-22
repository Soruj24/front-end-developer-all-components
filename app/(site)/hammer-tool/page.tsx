"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HAMMER_TOOL_SOURCE } from "./hammer-tool-source";
import {
  PLAYGROUND_EXAMPLE,
  INVENTORY_EXAMPLE,
  TASKS_EXAMPLE,
  CATEGORIES_EXAMPLE,
  WORKSHOP_EXAMPLE,
  RENTAL_EXAMPLE,
  MAINTENANCE_EXAMPLE,
  QUOTE_EXAMPLE,
} from "./hammer-tool-examples";
import {
  ToolInventoryDemo,
  ProjectTasksDemo,
  ToolCategoriesDemo,
  WorkshopDashboardDemo,
  ToolRentalDemo,
  MaintenanceScheduleDemo,
  ConstructionQuoteDemo,
  PlaygroundDemo,
} from "./demos";

export default function HammerToolPage() {
  return (
    <ComponentDocPage
      name="Hammer Tool"
      category="Data Display"
      description="Construction and tool-related data display components with inventory management, task tracking, rental calculators, and maintenance scheduling."
    >
      <PreviewPanel filename="tool-inventory.tsx">
        <ToolInventoryDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HAMMER_TOOL_SOURCE}
        filename="components/ui/HammerTool/HammerTool.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Filter tools by status, toggle quantity display, and select items." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Tool Inventory" description="Selectable tool list with status badges and quantity counts." code={INVENTORY_EXAMPLE}>
          <ToolInventoryDemo />
        </ExampleBlock>
        <ExampleBlock title="Project Tasks" description="Construction project task tracker with progress bar." code={TASKS_EXAMPLE}>
          <ProjectTasksDemo />
        </ExampleBlock>
        <ExampleBlock title="Tool Categories" description="Grid of tool categories with colored icons and item counts." code={CATEGORIES_EXAMPLE}>
          <ToolCategoriesDemo />
        </ExampleBlock>
        <ExampleBlock title="Workshop Dashboard" description="Overview of workshop stats and tool status." code={WORKSHOP_EXAMPLE}>
          <WorkshopDashboardDemo />
        </ExampleBlock>
        <ExampleBlock title="Tool Rental" description="Rental pricing calculator with day counter." code={RENTAL_EXAMPLE}>
          <ToolRentalDemo />
        </ExampleBlock>
        <ExampleBlock title="Maintenance Schedule" description="Tool maintenance tracking with status indicators." code={MAINTENANCE_EXAMPLE}>
          <MaintenanceScheduleDemo />
        </ExampleBlock>
        <ExampleBlock title="Construction Quote" description="Project cost estimator with itemized breakdown." code={QUOTE_EXAMPLE}>
          <ConstructionQuoteDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
