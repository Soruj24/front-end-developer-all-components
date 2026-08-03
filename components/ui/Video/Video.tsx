import { cn } from "@/lib/cn";
import type { VideoProps, VideoCaptionProps } from "./Video.types";

export function Video({ src, poster, controls = true, autoPlay = false, loop = false, muted = false, className }: VideoProps) {
  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={cn("w-full rounded-lg", className)}
    />
  );
}

export function VideoCaption({ src, label, className }: VideoCaptionProps) {
  return (
    <track src={src} kind="subtitles" label={label} className={cn("hidden", className)} />
  );
}
