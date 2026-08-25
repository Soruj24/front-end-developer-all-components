"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Bookmark, HistorySnapshot, PlaygroundFile } from "../types";
import { AUTOSAVE_KEY, AUTOSAVE_DEBOUNCE_MS, DEFAULT_TAB_SIZE, ENTRY_FILE } from "../constants";
import { DEFAULT_PROJECT } from "../constants/defaultProject";
import { formatSource, isFormattable } from "../utils/format";
import { uid, debounce } from "../utils/misc";
import { useHistory } from "./useHistory";

const SNAPSHOT_KEY = "playground:snapshots";
const BOOKMARK_KEY = "playground:bookmarks";

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export interface UseFilesResult {
  files: PlaygroundFile[];
  openOrder: string[];
  activeName: string;
  active: PlaygroundFile;
  dirty: Set<string>;
  baseline: Map<string, string>;
  openFile: (name: string) => void;
  closeFile: (name: string) => void;
  setActive: (name: string) => void;
  updateSource: (name: string, source: string) => void;
  addFile: (name: string, source: string) => void;
  removeFile: (name: string) => void;
  loadProject: (next: PlaygroundFile[]) => void;
  formatActive: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  snapshots: HistorySnapshot[];
  takeSnapshot: (label?: string) => void;
  restoreSnapshot: (id: string) => void;
  bookmarks: Bookmark[];
  addBookmark: (line: number) => void;
  removeBookmark: (id: string) => void;
}

