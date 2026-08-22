"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Type, Play, Pause, RotateCcw, MousePointer2, Edit3, Zap } from "lucide-react";

const installCommand = `npx shadcn@latest add typewriter-text`;

const usageCode = `import { TypewriterText } from "@/components/ui/typewriter-text";

export function TypewriterTextDemo() {
  return (
    <TypewriterText
      text="Hello, World!"
      speed={100}
    />
  );
}`;

function TypewriterEffect() {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const fullText = "Welcome to the typewriter effect demo!";

  const startTyping = () => {
    setIsPlaying(true);
    setText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 80);
  };

  return (
    <div className="space-y-4">
      <div className="min-h-[60px] rounded-lg border bg-muted/50 p-4">
        <p className="font-mono text-sm">
          {text}
          <span className="animate-pulse text-primary">|</span>
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={startTyping}
          disabled={isPlaying}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Play className="mr-2 h-4 w-4" />
          {isPlaying ? "Typing..." : "Start"}
        </button>
        <button
          onClick={() => { setText(""); setIsPlaying(false); }}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}

function BlinkingCursor() {
  const [cursorVisible, setCursorVisible] = useState(true);

  return (
    <div className="space-y-4">
      <div className="min-h-[60px] rounded-lg border bg-muted/50 p-4">
        <p className="font-mono text-sm">
          Hello, World!
          {cursorVisible && <span className="text-primary">|</span>}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCursorVisible(!cursorVisible)}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"
        >
          <MousePointer2 className="mr-1 h-4 w-4" />
          {cursorVisible ? "Hide" : "Show"} Cursor
        </button>
        <span className="text-sm text-muted-foreground">
          Cursor is {cursorVisible ? "visible" : "hidden"}
        </span>
      </div>
    </div>
  );
}

function CodeTyping() {
  const [code, setCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const codeSnippet = `const greet = (name) => {
  return "Hello, " + name;
};`;

  const startTyping = () => {
    setIsTyping(true);
    setCode("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < codeSnippet.length) {
        setCode(codeSnippet.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-gray-900 p-4">
        <pre className="overflow-x-auto font-mono text-sm text-green-400">
          {code}
          <span className="animate-pulse text-white">|</span>
        </pre>
      </div>
      <button
        onClick={startTyping}
        disabled={isTyping}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        <Zap className="mr-2 h-4 w-4" />
        {isTyping ? "Typing..." : "Run Code"}
      </button>
    </div>
  );
}

function TextReveal() {
  const [revealed, setRevealed] = useState(0);
  const text = "Discover the magic of animated text reveal effects";

  return (
    <div className="space-y-4">
      <div className="min-h-[60px] rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className={`transition-opacity duration-300 ${
                i < revealed ? "opacity-100" : "opacity-0"
              }`}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={text.length}
          value={revealed}
          onChange={(e) => setRevealed(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm tabular-nums text-muted-foreground">{revealed}/{text.length}</span>
      </div>
    </div>
  );
}

function AnimatedText() {
  const [animation, setAnimation] = useState("bounce");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["bounce", "fade", "slide", "scale"].map((a) => (
          <button
            key={a}
            onClick={() => setAnimation(a)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize ${
              animation === a ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="min-h-[60px] rounded-lg border bg-muted/50 p-4 flex items-center justify-center">
        <h3 className={`text-2xl font-bold transition-all duration-500 ${
          animation === "bounce" ? "animate-bounce" :
          animation === "fade" ? "animate-pulse" :
          animation === "slide" ? "translate-x-2" : "scale-110"
        }`}>
          Animated Text
        </h3>
      </div>
    </div>
  );
}

function CommandLine() {
  const [command, setCommand] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const commands = [
    { cmd: "npm install", output: "added 1234 packages in 45s" },
    { cmd: "npm run build", output: "Build completed successfully" },
    { cmd: "npm test", output: "All tests passed (42/42)" },
  ];

  const runCommand = (cmd: string) => {
    setIsRunning(true);
    setCommand("$ " + cmd);
    let i = 0;
    const interval = setInterval(() => {
      if (i < cmd.length) {
        setCommand("$ " + cmd.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 50);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-gray-900 p-4 font-mono text-sm">
        <div className="mb-2 flex items-center gap-2 text-gray-400">
          <Edit3 className="h-4 w-4" />
          <span>Terminal</span>
        </div>
        <div className="min-h-[40px] text-green-400">
          {command || "Ready..."}
          {!isRunning && <span className="animate-pulse text-white">|</span>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {commands.map((c) => (
          <button
            key={c.cmd}
            onClick={() => runCommand(c.cmd)}
            disabled={isRunning}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-mono hover:bg-accent disabled:opacity-50"
          >
            {c.cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

function MatrixText() {
  const [chars, setChars] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    setChars([]);
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
    let count = 0;
    const interval = setInterval(() => {
      if (count < 20) {
        setChars((prev) => [...prev, matrix[Math.floor(Math.random() * matrix.length)]]);
        count++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 100);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-gray-900 p-4">
        <div className="flex flex-wrap gap-1 font-mono text-sm text-green-400">
          {chars.map((c, i) => (
            <span key={i} className="animate-pulse">{c}</span>
          ))}
        </div>
      </div>
      <button
        onClick={generate}
        disabled={isGenerating}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        <Zap className="mr-2 h-4 w-4" />
        {isGenerating ? "Generating..." : "Generate Matrix"}
      </button>
    </div>
  );
}

export default function TypewriterTextPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="secondary">New</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <Type className="mr-2 inline h-8 w-8" />
          Typewriter Text
        </h1>
        <p className="text-lg text-muted-foreground">
          Animated text effects including typewriter, cursor blink, code typing, and more.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Typewriter Effect</h3>
          <ComponentPreview>
            <TypewriterEffect />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Blinking Cursor</h3>
          <ComponentPreview>
            <BlinkingCursor />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Code Typing</h3>
          <ComponentPreview>
            <CodeTyping />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Text Reveal</h3>
          <ComponentPreview>
            <TextReveal />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Animated Text</h3>
          <ComponentPreview>
            <AnimatedText />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Command Line</h3>
          <ComponentPreview>
            <CommandLine />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Matrix Text</h3>
          <ComponentPreview>
            <MatrixText />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">text</td>
                <td className="p-3">string</td>
                <td className="p-3">required</td>
                <td className="p-3">Text to animate</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">speed</td>
                <td className="p-3">number</td>
                <td className="p-3">50</td>
                <td className="p-3">Typing speed in milliseconds</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">delay</td>
                <td className="p-3">number</td>
                <td className="p-3">0</td>
                <td className="p-3">Initial delay before typing starts</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">cursor</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Show blinking cursor</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">loop</td>
                <td className="p-3">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Loop the animation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">onComplete</td>
                <td className="p-3">{"() => void"}</td>
                <td className="p-3">undefined</td>
                <td className="p-3">Callback when animation completes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
