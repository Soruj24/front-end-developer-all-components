import * as React from "react";
import type { TooltipPlacement } from "./Tooltip.types";

export const computeTooltipPosition = (
  triggerRect: DOMRect,
  contentWidth: number,
  contentHeight: number,
  placement: TooltipPlacement,
  arrowOffset: number,
  contentOffset: number,
): { x: number; y: number; placedAt: TooltipPlacement } => {
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const margin = 8;

  let placedAt: TooltipPlacement = placement;
  let x = 0;
  let y = 0;

  const compute = (p: TooltipPlacement) => {
    const halfW = contentWidth / 2;
    const halfH = contentHeight / 2;
    const spaceBelow = viewport.height - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const spaceRight = viewport.width - triggerRect.right;
    const spaceLeft = triggerRect.left;

    switch (p) {
      case "top":
      case "top-start":
      case "top-end":
        y = triggerRect.top - contentHeight - arrowOffset - contentOffset;
        const tLeft = p === "top-start" ? triggerRect.left : p === "top-end" ? triggerRect.right - contentWidth : triggerRect.left + (triggerRect.width - contentWidth) / 2;
        x = Math.max(margin, Math.min(viewport.width - contentWidth - margin, tLeft));
        return spaceAbove >= contentHeight + arrowOffset + contentOffset;
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        y = triggerRect.bottom + arrowOffset + contentOffset;
        const bLeft = p === "bottom-start" ? triggerRect.left : p === "bottom-end" ? triggerRect.right - contentWidth : triggerRect.left + (triggerRect.width - contentWidth) / 2;
        x = Math.max(margin, Math.min(viewport.width - contentWidth - margin, bLeft));
        return spaceBelow >= contentHeight + arrowOffset + contentOffset;
      case "left":
      case "left-start":
      case "left-end":
        x = triggerRect.left - contentWidth - arrowOffset - contentOffset;
        const lTop = p === "left-start" ? triggerRect.top : p === "left-end" ? triggerRect.bottom - contentHeight : triggerRect.top + (triggerRect.height - contentHeight) / 2;
        y = Math.max(margin, Math.min(viewport.height - contentHeight - margin, lTop));
        return spaceLeft >= contentWidth + arrowOffset + contentOffset;
      case "right":
      case "right-start":
      case "right-end":
        x = triggerRect.right + arrowOffset + contentOffset;
        const rTop = p === "right-start" ? triggerRect.top : p === "right-end" ? triggerRect.bottom - contentHeight : triggerRect.top + (triggerRect.height - contentHeight) / 2;
        y = Math.max(margin, Math.min(viewport.height - contentHeight - margin, rTop));
        return spaceRight >= contentWidth + arrowOffset + contentOffset;
      default:
        return false;
    }
  };

  const candidates = [placement];
  const opposites: Record<string, string[]> = {
    top: ["bottom"], bottom: ["top"], left: ["right"], right: ["left"],
  };
  const base = placement.replace(/-start|-end/, "");
  const opp = opposites[base];
  if (opp) opp.forEach((o) => candidates.push(`${o}${placement.includes("-start") ? "-end" : placement.includes("-end") ? "-start" : ""}` as TooltipPlacement));

  for (const c of candidates) {
    placedAt = c;
    if (compute(c)) return { x, y, placedAt: c };
  }

  return { x, y, placedAt: "top" };
};
