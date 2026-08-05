import { useState, useCallback } from "react";

export function useBookmarks(initial: number[] = [1, 4]) {
  const [bookmarked, setBookmarked] = useState<number[]>(initial);

  const toggle = useCallback((id: number) => {
    setBookmarked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  return { bookmarked, toggle };
}
