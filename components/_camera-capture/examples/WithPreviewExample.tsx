"use client";

import { useState } from "react";
import { CameraCapture } from "../CameraCapture";

export default function WithPreviewExample() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-4">
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
