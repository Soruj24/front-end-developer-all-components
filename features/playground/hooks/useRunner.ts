"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PlaygroundFile } from "../types";
import { runProject, unmountPreview } from "../utils/sandbox";

interface Pending {
  files: PlaygroundFile[];
  entry: string;
  container: HTMLElement | null;
}

export interface BuildResult {
  ok: boolean;
  error: string | null;
}

export interface UseRunnerResult {
  running: boolean;
  error: string | null;
  lastRunAt: number | null;
  run: (files: PlaygroundFile[], entry: string, container: HTMLElement | null) => Promise<BuildResult>;
  rerun: () => void;
}

/**
 * Compiles the project with esbuild-wasm and mounts the default component.
 * `run` is exposed for manual triggers; the editor auto-runs on change.
 */
export function useRunner(): UseRunnerResult {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRunAt, setLastRunAt] = useState<number | null>(null);
  const pendingRef = useRef<Pending | null>(null);
  const seqRef = useRef(0);

  const run = useCallback(
    async (files: PlaygroundFile[], entry: string, container: HTMLElement | null): Promise<BuildResult> => {
      pendingRef.current = { files, entry, container };
      const seq = ++seqRef.current;
      setRunning(true);
      const result = await runProject(files, entry, container);
      const build: BuildResult = { ok: result.ok, error: result.error ?? null };
      if (seq !== seqRef.current) return build;
      setError(build.error);
      setLastRunAt(Date.now());
      setRunning(false);
      return build;
    },
    []
  );

  const rerun = useCallback(() => {
    const pending = pendingRef.current;
    if (pending) void run(pending.files, pending.entry, pending.container);
  }, [run]);

  useEffect(() => {
    return () => {
      seqRef.current += 1;
      unmountPreview();
    };
  }, []);

  return { running, error, lastRunAt, run, rerun };
}
