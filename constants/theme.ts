/**
 * Blocking theme bootstrap script (FOUC guard).
 *
 * Injected into the streamed `<head>` by `ThemeInit` through
 * `useServerInsertedHTML`, so it runs while the HTML is being parsed — before
 * first paint — and is never created by React on the client. React 19 logs
 * "Encountered a script tag while rendering React component" for any
 * `<script>` rendered from JSX and never executes it.
 *
 * Reads the stored theme (`dark` | `light` | unset) and toggles the `dark`
 * class on `<html>` to match it, falling back to the OS preference.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;
