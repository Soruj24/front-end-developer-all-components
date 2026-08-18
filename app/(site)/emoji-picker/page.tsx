"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Smile, Frown, Meh, Heart, ThumbsUp, Star, Search } from "lucide-react";

const installCommand = `npx component-library@latest add emoji-picker`;
const usageCode = `import { EmojiPicker } from "@/components/ui/emoji-picker";

<EmojiPicker onSelect={handleEmoji} />`;

const categories = [
  { name: "Smileys", emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜"] },
  { name: "Animals", emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅"] },
  { name: "Food", emojis: ["🍎", "🍌", "🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🍪", "🍰", "🎂", "🍦", "🍫", "🍬", "🍭", "🥑", "🥦", "🥕", "🌽", "🍞", "🥯", "🧀", "🥩"] },
  { name: "Activities", emojis: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🥍", "🏏", "🪃", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼"] },
];

function EmojiGrid() {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = categories[activeCategory];
  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-2 border-b border-border">
          <input
            placeholder="Search emoji..."
            className="w-full px-3 py-1.5 rounded-md bg-muted text-sm outline-none"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="flex gap-1 px-2 py-1.5 border-b border-border overflow-x-auto">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${i === activeCategory ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="p-3 grid grid-cols-8 gap-1 max-h-60 overflow-y-auto">
          {category.emojis.map((e) => (
            <button key={e} className="h-8 w-8 rounded hover:bg-muted flex items-center justify-center text-lg" onClick={() => navigator.clipboard.writeText(e)}>
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryTabs() {
  const [selected, setSelected] = useState("Smileys");
  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex border-b border-border">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelected(cat.name)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${selected === cat.name ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="p-3 grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
          {categories.find(c => c.name === selected)?.emojis.map((e) => (
            <button key={e} className="h-8 w-8 rounded hover:bg-muted flex items-center justify-center text-lg">{e}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchEmoji() {
  const [query, setQuery] = useState("");
  const allEmojis = categories.flatMap(c => c.emojis);
  const filtered = query ? allEmojis.filter(e => e.toLowerCase().includes(query.toLowerCase())) : allEmojis.slice(0, 32);
  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search emoji..."
              className="w-full pl-10 pr-3 py-1.5 rounded-md bg-muted text-sm outline-none"
            />
          </div>
        </div>
        <div className="p-3 grid grid-cols-8 gap-1 max-h-60 overflow-y-auto">
          {filtered.map((e) => (
            <button key={e} className="h-8 w-8 rounded hover:bg-muted flex items-center justify-center text-lg" onClick={() => navigator.clipboard.writeText(e)}>
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FrequentlyUsed() {
  const [recent, setRecent] = useState(["😀", "👍", "❤️", "🎉", "🚀", "✨", "😂", "🔥"]);
  const addRecent = (emoji) => {
    setRecent(prev => [emoji, ...prev.filter(e => e !== emoji)].slice(0, 8));
    navigator.clipboard.writeText(emoji);
  };
  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border font-medium text-sm">Frequently Used</div>
          <div className="p-3 flex flex-wrap gap-2">
            {recent.map((e) => (
              <button key={e} onClick={() => addRecent(e)} className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-xl transition-colors">
                {e}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border font-medium text-sm">All Emojis</div>
          <div className="p-3 grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
            {categories.flatMap(c => c.emojis).slice(0, 40).map((e) => (
              <button key={e} onClick={() => addRecent(e)} className="h-8 w-8 rounded hover:bg-muted flex items-center justify-center text-lg">{e}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkinTone() {
  const [tone, setTone] = useState(0);
  const tones = ["👍", "👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿"];
  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm font-medium mb-2">Select skin tone</p>
          <div className="flex gap-2 flex-wrap">
            {tones.map((t, i) => (
              <button
                key={t}
                onClick={() => setTone(i)}
                className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl transition-all ${i === tone ? "ring-2 ring-primary ring-offset-2" : "hover:bg-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm font-medium mb-2">Emojis with skin tones</p>
          <div className="grid grid-cols-6 gap-1">
            {["👋", "👏", "🙏", "🤝", "👍", "👎", "✊", "✋", "🤚", "🖐️", "🖖", "👌"].map((base) => (
              <button key={base} className="h-10 w-10 rounded hover:bg-muted flex items-center justify-center text-lg" onClick={() => navigator.clipboard.writeText(base)}>
                {base}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmojiPreview() {
  const [selected, setSelected] = useState("😀");
  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-6 text-center">
          <span className="text-8xl">{selected}</span>
          <div className="mt-4 text-sm text-muted-foreground font-mono">{selected} U+{selected.codePointAt(0).toString(16).toUpperCase()}</div>
        </div>
        <div className="p-4 border-t border-border grid grid-cols-8 gap-1">
          {categories[0].emojis.slice(0, 24).map((e) => (
            <button key={e} onClick={() => setSelected(e)} className="h-10 w-10 rounded hover:bg-muted flex items-center justify-center text-xl transition-colors">
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsertEmoji() {
  const [text, setText] = useState("Type here and add emojis: ");
  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[80px] bg-transparent text-sm outline-none resize-none"
              placeholder="Type your message..."
            />
          </div>
          <div className="p-2 border-t border-border">
            <div className="flex gap-1 px-2 py-1.5 border-b border-border overflow-x-auto">
              {categories.map((cat) => (
                <button key={cat.name} className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap text-muted-foreground hover:bg-muted">
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="p-2 grid grid-cols-8 gap-1 max-h-40 overflow-y-auto">
              {categories[0].emojis.map((e) => (
                <button key={e} onClick={() => setText(text + e)} className="h-8 w-8 rounded hover:bg-muted flex items-center justify-center text-lg">{e}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center">Click emoji to insert at cursor position</div>
      </div>
    </div>
  );
}

export default function EmojiPickerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Emoji Picker</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An emoji picker component with categories, search, and frequently used emojis for chat and content creation.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Emoji Grid</h2><p className="mt-1 text-sm text-muted-foreground">Emoji grid organized by categories with search.</p></div>
        <ComponentPreview id="emoji-picker-grid"><EmojiGrid /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Category Tabs</h2><p className="mt-1 text-sm text-muted-foreground">Switch between emoji categories.</p></div>
        <ComponentPreview id="emoji-picker-categories"><CategoryTabs /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Search Emoji</h2><p className="mt-1 text-sm text-muted-foreground">Real-time emoji search across all categories.</p></div>
        <ComponentPreview id="emoji-picker-search"><SearchEmoji /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Frequently Used</h2><p className="mt-1 text-sm text-muted-foreground">Recently used emojis with quick access.</p></div>
        <ComponentPreview id="emoji-picker-frequent"><FrequentlyUsed /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Skin Tone</h2><p className="mt-1 text-sm text-muted-foreground">Skin tone selector for supported emojis.</p></div>
        <ComponentPreview id="emoji-picker-skin-tone"><SkinTone /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Emoji Preview</h2><p className="mt-1 text-sm text-muted-foreground">Large preview with unicode codepoint.</p></div>
        <ComponentPreview id="emoji-picker-preview"><EmojiPreview /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Insert Emoji</h2><p className="mt-1 text-sm text-muted-foreground">Textarea with inline emoji insertion.</p></div>
        <ComponentPreview id="emoji-picker-insert"><InsertEmoji /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onSelect</td><td className="px-4 py-3 text-muted-foreground">(emoji: string) => void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">categories</td><td className="px-4 py-3 text-muted-foreground">string[]</td><td className="px-4 py-3 text-muted-foreground">all</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showSearch</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showFrequent</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}