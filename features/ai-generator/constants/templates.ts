export interface PromptTemplate {
  id: string;
  label: string;
  description: string;
  prompt: string;
}

/** Curated starting points. `custom` is free-form and needs a user prompt. */
export const GENERATOR_TEMPLATES: PromptTemplate[] = [
  {
    id: "custom",
    label: "Custom",
    description: "Free-form — describe any component from scratch.",
    prompt: "",
  },
  {
    id: "button",
    label: "Button",
    description: "A versatile button with variants, sizes, icons and loading state.",
    prompt:
      "A button component with primary/secondary/outline/ghost variants, small/medium/large sizes, optional leading icon, disabled and loading states.",
  },
  {
    id: "card",
    label: "Card",
    description: "A media card with image, title, body and actions.",
    prompt:
      "A card component with an image/thumbnail area, title, description, metadata row, and a footer with actions. Optional hover lift and featured accent.",
  },
  {
    id: "form",
    label: "Form",
    description: "A labeled form with validation states and a submit action.",
    prompt:
      "A form component with labeled inputs, inline validation messages, required markers, a submit button with loading state, and success/error feedback.",
  },
  {
    id: "modal",
    label: "Modal",
    description: "A focus-trapped dialog with overlay, header and actions.",
    prompt:
      "A modal/dialog component with backdrop overlay, close button, title, body, footer actions, and Escape-to-close with focus management.",
  },
  {
    id: "dropdown",
    label: "Dropdown",
    description: "A keyboard-accessible menu triggered by a button.",
    prompt:
      "A dropdown menu component triggered by a button, with items, separators, keyboard navigation (arrows, Enter, Escape), and click-outside close.",
  },
  {
    id: "table",
    label: "Table",
    description: "A sortable data table with headers, rows and empty state.",
    prompt:
      "A data table component with sortable column headers, striped rows, numeric alignment, badge cells, and an empty state.",
  },
  {
    id: "toast",
    label: "Toast",
    description: "A stackable notification toast with variants.",
    prompt:
      "A toast notification component with success/error/info variants, title + message, close button, and a stacked container.",
  },
  {
    id: "landing-hero",
    label: "Landing Hero",
    description: "A marketing hero with heading, subtext, CTAs and visual.",
    prompt:
      "A landing page hero section with eyebrow label, headline, subheading, two CTAs, a visual placeholder, and a subtle gradient background.",
  },
  {
    id: "dashboard-widget",
    label: "Dashboard Widget",
    description: "A stats widget with value, delta and sparkline area.",
    prompt:
      "A dashboard stat widget showing a label, large value, trend delta with up/down color, and a small inline chart placeholder.",
  },
];

export function getTemplate(id: string): PromptTemplate {
  return GENERATOR_TEMPLATES.find((template) => template.id === id) ?? GENERATOR_TEMPLATES[0];
}
