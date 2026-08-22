"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { LIGHTBULB_IDEA_SOURCE } from "./lightbulb-idea-source";
import {
  TIP_CARD_EXAMPLE,
  SUGGESTION_ALERT_EXAMPLE,
  IDEA_GENERATOR_EXAMPLE,
  PRO_TIPS_LIST_EXAMPLE,
  QUICK_TIP_EXAMPLE,
  INSIGHT_CARD_EXAMPLE,
  CREATIVE_PROMPT_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./lightbulb-idea-examples";
import {
  TipCardDemo,
  SuggestionAlertDemo,
  IdeaGeneratorDemo,
  ProTipsListDemo,
  QuickTipDemo,
  InsightCardDemo,
  CreativePromptDemo,
  PlaygroundDemo,
} from "./demos";

export default function LightbulbIdeaPage() {
  return (
    <ComponentDocPage
      name="Lightbulb & Idea"
      category="Feedback"
      description="Display tips, suggestions, insights, and creative prompts with expressive icons and clear visual hierarchy."
    >
      <PreviewPanel filename="lightbulb-idea.tsx">
        <TipCardDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={LIGHTBULB_IDEA_SOURCE}
        filename="components/ui/LightbulbIdea/TipCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between tip, suggestion, idea, and insight variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Tip Card" description="Pro tip card with badge and icon header." code={TIP_CARD_EXAMPLE}>
          <TipCardDemo />
        </ExampleBlock>
        <ExampleBlock title="Suggestion Alert" description="Blue suggestion banner with icon and description." code={SUGGESTION_ALERT_EXAMPLE}>
          <SuggestionAlertDemo />
        </ExampleBlock>
        <ExampleBlock title="Idea Generator" description="Interactive idea generator with random suggestions." code={IDEA_GENERATOR_EXAMPLE}>
          <IdeaGeneratorDemo />
        </ExampleBlock>
        <ExampleBlock title="Pro Tips List" description="List of tips with star icons and readable typography." code={PRO_TIPS_LIST_EXAMPLE}>
          <ProTipsListDemo />
        </ExampleBlock>
        <ExampleBlock title="Quick Tip" description="Inline quick tip badge with icon." code={QUICK_TIP_EXAMPLE}>
          <QuickTipDemo />
        </ExampleBlock>
        <ExampleBlock title="Insight Card" description="Analytics insight card with category badge." code={INSIGHT_CARD_EXAMPLE}>
          <InsightCardDemo />
        </ExampleBlock>
        <ExampleBlock title="Creative Prompt" description="Creative prompt with quoted text and tag badges." code={CREATIVE_PROMPT_EXAMPLE}>
          <CreativePromptDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
