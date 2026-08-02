import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerProgressStatus: RegistryEntry = entry({
    id: "header-progress-status",
    title: "Progress & Status",
    description: "Course progress indicators and live status headers.",
    source: `export default function HeaderProgressStatus() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex w-full flex-col">
          <div className="flex h-10 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Course</span>
            <span className="text-xs text-zinc-400">Lesson 3 of 12</span>
          </div>
          <div className="h-1 bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-[25%] rounded-r-full bg-blue-500" />
          </div>
        </header>
        <div className={content}>Lesson Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success-soft0" />
            <span className="text-sm font-bold">Online</span>
          </div>
          <span className="text-xs text-zinc-400">Connected</span>
        </header>
        <div className={content}>Status Page</div>
      </div>
    </div>
  );
}`,
  });
