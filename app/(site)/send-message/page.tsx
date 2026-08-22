"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SEND_MESSAGE_SOURCE } from "./send-message-source";
import {
  BASIC_INPUT_EXAMPLE,
  WITH_ATTACHMENT_EXAMPLE,
  CHAT_PREVIEW_EXAMPLE,
  DISABLED_STATE_EXAMPLE,
  CHARACTER_COUNTER_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./send-message-examples";
import {
  BasicInput,
  WithAttachment,
  ChatPreview,
  DisabledState,
  CharacterCounter,
  PlaygroundDemo,
} from "./demos";

export default function SendMessagePage() {
  return (
    <ComponentDocPage
      name="Send Message"
      category="Forms"
      description="A message input and send component for chat interfaces with send button, input validation, and message composition."
    >
      <PreviewPanel filename="send-message.tsx">
        <BasicInput />
      </PreviewPanel>

      <SourceCodeViewer
        source={SEND_MESSAGE_SOURCE}
        filename="components/ui/SendMessage/BasicInput.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all send message variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Input" description="Simple message input with send button and focus ring." code={BASIC_INPUT_EXAMPLE}>
          <BasicInput />
        </ExampleBlock>
        <ExampleBlock title="With Attachment" description="Message input with expandable attachment toolbar." code={WITH_ATTACHMENT_EXAMPLE}>
          <WithAttachment />
        </ExampleBlock>
        <ExampleBlock title="Chat Preview" description="Conversation-style message bubbles with distinct sender styling." code={CHAT_PREVIEW_EXAMPLE}>
          <ChatPreview />
        </ExampleBlock>
        <ExampleBlock title="Disabled State" description="Non-interactive input and button for read-only contexts." code={DISABLED_STATE_EXAMPLE}>
          <DisabledState />
        </ExampleBlock>
        <ExampleBlock title="Character Counter" description="Input with live character count and color-coded limits." code={CHARACTER_COUNTER_EXAMPLE}>
          <CharacterCounter />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
