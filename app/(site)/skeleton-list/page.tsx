"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SKELETON_LIST_SOURCE, AVATAR_EXAMPLE, CARD_EXAMPLE, NOTIFICATION_EXAMPLE } from "./skeleton-list-source";
import { InteractiveDemo, AllVariantsDemo } from "./skeleton-list-demos";

export default function SkeletonListPage() {
  return (
    <ComponentDocPage
      name="Skeleton List"
      category="Feedback"
      description="List-shaped skeleton loaders for content placeholders. Multiple variants for simple text, avatars, icons, cards, and notifications."
    >
      <PreviewPanel filename="skeleton-list.tsx">
        <InteractiveDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={SKELETON_LIST_SOURCE}
        filename="components/ui/SkeletonList/SkeletonList.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="All Variants"
          description="Overview of all list skeleton styles side by side."
          code={AVATAR_EXAMPLE}
          filename="all-variants.tsx"
        >
          <AllVariantsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
