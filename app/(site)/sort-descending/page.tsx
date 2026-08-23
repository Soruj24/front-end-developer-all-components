"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SORT_DESCENDING_SOURCE } from "./sort-descending-source";
import {
  DESCENDING_LIST_EXAMPLE,
  SORT_DROPDOWN_EXAMPLE,
  TABLE_SORT_EXAMPLE,
  FILTERED_GRID_EXAMPLE,
  LEADERBOARD_EXAMPLE,
  TOP_ITEMS_EXAMPLE,
  HIGH_SCORE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./sort-descending-examples";
import {
  DescendingList,
  SortDropdown,
  TableSort,
  FilteredGrid,
  Leaderboard,
  TopItems,
  HighScore,
  PlaygroundDemo,
} from "./demos";

export default function SortDescendingPage() {
  return (
    <ComponentDocPage
      name="Sort Descending"
      category="Data Display"
      description="A data display component for sorting collections in descending order with customizable sort keys and visual indicators."
    >
      <PreviewPanel filename="sort-descending.tsx">
        <DescendingList />
      </PreviewPanel>

      <SourceCodeViewer
        source={SORT_DESCENDING_SOURCE}
        filename="components/ui/SortDescending/DescendingList.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all sort descending variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Descending List" description="Basic list with toggle sort between name and price (descending)." code={DESCENDING_LIST_EXAMPLE}>
          <DescendingList />
        </ExampleBlock>
        <ExampleBlock title="Sort Dropdown" description="Dropdown select for sort options with category badges." code={SORT_DROPDOWN_EXAMPLE}>
          <SortDropdown />
        </ExampleBlock>
        <ExampleBlock title="Table Sort" description="Sortable table with column headers and direction arrows." code={TABLE_SORT_EXAMPLE}>
          <TableSort />
        </ExampleBlock>
        <ExampleBlock title="Filtered Grid" description="Category filter buttons with price-sorted product grid." code={FILTERED_GRID_EXAMPLE}>
          <FilteredGrid />
        </ExampleBlock>
        <ExampleBlock title="Leaderboard" description="Ranked players with medal indicators and highlight for top." code={LEADERBOARD_EXAMPLE}>
          <Leaderboard />
        </ExampleBlock>
        <ExampleBlock title="Top Items" description="Items ranked by revenue with colored progress bars." code={TOP_ITEMS_EXAMPLE}>
          <TopItems />
        </ExampleBlock>
        <ExampleBlock title="High Score" description="High score cards with gold highlight for rank #1." code={HIGH_SCORE_EXAMPLE}>
          <HighScore />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
