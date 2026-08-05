import { SectionCard } from "./SectionCard";

export function ImportExport() {
  return (
    <SectionCard title="Import / Export UI" description="Data management tools">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border-2 border-dashed border-zinc-200 p-6 text-center transition-colors hover:border-blue-400 dark:border-zinc-800 dark:hover:border-blue-500">
          <p className="text-2xl">📁</p>
          <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">Drop CSV files here</p>
          <p className="mt-1 text-xs text-zinc-500">or click to browse</p>
          <button className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">Upload File</button>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800">Export Contacts</button>
          <button className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800">Export Deals</button>
          <button className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800">Export All</button>
        </div>
      </div>
    </SectionCard>
  );
}
