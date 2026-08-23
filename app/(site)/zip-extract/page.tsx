"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZIP_EXTRACT_SOURCE } from "./zip-extract-source";
import {
  BASIC_EXTRACT_EXAMPLE,
  EXTRACT_WITH_PROGRESS_EXAMPLE,
  EXTRACT_TREE_EXAMPLE,
  EXTRACT_WITH_SIZE_EXAMPLE,
  EXTRACT_WITH_PREVIEW_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zip-extract-examples";
import {
  BasicExtract,
  ExtractWithProgress,
  ExtractTree,
  ExtractWithSize,
  ExtractWithPreview,
  PlaygroundDemo,
} from "./demos";

export default function ZipExtractPage() {
  return (
    <ComponentDocPage
      name="Zip Extract"
      category="Tools"
      description="A zip extraction component for extracting and previewing contents of zip archives with file tree visualization."
    >
      <PreviewPanel filename="basic-extract.tsx">
        <BasicExtract />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZIP_EXTRACT_SOURCE}
        filename="components/ui/ZipExtract/BasicExtract.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zip extract variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Extract" description="Click to extract and reveal file list." code={BASIC_EXTRACT_EXAMPLE}>
          <BasicExtract />
        </ExampleBlock>
        <ExampleBlock title="With Progress" description="Animated progress bar during extraction." code={EXTRACT_WITH_PROGRESS_EXAMPLE}>
          <ExtractWithProgress />
        </ExampleBlock>
        <ExampleBlock title="File Tree" description="Hierarchical folder/file tree visualization." code={EXTRACT_TREE_EXAMPLE}>
          <ExtractTree />
        </ExampleBlock>
        <ExampleBlock title="With Size" description="File sizes with individual size bars." code={EXTRACT_WITH_SIZE_EXAMPLE}>
          <ExtractWithSize />
        </ExampleBlock>
        <ExampleBlock title="With Preview" description="File list with code preview panel." code={EXTRACT_WITH_PREVIEW_EXAMPLE}>
          <ExtractWithPreview />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
