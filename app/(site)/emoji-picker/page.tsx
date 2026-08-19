"use client";
import { ComponentDocPage, PreviewPanel, ExampleBlock, SourceCodeViewer } from "@/components/docs";
import { EmojiGrid, CategoryTabs, SearchEmoji, FrequentlyUsed, SkinTone, EmojiPreview, InsertEmoji } from "./emoji-picker-source";

const sourceCode = `import { useState } from "react";
import { Smile, Frown, Meh, Heart, ThumbsUp, Star, Search } from "lucide-react";

const categories = [
  { name: "Smileys", emojis: ["😀", "😃", "😄"] },
  { name: "Animals", emojis: ["🐶", "🐱"] },
];

function EmojiGrid() {
  const [activeCategory, setActiveCategory] = useState(0);
  return <div>Emoji Grid</div>;
}

function CategoryTabs() {
  const [selected, setSelected] = useState("Smileys");
  return <div>Category Tabs</div>;
}

export default EmojiPickerPage;`;

export default function EmojiPickerPage() {
  return (
    <ComponentDocPage title="Emoji Picker">
      <PreviewPanel>
        <ExampleBlock title="Emoji Grid">
          <EmojiGrid />
        </ExampleBlock>
        <ExampleBlock title="Category Tabs">
          <CategoryTabs />
        </ExampleBlock>
        <ExampleBlock title="Search Emoji">
          <SearchEmoji />
        </ExampleBlock>
        <ExampleBlock title="Frequently Used">
          <FrequentlyUsed />
        </ExampleBlock>
        <ExampleBlock title="Skin Tone">
          <SkinTone />
        </ExampleBlock>
        <ExampleBlock title="Emoji Preview">
          <EmojiPreview />
        </ExampleBlock>
        <ExampleBlock title="Insert Emoji">
          <InsertEmoji />
        </ExampleBlock>
        <SourceCodeViewer code={sourceCode} filename="emoji-picker.tsx" />
      </PreviewPanel>
    </ComponentDocPage>
  );
}