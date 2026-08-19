export const AUDIOPLAYER_SOURCE = `"use client";

import { useState } from "react";

interface Track {
  title: string;
  artist: string;
  duration: string;
}

interface AudioPlayerProps {
  tracks: Track[];
}

export function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(75);
  const track = tracks[current];

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{track.title}</p>
          <p className="text-xs text-muted-foreground">{track.artist}</p>
        </div>
        <span className="text-xs text-muted-foreground">{track.duration}</span>
      </div>
      <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full accent-primary" />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrent((c) => (c - 1 + tracks.length) % tracks.length)} className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">⏮</button>
          <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">{playing ? "⏸" : "▶"}</button>
          <button onClick={() => setCurrent((c) => (c + 1) % tracks.length)} className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">⏭</button>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-20 accent-primary" />
        </div>
      </div>
    </div>
  );
}`;

export const PLAYLIST_EXAMPLE = `<AudioPlayer
  tracks={[
    { title: "Ambient Waves", artist: "Nature Sounds", duration: "3:42" },
    { title: "Lo-fi Beats", artist: "Chill Hop", duration: "4:15" },
    { title: "Jazz Piano", artist: "Classic Trio", duration: "5:01" },
  ]}
/>`;

export const INTERACTIVE_EXAMPLE = `<AudioPlayer tracks={tracks} />`;