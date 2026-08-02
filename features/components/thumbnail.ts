import type { RegistryComponent } from "@/features/registry";

/** Deterministic gradient pair per category, for card thumbnails. */
export function thumbnailGradient(category: string): string {
  const gradients: Record<string, string> = {
    buttons: "from-blue-500 to-indigo-600",
    inputs: "from-emerald-500 to-cyan-600",
    "data-display": "from-violet-500 to-purple-600",
    feedback: "from-amber-500 to-orange-600",
    overlays: "from-rose-500 to-pink-600",
    navigation: "from-teal-500 to-emerald-600",
    surfaces: "from-sky-500 to-blue-600",
  };
  return gradients[category] ?? "from-zinc-500 to-zinc-600";
}

/** First initials of the component name, e.g. "JSON Tree Viewer" -> "JT". */
export function componentInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Short human-friendly identifier for a component's stats block. */
export function componentIdentifier(component: RegistryComponent): string {
  return component.slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
