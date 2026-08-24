"use client";
import { ComponentDocPage, PreviewPanel, ExampleBlock, SourceCodeViewer } from "@/components/docs";
import { EmojiGrid, CategoryTabs, SearchEmoji, FrequentlyUsed, SkinTone, EmojiPreview, InsertEmoji } from "./emoji-picker";

const sourceCode = `import { useState } from "react";
import { Smile, Frown, Meh, Heart, ThumbsUp, Star, Search } from "lucide-react";

const categories = [
  { name: "Smileys", emojis: ["ðŸ˜€", "ðŸ˜ƒ", "ðŸ˜„"] },
  { name: "Animals", emojis: ["ðŸ¶", "ðŸ±"] },
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
        <ExampleBlock title="Emoji Grid" code={sourceCode}>
          <EmojiGrid />
        </ExampleBlock>
        <ExampleBlock title="Category Tabs" code={sourceCode}>
          <CategoryTabs />
        </ExampleBlock>
        <ExampleBlock title="Search Emoji" code={sourceCode}>
          <SearchEmoji />
        </ExampleBlock>
        <ExampleBlock title="Frequently Used" code={sourceCode}>
          <FrequentlyUsed />
        </ExampleBlock>
        <ExampleBlock title="Skin Tone" code={sourceCode}>
          <SkinTone />
        </ExampleBlock>
        <ExampleBlock title="Emoji Preview" code={sourceCode}>
          <EmojiPreview />
        </ExampleBlock>
        <ExampleBlock title="Insert Emoji" code={sourceCode}>
          <InsertEmoji />
        </ExampleBlock>
        <SourceCodeViewer source={sourceCode} filename="emoji-picker.tsx" />
      </PreviewPanel>
    </ComponentDocPage>
  );
}