export function useFiles(): UseFilesResult {
  const [stored, setStored] = useState<PlaygroundFile[]>(DEFAULT_PROJECT);
  const history = useHistory<PlaygroundFile[]>(stored);
  const files = history.value;

  const [openOrder, setOpenOrder] = useState<string[]>(() => DEFAULT_PROJECT.map((f) => f.name).slice(0, 4));
  const [activeName, setActiveName] = useState<string>(() => DEFAULT_PROJECT[0]?.name ?? ENTRY_FILE);
  const [snapshots, setSnapshots] = useState<HistorySnapshot[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [baseline, setBaseline] = useState<Map<string, string>>(
    () => new Map(DEFAULT_PROJECT.map((f) => [f.name, f.source]))
  );

  useEffect(() => {
    const storedFiles = loadStored<PlaygroundFile[]>(AUTOSAVE_KEY, DEFAULT_PROJECT);
    if (storedFiles.length > 0) {
      history.reset(storedFiles);
      setBaseline(new Map(storedFiles.map((f) => [f.name, f.source])));
      setOpenOrder(storedFiles.map((f) => f.name).slice(0, 6));
      setActiveName(storedFiles.find((f) => f.name === ENTRY_FILE)?.name ?? storedFiles[0]?.name ?? ENTRY_FILE);
    }
    setSnapshots(loadStored(SNAPSHOT_KEY, []));
    setBookmarks(loadStored(BOOKMARK_KEY, []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = useMemo(
    () => files.find((f) => f.name === activeName) ?? files[0] ?? { name: ENTRY_FILE, source: "" },
    [files, activeName]
  );

  const dirty = useMemo(() => {
    const set = new Set<string>();
    for (const file of files) {
      if (baseline.get(file.name) !== file.source) set.add(file.name);
    }
    return set;
  }, [files, baseline]);

  const persist = useRef(
    debounce((value: PlaygroundFile[]) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(value));
    }, AUTOSAVE_DEBOUNCE_MS)
  );

  useEffect(() => {
    persist.current(files);
  }, [files]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots.slice(0, 40)));
  }, [snapshots]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks.slice(0, 60)));
  }, [bookmarks]);

  const openFile = useCallback((name: string) => {
    setOpenOrder((prev) => (prev.includes(name) ? prev : [...prev, name]));
    setActiveName(name);
  }, []);

  const closeFile = useCallback(
    (name: string) => {
      setOpenOrder((prev) => {
        const next = prev.filter((n) => n !== name);
        if (next.length === 0 && files[0]) next.push(files[0].name);
        return next;
      });
      setActiveName((current) => {
        if (current !== name) return current;
        return openOrder.filter((n) => n !== name).at(-1) ?? files[0]?.name ?? ENTRY_FILE;
      });
    },
    [openOrder, files]
  );

  const setActive = useCallback((name: string) => setActiveName(name), []);

  const updateSource = useCallback(
    (name: string, source: string) => {
      const current = files.find((f) => f.name === name);
      if (!current || current.source === source) return;
      history.set(files.map((f) => (f.name === name ? { ...f, source } : f)));
    },
    [files, history]
  );

  const addFile = useCallback(
    (name: string, source: string) => {
      if (files.some((f) => f.name === name)) return;
      history.set([...files, { name, source }]);
      setBaseline((prev) => new Map(prev).set(name, source));
      setOpenOrder((prev) => (prev.includes(name) ? prev : [...prev, name]));
      setActiveName(name);
    },
    [files, history]
  );

  const removeFile = useCallback(
    (name: string) => {
      if (files.length <= 1) return;
      history.set(files.filter((f) => f.name !== name));
      setBaseline((prev) => {
        const next = new Map(prev);
        next.delete(name);
        return next;
      });
      setOpenOrder((prev) => prev.filter((n) => n !== name));
      if (activeName === name) {
        const next = files.filter((f) => f.name !== name);
        setActiveName(next[0]?.name ?? ENTRY_FILE);
      }
    },
    [files, history, activeName]
  );

  const loadProject = useCallback(
    (next: PlaygroundFile[]) => {
      if (next.length === 0) return;
      history.reset(next);
      setBaseline(new Map(next.map((f) => [f.name, f.source])));
      setOpenOrder(next.map((f) => f.name).slice(0, 6));
      setActiveName(next.find((f) => f.name === ENTRY_FILE)?.name ?? next[0].name);
    },
    [history]
  );

  const formatActive = useCallback(() => {
    const name = activeName;
    const file = files.find((f) => f.name === name);
    if (!file || !isFormattable(file.name)) return;
    const formatted = formatSource(file.source, DEFAULT_TAB_SIZE);
    if (formatted === file.source) return;
    history.set(files.map((f) => (f.name === name ? { ...f, source: formatted } : f)));
  }, [activeName, files, history]);

  const takeSnapshot = useCallback(
    (label?: string) => {
      setSnapshots((prev) => [
        { id: uid("snap"), ts: Date.now(), label: label ?? `Snapshot ${prev.length + 1}`, files },
        ...prev,
      ]);
    },
    [files]
  );

  const restoreSnapshot = useCallback(
    (id: string) => {
      setSnapshots((prev) => {
        const snapshot = prev.find((s) => s.id === id);
        if (!snapshot) return prev;
        history.set(snapshot.files.map((f) => ({ ...f })));
        setBaseline(new Map(snapshot.files.map((f) => [f.name, f.source])));
        setActiveName(snapshot.files[0]?.name ?? ENTRY_FILE);
        setOpenOrder(snapshot.files.map((f) => f.name).slice(0, 6));
        return prev;
      });
    },
    [history]
  );

  const addBookmark = useCallback(
    (line: number) => {
      setBookmarks((prev) => [
        { id: uid("bm"), file: activeName, line, label: `${activeName}:${line}`, ts: Date.now() },
        ...prev,
      ]);
    },
    [activeName]
  );

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return {
    files,
    openOrder,
    activeName,
    active,
    dirty,
    baseline,
    openFile,
    closeFile,
    setActive,
    updateSource,
    addFile,
    removeFile,
    loadProject,
    formatActive,
    undo: history.undo,
    redo: history.redo,
    canUndo: history.canUndo,
    canRedo: history.canRedo,
    snapshots,
    takeSnapshot,
    restoreSnapshot,
    bookmarks,
    addBookmark,
    removeBookmark,
  };
}
