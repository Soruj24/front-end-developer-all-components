"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add emoji-picker`;
const usageCode = `import { EmojiPicker } from "@/components/ui/emoji-picker";

<EmojiPicker onSelect={handleEmoji} />`;

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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Category Grid</h2><p className="mt-1 text-sm text-muted-foreground">Emoji grid organized by categories.</p></div>
        <ComponentPreview id="emoji-picker-grid">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-2 border-b border-border">
                <input placeholder="Search emoji..." className="w-full px-3 py-1.5 rounded-md bg-muted text-sm outline-none" />
              </div>
              <div className="flex gap-1 px-2 py-1.5 border-b border-border">
                {["😀", "🐶", "🍔", "⚽", "🚗", "💡"].map((e) => (
                  <button key={e} className="h-7 w-7 rounded hover:bg-muted flex items-center justify-center text-sm">{e}</button>
                ))}
              </div>
              <div className="p-3 grid grid-cols-8 gap-1">
                {["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜"].map((e) => (
                  <button key={e} className="h-8 w-8 rounded hover:bg-muted flex items-center justify-center text-lg">{e}</button>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Inline Picker</h2><p className="mt-1 text-sm text-muted-foreground">Compact inline emoji selector.</p></div>
        <ComponentPreview id="emoji-picker-inline">
          <div className="w-full p-4">
            <div className="flex gap-2 justify-center">
              {["👍", "❤️", "😂", "😮", "😢", "🎉", "🔥", "👀"].map((e) => (
                <button key={e} className="h-10 w-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-xl transition-colors">{e}</button>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Recently Used</h2><p className="mt-1 text-sm text-muted-foreground">Recently used emojis section.</p></div>
        <ComponentPreview id="emoji-picker-recent">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Recently Used</p>
              <div className="flex gap-1.5">
                {["😀", "👍", "❤️", "🎉", "🚀", "✨"].map((e) => (
                  <button key={e} className="h-9 w-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg">{e}</button>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
