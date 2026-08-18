"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Subtitles, Type, AlignLeft, AlignCenter, AlignRight, Globe, Eye } from "lucide-react";

const installCommand = `npx component-library@latest add subtitles-text`;
const usageCode = `<SubtitleTrack cues={cues} currentTime={time} />`;

function SubtitleTrack() {
  const [active, setActive] = useState(0);
  const cues = [
    { start: 0, end: 5, text: "Welcome to the documentary." },
    { start: 5, end: 10, text: "Today we explore the deep ocean." },
    { start: 10, end: 15, text: "Marine life is incredibly diverse." },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <Subtitles className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Subtitle Track</h3>
      </div>
      <div className="rounded-lg bg-black p-6 text-center">
        <p className="text-lg font-medium text-white">{cues[active].text}</p>
      </div>
      <div className="flex gap-2">
        {cues.map((cue, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 rounded-md border p-2 text-xs transition-colors ${
              active === i ? "border-primary bg-primary/5 text-primary" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {cue.start}s - {cue.end}s
          </button>
        ))}
      </div>
    </div>
  );
}

function TextOverlay() {
  const [position, setPosition] = useState("bottom");
  const [visible, setVisible] = useState(true);
  const positions = { bottom: "bottom-4 left-1/2 -translate-x-1/2", top: "top-4 left-1/2 -translate-x-1/2", center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Text Overlay</h3>
        <button
          onClick={() => setVisible(!visible)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            visible ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {visible ? "Visible" : "Hidden"}
        </button>
      </div>
      <div className="relative h-32 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
        {visible && (
          <div className={`absolute ${positions[position]} rounded-md bg-black/70 px-3 py-1.5 text-sm text-white`}>
            Sample subtitle text
          </div>
        )}
      </div>
      <div className="flex gap-1">
        {["top", "center", "bottom"].map((pos) => (
          <button
            key={pos}
            onClick={() => setPosition(pos)}
            className={`rounded px-2 py-1 text-xs font-medium ${
              position === pos ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {pos.charAt(0).toUpperCase() + pos.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function CaptionStyle() {
  const [style, setStyle] = useState("default");
  const styles = {
    default: "bg-black/80 text-white rounded-md",
    outline: "bg-transparent text-white border-2 border-white rounded-md",
    shadow: "bg-black/80 text-white rounded-md shadow-lg",
    box: "bg-yellow-300 text-black rounded-md",
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <Type className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Caption Style</h3>
      </div>
      <div className="rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex items-center justify-center">
        <div className={`px-4 py-2 text-lg font-medium ${styles[style]}`}>
          Styled caption text
        </div>
      </div>
      <div className="flex gap-1">
        {Object.keys(styles).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`rounded px-2 py-1 text-xs font-medium ${
              style === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageSelect() {
  const [lang, setLang] = useState("en");
  const languages = [
    { code: "en", label: "English", flag: "EN" },
    { code: "es", label: "Español", flag: "ES" },
    { code: "fr", label: "Français", flag: "FR" },
    { code: "de", label: "Deutsch", flag: "DE" },
    { code: "ja", label: "日本語", flag: "JA" },
  ];
  const translations = { en: "Hello, world!", es: "¡Hola, mundo!", fr: "Bonjour, le monde!", de: "Hallo, Welt!", ja: "こんにちは、世界！" };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Language Select</h3>
      </div>
      <div className="rounded-lg bg-muted/50 p-4 text-center">
        <p className="text-lg font-medium text-foreground">{translations[lang]}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === l.code ? "border-primary bg-primary/5 text-primary" : "hover:bg-muted"
            }`}
          >
            <span className="rounded bg-muted px-1 text-xs">{l.flag}</span>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SubtitleTiming() {
  const [offset, setOffset] = useState(0);
  const base = 10;
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Subtitle Timing</h3>
      <div className="relative h-3 rounded-full bg-muted">
        <div className="absolute left-0 top-0 h-3 rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, Math.max(0, (base + offset) / 20 * 100))}%` }} />
        <div className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-primary" style={{ left: `${Math.min(100, Math.max(0, (base + offset) / 20 * 100))}%` }} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Offset: {offset > 0 ? "+" : ""}{offset}s</span>
        <input
          type="range"
          min={-5}
          max={5}
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="flex-1"
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Start: {Math.max(0, base + offset)}s</span>
        <span>End: {base + offset + 5}s</span>
      </div>
    </div>
  );
}

function CaptionEditor() {
  const [text, setText] = useState("Enter your caption here...");
  const [fontSize, setFontSize] = useState(16);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <AlignLeft className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Caption Editor</h3>
      </div>
      <div className="rounded-lg bg-black p-6 flex items-center justify-center">
        <p className="text-white" style={{ fontSize: `${fontSize}px` }}>{text}</p>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        rows={2}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Size: {fontSize}px</span>
        <input type="range" min={12} max={32} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="flex-1" />
      </div>
    </div>
  );
}

function VideoCaption() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const togglePlay = () => {
    setPlaying(!playing);
    if (!playing) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(interval); setPlaying(false); return 0; }
          return p + 1;
        });
      }, 100);
    }
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <Eye className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Video Caption</h3>
      </div>
      <div className="relative rounded-lg bg-black">
        <div className="flex h-40 items-center justify-center">
          <button onClick={togglePlay} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30">
            {playing ? "⏸" : "▶"}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-center text-sm text-white">Subtitle appears here during playback</p>
          <div className="mt-2 h-1 rounded-full bg-white/30">
            <div className="h-1 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubtitlesTextPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Subtitles Text</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A media component for displaying subtitle tracks, text overlays, caption styles, language selection, and timing controls.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Subtitle Track</h2>
        <ComponentPreview component="SubtitlesTextTrack" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Text Overlay</h2>
        <ComponentPreview component="SubtitlesTextOverlay" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Caption Style</h2>
        <ComponentPreview component="SubtitlesTextStyle" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Language Select</h2>
        <ComponentPreview component="SubtitlesTextLang" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Subtitle Timing</h2>
        <ComponentPreview component="SubtitlesTextTiming" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Caption Editor</h2>
        <ComponentPreview component="SubtitlesTextEditor" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Video Caption</h2>
        <ComponentPreview component="SubtitlesTextVideo" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">cues</td><td className="px-4 py-3 text-muted-foreground">SubtitleCue[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">currentTime</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">Yes</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">position</td><td className="px-4 py-3 text-muted-foreground">{'"top" | "center" | "bottom"'}</td><td className="px-4 py-3 text-muted-foreground">{'"bottom"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">style</td><td className="px-4 py-3 text-muted-foreground">{'"default" | "outline" | "shadow" | "box"'}</td><td className="px-4 py-3 text-muted-foreground">{'"default"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">language</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"en"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onCueClick</td><td className="px-4 py-3 text-muted-foreground">{'(cue: SubtitleCue) => void'}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr><tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
