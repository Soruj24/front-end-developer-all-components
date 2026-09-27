"use client";

import { useSyncExternalStore } from "react";

/**
 * Blocking theme script that runs before first paint to prevent FOUC.
 *
 * React 19.3+ (dev only) warns when a <script> is client-mounted instead of
 * adopted during hydration ("Encountered a script tag while rendering React
 * component"). We render the script only during SSR and the hydration pass
 * (server snapshot = true) and drop it on any client-only render (snapshot =
 * false). The script already executed from the SSR HTML by then, so behavior
 * is unchanged. See https://github.com/shadcn-ui/ui/issues/10104
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;

const subscribe = () => () => {};
const getClientSnapshot = () => false;
const getServerSnapshot = () => true;

export function ThemeScript() {
  const isServerRender = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!isServerRender) return null;

  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
