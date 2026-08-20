"use client";

import { useState, useCallback } from "react";
import { CameraCapture } from "../CameraCapture";

export default function GalleryExample() {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleCapture = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPhotos((prev) => [url, ...prev]);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-4">
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
