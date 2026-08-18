"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Volume2,
  Headphones,
} from "lucide-react";

const installCommand = "npx shadcn@latest add mic-recording";
const usageCode = `import { RecordButton } from "@/components/mic-recording";

export function RecordingExample() {
  return (
    <RecordButton
      onRecordingComplete={(blob) => console.log(blob)}
    />
  );
}`;

function RecordButton() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
      setDuration(0);
      const interval = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Record Button</h3>
      </div>
      <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
        <div className="text-center">
          <button
            onClick={toggleRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              recording
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {recording ? (
              <Square className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-primary-foreground" />
            )}
          </button>
          <p className="text-sm font-mono mt-3">{formatTime(duration)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {recording ? "Recording..." : "Click to start"}
          </p>
        </div>
      </div>
    </div>
  );
}

function AudioWaveform() {
  const [playing, setPlaying] = useState(false);
  const bars = 24;
  const [heights, setHeights] = useState(
    Array.from({ length: bars }, () => Math.random() * 100)
  );

  const togglePlay = () => {
    setPlaying(!playing);
    if (!playing) {
      const interval = setInterval(() => {
        setHeights(Array.from({ length: bars }, () => Math.random() * 100));
      }, 150);
      setTimeout(() => clearInterval(interval), 5000);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Audio Waveform</h3>
      </div>
      <div className="flex items-center gap-4 h-24 bg-muted rounded-lg p-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>
        <div className="flex-1 flex items-end gap-[2px] h-full">
          {heights.map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/60 rounded-t transition-all duration-150"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground shrink-0">3:24</span>
      </div>
    </div>
  );
}

function VoiceMemo() {
  const [memos, setMemos] = useState([
    { id: 1, title: "Meeting Notes", duration: "2:15", date: "Today" },
    { id: 2, title: "Quick Reminder", duration: "0:45", date: "Yesterday" },
  ]);
  const [recording, setRecording] = useState(false);
  const [memoTitle, setMemoTitle] = useState("");

  const addMemo = () => {
    if (memoTitle.trim()) {
      setMemos([
        { id: Date.now(), title: memoTitle, duration: "0:30", date: "Just now" },
        ...memos,
      ]);
      setMemoTitle("");
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Voice Memo</h3>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            value={memoTitle}
            onChange={(e) => setMemoTitle(e.target.value)}
            placeholder="Memo title..."
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          />
          <button
            onClick={() => setRecording(!recording)}
            className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
              recording
                ? "bg-red-500 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <Mic className="h-4 w-4" />
            {recording ? "Stop" : "Record"}
          </button>
        </div>
        {recording && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-600">Recording in progress...</span>
          </div>
        )}
        {recording && (
          <button
            onClick={addMemo}
            className="w-full py-2 border rounded-md text-sm hover:bg-muted"
          >
            Save Memo
          </button>
        )}
        <div className="space-y-2">
          {memos.map((memo) => (
            <div key={memo.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mic className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{memo.title}</p>
                <p className="text-xs text-muted-foreground">{memo.duration} - {memo.date}</p>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg">
                <Play className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PodcastPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [speed, setSpeed] = useState(1);

  const episodes = [
    { id: 1, title: "Episode 1: Getting Started", duration: "45:00" },
    { id: 2, title: "Episode 2: Advanced Tips", duration: "52:00" },
    { id: 3, title: "Episode 3: Expert Interview", duration: "38:00" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Headphones className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Podcast Player</h3>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Headphones className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Episode 1: Getting Started</p>
            <p className="text-xs text-muted-foreground">Design Systems Podcast</p>
          </div>
        </div>
        <div className="relative h-1.5 bg-background rounded-full mb-3">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>15:45</span>
          <span>45:00</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <button className="p-2 hover:bg-background rounded-full">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="19,20 9,12 19,4" /><line x1="5" y1="4" x2="5" y2="20" />
            </svg>
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
          <button className="p-2 hover:bg-background rounded-full">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,4 15,12 5,20" /><line x1="19" y1="4" x2="19" y2="20" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 text-xs rounded ${
                speed === s ? "bg-primary text-primary-foreground" : "hover:bg-background"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {episodes.map((ep) => (
          <div key={ep.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
            <Play className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-sm">{ep.title}</span>
            <span className="text-xs text-muted-foreground">{ep.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptionView() {
  const [segments] = useState([
    { id: 1, speaker: "Alice", text: "Let's discuss the new feature.", time: "0:00" },
    { id: 2, speaker: "Bob", text: "Sure, I have some ideas.", time: "0:05" },
    { id: 3, speaker: "Alice", text: "Great, let me share my screen.", time: "0:12" },
    { id: 4, speaker: "Bob", text: "Looks good, let's proceed.", time: "0:18" },
  ]);
  const [highlighted, setHighlighted] = useState<number | null>(null);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Transcription View</h3>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {segments.map((seg) => (
          <div
            key={seg.id}
            onClick={() => setHighlighted(seg.id === highlighted ? null : seg.id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              highlighted === seg.id
                ? "bg-primary/10 border border-primary/30"
                : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">{seg.speaker}</Badge>
              <span className="text-xs text-muted-foreground">{seg.time}</span>
            </div>
            <p className="text-sm">{seg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudioLevel() {
  const [level, setLevel] = useState(65);
  const [peak, setPeak] = useState(85);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Audio Level</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Input Level</span>
            <span className="text-sm font-mono">{level}%</span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                level > 80 ? "bg-red-500" : level > 50 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Peak Level</span>
            <span className="text-sm font-mono">{peak}%</span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/60 rounded-full transition-all"
              style={{ width: `${peak}%` }}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setLevel(Math.max(0, level - 10))}
            className="flex-1 py-2 border rounded-md text-sm hover:bg-muted"
          >
            - Volume
          </button>
          <button
            onClick={() => setLevel(Math.min(100, level + 10))}
            className="flex-1 py-2 border rounded-md text-sm hover:bg-muted"
          >
            + Volume
          </button>
        </div>
      </div>
    </div>
  );
}

function MeetingRecorder() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [participants, setParticipants] = useState([
    { id: 1, name: "You", speaking: false },
    { id: 2, name: "Alice", speaking: true },
    { id: 3, name: "Bob", speaking: false },
  ]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Meeting Recorder</h3>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {recording && (
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
            <span className="text-sm font-medium">
              {recording ? "Recording" : "Ready"}
            </span>
          </div>
          <span className="font-mono text-sm">{formatTime(duration)}</span>
        </div>
        <div className="space-y-2 mb-4">
          {participants.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                p.speaking ? "bg-primary text-primary-foreground" : "bg-background"
              }`}>
                {p.name.charAt(0)}
              </div>
              <span className="text-sm flex-1">{p.name}</span>
              {p.speaking && (
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{ height: `${8 + Math.random() * 8}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setRecording(!recording);
              if (!recording) {
                const interval = setInterval(() => {
                  setDuration((d) => d + 1);
                }, 1000);
                return () => clearInterval(interval);
              }
            }}
            className={`flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
              recording
                ? "bg-red-500 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {recording ? (
              <>
                <Square className="h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" />
                Start Recording
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MicRecordingPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Mic className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Mic Recording</h1>
          <Badge>Components</Badge>
        </div>
        <p className="text-muted-foreground">
          Audio recording components including record buttons, waveforms, voice memos,
          podcast players, and transcription views for audio capture and playback.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid gap-6">
          <ComponentPreview name="RecordButton">
            <RecordButton />
          </ComponentPreview>
          <ComponentPreview name="AudioWaveform">
            <AudioWaveform />
          </ComponentPreview>
          <ComponentPreview name="VoiceMemo">
            <VoiceMemo />
          </ComponentPreview>
          <ComponentPreview name="PodcastPlayer">
            <PodcastPlayer />
          </ComponentPreview>
          <ComponentPreview name="TranscriptionView">
            <TranscriptionView />
          </ComponentPreview>
          <ComponentPreview name="AudioLevel">
            <AudioLevel />
          </ComponentPreview>
          <ComponentPreview name="MeetingRecorder">
            <MeetingRecorder />
          </ComponentPreview>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">Prop</th>
                <th className="p-2 text-left font-medium">Type</th>
                <th className="p-2 text-left font-medium">Default</th>
                <th className="p-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">onRecordingComplete</td>
                <td className="p-2 font-mono text-xs">(blob: Blob) =&gt; void</td>
                <td className="p-2 font-mono text-xs">required</td>
                <td className="p-2">Callback when recording finishes</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">maxDuration</td>
                <td className="p-2 font-mono text-xs">number</td>
                <td className="p-2 font-mono text-xs">Infinity</td>
                <td className="p-2">Max recording duration in seconds</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">format</td>
                <td className="p-2 font-mono text-xs">"webm" | "mp3" | "wav"</td>
                <td className="p-2 font-mono text-xs">"webm"</td>
                <td className="p-2">Audio output format</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">showWaveform</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">true</td>
                <td className="p-2">Display real-time waveform</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">visualize</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">true</td>
                <td className="p-2">Enable audio visualization</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
