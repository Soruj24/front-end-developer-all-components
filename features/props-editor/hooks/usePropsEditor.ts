"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { Breakpoint, FieldDef, PropValue, Values } from "../types";
import { DEFAULT_BREAKPOINTS, MAX_HISTORY } from "../constants";
import {
  buildInitialValues,
  clearOverrideAt,
  cloneValues,
  getFieldValue,
  isOverriddenAt,
  setFieldValue,
} from "../utils/value";

export interface UsePropsEditorOptions {
  schema: FieldDef[];
  defaultValues?: Values;
  breakpoints?: Breakpoint[];
}

export interface UsePropsEditorResult {
  schema: FieldDef[];
  values: Values;
  resolved: Values;
  activeBreakpoint: string;
  setActiveBreakpoint: (id: string) => void;
  getValue: (fieldId: string) => PropValue | undefined;
  isOverridden: (fieldId: string) => boolean;
  setLive: (fieldId: string, value: PropValue) => void;
  commit: (fieldId: string, value: PropValue) => void;
  begin: () => void;
  end: () => void;
  clearOverride: (fieldId: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: () => void;
  replace: (values: Values) => void;
}

/**
 * Visual props editor state: instant-preview values, responsive resolution,
 * and an undo/redo history. Continuous edits (typing, dragging) live-update
 * and collapse into one history step via begin()/end() sessions.
 */
export function usePropsEditor({
  schema,
  defaultValues,
  breakpoints = DEFAULT_BREAKPOINTS,
}: UsePropsEditorOptions): UsePropsEditorResult {
  const [values, setValues] = useState<Values>(() => buildInitialValues(schema, defaultValues));
  const [activeBreakpoint, setActiveBreakpoint] = useState<string>(breakpoints[0]?.id ?? "base");
  const [past, setPast] = useState<Values[]>([]);
  const [future, setFuture] = useState<Values[]>([]);

  const sessionRef = useRef(false);

  const fieldById = useMemo(() => {
    const map = new Map<string, FieldDef>();
    for (const field of schema) map.set(field.id, field);
    return map;
  }, [schema]);

  const resolved = useMemo(() => {
    const out: Values = {};
    for (const field of schema) {
      out[field.id] = getFieldValue(values, field, breakpoints, activeBreakpoint);
    }
    return out;
  }, [schema, values, breakpoints, activeBreakpoint]);

  const pushSnapshot = useCallback(() => {
    setPast((prev) => [...prev.slice(1 - MAX_HISTORY), cloneValues(values)]);
    setFuture([]);
  }, [values]);

  const begin = useCallback(() => {
    if (sessionRef.current) return;
    sessionRef.current = true;
    pushSnapshot();
  }, [pushSnapshot]);

  const end = useCallback(() => {
    sessionRef.current = false;
  }, []);

  const setLive = useCallback(
    (fieldId: string, value: PropValue) => {
      setValues((prev) => {
        const field = fieldById.get(fieldId);
        if (!field) return prev;
        return setFieldValue(prev, field, activeBreakpoint, value);
      });
    },
    [activeBreakpoint, fieldById]
  );

  const commit = useCallback(
    (fieldId: string, value: PropValue) => {
      begin();
      setLive(fieldId, value);
      end();
    },
    [begin, end, setLive]
  );

  const clearOverride = useCallback(
    (fieldId: string) => {
      const field = fieldById.get(fieldId);
      if (!field) return;
      begin();
      setValues((prev) => clearOverrideAt(prev, field, activeBreakpoint));
      end();
    },
    [activeBreakpoint, begin, end, fieldById]
  );

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast(past.slice(0, -1));
    setFuture([cloneValues(values), ...future].slice(0, MAX_HISTORY));
    setValues(previous);
  }, [future, past, values]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture(future.slice(1));
    setPast([...past.slice(1 - MAX_HISTORY), cloneValues(values)]);
    setValues(next);
  }, [future, past, values]);

  const reset = useCallback(() => {
    pushSnapshot();
    setValues(buildInitialValues(schema, defaultValues));
  }, [defaultValues, pushSnapshot, schema]);

  const replace = useCallback(
    (next: Values) => {
      pushSnapshot();
      setValues(cloneValues(next));
    },
    [pushSnapshot]
  );

  const getValue = useCallback(
    (fieldId: string) => {
      const field = fieldById.get(fieldId);
      if (!field) return undefined;
      return getFieldValue(values, field, breakpoints, activeBreakpoint);
    },
    [activeBreakpoint, breakpoints, fieldById, values]
  );

  const isOverridden = useCallback(
    (fieldId: string) => {
      const field = fieldById.get(fieldId);
      if (!field) return false;
      return isOverriddenAt(values, field, activeBreakpoint);
    },
    [activeBreakpoint, fieldById, values]
  );

  return {
    schema,
    values,
    resolved,
    activeBreakpoint,
    setActiveBreakpoint,
    getValue,
    isOverridden,
    setLive,
    commit,
    begin,
    end,
    clearOverride,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    reset,
    replace,
  };
}
