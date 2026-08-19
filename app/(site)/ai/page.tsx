"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { AI_SOURCE } from "./ai-source";
import { AiDemos } from "./ai-demos";

const DEFAULT_EXAMPLE = `const { messages, input, setInput, isTyping, handleSend, handleKeyDown } = useAiChat();`;

export default function AiPage() {
  return (
    <ComponentDocPage
      name="AI Chat"
      category="Feedback"
      description="Full-featured AI chat interface with streaming, multiple models, code generation, file uploads, and voice recording."
    >
      <PreviewPanel filename="ai/page.tsx">
        <AiDemos />
      </PreviewPanel>

      <SourceCodeViewer
        source={AI_SOURCE}
        filename="components/ui/ai/AiChatSource"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Chat Hook Initialization" description="Initialize the AI chat hook with useAiChat()" code={DEFAULT_EXAMPLE} />
      </div>
    </ComponentDocPage>
  );
}