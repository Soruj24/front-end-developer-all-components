"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Settings } from "lucide-react";

export function VideoPlayerDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => setPlaying(false);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.volume = val;
    setVolume(val);
    setMuted(val === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = (val / 100) * duration;
    setProgress(val);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!fullscreen) {
      videoRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setFullscreen(!fullscreen);
  };

  const skipBack = () => {
    if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  };

  const skipForward = () => {
    if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-black shadow-lg dark:border-zinc-700">
      <div
        className="relative group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(!playing)}
      >
        <video ref={videoRef} src="/video.mp4" className="w-full aspect-video object-cover" onClick={togglePlay} />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
            <button onClick={togglePlay} className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-white active:scale-95">
              <Play className="h-7 w-7 ml-1" fill="currentColor" />
            </button>
          </div>
        )}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className="flex items-center gap-2">
            <input type="range" min="0" max="100" value={progress} onChange={handleSeek} className="flex-1 h-1 appearance-none rounded-full bg-zinc-600 accent-white cursor-pointer" />
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button onClick={togglePlay} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" fill="currentColor" />}
              </button>
              <button onClick={skipBack} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label="Skip back 10 seconds">
                <SkipBack className="h-4 w-4" />
              </button>
              <button onClick={skipForward} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label="Skip forward 10 seconds">
                <SkipForward className="h-4 w-4" />
              </button>
              <span className="ml-1 text-[11px] font-medium text-white/70 tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={toggleMute} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label={muted ? "Unmute" : "Mute"}>
                {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input type="range" min="0" max="1" step="0.1" value={muted ? 0 : volume} onChange={handleVolumeChange} className="w-16 h-1 appearance-none rounded-full bg-zinc-600 accent-white cursor-pointer" />
              <button className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </button>
              <button onClick={toggleFullscreen} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}>
                {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
