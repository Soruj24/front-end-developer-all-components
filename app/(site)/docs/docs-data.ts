export const TABS = [
  { id: "installation", label: "Installation" },
  { id: "project-structure", label: "Project Structure" },
  { id: "usage", label: "Usage" },
  { id: "customization", label: "Customization" },
  { id: "faq", label: "FAQ" },
] as const;

export type DocsTabId = (typeof TABS)[number]["id"];

export const INSTALL_STEPS = [
  {
    step: 1,
    title: "Create a new Next.js project",
    code: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir",
    filename: "Terminal",
  },
  {
    step: 2,
    title: "Install required dependencies",
    code: "npm install clsx tailwind-merge",
    filename: "Terminal",
  },
  {
    step: 3,
    title: "Create the utility function",
    code: `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
    filename: "lib/cn.ts",
  },
];

export const PROJECT_STRUCTURE = `my-app/
├── app/
│   ├── (site)/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Site layout
│   │   └── components/       # Your pages
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── home/                 # Home page components
│   └── layout/               # Layout components
├── lib/
│   └── cn.ts                 # Utility function
├── public/                   # Static assets
├── styles/
│   └── globals.css           # Design tokens
└── package.json`;

export const STRUCTURE_CARDS = [
  {
    title: "components/ui/",
    body: "Reusable UI primitives like Button, Input, Card. Copy these directly into your project.",
  },
  {
    title: "lib/cn.ts",
    body: "Utility function for merging Tailwind CSS classes. Required by most components.",
  },
  {
    title: "styles/globals.css",
    body: "Design tokens, CSS variables, and global styles. Customize your theme here.",
  },
  {
    title: "app/(site)/",
    body: "Route group for your pages. Each folder becomes a route.",
  },
];

export const USAGE_EXAMPLES = [
  {
    title: "Import a component",
    description: "Copy any component file into your project and import it.",
    code: `import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <Button variant="primary" size="lg">
      Get Started
    </Button>
  )
}`,
    filename: "app/page.tsx",
  },
  {
    title: "Use the cn utility",
    description: "Merge Tailwind classes conditionally with the cn helper.",
    code: `import { cn } from "@/lib/cn"

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/60 bg-surface p-6",
        className
      )}
      {...props}
    />
  )
}`,
    filename: "components/card.tsx",
  },
  {
    title: "Customize with props",
    description: "Most components support variant props for quick customization.",
    code: `import { Button } from "@/components/ui/button"

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    filename: "app/page.tsx",
  },
];

export const CUSTOMIZATION_TIPS = [
  {
    title: "Design Tokens",
    description: "All colors, spacing, and typography are defined as CSS custom properties in globals.css.",
    code: `/* styles/globals.css */
:root {
  --primary: oklch(0.56 0.23 277.117);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --border: oklch(0.922 0 0);
  /* ... */
}`,
    filename: "styles/globals.css",
  },
  {
    title: "Theme Switching",
    description: "Dark mode is class-based. Toggle the dark class to switch themes.",
    code: `// Toggle dark mode
document.documentElement.classList.toggle("dark")

// Persist the choice
localStorage.setItem("theme", "dark")`,
    filename: "app/layout.tsx",
  },
  {
    title: "Component Variants",
    description: "Extend components by adding new variants to the variant objects.",
    code: `type Variant = "primary" | "secondary" | "outline"

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border bg-transparent",
}

// Add your own — always use semantic tokens
const myVariant = "bg-primary-soft text-primary"`,
    filename: "components/button.tsx",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Do I need to install Tailwind CSS?",
    answer: "Yes, this library is built with Tailwind CSS v4. Make sure it's configured in your project.",
  },
  {
    question: "Can I use these components with JavaScript?",
    answer: "While the components are written in TypeScript, you can use them in JavaScript projects by removing type annotations.",
  },
  {
    question: "Are the components accessible?",
    answer: "Yes, all components follow WAI-ARIA best practices with proper roles, labels, and keyboard navigation.",
  },
  {
    question: "How do I customize the theme?",
    answer: "Edit the CSS custom properties in styles/globals.css. All design tokens are centralized there.",
  },
  {
    question: "Can I use these in a production app?",
    answer: "Absolutely. The components are production-ready, lightweight, and follow best practices.",
  },
  {
    question: "Do you support server components?",
    answer: "Yes, most components are compatible with React Server Components. Client-only components are marked with 'use client'.",
  },
];
