"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SORT_ASCENDING_SOURCE } from "./sort-ascending-source";
import {
  ASCENDING_LIST_EXAMPLE,
  SORT_DROPDOWN_EXAMPLE,
  TABLE_SORT_EXAMPLE,
  FILTERED_GRID_EXAMPLE,
  PRIORITY_QUEUE_EXAMPLE,
  RANKED_ITEMS_EXAMPLE,
  SCORE_BOARD_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./sort-ascending-examples";
import {
  AscendingList,
  SortDropdown,
  TableSort,
  FilteredGrid,
  PriorityQueue,
  RankedItems,
  ScoreBoard,
  PlaygroundDemo,
} from "./demos";

export default function SortAscendingPage() {
  return (
    <ComponentDocPage
      name="Sort Ascending"
      category="Data Display"
      description="A data display component for sorting collections in ascending order with customizable sort keys and visual indicators."
    >
      <PreviewPanel filename="sort-ascending.tsx">
        <AscendingList />
      </PreviewPanel>

      <SourceCodeViewer
        source={SORT_ASCENDING_SOURCE}
        filename="components/ui/SortAscending/AscendingList.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all sort ascending variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Ascending List" description="Basic list with toggle sort between name and price." code={ASCENDING_LIST_EXAMPLE}>
          <AscendingList />
        </ExampleBlock>
        <ExampleBlock title="Sort Dropdown" description="Dropdown select for sort options with category badges." code={SORT_DROPDOWN_EXAMPLE}>
          <SortDropdown />
        </ExampleBlock>
        <ExampleBlock title="Table Sort" description="Sortable table with column headers and direction arrows." code={TABLE_SORT_EXAMPLE}>
          <TableSort />
        </ExampleBlock>
        <ExampleBlock title="Filtered Grid" description="Category filter buttons with sorted product grid." code={FILTERED_GRID_EXAMPLE}>
          <FilteredGrid />
        </ExampleBlock>
        <ExampleBlock title="Priority Queue" description="Priority-sorted task list with color-coded badges." code={PRIORITY_QUEUE_EXAMPLE}>
          <PriorityQueue />
        </ExampleBlock>
        <ExampleBlock title="Ranked Items" description="Ranked list with numbered medals and score display." code={RANKED_ITEMS_EXAMPLE}>
          <RankedItems />
        </ExampleBlock>
        <ExampleBlock title="Score Board" description="Score bars with player ranking and progress visualization." code={SCORE_BOARD_EXAMPLE}>
          <ScoreBoard />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
