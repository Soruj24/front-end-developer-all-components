"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { COMIC_PANEL_SOURCE, GRID_EXAMPLE, SPEECH_EXAMPLE, ACTION_EXAMPLE } from "./comic-panel-source";
import { TwoByTwoGridDemo, SpeechBubblesDemo, ActionPanelsDemo } from "./comic-panel-demos";

export default function ComicPanelPage() {
  return (
    <ComponentDocPage
      name="Comic Panel"
      category="Layout"
      description="A comic-style panel layout component for creating storyboard grids, comic strips, and narrative sequences."
    >
      <PreviewPanel filename="comic-panel.tsx">
        <TwoByTwoGridDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={COMIC_PANEL_SOURCE}
        filename="components/ui/ComicPanel/ComicPanel.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="2x2 Grid" description="A classic 4-panel comic layout." code={GRID_EXAMPLE}>
          <TwoByTwoGridDemo />
        </ExampleBlock>
        <ExampleBlock title="Speech Bubbles" description="Panels with character dialogue." code={SPEECH_EXAMPLE}>
          <SpeechBubblesDemo />
        </ExampleBlock>
        <ExampleBlock title="Action Panels" description="Dynamic panels with action effects." code={ACTION_EXAMPLE}>
          <ActionPanelsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}