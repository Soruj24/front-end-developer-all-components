import type { PlaygroundFile, QualityScores } from "../types";

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Best-effort quality report computed entirely in the browser. */
export function assessQuality(
  files: PlaygroundFile[],
  preview: HTMLElement | null
): QualityScores {
  const issues: QualityScores["issues"] = [];
  const code = files.map((f) => f.source).join("\n");
  const css = files.filter((f) => f.name.endsWith(".css")).map((f) => f.source).join("\n");
  const tsSources = files.filter((f) => /\.tsx?$/.test(f.name)).map((f) => f.source);

  let a11y = 100;
  let perf = 100;
  let responsive = 100;
  let typeSafety = 100;
  let tailwind = 100;
  let complexity = 0;

  if (preview) {
    const imgs = preview.querySelectorAll("img");
    for (const img of imgs) {
      if (!img.hasAttribute("alt")) {
        a11y -= 8;
        issues.push({ severity: "error", label: `img missing alt attribute` });
      }
    }
    const buttons = preview.querySelectorAll("button");
    for (const button of buttons) {
      const name = button.getAttribute("aria-label") || button.textContent?.trim() || "";
      if (!name) {
        a11y -= 5;
        issues.push({ severity: "warning", label: `button has no accessible name` });
      }
    }
    const inputs = preview.querySelectorAll("input, select, textarea");
    for (const input of inputs) {
      const labelled =
        input.getAttribute("aria-label") ||
        input.getAttribute("id") ||
        input.getAttribute("placeholder");
      if (!labelled) {
        a11y -= 6;
        issues.push({ severity: "warning", label: `input has no label or aria-label` });
      }
    }
    const totalNodes = preview.querySelectorAll("*").length;
    const inlineStyles = preview.querySelectorAll("[style]").length;
    const animated = preview.querySelectorAll("[class*='animate-']").length;
    const width = preview.clientWidth;
    let overflow = 0;
    for (const el of preview.querySelectorAll("*")) {
      if (el.scrollWidth > el.clientWidth + 1) overflow += 1;
    }
    responsive = clamp(100 - overflow * 12);
    if (overflow > 0) {
      issues.push({ severity: "warning", label: `${overflow} element(s) overflow the preview frame` });
    }
    perf = clamp(100 - Math.max(0, totalNodes - 200) * 0.4 - inlineStyles * 4 - animated * 2);
    if (inlineStyles > 0) {
      issues.push({ severity: "info", label: `${inlineStyles} inline style attribute(s); prefer utility classes` });
    }
    if (totalNodes > 400) {
      issues.push({ severity: "warning", label: `DOM is large (${totalNodes} nodes)` });
    }
    if (width < 480) a11y -= 0;
  }

  const anyCount = (code.match(/\bany\b/g) ?? []).length;
  const typedFiles = tsSources.filter((s) => /:\s*[A-Z]|interface\s|type\s[A-Z]/.test(s)).length;
  typeSafety = clamp(100 - anyCount * 12 - (tsSources.length > 0 && typedFiles < tsSources.length ? 15 : 0));
  if (anyCount > 0) {
    issues.push({ severity: "warning", label: `${anyCount} use(s) of \`any\`; prefer explicit types` });
  }

  const inlineAttr = (code.match(/style=\{\{/g) ?? []).length;
  const important = (css.match(/!important/g) ?? []).length;
  const arbitrary = (code.match(/\[[a-z-]+:\s*[\w.-]+]/g) ?? []).length;
  tailwind = clamp(100 - inlineAttr * 15 - important * 8 - Math.min(10, arbitrary));
  if (inlineAttr > 0) {
    issues.push({ severity: "info", label: `${inlineAttr} inline style object(s) in JSX` });
  }
  if (important > 0) {
    issues.push({ severity: "warning", label: `${important} !important override(s) in CSS` });
  }

  const conditionals = (code.match(/\bif\b|\?|\bswitch\b|\bfor\b|\bmap\(|\.filter\(|\.reduce\(/g) ?? []).length;
  const maxDepth = Math.max(
    1,
    ...files.map((f) =>
      Math.max(1, ...f.source.split("\n").map((l) => (l.match(/^ */)?.[0].length ?? 0) / 4))
    )
  );
  complexity = clamp((conditionals * 6 + (maxDepth - 1) * 12 + tsSources.length * 5) / 3);
  if (complexity > 70) {
    issues.push({ severity: "info", label: `Code complexity is high; consider extracting helpers` });
  }

  return {
    accessibility: clamp(a11y),
    performance: clamp(perf),
    typeSafety: clamp(typeSafety),
    responsive: clamp(responsive),
    tailwind: clamp(tailwind),
    complexity,
    issues,
  };
}
