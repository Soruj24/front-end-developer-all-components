"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { KEYBOARD_LAYOUT_SOURCE } from "./keyboard-layout-source";
import {
  QWERTY_LAYOUT_EXAMPLE,
  SHORTCUT_GUIDE_EXAMPLE,
  GAMING_LAYOUT_EXAMPLE,
  MAC_LAYOUT_EXAMPLE,
  TYPING_TUTOR_TUTOR_EXAMPLE,
  COMPACT_LAYOUT_EXAMPLE,
  KEY_STATISTICS_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./keyboard-layout-examples";
import {
  QWERTYLayoutDemo,
  ShortcutGuideDemo,
  GamingLayoutDemo,
  MacLayoutDemo,
  TypingTutorDemo,
  CompactLayoutDemo,
  KeyStatisticsDemo,
  PlaygroundDemo,
} from "./demos";

export default function KeyboardLayoutPage() {
  return (
    <ComponentDocPage
      name="Keyboard Layout"
      category="Input"
      description="Interactive keyboard layout visualizations with QWERTY, gaming, macOS, compact variants, shortcut guides, and key usage statistics."
    >
      <PreviewPanel filename="keyboard-layout.tsx">
        <QWERTYLayoutDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={KEYBOARD_LAYOUT_SOURCE}
        filename="components/ui/KeyboardLayout/KeyboardLayout.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch layouts and click keys to highlight them." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="QWERTY Layout" description="Standard QWERTY keyboard layout with alphanumeric and modifier keys." code={QWERTY_LAYOUT_EXAMPLE}>
          <QWERTYLayoutDemo />
        </ExampleBlock>
        <ExampleBlock title="Shortcut Guide" description="Common keyboard shortcuts with highlighted key combinations." code={SHORTCUT_GUIDE_EXAMPLE}>
          <ShortcutGuideDemo />
        </ExampleBlock>
        <ExampleBlock title="Gaming Layout" description="WASD gaming keyboard layout with highlighted movement keys." code={GAMING_LAYOUT_EXAMPLE}>
          <GamingLayoutDemo />
        </ExampleBlock>
        <ExampleBlock title="macOS Layout" description="macOS-style keyboard layout with Command keys and function row." code={MAC_LAYOUT_EXAMPLE}>
          <MacLayoutDemo />
        </ExampleBlock>
        <ExampleBlock title="Typing Tutor" description="Interactive typing practice with real-time feedback and progress tracking." code={TYPING_TUTOR_TUTOR_EXAMPLE}>
          <TypingTutorDemo />
        </ExampleBlock>
        <ExampleBlock title="Compact Layout" description="Space-efficient compact keyboard layout without function row." code={COMPACT_LAYOUT_EXAMPLE}>
          <CompactLayoutDemo />
        </ExampleBlock>
        <ExampleBlock title="Key Statistics" description="Visual representation of most frequently used keys with percentage bars." code={KEY_STATISTICS_EXAMPLE}>
          <KeyStatisticsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
