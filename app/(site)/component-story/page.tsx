"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import {
  VariantSwitchingDemo,
  InteractiveControlsDemo,
  LifecycleTimelineDemo,
  ThemePreviewDemo,
  PropsTableDemo,
  ComponentGridDemo,
  CodePreviewDemo,
} from "./component-story-demos";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { COMPONENT_STORY_SOURCE } from "./component-story-source";

export default function ComponentStoryPage() {
  return (
    <ComponentDocPage
      name="Component Story"
      category="Feedback"
      description="Component story viewer with variant switching, interactive controls, and lifecycle timeline for development."
    >
      <PreviewPanel filename="component-story.tsx">
        <VariantSwitchingDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={COMPONENT_STORY_SOURCE}
        filename="components/ui/ComponentStory/ComponentStory.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variant Switching" description="Switch between component variants with live preview and props display." code={`<VariantSwitchingDemo />`}>
          <VariantSwitchingDemo />
        </ExampleBlock>

        <ExampleBlock title="Interactive Controls" description="Toggle props with switches and dropdowns to see live changes." code={`<InteractiveControlsDemo />`}>
          <InteractiveControlsDemo />
        </ExampleBlock>

        <ExampleBlock title="Lifecycle Timeline" description="Step through component lifecycle phases with timing info." code={`<LifecycleTimelineDemo />`}>
          <LifecycleTimelineDemo />
        </ExampleBlock>

        <ExampleBlock title="Theme Preview" description="Preview components across light, dark, and system themes." code={`<ThemePreviewDemo />`}>
          <ThemePreviewDemo />
        </ExampleBlock>

        <ExampleBlock title="Props Documentation" description="Expandable props table with types, defaults, and descriptions." code={`<PropsTableDemo />`}>
          <PropsTableDemo />
        </ExampleBlock>

        <ExampleBlock title="Component Grid" description="Grid view of all variants and sizes at a glance." code={`<ComponentGridDemo />`}>
          <ComponentGridDemo />
        </ExampleBlock>

        <ExampleBlock title="Code Preview" description="Toggle between preview and source code for each variant." code={`<CodePreviewDemo />`}>
          <CodePreviewDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}