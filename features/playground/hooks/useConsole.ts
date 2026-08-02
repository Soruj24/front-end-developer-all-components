"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BuildEntry, ConsoleEntry, Problem } from "../types";

function isNoise(args: unknown[]): boolean {
  const first = args[0];
  if (typeof first !== "string") return false;
  return (
    first.startsWith("%c") ||
    first.startsWith("Warning:") ||
    first.startsWith("Download the React DevTools") ||
    first.startsWith("An error occurred in")
  );
}

export interface UseConsoleResult {
  entries: ConsoleEntry[];
  problems: Problem[];
  build: BuildEntry[];
  counts: { errors: number; warnings: number };
  clear: () => void;
  clearBuild: () => void;
  pushBuild: (kind: BuildEntry["kind"], message: string) => void;
  deriveProblems: (lines: string[]) => void;
}

/** Captures window.console into the Console tab and derives Problems from output. */
export function useConsole(): UseConsoleResult {
  const [entries, setEntries] = useState<ConsoleEntry[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [build, setBuild] = useState<BuildEntry[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const original = {
      log: console.log.bind(console),
      info: console.info.bind(console),
      debug: console.debug.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
    };
    const emit = (kind: ConsoleEntry["kind"], args: unknown[]) => {
      if (isNoise(args)) return;
      const entry: ConsoleEntry = { id: ++idRef.current, kind, args, ts: Date.now() };
      setEntries((prev) => [...prev.slice(-299), entry]);
    };
    console.log = (...args: unknown[]) => {
      original.log(...args);
      emit("log", args);
    };
    console.info = (...args: unknown[]) => {
      original.info(...args);
      emit("info", args);
    };
    console.debug = (...args: unknown[]) => {
      original.debug(...args);
      emit("debug", args);
    };
    console.warn = (...args: unknown[]) => {
      original.warn(...args);
      emit("warn", args);
    };
    console.error = (...args: unknown[]) => {
      original.error(...args);
      emit("error", args);
    };
    return () => {
      console.log = original.log;
      console.info = original.info;
      console.debug = original.debug;
      console.warn = original.warn;
      console.error = original.error;
    };
  }, []);

  const clear = useCallback(() => {
    setEntries([]);
    setProblems([]);
  }, []);

  const clearBuild = useCallback(() => setBuild([]), []);

  const pushBuild = useCallback((kind: BuildEntry["kind"], message: string) => {
    setBuild((prev) => [...prev, { id: ++idRef.current, kind, message, ts: Date.now() }]);
  }, []);

  const deriveProblems = useCallback((lines: string[]) => {
    const parsed: Problem[] = [];
    for (const line of lines) {
      const match = line.match(
        /^(.+\.(?:tsx?|jsx?|css|json)):\s*\(?(\d+)(?::(\d+))?(?:,(\d+))?\)?\s*[:-]\s*(.*)$/
      );
      if (!match) continue;
      const text = match[5];
      parsed.push({
        id: ++idRef.current,
        severity: /error/i.test(text) ? "error" : /warn/i.test(text) ? "warning" : "info",
        file: match[1].split("/").pop() ?? match[1],
        line: Number(match[2]),
        column: Number(match[3] ?? match[4] ?? 1),
        message: text,
        source: "compiler",
      });
    }
    if (parsed.length > 0) setProblems((prev) => [...parsed, ...prev].slice(0, 100));
  }, []);

  const counts = useMemo(
    () => ({
      errors: entries.filter((e) => e.kind === "error").length,
      warnings: entries.filter((e) => e.kind === "warn").length,
    }),
    [entries]
  );

  return { entries, problems, build, clear, clearBuild, pushBuild, deriveProblems, counts };
}
