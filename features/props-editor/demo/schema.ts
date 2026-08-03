import type { FieldDef, Values } from "../types";

/** Demo schema covering all 15 field types for the Profile Card target. */
export const profileCardSchema: FieldDef[] = [
  {
    id: "icon",
    type: "icon",
    label: "Icon",
    description: "Shown when no avatar image is set.",
    responsive: false,
  },
  {
    id: "title",
    type: "text",
    label: "Title",
    placeholder: "Card title",
    responsive: false,
  },
  {
    id: "subtitle",
    type: "text",
    label: "Subtitle",
    placeholder: "Role or tagline",
    responsive: false,
  },
  {
    id: "description",
    type: "text",
    label: "Description",
    placeholder: "Short bio…",
    responsive: false,
  },
  {
    id: "image",
    type: "image",
    label: "Avatar image",
    description: "Upload a photo or paste a URL.",
    responsive: false,
  },
  {
    id: "accentColor",
    type: "color",
    label: "Accent color",
    responsive: false,
  },
  {
    id: "theme",
    type: "radio",
    label: "Theme",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "midnight", label: "Midnight" },
    ],
    responsive: false,
  },
  {
    id: "size",
    type: "select",
    label: "Size",
    options: [
      { value: "sm", label: "Small" },
      { value: "md", label: "Medium" },
      { value: "lg", label: "Large" },
    ],
    responsive: true,
  },
  {
    id: "rounded",
    type: "slider",
    label: "Corner radius",
    min: 0,
    max: 32,
    step: 1,
    unit: "px",
    responsive: true,
  },
  {
    id: "shadow",
    type: "shadow",
    label: "Shadow",
    responsive: true,
  },
  {
    id: "showBadge",
    type: "boolean",
    label: "Show badge",
    responsive: true,
  },
  {
    id: "padding",
    type: "padding",
    label: "Padding",
    responsive: true,
  },
  {
    id: "margin",
    type: "margin",
    label: "Margin",
    responsive: true,
  },
  {
    id: "width",
    type: "width",
    label: "Width",
    responsive: true,
  },
  {
    id: "height",
    type: "height",
    label: "Height",
    responsive: true,
  },
];

export const profileCardDefaults: Values = {
  icon: "user",
  title: "Alex Morgan",
  subtitle: "Frontend Engineer",
  description:
    "Building delightful interfaces with React, TypeScript, and Tailwind — one component at a time.",
  image: "",
  accentColor: "#6366f1",
  theme: "light",
  size: "md",
  rounded: 16,
  shadow: "md",
  showBadge: true,
  padding: { top: 24, right: 24, bottom: 24, left: 24, linked: true },
  margin: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
  width: { auto: true, value: 320, unit: "px" },
  height: { auto: true, value: 420, unit: "px" },
};
