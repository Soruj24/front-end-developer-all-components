"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { REGEX_TESTER_SOURCE } from "./regex-tester-source";
import {
  BASIC_PATTERN_EXAMPLE,
  TEST_RESULTS_EXAMPLE,
  WITH_SEARCH_EXAMPLE,
  INTERACTIVE_TESTER_EXAMPLE,
  FLAG_SELECTOR_EXAMPLE,
  HIGHLIGHT_MATCHES_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./regex-tester-examples";
import {
  BasicPattern,
  TestResults,
  WithSearch,
  InteractiveTester,
  FlagSelector,
  HighlightMatches,
  PlaygroundDemo,
} from "./demos";

export default function RegexTesterPage() {
  return (
    <ComponentDocPage
      name="Regex Tester"
      category="Tools"
      description="A regular expression testing tool for validating patterns, testing strings, and debugging regex expressions."
    >
      <PreviewPanel filename="regex-tester.tsx">
        <BasicPattern />
      </PreviewPanel>

      <SourceCodeViewer
        source={REGEX_TESTER_SOURCE}
        filename="components/ui/RegexTester/BasicPattern.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all regex tester variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Pattern" description="Static pattern display with match indicator." code={BASIC_PATTERN_EXAMPLE}>
          <BasicPattern />
        </ExampleBlock>
        <ExampleBlock title="Test Results" description="Multiple test strings with match/no-match results." code={TEST_RESULTS_EXAMPLE}>
          <TestResults />
        </ExampleBlock>
        <ExampleBlock title="With Search" description="Search-style pattern input with description." code={WITH_SEARCH_EXAMPLE}>
          <WithSearch />
        </ExampleBlock>
        <ExampleBlock title="Interactive Tester" description="Live regex tester with editable pattern and test string." code={INTERACTIVE_TESTER_EXAMPLE}>
          <InteractiveTester />
        </ExampleBlock>
        <ExampleBlock title="Flag Selector" description="Toggle regex flags (g, i, m, s) with visual preview." code={FLAG_SELECTOR_EXAMPLE}>
          <FlagSelector />
        </ExampleBlock>
        <ExampleBlock title="Highlight Matches" description="Inline text with highlighted email matches and copy." code={HIGHLIGHT_MATCHES_EXAMPLE}>
          <HighlightMatches />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
