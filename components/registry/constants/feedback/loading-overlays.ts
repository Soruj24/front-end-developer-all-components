import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const loadingOverlays: RegistryEntry = entry({
    id: "loading-overlays",
    title: "Loading Overlays",
    description:
      "Full-screen overlay, inline section loading, and button loading states.",
    source: `import { useState } from "react";

export default function LoadingOverlays() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-4 font-medium">Full-Screen Overlay</h3>
          <button
            onClick={() => setShowOverlay(true)}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90"
          >
            Launch Overlay
          </button>
          <p className="mt-3 text-xs text-zinc-500">Click backdrop or ✕ to close</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-4 font-medium">Inline Section Loading</h3>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 py-8 dark:border-zinc-600 dark:bg-zinc-800/50">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-zinc-200 border-t-indigo-500" />
            <p className="text-sm font-medium text-zinc-500">Loading content...</p>
            <div className="flex gap-4">
              <div className="h-2 w-16 animate-pulse rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2 w-24 animate-pulse rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-4 font-medium">Button Loading State</h3>
          <button
            onClick={() => {
              setButtonLoading(true);
              setTimeout(() => setButtonLoading(false), 2500);
            }}
            disabled={buttonLoading}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-80"
          >
            {buttonLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
          {buttonLoading && (
            <p className="mt-3 text-xs text-indigo-500">Simulating save for 2.5s...</p>
          )}
        </div>
      </div>
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowOverlay(false)}
        >
          <div className="flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
            <div className="h-16 w-16 animate-spin rounded-full border-[5px] border-white/25 border-t-white" />
            <p className="text-lg font-medium text-white">Loading...</p>
            <div className="flex gap-1.5">
              {[0, 0.2, 0.4].map((delay, i) => (
                <div
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-white/70"
                  style={{ animationDelay: \`\${delay}s\` }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowOverlay(false)}
            className="absolute right-8 top-8 text-3xl text-white/60 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}`,
  });
