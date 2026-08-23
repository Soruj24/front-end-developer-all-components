"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZIP_PROGRESS_SOURCE } from "./zip-progress-source";
import {
  BASIC_PROGRESS_EXAMPLE,
  PROGRESS_STATUSES_EXAMPLE,
  PROGRESS_WITH_SIZE_EXAMPLE,
  PROGRESS_COMPACT_EXAMPLE,
  PROGRESS_COMPLETE_EXAMPLE,
  PROGRESS_ERROR_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zip-progress-examples";
import {
  BasicProgress,
  ProgressStatuses,
  ProgressWithSize,
  ProgressCompact,
  ProgressComplete,
  ProgressError,
  PlaygroundDemo,
} from "./demos";

export default function ZipProgressPage() {
  return (
    <ComponentDocPage
      name="Zip Progress"
      category="Feedback"
      description="A zip progress component that displays real-time progress feedback during zip compression or extraction operations."
    >
      <PreviewPanel filename="basic-progress.tsx">
        <BasicProgress />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZIP_PROGRESS_SOURCE}
        filename="components/ui/ZipProgress/BasicProgress.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zip progress variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Progress" description="Animated progress bar with spinner and file count." code={BASIC_PROGRESS_EXAMPLE}>
          <BasicProgress />
        </ExampleBlock>
        <ExampleBlock title="Progress Statuses" description="Three-phase progress: compressing, extracting, complete." code={PROGRESS_STATUSES_EXAMPLE}>
          <ProgressStatuses />
        </ExampleBlock>
        <ExampleBlock title="With Size" description="Progress with file size tracking and pause/resume controls." code={PROGRESS_WITH_SIZE_EXAMPLE}>
          <ProgressWithSize />
        </ExampleBlock>
        <ExampleBlock title="Compact" description="Multiple file progress bars in a dense list." code={PROGRESS_COMPACT_EXAMPLE}>
          <ProgressCompact />
        </ExampleBlock>
        <ExampleBlock title="Complete" description="Success state with green styling and checkmark." code={PROGRESS_COMPLETE_EXAMPLE}>
          <ProgressComplete />
        </ExampleBlock>
        <ExampleBlock title="Error" description="Error state with retry button and failure message." code={PROGRESS_ERROR_EXAMPLE}>
          <ProgressError />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
