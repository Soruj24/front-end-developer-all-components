const ANCHOR_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

export function attachHeadingLink(heading: HTMLHeadingElement, id: string) {
  if (heading.querySelector(".docs-anchor")) return;
  const anchor = document.createElement("a");
  anchor.className = "docs-anchor";
  anchor.href = `#${id}`;
  anchor.setAttribute("aria-label", `Link to ${heading.textContent?.trim() ?? id}`);
  anchor.title = "Copy link to section";
  anchor.innerHTML = ANCHOR_SVG;
  anchor.addEventListener("click", () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
  });
  heading.appendChild(anchor);
}