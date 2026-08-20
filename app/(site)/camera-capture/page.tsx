"use client";

import { useState, useCallback } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { CameraCapture } from "@/components/_camera-capture";

const CAMERA_CAPTURE_SOURCE = `"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";

interface CameraCaptureProps {
  onCapture?: (blob: Blob) => void;
  className?: string;
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

  return (
    <div className={cn("w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
      <div className={cn("relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 transition-opacity duration-200", flash && "opacity-50")}>
        {stream ? (
          <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
        ) : captured ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20"><CheckIcon className="text-emerald-400" /></div>
            <span className="text-sm font-medium text-white/80">Photo captured</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <CameraIcon className="text-white/20" />
            <span className="text-sm text-white/40">Camera preview</span>
          </div>
        )}
        {stream && (
          <>
            <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-white/30" />
            <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-white/30" />
            <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-white/30" />
            <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-white/30" />
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-medium text-white/80">LIVE</span>
            </span>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 border-t border-border px-4 py-4">
        {!stream ? (
          <button onClick={startCamera} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 active:scale-[0.97]">
            Start Camera
          </button>
        ) : (
          <>
            <button onClick={captured ? retake : stopCamera} className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted active:scale-[0.97]">
              {captured ? "Retake" : "Stop"}
            </button>
            <button onClick={capture} disabled={captured} aria-label="Capture photo"
              className={cn("flex h-14 w-14 items-center justify-center rounded-full", captured ? "border-2 border-muted bg-muted/50" : "border-4 border-primary/30 bg-primary shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95")}>
              <span className="h-4 w-4 rounded-full bg-current" />
            </button>
            <button onClick={startCamera} className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted active:scale-[0.97]">
              Flip
            </button>
          </>
        )}
      </div>
    </div>
  );
}`;

const GALLERY_EXAMPLE = `const [photos, setPhotos] = useState<string[]>([]);

<CameraCapture onCapture={(blob) => {
  setPhotos((prev) => [URL.createObjectURL(blob), ...prev]);
}} />`;

const PREVIEW_EXAMPLE = `const [photoUrl, setPhotoUrl] = useState<string | null>(null);

<CameraCapture onCapture={(blob) => setPhotoUrl(URL.createObjectURL(blob))} />
{photoUrl && <img src={photoUrl} alt="Captured" />}`;

export default function CameraCapturePage() {
  return (
    <ComponentDocPage
      name="Camera Capture"
      category="Forms"
      description="Webcam photo capture with preview, retake functionality, aspect ratio selection, and download support."
    >
      <PreviewPanel filename="camera-capture.tsx">
        <div className="flex w-full justify-center py-4">
          <CameraCapture onCapture={(blob) => console.log("captured:", blob)} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CAMERA_CAPTURE_SOURCE}
        filename="components/_camera-capture/CameraCapture.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="With Preview"
          description="Shows the last captured photo below the camera viewfinder."
          code={PREVIEW_EXAMPLE}
        >
          <div className="flex w-full justify-center py-4">
            <CameraCaptureWithPreview />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Gallery"
          description="Accumulates captured photos in a responsive grid."
          code={GALLERY_EXAMPLE}
        >
          <div className="flex w-full justify-center py-4">
            <CameraCaptureGallery />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}

function CameraCaptureWithPreview() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <CameraCapture onCapture={(blob) => setPhotoUrl(URL.createObjectURL(blob))} />
      {photoUrl && (
        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Last Capture</p>
          </div>
          <img src={photoUrl} alt="Captured photo" className="w-full object-cover" />
        </div>
      )}
    </div>
  );
}

function CameraCaptureGallery() {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleCapture = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPhotos((prev) => [url, ...prev]);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <CameraCapture onCapture={handleCapture} />
      {photos.length > 0 && (
        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Gallery</p>
            <p className="text-xs text-muted-foreground">{photos.length} photo{photos.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="grid grid-cols-3 gap-1 p-1">
            {photos.map((url, i) => (
              <img key={i} src={url} alt={`Photo ${i + 1}`} className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
