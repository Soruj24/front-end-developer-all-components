import { useState, useCallback } from "react";
import type { BookmarkCategory } from "../types";

const DEFAULT_CATEGORIES: BookmarkCategory[] = [
  { id: "cat-1", name: "Dream Jobs", color: "#8b5cf6", jobIds: [1] },
  { id: "cat-2", name: "Good Pay", color: "#10b981", jobIds: [4, 7] },
  { id: "cat-3", name: "Remote Only", color: "#3b82f6", jobIds: [] },
];

export function useBookmarkCategories() {
  const [categories, setCategories] = useState<BookmarkCategory[]>(DEFAULT_CATEGORIES);

  const addCategory = useCallback((name: string, color: string) => {
    setCategories((prev) => [
      ...prev,
      { id: `cat-${Date.now()}`, name, color, jobIds: [] },
    ]);
  }, []);

  const removeCategory = useCallback((categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  }, []);

  const addJobToCategory = useCallback((categoryId: string, jobId: number) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId && !c.jobIds.includes(jobId)
          ? { ...c, jobIds: [...c.jobIds, jobId] }
          : c
      )
    );
  }, []);

  const removeJobFromCategory = useCallback((categoryId: string, jobId: number) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, jobIds: c.jobIds.filter((id) => id !== jobId) }
          : c
      )
    );
  }, []);

  return {
    categories,
    addCategory,
    removeCategory,
    addJobToCategory,
    removeJobFromCategory,
  };
}
