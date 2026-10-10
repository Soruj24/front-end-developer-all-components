import { component } from "./factory";
import { buttonSource } from "./sources/button";

export const buttons = [
  component({
    slug: "button",
    name: "Button",
    description: "Action triggers with eight variants, eight sizes, icons, and loading states.",
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
    dependencies: ["react"],
    files: ["components/ui/Button.tsx"],
    variants: [
      "primary",
      "secondary",
      "outline",
      "ghost",
      "destructive",
      "destructive-outline",
      "link",
      "soft",
    ],
    sizes: ["xs", "sm", "md", "lg", "xl", "icon", "icon-sm", "icon-lg"],
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
        type: '"primary" | "secondary" | "outline" | "ghost" | "destructive" | "destructive-outline" | "link" | "soft"',
        default: '"primary"',
        description: "Visual style of the button.",
        values: [
          "primary",
          "secondary",
          "outline",
          "ghost",
          "destructive",
          "destructive-outline",
          "link",
          "soft",
        ],
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg"',
        default: '"md"',
        description: "Height and horizontal padding.",
        values: ["xs", "sm", "md", "lg", "xl", "icon", "icon-sm", "icon-lg"],
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
        description: "Standard HTML button disabled attribute; also implied while loading.",
      },
      {
        name: "onClick",
        type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
        description: "Standard HTML button click handler, invoked when the button is activated.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Content rendered inside the button.",
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
    source: buttonSource,
  }),
];
