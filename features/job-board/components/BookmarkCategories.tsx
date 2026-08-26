import { useState } from "react";
import { useBookmarkCategories } from "../hooks/useBookmarkCategories";
import { ALL_JOBS } from "../constants/job-data";

export function BookmarkCategories() {
  const { categories, addCategory, removeCategory } = useBookmarkCategories();
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#6366f1");

  const handleCreate = () => {
    if (!newName.trim()) return;
    addCategory(newName.trim(), newColor);
    setNewName("");
    setIsCreating(false);
  };

  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#06b6d4"];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Bookmark Collections</h3>
        <button onClick={() => setIsCreating(!isCreating)} className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">
          {isCreating ? "Cancel" : "+ New"}
        </button>
      </div>

      {isCreating && (
        <div className="mb-4 space-y-3 rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Collection name" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" />
          <div className="flex gap-2">
            {colors.map((c) => (
              <button key={c} onClick={() => setNewColor(c)} className={`h-6 w-6 rounded-full transition-transform ${newColor === c ? "scale-125 ring-2 ring-zinc-900 dark:ring-white" : ""}`} style={{ backgroundColor: c }} />
            ))}
          </div>
          <button onClick={handleCreate} disabled={!newName.trim()} className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900">Create</button>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((cat) => {
          const jobs = ALL_JOBS.filter((j) => cat.jobIds.includes(j.id));
          return (
            <div key={cat.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{cat.name}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">{cat.jobIds.length} jobs</p>
                </div>
              </div>
              <button onClick={() => removeCategory(cat.id)} className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800" aria-label={`Remove ${cat.name}`}>
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
