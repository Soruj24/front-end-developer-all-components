import { useState, useCallback } from "react";
import type { JobNote } from "../types";

export function useJobNotes() {
  const [notes, setNotes] = useState<JobNote[]>([]);

  const addNote = useCallback((jobId: number, note: string) => {
    setNotes((prev) => {
      const existing = prev.find((n) => n.jobId === jobId);
      if (existing) {
        return prev.map((n) =>
          n.jobId === jobId
            ? { ...n, note, updatedAt: new Date().toISOString() }
            : n
        );
      }
      return [...prev, { jobId, note, updatedAt: new Date().toISOString() }];
    });
  }, []);

  const removeNote = useCallback((jobId: number) => {
    setNotes((prev) => prev.filter((n) => n.jobId !== jobId));
  }, []);

  const getNote = useCallback(
    (jobId: number) => {
      return notes.find((n) => n.jobId === jobId);
    },
    [notes]
  );

  return {
    notes,
    addNote,
    removeNote,
    getNote,
  };
}
