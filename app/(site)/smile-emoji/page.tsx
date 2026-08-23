"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SMILE_EMOJI_SOURCE } from "./smile-emoji-source";
import {
  EMOJI_PICKER_EXAMPLE,
  REACTION_BAR_EXAMPLE,
  MOOD_SELECTOR_EXAMPLE,
  FEEDBACK_FORM_EXAMPLE,
  EMOJI_RATING_EXAMPLE,
  CHAT_REACTION_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./smile-emoji-examples";
import {
  EmojiPicker,
  ReactionBar,
  MoodSelector,
  FeedbackForm,
  EmojiRating,
  ChatReaction,
  PlaygroundDemo,
} from "./demos";

export default function SmileEmojiPage() {
  return (
    <ComponentDocPage
      name="Smile Emoji"
      category="Reactions"
      description="Emoji-based interaction components for reactions, mood selection, sentiment analysis, and feedback collection."
    >
      <PreviewPanel filename="smile-emoji.tsx">
        <EmojiPicker />
      </PreviewPanel>

      <SourceCodeViewer
        source={SMILE_EMOJI_SOURCE}
        filename="components/ui/SmileEmoji/EmojiPicker.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all smile emoji variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Emoji Picker" description="Grid of emoji buttons with selection ring and active state." code={EMOJI_PICKER_EXAMPLE}>
          <EmojiPicker />
        </ExampleBlock>
        <ExampleBlock title="Reaction Bar" description="Pill-shaped reaction buttons with counts and toggle." code={REACTION_BAR_EXAMPLE}>
          <ReactionBar />
        </ExampleBlock>
        <ExampleBlock title="Mood Selector" description="Happy, neutral, and sad mood cards with icon and label." code={MOOD_SELECTOR_EXAMPLE}>
          <MoodSelector />
        </ExampleBlock>
        <ExampleBlock title="Feedback Form" description="Star rating with submit button and success state." code={FEEDBACK_FORM_EXAMPLE}>
          <FeedbackForm />
        </ExampleBlock>
        <ExampleBlock title="Emoji Rating" description="Emoji scale with highlighted active selection." code={EMOJI_RATING_EXAMPLE}>
          <EmojiRating />
        </ExampleBlock>
        <ExampleBlock title="Chat Reaction" description="Message bubble with quick reaction pill buttons." code={CHAT_REACTION_EXAMPLE}>
          <ChatReaction />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
