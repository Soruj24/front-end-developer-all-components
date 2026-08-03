"use client";

import { useMemo } from "react";
import type { GeneratedComponent } from "../types";

const REACT_UMD = "https://unpkg.com/react@18.3.1/umd/react.production.min.js";
const REACTDOM_UMD = "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js";
const BABEL = "https://unpkg.com/@babel/standalone@7/babel.min.js";
const TAILWIND = "https://cdn.tailwindcss.com";

/** Self-contained preview document rendered in a sandboxed iframe. */
function buildSrcdoc(source: string, darkMode: boolean): string {
  const background = darkMode ? "#0a0a0f" : "#f8fafc";
  const color = darkMode ? "#e5e7eb" : "#0f172a";
  return `<!doctype html>
<html class="${darkMode ? "dark" : ""}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="${REACT_UMD}"></script>
    <script src="${REACTDOM_UMD}"></script>
    <script src="${BABEL}"></script>
    <script src="${TAILWIND}"></script>
    <script>
      window.tailwind = window.tailwind || {};
      window.tailwind.config = { darkMode: "class" };
      var module = { exports: {} };
      var exports = module.exports;
      var __deps = {
        react: window.React,
        "react-dom": window.ReactDOM,
        "react/jsx-runtime": {
          jsx: function (type, props) { return window.React.createElement(type, props); },
          jsxDEV: function (type, props) { return window.React.createElement(type, props); },
        },
      };
      function require(name) {
        if (name in __deps) return __deps[name];
        if (window[name]) return window[name];
        throw new Error("Unknown dependency: " + name);
      }
    </script>
    <style>
      body { margin: 0; padding: 24px; background: ${background}; color: ${color};
        font-family: ui-sans-serif, system-ui, sans-serif; min-height: 100vh; box-sizing: border-box; }
      #root { display: flex; align-items: flex-start; justify-content: center; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" data-presets="env,react">
${source}
;
var __Exports = module.exports;
var __Comp = __Exports.default || __Exports[Object.keys(__Exports)[Object.keys(__Exports).length - 1]];
window.__genComponent = __Comp;
    </script>
    <script type="text/babel" data-presets="react">
      (function () {
        try {
          ReactDOM.createRoot(document.getElementById("root")).render(
            React.createElement(window.__genComponent)
          );
        } catch (error) {
          document.getElementById("root").textContent = "Preview error: " + error.message;
        }
      })();
    </script>
  </body>
</html>`;
}

/** Live iframe preview of a generated component. */
export function GeneratorPreview({
  component,
  darkMode = true,
}: {
  component: GeneratedComponent;
  darkMode?: boolean;
}) {
  const srcdoc = useMemo(
    () => buildSrcdoc(component.source, darkMode),
    [component.source, darkMode]
  );

  return (
    <div className="flex min-h-0 w-full flex-col overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
          {component.name} — live preview
        </span>
      </div>
      <iframe
        title={`${component.name} preview`}
        sandbox="allow-scripts"
        srcDoc={srcdoc}
        className="min-h-[360px] w-full flex-1 bg-background"
      />
    </div>
  );
}
