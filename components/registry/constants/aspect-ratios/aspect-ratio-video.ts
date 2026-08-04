import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const aspectRatioVideo: RegistryEntry = entry({
  id: "aspect-ratio-video",
  title: "Video",
  description: "Video player placeholder with 16:9 ratio.",
  source: `import { AspectRatio } from "@/components/_aspect-ratio";

export default function AspectRatioVideo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <AspectRatio ratio="16:9">
        <div className="flex h-full items-center justify-center rounded-md bg-zinc-900 text-white">
          <svg className="h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        </div>
      </AspectRatio>
    </div>
  );
}`,
});
