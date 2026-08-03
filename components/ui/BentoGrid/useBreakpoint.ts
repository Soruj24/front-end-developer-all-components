import type { Breakpoint } from "./BentoGrid.types";
import { isBreakpoint } from "./BentoGrid.utils";
import { useSyncExternalStore } from "react";

export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function getSnapshot(): Breakpoint {
  if (typeof window === "undefined") return "lg";
  return isBreakpoint(window.innerWidth);
}

function getServerSnapshot(): Breakpoint {
  return "lg";
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
