import { useState, useCallback } from "react";

export function useFavorites(initial: number[] = [1, 3, 6]) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set(initial));

  const toggle = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { favorites, toggle };
}
