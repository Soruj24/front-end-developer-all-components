"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CODE_BLOCK_PRO_SOURCE } from "./code-block-pro-source";
import {
  FullFeaturedDemo,
  LanguageTabsDemo,
  InlineCodeDemo,
  DiffViewDemo,
  TerminalOutputDemo,
  LineHighlightDemo,
  FileTreeDemo,
} from "./code-block-pro-demos";

const FULL_FEATURED_CODE = `<CodeBlockPro
  code={code}
  language="typescript"
  theme="dark"
  showLineNumbers
  filename="UserProfile.tsx"
/>`;

const LANGUAGE_TABS_CODE = `const snippets = [
  { lang: "typescript", label: "TypeScript", icon: Braces },
  { lang: "bash", label: "Bash", icon: Terminal },
  { lang: "json", label: "JSON", icon: Code2 },
  { lang: "css", label: "CSS", icon: FileCode },
];

// switch the active snippet with local state`;

const INLINE_CODE_CODE = `<p className="text-sm text-muted-foreground">
  Use the <InlineCode>useState</InlineCode> hook to manage
  component state and the <InlineCode>useEffect</InlineCode>
  hook for side effects.
</p>`;

const DIFF_VIEW_CODE = `// diff lines are colored by type
{ diff.map((line) => (
  <div className={line.type === "add"
    ? "bg-emerald-500/10 text-emerald-300"
    : line.type === "remove"
    ? "bg-red-500/10 text-red-300"
    : "text-white/60"
  }>
    {line.code}
  </div>
)) }`;

const TERMINAL_CODE = `<TerminalOutput lines={output} prompt=">" />`;

const HIGHLIGHT_CODE = `<CodeBlockPro
  code={code}
  highlightLines={[3, 4, 5, 7, 8]}
  language="tsx"
  filename="page.tsx"
/>`;

const FILE_TREE_CODE = `<FileTree
  files={{
    src: {
      components: ["Button.tsx", "Input.tsx", "Card.tsx"],
      "page.tsx": null,
    },
  }}
/>`;

export default function CodeBlockProPage() {
  return (
    <ComponentDocPage
      name="Code Block Pro"
      category="Data Display"
      description="Advanced code block with syntax highlighting, line numbers, copy button, language tabs, and inline code styling."
    >
      <PreviewPanel filename="code-block-pro.tsx">
        <FullFeaturedDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CODE_BLOCK_PRO_SOURCE}
        filename="components/ui/CodeBlockPro/CodeBlockPro.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Language Tabs" description="Switch between TypeScript, Bash, JSON, and CSS code snippets." code={LANGUAGE_TABS_CODE}>
          <LanguageTabsDemo />
        </ExampleBlock>

        <ExampleBlock title="Inline Code" description="Inline code styling with hover tooltips and paragraph examples." code={INLINE_CODE_CODE}>
          <InlineCodeDemo />
        </ExampleBlock>

        <ExampleBlock title="Diff View" description="Code diff with additions, removals, and line-level changes." code={DIFF_VIEW_CODE}>
          <DiffViewDemo />
        </ExampleBlock>

        <ExampleBlock title="Terminal Output" description="Build output with colored status messages and command prompt." code={TERMINAL_CODE}>
          <TerminalOutputDemo />
        </ExampleBlock>

        <ExampleBlock title="Line Highlight" description="Highlighted lines with yellow background and border indicator." code={HIGHLIGHT_CODE}>
          <LineHighlightDemo />
        </ExampleBlock>

        <ExampleBlock title="File Tree" description="Expandable file tree with code preview for selected file." code={FILE_TREE_CODE}>
          <FileTreeDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}