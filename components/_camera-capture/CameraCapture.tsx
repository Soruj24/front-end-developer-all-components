"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { CameraCaptureProps } from "./CameraCapture.types";

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 w-10", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-8 w-8", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function CameraCapture({ onCapture, className }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [captured, setCaptured] = useState(false);
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const media = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(media);
      if (videoRef.current) videoRef.current.srcObject = media;
    } catch {
      setError("Camera access denied or unavailable");
    }
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) onCapture?.(blob);
      setCaptured(true);
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, "image/png");
  }, [onCapture]);

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setCaptured(false);
  }, [stream]);

  const retake = useCallback(() => {
    setCaptured(false);
  }, []);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return (
    <div className={cn("w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
      {/* Viewfinder */}
      <div
        className={cn(
          "relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 transition-opacity duration-200",
          flash && "opacity-50",
        )}
      >
        {stream ? (
          <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
        ) : captured ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckIcon className="text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-white/80">Photo captured</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <CameraIcon className="text-red-400/60" />
            <span className="text-xs text-red-400/80">{error}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <CameraIcon className="text-white/20" />
            <span className="text-sm text-white/40">Camera preview</span>
          </div>
        )}
        {/* Corner brackets */}
        {stream && (
          <>
            <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-white/30" />
            <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-white/30" />
            <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-white/30" />
            <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-white/30" />
          </>
        )}
        {/* Status indicator */}
        {stream && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-medium text-white/80">LIVE</span>
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 border-t border-border px-4 py-4">
        {!stream ? (
          <button
            type="button"
            onClick={startCamera}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
          >
            <CameraIcon className="h-4 w-4" />
            Start Camera
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={captured ? retake : stopCamera}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
            >
              {captured ? "Retake" : "Stop"}
            </button>
            <button
              type="button"
              onClick={capture}
              disabled={captured}
              aria-label="Capture photo"
              className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                captured
                  ? "cursor-not-allowed border-2 border-muted bg-muted/50 text-muted-foreground"
                  : "border-4 border-primary/30 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95",
              )}
            >
              <span className="h-4 w-4 rounded-full bg-current" />
            </button>
            <button
              type="button"
              onClick={startCamera}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
            >
              Flip
            </button>
          </>
        )}
      </div>
    </div>
  );
}
