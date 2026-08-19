"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  Cast,
  Music,
  ListMusic,
  Repeat,
  Shuffle,
  X,
  Check,
  Wifi,
  Monitor,
  Speaker,
  Tv,
  Smartphone,
} from "lucide-react";

interface CastDevice {
  id: string;
  name: string;
  type: "tv" | "speaker" | "display" | "phone";
  connected: boolean;
  signal: number;
}

const mockDevices: CastDevice[] = [
  { id: "1", name: "Living Room TV", type: "tv", connected: false, signal: 85 },
  { id: "2", name: "Bedroom Speaker", type: "speaker", connected: false, signal: 92 },
  { id: "3", name: "Kitchen Display", type: "display", connected: false, signal: 68 },
  { id: "4", name: "iPhone 15 Pro", type: "phone", connected: false, signal: 45 },
];

export function VideoPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 0.3;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playing]);

  const formatTime = (p: number) => {
    const totalSec = 180;
    const sec = Math.floor((p / 100) * totalSec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="relative aspect-video bg-zinc-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
            <span className="text-xs font-medium text-white/60">Big Buck Bunny</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">HD</span>
          <span className="rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">CC</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
          <div className="mb-3 group cursor-pointer">
            <div className="relative h-1.5 rounded-full bg-white/20">
              <div className="absolute inset-y-0 left-0 rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" style={{ left: `calc(${progress}% - 6px)` }} />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-white/60">
              <span>{formatTime(progress)}</span>
              <span>3:00</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPlaying(!playing)} className="text-white hover:text-white/80 transition-colors">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <SkipForward className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5 group">
              <button className="text-white/70 hover:text-white transition-colors">
                {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <div className="w-16 h-1 rounded-full bg-white/20 cursor-pointer">
                <div className="h-full rounded-full bg-white" style={{ width: `${volume}%` }} />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-white/80 hover:bg-white/20 transition-colors">1x</button>
              <button className="text-white/70 hover:text-white transition-colors">
                <Cast className="h-4 w-4" />
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CastDevicePickerDemo() {
  const [devices, setDevices] = useState(mockDevices);
  const [scanning, setScanning] = useState(false);
  const [showPicker, setShowPicker] = useState(true);

  const scan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const connect = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => ({ ...d, connected: d.id === id ? !d.connected : false }))
    );
  };

  const connectedDevice = devices.find((d) => d.connected);

  const iconMap: Record<string, React.ReactNode> = {
    tv: <Tv className="h-4 w-4" />,
    speaker: <Speaker className="h-4 w-4" />,
    display: <Monitor className="h-4 w-4" />,
    phone: <Smartphone className="h-4 w-4" />,
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
        <div className="flex items-center gap-2">
          <Cast className="h-4 w-4" />
          <span className="text-sm font-semibold">Cast To</span>
        </div>
        <div className="flex items-center gap-2">
          {connectedDevice && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Wifi className="h-2.5 w-2.5" />
              Connected
            </span>
          )}
          <button
            onClick={scan}
            disabled={scanning}
            className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            {scanning ? "Scanning..." : "Scan"}
          </button>
        </div>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {devices.map((d) => (
          <button
            key={d.id}
            onClick={() => connect(d.id)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
              d.connected ? "bg-emerald-50/50 dark:bg-emerald-950/20" : "hover:bg-muted/50"
            }`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              d.connected ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
            }`}>
              {d.connected ? <Cast className="h-5 w-5" /> : iconMap[d.type]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{d.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="capitalize">{d.type}</span>
                <span>\u00b7</span>
                <span className="flex items-center gap-0.5">
                  <Wifi className="h-2.5 w-2.5" />
                  {d.signal}%
                </span>
              </div>
            </div>
            {d.connected ? (
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-emerald-500" />
                <button
                  onClick={(e) => { e.stopPropagation(); connect(d.id); }}
                  className="text-[10px] text-muted-foreground hover:text-foreground"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                Cast
              </span>
            )}
          </button>
        ))}
      </div>
      {scanning && (
        <div className="border-t border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Searching for devices...
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressBarDemo() {
  const [currentTime, setCurrentTime] = useState(42);
  const total = 180;
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold">Progress Bar</span>
        <span className="text-xs text-muted-foreground">{Math.round((currentTime / total) * 100)}%</span>
      </div>
      <div className="group cursor-pointer">
        <div className="relative h-2 rounded-full bg-muted">
          <div className="absolute inset-y-0 left-0 rounded-full bg-foreground transition-all" style={{ width: `${(currentTime / total) * 100}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md border-2 border-card" style={{ left: `calc(${(currentTime / total) * 100}% - 8px)` }} />
        </div>
      </div>
      <div className="mt-1 flex justify-between text-[10px] font-mono text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(total)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={total}
        value={currentTime}
        onChange={(e) => setCurrentTime(Number(e.target.value))}
        className="mt-3 w-full accent-foreground"
      />
    </div>
  );
}

export function AudioPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 0.2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Music className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">Midnight City</p>
          <p className="text-xs text-muted-foreground truncate">M83 \u00b7 Hurry Up, We\'re Dreaming</p>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>
      </div>
      <div className="mt-4">
        <div className="group cursor-pointer">
          <div className="relative h-1.5 rounded-full bg-muted">
            <div className="absolute inset-y-0 left-0 rounded-full bg-foreground transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mt-1 flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>1:24</span>
          <span>4:03</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-4">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Shuffle className="h-4 w-4" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <SkipBack className="h-4 w-4" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <SkipForward className="h-4 w-4" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Repeat className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function CastDemo() {
  const [volume, setVolume] = useState(65);
  const [playing, setPlaying] = useState(true);
  const device = { name: "Living Room TV", type: "tv" as const, signal: 85 };

  return (
    <div className="w-full max-w-md rounded-xl border border-emerald-200 bg-card shadow-sm overflow-hidden dark:border-emerald-900">
      <div className="border-b border-emerald-100 bg-emerald-50/50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/20">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Cast className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Casting to {device.name}</p>
            <p className="text-[10px] text-muted-foreground">Connected \u00b7 Signal: {device.signal}%</p>
          </div>
          <button className="rounded-lg bg-red-50 px-2.5 py-1 text-[10px] font-medium text-red-600 hover:bg-red-100 transition-colors dark:bg-red-950/50 dark:text-red-400">
            Disconnect
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-900">
            <Play className="h-6 w-6 text-white ml-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Big Buck Bunny</p>
            <p className="text-xs text-muted-foreground">Playing on {device.name}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="h-1.5 rounded-full bg-muted">
            <div className="h-full w-[42%] rounded-full bg-emerald-500" />
          </div>
          <div className="mt-1 flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>1:15</span>
            <span>9:56</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 h-1.5 rounded-full bg-muted">
            <div className="h-full rounded-full bg-foreground" style={{ width: `${volume}%` }} />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{volume}%</span>
        </div>
      </div>
    </div>
  );
}

export function PlaylistDemo() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(true);
  const tracks = [
    { title: "Intro", artist: "The Album", duration: "1:23", album: "Ambient" },
    { title: "Midnight City", artist: "M83", duration: "4:03", album: "Electronic" },
    { title: "Breathe", artist: "Pink Floyd", duration: "2:43", album: "Rock" },
    { title: "Clair de Lune", artist: "Debussy", duration: "5:12", album: "Classical" },
    { title: "Midnight Pretenders", artist: "Tokyo Nights", duration: "4:45", album: "City Pop" },
  ];

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
        <div className="flex items-center gap-2">
          <ListMusic className="h-4 w-4" />
          <span className="text-sm font-semibold">Queue</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{tracks.length}</span>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Clear</button>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {tracks.map((track, i) => (
          <button
            key={i}
            onClick={() => setCurrentTrack(i)}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
              i === currentTrack ? "bg-muted/50" : "hover:bg-muted/30"
            }`}
          >
            <div className="w-6 text-center">
              {i === currentTrack && playing ? (
                <div className="flex items-end justify-center gap-0.5 h-4">
                  <div className="w-0.5 bg-foreground animate-pulse" style={{ height: "60%", animationDelay: "0ms" }} />
                  <div className="w-0.5 bg-foreground animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                  <div className="w-0.5 bg-foreground animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">{i + 1}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm truncate ${
                i === currentTrack ? "font-semibold text-foreground" : "font-medium"
              }`}>{track.title}</p>
              <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">{track.duration}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-black/[.06] px-4 py-3 dark:border-white/[.1]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying(!playing)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <div>
              <p className="text-xs font-semibold">{tracks[currentTrack].title}</p>
              <p className="text-[10px] text-muted-foreground">{tracks[currentTrack].artist}</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Cast className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function MiniPlayerDemo() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(62);

  if (!visible) {
    return (
      <div className="flex items-center justify-center h-32">
        <button
          onClick={() => setVisible(true)}
          className="rounded-xl border border-black/[.08] bg-card px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted transition-colors dark:border-white/[.145]"
        >
          Show Mini Player
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-lg overflow-hidden dark:border-white/[.145]">
        <div className="relative h-40 bg-zinc-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Play className="h-7 w-7 text-white ml-0.5" />
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="h-1 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Design Systems Conference</p>
            <p className="text-xs text-muted-foreground truncate">Day 1 \u00b7 Keynote</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
              <Play className="h-4 w-4 ml-0.5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Cast className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}