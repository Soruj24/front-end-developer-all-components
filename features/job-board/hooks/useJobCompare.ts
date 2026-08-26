import { useState, useCallback } from "react";
import type { Job } from "../types";

const MAX_COMPARE = 4;

export function useJobCompare() {
  const [compareList, setCompareList] = useState<Job[]>([]);

  const addToCompare = useCallback((job: Job) => {
    setCompareList((prev) => {
      if (prev.find((j) => j.id === job.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, job];
    });
  }, []);

  const removeFromCompare = useCallback((jobId: number) => {
    setCompareList((prev) => prev.filter((j) => j.id !== jobId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const isInCompare = useCallback((jobId: number) => {
    return compareList.some((j) => j.id === jobId);
  }, [compareList]);

  return {
    compareList,
    compareCount: compareList.length,
    maxCompare: MAX_COMPARE,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
  };
}
