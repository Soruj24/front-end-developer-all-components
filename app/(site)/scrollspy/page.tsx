"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SCROLLSPY_SOURCE, SIDEBAR_EXAMPLE, DOTS_EXAMPLE, PILLS_EXAMPLE, PROGRESS_EXAMPLE } from "./scrollspy-source";
import { SidebarDemo, DotsDemo, PillsDemo, ProgressDemo, BackToTopDemo } from "./scrollspy-demos";

export default function ScrollspyPage() {
  return (
    <ComponentDocPage
      name="Scrollspy"
      category="Navigation"
      description="Track scroll position and highlight the current section in navigation. Includes progress indicators, dot navigation, and pill-style variants."
    >
      <PreviewPanel filename="scrollspy-sidebar.tsx">
        <div className="w-full">
          <SidebarDemo />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SCROLLSPY_SOURCE}
        filename="components/ui/Scrollspy/Scrollspy.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Dot Navigation"
          description="Minimal dot indicators for section tracking."
          code={DOTS_EXAMPLE}
          filename="dots.tsx"
        >
          <div className="w-full">
            <DotsDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Pill Navigation"
          description="Pill-style buttons that highlight the active section."
          code={PILLS_EXAMPLE}
          filename="pills.tsx"
        >
          <div className="w-full">
            <PillsDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Progress Bar"
          description="Shows overall scroll progress through the page."
          code={PROGRESS_EXAMPLE}
          filename="progress.tsx"
        >
          <div className="w-full">
            <ProgressDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Back to Top"
          description="Floating button that appears after scrolling down."
          code={`<ScrollspyBackToTop threshold={300} />`}
          filename="back-to-top.tsx"
        >
          <div className="w-full">
            <BackToTopDemo />
          </div>
        </ExampleBlock>
      </div>


    </ComponentDocPage>
  );
}
