"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Smile,
  Frown,
  Meh,
  Heart,
  ThumbsUp,
  Laugh,
  Star,
} from "lucide-react";

const installCommand = `npx component-library@latest add smile-emoji`;

const usageCode = `import { SmileEmoji } from "@/components/ui";

<SmileEmoji onEmojiSelect={handleSelect} />`;

function EmojiPickerDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const emojis = ["😀","😂","😍","🤔","😎","🥳","😢","😡","👍","❤️","🎉","🔥"];
  return (
    <div className="flex flex-col gap-2">
      {selected && <p className="text-sm text-muted-foreground">Selected: {selected}</p>}
      <div className="flex flex-wrap gap-1.5">
        {emojis.map((e) => (
          <button key={e} onClick={() => setSelected(e)} className={`flex h-9 w-9 items-center justify-center rounded-md text-lg transition-colors ${selected === e ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-muted"}`}>
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReactionBarDemo() {
  const [reactions, setReactions] = useState({ like: 5, love: 3, laugh: 0 });
  const toggle = (key: keyof typeof reactions) =>
    setReactions((r) => ({ ...r, [key]: r[key] > 0 ? r[key] - 1 : r[key] + 1 }));
  const items = [
    { key: "like" as const, Icon: ThumbsUp, label: "Like", count: reactions.like },
    { key: "love" as const, Icon: Heart, label: "Love", count: reactions.love },
    { key: "laugh" as const, Icon: Laugh, label: "Haha", count: reactions.laugh },
  ];
  return (
    <div className="flex gap-2">
      {items.map((r) => (
        <button key={r.key} onClick={() => toggle(r.key)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${r.count > 0 ? "border-primary bg-primary/5" : "hover:bg-muted"}`}>
          <r.Icon className="h-4 w-4" />
          <span className="font-medium">{r.count}</span>
        </button>
      ))}
    </div>
  );
}

function MoodSelectorDemo() {
  const [mood, setMood] = useState<string | null>(null);
  const moods = [
    { Icon: Smile, label: "Happy", color: "text-emerald-500" },
    { Icon: Meh, label: "Neutral", color: "text-yellow-500" },
    { Icon: Frown, label: "Sad", color: "text-blue-500" },
  ];
  return (
    <div className="flex gap-3">
      {moods.map((m) => (
        <button key={m.label} onClick={() => setMood(mood === m.label ? null : m.label)} className={`flex flex-col items-center gap-1 rounded-lg border p-4 transition-colors ${mood === m.label ? "border-primary bg-primary/5" : "hover:bg-muted"}`}>
          <m.Icon className={`h-8 w-8 ${m.color}`} />
          <span className="text-xs font-medium">{m.label}</span>
        </button>
      ))}
    </div>
  );
}

function FeedbackFormDemo() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <p className="text-sm text-emerald-600">Thank you for your feedback!</p>;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">How was your experience?</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)}>
            <Star className={`h-6 w-6 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
          </button>
        ))}
      </div>
      <button onClick={() => rating > 0 && setSubmitted(true)} disabled={rating === 0} className="self-start rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
        Submit
      </button>
    </div>
  );
}

function EmojiRatingDemo() {
  const [value, setValue] = useState(0);
  const emojis = ["😫", "😕", "😐", "🙂", "🤩"];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {emojis.map((e, i) => (
          <button key={i} onClick={() => setValue(i)} className={`flex h-10 w-10 items-center justify-center rounded-full text-xl transition-transform ${value === i ? "scale-125 ring-2 ring-primary" : "opacity-50 hover:opacity-100"}`}>
            {e}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Rating: {value + 1}/5</p>
    </div>
  );
}

function ChatReactionDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (e: string) =>
    setSelected((s) => (s.includes(e) ? s.filter((x) => x !== e) : [...s, e]));
  const quickReactions = ["👍", "❤️", "😂", "😮", "😢", "🎉"];
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg border p-3">
        <p className="text-sm">This is a sample message to react to.</p>
      </div>
      <div className="flex gap-1">
        {quickReactions.map((e) => (
          <button key={e} onClick={() => toggle(e)} className={`flex h-7 items-center justify-center rounded-full px-2 text-sm transition-colors ${selected.includes(e) ? "bg-primary/10" : "hover:bg-muted"}`}>
            {e}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground">Reactions: {selected.join(" ")}</p>
      )}
    </div>
  );
}

function SentimentDisplayDemo() {
  const [sentiment, setSentiment] = useState<"positive" | "neutral" | "negative">("positive");
  const config = {
    positive: { Icon: Smile, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    neutral: { Icon: Meh, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
    negative: { Icon: Frown, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" },
  };
  const c = config[sentiment];
  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center gap-2 rounded-lg ${c.bg} p-3`}>
        <c.Icon className={`h-5 w-5 ${c.color}`} />
        <span className="text-sm font-medium capitalize">{sentiment}</span>
      </div>
      <div className="flex gap-1">
        {(["positive", "neutral", "negative"] as const).map((s) => (
          <button key={s} onClick={() => setSentiment(s)} className={`rounded-md px-2 py-1 text-xs ${sentiment === s ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SmileEmojiPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Smile Emoji</h1>
          <Badge variant="primary">Reactions</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Emoji-based interaction components for reactions, mood selection, sentiment analysis, and feedback collection.
        </p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Emoji Picker</h2>
        <ComponentPreview component="SmileEmojiPickerDemo">
          <EmojiPickerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Reaction Bar</h2>
        <ComponentPreview component="SmileEmojiReactionBarDemo">
          <ReactionBarDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Mood Selector</h2>
        <ComponentPreview component="SmileEmojiMoodSelectorDemo">
          <MoodSelectorDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Feedback Form</h2>
        <ComponentPreview component="SmileEmojiFeedbackFormDemo">
          <FeedbackFormDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Emoji Rating</h2>
        <ComponentPreview component="SmileEmojiRatingDemo">
          <EmojiRatingDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Chat Reaction</h2>
        <ComponentPreview component="SmileEmojiChatReactionDemo">
          <ChatReactionDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sentiment Display</h2>
        <ComponentPreview component="SmileEmojiSentimentDisplayDemo">
          <SentimentDisplayDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onEmojiSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(emoji: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSearch</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxReactions</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">6</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">multiSelect</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
