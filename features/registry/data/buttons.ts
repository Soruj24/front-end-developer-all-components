import { component } from "./factory";

export const buttons = [
  component({
    slug: "button",
    name: "Button",
    description: "Action triggers with five variants, four sizes, icons, and loading states.",
    category: "buttons",
    tags: ["action", "interaction", "form"],
    author: "Component Library Team",
    version: "2.1.0",
    createdAt: "2025-11-02T00:00:00.000Z",
    updatedAt: "2026-05-14T00:00:00.000Z",
    stats: {
      downloads: 482_190,
      likes: 6_214,
      bookmarks: 2_403,
      comments: 412,
      views: 1_284_000,
    },
    variants: ["primary", "secondary", "outline", "ghost", "destructive"],
    sizes: ["sm", "md", "lg", "icon"],
    features: [
      "variants",
      "sizes",
      "icons",
      "loading",
      "disabled",
      "rounded",
      "full-width",
      "dark-mode",
      "light-mode",
      "accessibility",
      "responsive",
    ],
    tailwindClasses: [
      "bg-primary",
      "text-primary-foreground",
      "border-border",
      "rounded-full",
      "disabled:opacity-50",
      "active:scale-[0.97]",
    ],
    longDescription:
      "Button renders native <button> elements with a composable API: variant, " +
      "size, leading and trailing icons, loading and disabled states, full-width " +
      "layout, and a focus-visible ring. Built on the platform design tokens so it " +
      "adapts to light and dark mode automatically.",
    props: [
      {
        name: "variant",
        type: "enum",
        default: "primary",
        description: "Visual style of the button.",
        values: ["primary", "secondary", "outline", "ghost", "destructive"],
      },
      {
        name: "size",
        type: "enum",
        default: "md",
        description: "Height and horizontal padding.",
        values: ["sm", "md", "lg", "icon"],
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Shows an inline spinner and disables interaction.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables the button and dims its appearance.",
      },
      {
        name: "onClick",
        type: "function",
        description: "Invoked when the button is activated.",
      },
    ],
    releases: [
      {
        version: "2.1.0",
        kind: "minor",
        date: "2026-05-14T00:00:00.000Z",
        notes: ["Added icon-only size preset.", "Improved focus-visible ring contrast."],
      },
      {
        version: "2.0.0",
        kind: "major",
        date: "2026-01-20T00:00:00.000Z",
        notes: ["Reworked variant tokens onto the design system palette."],
      },
      {
        version: "1.0.0",
        kind: "minor",
        date: "2025-11-02T00:00:00.000Z",
        notes: ["Initial public release."],
      },
    ],
    source: `import { Button } from "@/components/ui";

export default function ButtonDemo() {
  return (
    <Button variant="primary" size="md" onClick={() => alert("Clicked")}>
      Primary Action
    </Button>
  );
}`,
  }),
];
