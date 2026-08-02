"use client";

import { ImageIcon } from "./icons";

const generatedImages = [
  { label: "Serene mountain landscape", gradient: "from-blue-400 via-purple-500 to-pink-500" },
  { label: "Futuristic city skyline", gradient: "from-indigo-900 via-purple-800 to-blue-900" },
  { label: "Abstract neural network", gradient: "from-emerald-400 via-cyan-500 to-blue-600" },
];

export function ImagesPanel({ analyzingImage, imagePreview }: { analyzingImage: boolean; imagePreview: string | null }) {
  return (
    <div className="hidden w-64 flex-shrink-0 border-l border-border p-4 dark:border-border xl:block">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Generated Images</h3>
      <div className="space-y-3">
        {generatedImages.map((img, i) => (
          <div key={i} className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${img.gradient} p-4 shadow-sm`}>
            <div className="flex h-24 items-center justify-center">
              <ImageIcon className="h-8 w-8 text-white/40" strokeWidth={1.5} />
            </div>
            <p className="mt-2 text-center text-xs font-medium text-white/80">{img.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4 dark:border-border">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Image Analysis</h3>
        {analyzingImage ? (
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3 dark:bg-muted">
            <span className="h-2 w-2 animate-[typing-dot_1.4s_ease-in-out_infinite] rounded-full bg-blue-400" />
            <span className="text-xs text-muted-foreground">Analyzing image...</span>
          </div>
        ) : imagePreview ? (
          <div className="relative overflow-hidden rounded-xl">
            <img src={imagePreview} alt="Uploaded preview" className="h-24 w-full object-cover" />
          </div>
        ) : (
          <p className="text-xs text-muted-foreground/70">Upload an image for AI analysis</p>
        )}
      </div>
    </div>
  );
}
