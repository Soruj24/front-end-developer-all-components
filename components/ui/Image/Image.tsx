"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ImageProps } from "./Image.types";

export function Image({ src, alt, width, height, fill, className, onClick }: ImageProps) {
  const [error, setError] = useState(false);

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onClick={onClick}
        className={cn("absolute inset-0 h-full w-full object-cover", onClick && "cursor-pointer", error && "hidden", className)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      onClick={onClick}
      className={cn("max-w-full h-auto", onClick && "cursor-pointer", error && "hidden", className)}
    />
  );
}

export function ImagePreview({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img src={src} alt={alt} onClick={() => setOpen(true)} className={cn("cursor-pointer hover:opacity-80", className)} />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] object-contain" />
        </div>
      )}
    </>
  );
}
