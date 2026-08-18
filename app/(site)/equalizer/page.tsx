"use client";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Activity, Volume2, SlidersHorizontal, Music, Settings, Play, Pause } from "lucide-react";

const installCommand = `npx component-library@latest add equalizer`;
const usageCode = `import { Equalizer } from "@/components/ui/equalizer";

<Equalizer bands={8} values={levels} />`;

function BarEqualizer() {
  const [levels, setLevels] = useState([65, 80, 45, 90, 55, 70, 35, 60]);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    if (!animating) return;
    const id = setInterval(() => {
      setLevels(prev => prev.map(() => Math.floor(Math.random() * 100)));
    }, 200);
    return () => clearInterval(id);
  }, [animating]);
  return (
    <div className="w-full p-4">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Vertical Band Equalizer</h4>
          <button onClick={() => setAnimating(!animating)} className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90">
            {animating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-end gap-3 justify-center h-40">
          {levels.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-8 h-32 bg-muted rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-200" style={{ height: `${h}%` }} />
              </div>
              <span className="text-[9px] text-muted-foreground">{["32", "64", "125", "250", "500", "1K", "4K", "16K"][i]}</span>
              <span className="text-xs font-mono text-muted-foreground">{h}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CircleEqualizer() {
  const [levels, setLevels] = useState([50, 70, 30, 85, 40, 60, 25, 75]);
  return (
    <div className="w-full p-4">
      <div className="max-w-xl mx-auto">
        <h4 className="font-medium mb-4">Circular Equalizer</h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {levels.map((level, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
                <circle
                  cx="40" cy="40" r="32"
                  stroke="currentColor" strokeWidth="6" fill="none" className="text-primary"
                  strokeDasharray={201}
                  strokeDashoffset={201 - (201 * level / 100)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
              </svg>
              <span className="text-xs text-muted-foreground">{["Bass", "Low", "Mid", "High", "Pres", "Air", "Sub", "Ultra"][i]}</span>
              <span className="text-xs font-mono text-primary">{level}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FrequencyBands() {
  const [bands, setBands] = useState([
    { freq: "32Hz", gain: 0 }, { freq: "64Hz", gain: 2 }, { freq: "125Hz", gain: -1 },
    { freq: "250Hz", gain: 3 }, { freq: "500Hz", gain: 1 }, { freq: "1kHz", gain: 0 },
    { freq: "2kHz", gain: -2 }, { freq: "4kHz", gain: 2 }, { freq: "8kHz", gain: 1 }, { freq: "16kHz", gain: -1 },
  ]);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <h4 className="font-medium mb-4">10-Band Graphic EQ</h4>
        <div className="flex items-end gap-2 justify-center h-48 px-4">
          {bands.map((band, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1 max-w-16">
              <input
                type="range"
                min="-12"
                max="12"
                value={band.gain}
                onChange={(e) => setBands(prev => prev.map((b, idx) => idx === i ? { ...b, gain: Number(e.target.value) } : b))}
                className="w-full h-40 appearance-none bg-transparent cursor-pointer -rotate-90 origin-center"
                style={{ transform: "rotate(-90deg) translateX(-50%)" }}
              />
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-mono text-primary">{band.gain > 0 ? "+" : ""}{band.gain}</span>
              </div>
              <span className="text-[9px] text-muted-foreground">{band.freq}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PresetEQ() {
  const [preset, setPreset] = useState("flat");
  const presets = {
    flat: [0, 0, 0, 0, 0, 0, 0, 0],
    rock: [4, 3, 0, -2, -1, 1, 3, 4],
    pop: [2, 3, 2, 0, -1, 1, 2, 2],
    jazz: [3, 1, 0, -1, -2, 0, 2, 3],
    classical: [2, 1, 0, 1, 2, 1, 0, -1],
    bass: [6, 4, 2, 0, -2, -3, -4, -5],
    treble: [-4, -2, 0, 1, 2, 3, 4, 5],
  };
  const levels = presets[preset as keyof typeof presets];
  return (
    <div className="w-full p-4">
      <div className="max-w-xl mx-auto">
        <h4 className="font-medium mb-4">EQ Presets</h4>
        <div className="flex gap-2 flex-wrap mb-4">
          {Object.keys(presets).map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${preset === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-3 justify-center h-40">
          {levels.map((level, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-8 h-32 bg-muted rounded-full relative overflow-hidden">
                const height = 50 + level * 3;
                <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-300" style={{ height: `${Math.max(0, Math.min(100, height))}%` }} />
              </div>
              <span className="text-[9px] text-muted-foreground">{["32", "64", "125", "250", "500", "1K", "4K", "16K"][i]}</span>
              <span className="text-xs font-mono text-primary">{level > 0 ? "+" : ""}{level}dB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomEQ() {
  const [bands, setBands] = useState([
    { freq: 60, gain: 0 }, { freq: 170, gain: 0 }, { freq: 310, gain: 0 },
    { freq: 600, gain: 0 }, { freq: 1000, gain: 0 }, { freq: 3000, gain: 0 },
    { freq: 6000, gain: 0 }, { freq: 12000, gain: 0 },
  ]);
  const [qFactor, setQFactor] = useState(1);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <h4 className="font-medium mb-4">Parametric EQ</h4>
        <div className="space-y-3 mb-6">
          {bands.map((band, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-primary"
              />
              <div className="flex-1 flex items-center gap-2">
                <label className="text-xs text-muted-foreground w-16">Freq</label>
                <input
                  type="number"
                  value={band.freq}
                  onChange={(e) => setBands(prev => prev.map((b, idx) => idx === i ? { ...b, freq: Number(e.target.value) } : b))}
                  className="flex-1 px-2 py-1 text-sm bg-background border border-border rounded outline-none"
                />
                <label className="text-xs text-muted-foreground w-16">Gain</label>
                <input
                  type="number"
                  step="0.5"
                  min="-12"
                  max="12"
                  value={band.gain}
                  onChange={(e) => setBands(prev => prev.map((b, idx) => idx === i ? { ...b, gain: Number(e.target.value) } : b))}
                  className="w-16 px-2 py-1 text-sm bg-background border border-border rounded outline-none"
                />
                <label className="text-xs text-muted-foreground w-16">Q</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={qFactor}
                  onChange={(e) => setQFactor(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-sm bg-background border border-border rounded outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-3 justify-center h-32">
          {bands.map((band, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-6 h-24 bg-muted rounded-full relative overflow-hidden">
                const height = 50 + band.gain * 3;
                <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all" style={{ height: `${Math.max(0, Math.min(100, height))}%` }} />
              </div>
              <span className="text-[8px] text-muted-foreground">{`${band.freq}Hz`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Visualizer() {
  const [bars, setBars] = useState(Array.from({ length: 32 }, () => Math.random() * 100));
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 80);
    return () => clearInterval(id);
  }, [running]);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Spectrum Visualizer</h4>
          <button onClick={() => setRunning(!running)} className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90">
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-end gap-1 justify-center h-32">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-2 bg-primary/80 rounded-t transition-all duration-75"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span>Bars: 32</span>
          <span>FPS: ~12</span>
          <span>Range: 20Hz - 20kHz</span>
        </div>
      </div>
    </div>
  );
}

function AudioBars() {
  const [channels, setChannels] = useState({
    left: Array.from({ length: 16 }, () => Math.random() * 100),
    right: Array.from({ length: 16 }, () => Math.random() * 100),
  });
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setChannels({
        left: Array.from({ length: 16 }, () => Math.random() * 100),
        right: Array.from({ length: 16 }, () => Math.random() * 100),
      });
    }, 100);
    return () => clearInterval(id);
  }, [running]);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Stereo Audio Bars</h4>
          <button onClick={() => setRunning(!running)} className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90">
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {["left", "right"].map((ch) => (
            <div key={ch} className="text-center">
              <div className="text-xs font-medium text-muted-foreground mb-2 uppercase">{ch} channel</div>
              <div className="flex items-end gap-0.5 justify-center h-32">
                {channels[ch as keyof typeof channels].map((height, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-t transition-all duration-75"
                    style={{ height: `${height}%`, background: ch === "left" ? "hsl(var(--primary))" : "hsl(var(--secondary))" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EqualizerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Equalizer</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An audio equalizer component with frequency bands, sliders, and visual frequency display for audio applications.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Bar Equalizer</h2><p className="mt-1 text-sm text-muted-foreground">Vertical frequency band sliders with animation.</p></div>
        <ComponentPreview id="equalizer-bar"><BarEqualizer /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Circle Equalizer</h2><p className="mt-1 text-sm text-muted-foreground">Circular frequency band visualization.</p></div>
        <ComponentPreview id="equalizer-circle"><CircleEqualizer /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Frequency Bands</h2><p className="mt-1 text-sm text-muted-foreground">10-band graphic equalizer with slider controls.</p></div>
        <ComponentPreview id="equalizer-bands"><FrequencyBands /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preset EQ</h2><p className="mt-1 text-sm text-muted-foreground">Pre-configured EQ presets for different genres.</p></div>
        <ComponentPreview id="equalizer-preset"><PresetEQ /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Custom EQ</h2><p className="mt-1 text-sm text-muted-foreground">Parametric EQ with frequency, gain, and Q controls.</p></div>
        <ComponentPreview id="equalizer-custom"><CustomEQ /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Visualizer</h2><p className="mt-1 text-sm text-muted-foreground">Animated frequency spectrum visualizer.</p></div>
        <ComponentPreview id="equalizer-visualizer"><Visualizer /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Audio Bars</h2><p className="mt-1 text-sm text-muted-foreground">Stereo channel level meters.</p></div>
        <ComponentPreview id="equalizer-audio-bars"><AudioBars /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">bands</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">8</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">values</td><td className="px-4 py-3 text-muted-foreground">number[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onChange</td><td className="px-4 py-3 text-muted-foreground">(values: number[]) => void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">min</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">max</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">100</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}