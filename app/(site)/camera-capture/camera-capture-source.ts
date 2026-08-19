export const CAMERA_CAPTURE_SOURCE = `"use client";

import { useRef, useState } from "react";

interface CameraCaptureProps {
  onCapture?: (blob: Blob) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [captured, setCaptured] = useState(false);
  const [flash, setFlash] = useState(false);

  const startCamera = async () => {
    const media = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(media);
    if (videoRef.current) videoRef.current.srcObject = media;
  };

  const capture = () => {
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
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setCaptured(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className={"relative flex h-64 items-center justify-center bg-slate-900 " + (flash ? "opacity-50" : "")}>
        {stream ? (
          <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm text-muted-foreground">Camera preview</span>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 p-4">
        <button onClick={startCamera} className="rounded-lg border border-border px-4 py-2 text-sm font-medium">
          {captured ? "Retake" : "Start"}
        </button>
        <button onClick={capture} aria-label="Capture" className="h-12 w-12 rounded-full bg-primary text-primary-foreground">
          ●
        </button>
        <button onClick={stopCamera} className="rounded-lg border border-border px-4 py-2 text-sm font-medium">
          Stop
        </button>
      </div>
    </div>
  );
}`;

export const CAMERA_EXAMPLE = `<CameraCapture
  onCapture={(blob) => console.log(blob)}
/>`;

export const PREVIEW_EXAMPLE = `const [captured, setCaptured] = useState(false);

<div>
  {captured ? <CheckIcon /> : <span>No photo yet</span>}
  <Button onClick={() => setCaptured(false)}>Retake</Button>
  <Button disabled={!captured}>Download</Button>
</div>`;

export const INTERACTIVE_EXAMPLE = `const [flash, setFlash] = useState(false);

const handleCapture = () => {
  setFlash(true);
  setTimeout(() => setFlash(false), 200);
};`;