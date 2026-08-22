"use client";

import { useState } from "react";
import { Play, Pause, Music } from "lucide-react";

export function NowPlayingVariant() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"><Music className="h-5 w-5 text-white" /></div>
      <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">Midnight Dreams</p><p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">Luna Eclipse</p></div>
      <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900">{playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}</button>
    </div>
  );
}

export function PlaylistVariant() {
  const [active, setActive] = useState(0);
  const songs = [{ t: "Neon Horizons", a: "Synth Wave" }, { t: "Deep Blue", a: "Ocean Sounds" }];
  return (
    <div className="flex flex-col gap-1">{songs.map((s, i) => <button key={i} onClick={() => setActive(i)} className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all ${active === i ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}>
      <span className={`w-4 text-center text-[10px] font-bold ${active === i ? "" : "text-zinc-400"}`}>{active === i ? "\u25B6" : i + 1}</span>
      <div className="flex-1 min-w-0"><p className="truncate text-xs font-medium">{s.t}</p><p className={`truncate text-[10px] ${active === i ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"}`}>{s.a}</p></div>
    </button>)}</div>
  );
}

export function AudioVariant() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setPlaying(!playing)} className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">{playing ? <Pause className="h-3 w-3" /> : <Play className="ml-0.5 h-3 w-3" />}</button>
      <div className="flex flex-1 items-center gap-1.5"><span className="text-[9px] text-zinc-400">1:24</span><div className="h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700"><div className="h-full w-[35%] rounded-full bg-zinc-900 dark:bg-zinc-100" /></div><span className="text-[9px] text-zinc-400">4:02</span></div>
    </div>
  );
}

export function WaveformVariant() {
  const [bars] = useState(() => Array.from({ length: 24 }, () => Math.random() * 100));
  const [active, setActive] = useState(6);
  return (
    <div className="flex h-14 items-end gap-px rounded-xl bg-zinc-50 p-2.5 dark:bg-zinc-900">
      {bars.map((h, i) => <div key={i} onClick={() => setActive(i)} className={`flex-1 cursor-pointer rounded-t-sm transition-all duration-150 ${i <= active ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700"}`} style={{ height: `${h}%` }} />)}
    </div>
  );
}

export function MusicCardVariant() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-xl shadow-purple-500/20">
      <div className="flex items-start justify-between">
        <div><p className="text-sm font-bold">Electric Dreams</p><p className="text-[10px] text-white/70">Neon Pulse</p></div>
        <button onClick={() => setLiked(!liked)} className="text-lg">{liked ? "\u2665" : "\u2661"}</button>
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"><Play className="ml-0.5 h-3 w-3" /></button>
        <div className="h-1 flex-1 rounded-full bg-white/20"><div className="h-full w-[45%] rounded-full bg-white" /></div>
        <span className="text-[9px] text-white/70">2:15</span>
      </div>
    </div>
  );
}

export function EqualizerVariant() {
  const [bands, setBands] = useState([65, 45, 80, 55, 70, 40]);
  const labels = ["32", "64", "125", "250", "500", "1K"];
  return (
    <div className="flex items-end gap-2 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">{bands.map((val, i) => <div key={i} className="flex flex-1 flex-col items-center gap-1">
      <input type="range" min={0} max={100} value={val} onChange={(e) => setBands((prev) => prev.map((v, j) => j === i ? Number(e.target.value) : v))} className="h-20 w-3.5 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" style={{ writingMode: "vertical-lr", direction: "rtl" }} />
      <span className="text-[8px] text-zinc-400">{labels[i]}</span>
    </div>)}</div>
  );
}

export function QueueVariant() {
  const [queue, setQueue] = useState([{ id: 1, t: "Sunrise Beats", d: "3:42" }, { id: 2, t: "City Lights", d: "4:10" }]);
  return (
    <div className="space-y-1">{queue.map((s, i) => <div key={s.id} className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2.5 py-1.5 dark:bg-zinc-900">
      <span className="text-[9px] text-zinc-400">{i + 1}</span>
      <span className="flex-1 text-xs font-medium text-zinc-900 dark:text-zinc-100">{s.t}</span>
      <span className="text-[9px] text-zinc-400">{s.d}</span>
      <button onClick={() => setQueue((p) => p.filter((x) => x.id !== s.id))} className="rounded p-0.5 text-zinc-400 hover:text-red-500"><svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
    </div>)}</div>
  );
}
