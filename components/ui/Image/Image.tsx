"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { ImageProps } from "./Image.types";

export function Image({
  src,
  alt,
  width,
  height,
  fill,
  className,
  onClick,
}: ImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          fill ? "absolute inset-0 h-full w-full" : "h-32 w-32",
          className,
        )}
      >
        <svg
          className="h-8 w-8 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z"
          />
        </svg>
      </div>
    );
  }

  if (fill) {
    return (
      <>
        {loading && (
          <div
            className={cn(
              "absolute inset-0 h-full w-full animate-pulse rounded-xl bg-muted",
              className,
            )}
          />
        )}
        <img
          src={src}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          onClick={onClick}
          className={cn(
            "absolute inset-0 h-full w-full object-cover rounded-xl",
            "transition-opacity duration-300",
            onClick && "cursor-pointer hover:opacity-90",
            loading && "opacity-0",
            className,
          )}
        />
      </>
    );
  }

  return (
    <>
      {loading && (
        <div
          className={cn(
            "animate-pulse rounded-xl bg-muted",
            width ? `w-[${width}px]` : "w-full",
            height ? `h-[${height}px]` : "h-32",
            className,
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
        onClick={onClick}
        className={cn(
          "max-w-full h-auto rounded-xl",
          "transition-opacity duration-300",
          onClick && "cursor-pointer hover:opacity-90",
          loading && "opacity-0 absolute",
          className,
        )}
      />
    </>
  );
}

export function ImagePreview({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={cn(
          "cursor-pointer rounded-xl",
          "transition-all duration-200",
          "hover:opacity-90 hover:shadow-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          className,
        )}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close preview"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
