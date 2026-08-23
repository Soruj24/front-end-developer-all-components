"use client";

import { Video } from "@/components/ui/Video";

export function BasicVideo() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <video src="/video.mp4" controls className="w-full aspect-video object-cover" />
    </div>
  );
}
