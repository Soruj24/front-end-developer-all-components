"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { StreamingResponse, createDemoStream } from "@/components/ui/StreamingResponse";

const STREAMING_SOURCE = `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
// ... StreamingResponseProps, StreamChunk, StreamStatus, ToolCall, Citation

export function StreamingResponse({ stream, content, loading, autoScroll, maxHeight, showHeader, variant, title, thinkingLabel, className, onDone, onError, onRetry }) {
  // State: status, displayText, thinking, tools, citations, error, locked, copied
  // Stream processing with 40ms flush batching
  // Auto-scroll with scroll-to-latest button
  // Copy, retry, stop controls
  // Header with status badge and action buttons
  // Body with skeleton, thinking, tool calls, markdown, citations, error
}`;

const DEMO_CONTENT = `# Getting Started with AI

Welcome to the **Streaming Response** component. It renders AI-generated content in real-time with a typewriter effect.

## Features

- Real-time streaming with smooth animations
- Markdown rendering with syntax highlighting
- Tool call visualization
- Citation tracking
- Auto-scroll with manual override

## Code Example

\`\`\`typescript
const response = await ai.chat({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello!" }],
  stream: true,
});

for await (const chunk of response) {
  process.stdout.write(chunk.content);
}
\`\`\`

> This component supports thinking phases, tool calls, and citations out of the box.

### API Reference

| Parameter | Type | Description |
|-----------|------|-------------|
| stream | AsyncGenerator | Stream source |
| content | string | Static content |
| autoScroll | boolean | Auto-scroll to bottom |
| maxHeight | number | Maximum height |

That covers the basics. Start building amazing AI experiences!`;

export default function StreamingResponsePage() {
  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(0);
  const [key3, setKey3] = useState(0);

  return (
    <ComponentDocPage
      name="Streaming Response"
      category="Feedback"
      description="An AI chat response component with real-time streaming, markdown rendering, tool calls, citations, and thinking indicators."
    >
      <PreviewPanel filename="streaming-response-preview.tsx">
        <div className="w-full">
          <StreamingResponse
            key={key1}
            content={DEMO_CONTENT}
            onDone={() => {}}
          />
          <button
            type="button"
            onClick={() => setKey1((k) => k + 1)}
            className="mt-3 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Replay
          </button>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={STREAMING_SOURCE}
        filename="components/ui/StreamingResponse/StreamingResponse.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Streaming response with markdown content."
          code={`import { StreamingResponse } from "@/components/ui/StreamingResponse";\n\n<StreamingResponse content={markdown} />`}
          filename="default.tsx"
        >
          <div className="w-full">
            <StreamingResponse
              key={key1}
              content={DEMO_CONTENT}
              onDone={() => {}}
            />
            <button
              type="button"
              onClick={() => setKey1((k) => k + 1)}
              className="mt-3 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Replay
            </button>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Thinking"
          description="Response with a thinking phase before streaming."
          code={`<StreamingResponse\n  stream={() => createDemoStream(content, {\n    thinking: "Analyzing the request...",\n  })}\n/>`}
          filename="with-thinking.tsx"
        >
          <div className="w-full">
            <StreamingResponse
              key={key2}
              stream={() =>
                createDemoStream(DEMO_CONTENT, {
                  thinking:
                    "Let me analyze this request and prepare a comprehensive response about the streaming component.",
                })
              }
              onDone={() => {}}
            />
            <button
              type="button"
              onClick={() => setKey2((k) => k + 1)}
              className="mt-3 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Replay
            </button>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Plain Variant"
          description="No card wrapper, content blends with background."
          code={`<StreamingResponse\n  variant="plain"\n  content={markdown}\n  showHeader={false}\n/>`}
          filename="plain.tsx"
        >
          <div className="w-full">
            <StreamingResponse
              key={key3}
              variant="plain"
              showHeader={false}
              content={DEMO_CONTENT}
              onDone={() => {}}
            />
            <button
              type="button"
              onClick={() => setKey3((k) => k + 1)}
              className="mt-3 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Replay
            </button>
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">stream</td>
                <td className="px-4 py-3 text-muted-foreground">StreamSource</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">content</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">loading</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">autoScroll</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">maxHeight</td>
                <td className="px-4 py-3 text-muted-foreground">number | string</td>
                <td className="px-4 py-3 text-muted-foreground">420</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">showHeader</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;card&quot; | &quot;plain&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;card&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Assistant&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">thinkingLabel</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Thinking&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onDone</td>
                <td className="px-4 py-3 text-muted-foreground">(text: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onError</td>
                <td className="px-4 py-3 text-muted-foreground">(message: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">onRetry</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
