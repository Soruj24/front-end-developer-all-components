"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface History<T> {
  value: T;
  set: (next: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: (next: T) => void;
}

/** Generic undo/redo stack with a bounded past. `set` records the previous value. */
export function useHistory<T>(initial: T, limit = 120): History<T> {
  const [value, setValue] = useState<T>(initial);
  const [past, setPast] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]);
  const valueRef = useRef<T>(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const set = useCallback(
    (next: T) => {
      if (Object.is(next, valueRef.current)) return;
      setPast((p) => [...p.slice(-(limit - 1)), valueRef.current]);
      setFuture([]);
      valueRef.current = next;
      setValue(next);
    },
    [limit]
  );

  const undo = useCallback(() => {
    setPast((p) => {
      if (p.length === 0) return p;
      const previous = p[p.length - 1];
      setFuture((f) => [...f, valueRef.current]);
      valueRef.current = previous;
      setValue(previous);
      return p.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (f.length === 0) return f;
      const next = f[f.length - 1];
      setPast((p) => [...p, valueRef.current]);
      valueRef.current = next;
      setValue(next);
      return f.slice(0, -1);
    });
  }, []);

  const reset = useCallback((next: T) => {
    setPast([]);
    setFuture([]);
    valueRef.current = next;
    setValue(next);
  }, []);

  return { value, set, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0, reset };
}
