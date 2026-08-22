"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Square, Play, Pause, Headphones, Volume2 } from "lucide-react";

export function RecordVariant() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggle = () => {
    if (!recording) {
      setRecording(true);
      setDuration(0);
      intervalRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } else {
      setRecording(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={toggle} className={`flex h-14 w-14 items-center justify-center rounded-full transition-all ${recording ? "bg-red-500 text-white shadow-lg shadow-red-500/25 animate-pulse" : "bg-zinc-900 text-white shadow-lg hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"}`}>
        {recording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>
      <p className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{fmt(duration)}</p>
      <p className="text-[10px] text-zinc-400">{recording ? "Recording..." : "Click to start"}</p>
    </div>
  );
}

export function WaveformVariant() {
  const [playing, setPlaying] = useState(false);
  const [heights, setHeights] = useState(Array.from({ length: 20 }, () => Math.random() * 100));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const toggle = () => {
    setPlaying(!playing);
    if (!playing) {
      intervalRef.current = setInterval(() => setHeights(Array.from({ length: 20 }, () => Math.random() * 100)), 150);
      setTimeout(() => { if (intervalRef.current) clearInterval(intervalRef.current); }, 3000);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
      <button onClick={toggle} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-all dark:bg-zinc-100 dark:text-zinc-900">
        {playing ? <Pause className="h-3 w-3" /> : <Play className="ml-0.5 h-3 w-3" />}
      </button>
      <div className="flex flex-1 items-end gap-[2px]">
        {heights.map((h, i) => <div key={i} className="flex-1 rounded-t-sm bg-zinc-900/60 transition-all duration-150 dark:bg-zinc-100/60" style={{ height: `${h}%` }} />)}
      </div>
      <span className="text-[10px] text-zinc-400">3:24</span>
    </div>
  );
}

export function MemoVariant() {
  const [recording, setRecording] = useState(false);
  const [memos, setMemos] = useState([{ id: 1, title: "Meeting Notes", dur: "2:15" }]);
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input placeholder="Memo title..." className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
        <button onClick={() => setRecording(!recording)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${recording ? "bg-red-500 text-white" : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"}`}>
          <Mic className="h-3 w-3" />{recording ? "Stop" : "Record"}
        </button>
      </div>
      {recording && <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2 dark:border-red-800 dark:bg-red-950/30"><span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /><span className="text-[10px] font-medium text-red-600">Recording...</span></div>}
      {memos.map((m) => <div key={m.id} className="flex items-center gap-2.5 rounded-lg border border-zinc-200 p-2 dark:border-zinc-800"><Mic className="h-3.5 w-3.5 text-zinc-400" /><span className="flex-1 text-xs font-medium text-zinc-900 dark:text-zinc-100">{m.title}</span><span className="text-[10px] text-zinc-400">{m.dur}</span></div>)}
    </div>
  );
}

export function PodcastVariant() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"><Headphones className="h-4 w-4" /></div>
          <div><p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Episode 1</p><p className="text-[10px] text-zinc-500">Design Systems</p></div>
        </div>
        <div className="mb-2 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700"><div className="h-full w-[35%] rounded-full bg-zinc-900 dark:bg-zinc-100" /></div>
        <div className="flex items-center justify-center gap-3">
          <button className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19,20 9,12 19,4" /><line x1="5" y1="4" x2="5" y2="20" /></svg></button>
          <button onClick={() => setPlaying(!playing)} className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-all dark:bg-zinc-100 dark:text-zinc-900">{playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}</button>
          <button className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5,4 15,12 5,20" /><line x1="19" y1="4" x2="19" y2="20" /></svg></button>
        </div>
        <div className="mt-2 flex justify-center gap-1">{[0.5, 1, 1.5, 2].map((s) => <button key={s} onClick={() => setSpeed(s)} className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-all ${speed === s ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"}`}>{s}x</button>)}</div>
      </div>
    </div>
  );
}

export function TranscriptionVariant() {
  const [sel, setSel] = useState<number | null>(null);
  const segs = [{ id: 1, sp: "Alice", text: "Let's discuss.", t: "0:00" }, { id: 2, sp: "Bob", text: "Sure, I have ideas.", t: "0:05" }];
  return (
    <div className="space-y-1">{segs.map((s) => <div key={s.id} onClick={() => setSel(sel === s.id ? null : s.id)} className={`cursor-pointer rounded-lg p-2 transition-all ${sel === s.id ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}>
      <div className="mb-0.5 flex items-center gap-1.5"><span className="rounded-full border border-zinc-200 px-1.5 py-0.5 text-[9px] dark:border-zinc-700">{s.sp}</span><span className="text-[9px] text-zinc-400">{s.t}</span></div>
      <p className="text-xs text-zinc-700 dark:text-zinc-300">{s.text}</p>
    </div>)}</div>
  );
}

export function LevelVariant() {
  const [level, setLevel] = useState(65);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between"><span className="text-[10px] text-zinc-500">Input</span><span className="font-mono text-[10px] text-zinc-700 dark:text-zinc-300">{level}%</span></div>
      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full transition-all ${level > 80 ? "bg-red-500" : level > 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${level}%` }} /></div>
      <div className="flex gap-2">
        <button onClick={() => setLevel(Math.max(0, level - 10))} className="flex-1 rounded-lg border border-zinc-200 py-1 text-[10px] font-medium dark:border-zinc-700">-10</button>
        <button onClick={() => setLevel(Math.min(100, level + 10))} className="flex-1 rounded-lg border border-zinc-200 py-1 text-[10px] font-medium dark:border-zinc-700">+10</button>
      </div>
    </div>
  );
}

export function MeetingVariant() {
  const [rec, setRec] = useState(false);
  const [dur, setDur] = useState(0);
  useEffect(() => { let i: NodeJS.Timeout; if (rec) i = setInterval(() => setDur((d) => d + 1), 1000); return () => clearInterval(i); }, [rec]);
  const fmt = (s: number) => `${Math.floor(s / 3600).toString().padStart(2, "0")}:${Math.floor((s % 3600) / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  return (
    <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">{rec && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}<span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{rec ? "Recording" : "Ready"}</span></div>
        <span className="font-mono text-[10px] text-zinc-500">{fmt(dur)}</span>
      </div>
      <button onClick={() => setRec(!rec)} className={`w-full rounded-xl py-2 text-xs font-medium transition-all ${rec ? "bg-red-500 text-white" : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"}`}>{rec ? "Stop" : "Start"}</button>
    </div>
  );
}
