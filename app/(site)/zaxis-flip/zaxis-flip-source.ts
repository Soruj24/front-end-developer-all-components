export const ZAXIS_FLIP_SOURCE = `"use client";

export function BasicFlip() {
  return (
    <div className="flex justify-center">
      <div className="group h-32 w-48 cursor-pointer [perspective:500px]">
        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 [backface-visibility:hidden] dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Front</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-zinc-700 dark:bg-zinc-100">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Back</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;
