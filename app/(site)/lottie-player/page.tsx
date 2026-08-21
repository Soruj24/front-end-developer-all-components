"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { LottiePlayer } from "@/components/ui/LottiePlayer";

const LOTTIEPLAYER_SOURCE = `"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface LottiePlayerProps {
  animation?: ReactNode;
  playing?: boolean;
  loop?: boolean;
  speed?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onLoop?: () => void;
  className?: string;
}

export function LottiePlayer({ animation, playing = true, loop = true, speed = 1, onPlay, onPause, onLoop, className }: LottiePlayerProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "flex h-48 w-full items-center justify-center rounded-2xl border border-border bg-card",
          "transition-all duration-300",
        )}
        style={{ animationDuration: \`\${1 / speed}s\`, animationPlayState: playing ? "running" : "paused" }}
      >
        {animation ?? (
          <span className="text-6xl" style={{ animation: \`bounce \${1 / speed}s infinite\`, animationPlayState: playing ? "running" : "paused" }}>
            ✨
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={playing ? onPause : onPlay} aria-label={playing ? "Pause" : "Play"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
            "transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            playing ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]" : "bg-muted text-foreground hover:bg-muted/80 active:scale-[0.98]",
          )}>
          {playing ? "Pause" : "Play"}
        </button>
        <button type="button" onClick={onLoop} aria-label={loop ? "Loop on" : "Loop off"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
            "transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            loop ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}>
          Loop
        </button>
      </div>
    </div>
  );
}`;

function RocketAnimation({ playing, speed }: { playing: boolean; speed: number }) {
  return (
    <span className="text-6xl" style={{ animation: `bounce ${1 / speed}s infinite`, animationPlayState: playing ? "running" : "paused" }}>
      🚀
    </span>
  );
}

function CheckAnimation({ playing, speed }: { playing: boolean; speed: number }) {
  return (
    <span className="text-6xl" style={{ animation: `bounce ${1 / speed}s infinite`, animationPlayState: playing ? "running" : "paused" }}>
      ✅
    </span>
  );
}

function StarAnimation({ playing, speed }: { playing: boolean; speed: number }) {
  return (
    <span className="text-6xl" style={{ animation: `bounce ${1 / speed}s infinite`, animationPlayState: playing ? "running" : "paused" }}>
      ⭐
    </span>
  );
}

function HeartAnimation({ playing, speed }: { playing: boolean; speed: number }) {
  return (
    <span className="text-6xl" style={{ animation: `bounce ${1 / speed}s infinite`, animationPlayState: playing ? "running" : "paused" }}>
      ❤️
    </span>
  );
}

function FireAnimation({ playing, speed }: { playing: boolean; speed: number }) {
  return (
    <span className="text-6xl" style={{ animation: `bounce ${1 / speed}s infinite`, animationPlayState: playing ? "running" : "paused" }}>
      🔥
    </span>
  );
}

const animations = [
  { id: "rocket", label: "Rocket", component: RocketAnimation },
  { id: "check", label: "Success", component: CheckAnimation },
  { id: "star", label: "Star", component: StarAnimation },
  { id: "heart", label: "Heart", component: HeartAnimation },
  { id: "fire", label: "Fire", component: FireAnimation },
];

export default function LottiePlayerPage() {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const [current, setCurrent] = useState("rocket");

  const CurrentAnimation = animations.find((a) => a.id === current)?.component ?? RocketAnimation;

  return (
    <ComponentDocPage
      name="Lottie Player"
      category="Animation"
      description="Animation player with play/pause controls, speed adjustment, loop options, and segment selection."
    >
      <PreviewPanel filename="lottie-player-preview.tsx">
        <LottiePlayer
          animation={<RocketAnimation playing={playing} speed={speed} />}
          playing={playing}
          loop={loop}
          speed={speed}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoop={() => setLoop((l) => !l)}
        />
      </PreviewPanel>

      <SourceCodeViewer source={LOTTIEPLAYER_SOURCE} filename="components/ui/LottiePlayer/LottiePlayer.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Basic animation player with play/pause and loop controls."
          code={`import { LottiePlayer } from "@/components/ui/LottiePlayer";

<LottiePlayer
  animation={<span className="text-6xl">🚀</span>}
  playing={true}
  loop={true}
/>`}
          filename="default.tsx"
        >
          <LottiePlayer
            animation={<RocketAnimation playing={playing} speed={speed} />}
            playing={playing}
            loop={loop}
            speed={speed}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoop={() => setLoop((l) => !l)}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Speed Control"
          description="Adjust animation playback speed."
          code={`const [speed, setSpeed] = useState(1);

<div>
  <LottiePlayer animation={<span className="text-6xl">🚀</span>} playing={true} speed={speed} />
  <div className="mt-2 flex justify-center gap-2">
    {[0.5, 1, 1.5, 2].map((s) => (
      <button key={s} onClick={() => setSpeed(s)} className={speed === s ? "bg-primary text-white" : "bg-muted"}>
        {s}x
      </button>
    ))}
  </div>
</div>`}
          filename="speed.tsx"
        >
          <div className="w-full">
            <LottiePlayer
              animation={<RocketAnimation playing={playing} speed={speed} />}
              playing={playing}
              speed={speed}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Speed:</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded-xl px-2 text-xs font-medium transition-all duration-200 ${
                    speed === s
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  } focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Animation Picker"
          description="Switch between different animations."
          code={`const [current, setCurrent] = useState("rocket");

<div>
  <div className="mb-3 flex gap-2">
    {animations.map((a) => (
      <button key={a.id} onClick={() => setCurrent(a.id)} className={current === a.id ? "bg-primary" : "bg-muted"}>
        {a.label}
      </button>
    ))}
  </div>
  <LottiePlayer animation={<span className="text-6xl">{animations.find(a => a.id === current)?.icon}</span>} />
</div>`}
          filename="picker.tsx"
        >
          <div className="w-full">
            <div className="mb-4 flex flex-wrap gap-2">
              {animations.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setCurrent(a.id)}
                  className={`inline-flex h-8 items-center justify-center rounded-xl px-3 text-xs font-medium transition-all duration-200 ${
                    current === a.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  } focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none`}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <LottiePlayer
              animation={<CurrentAnimation playing={playing} speed={speed} />}
              playing={playing}
              loop={loop}
              speed={speed}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onLoop={() => setLoop((l) => !l)}
            />
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">animation</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">✨</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">playing</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">loop</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">speed</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onPlay</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onPause</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onLoop</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
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
