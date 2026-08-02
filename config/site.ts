import type { Metadata, Viewport } from "next";

/** Single source of truth for site-wide branding and SEO. */
export const siteConfig = {
  name: "Component Library",
  shortName: "CL",
  tagline:
    "A comprehensive collection of UI components, page templates, and patterns built with Next.js, React, and Tailwind CSS.",
  description:
    "A comprehensive collection of UI components, page templates, and patterns built with Next.js, React, and Tailwind CSS.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "UI Components",
    "Component Library",
    "Design System",
  ] as string[],
  author: "Component Library",
  github: "https://github.com",
  getStartedHref: "/routing",
  stats: {
    pages: 54,
    components: 40,
    categories: 9,
    examplesPerPage: "30+",
  },
  navLinks: [
    { label: "Components", href: "/components" },
    { label: "Pages", href: "/landing" },
    { label: "Templates", href: "/blog" },
    { label: "Admin", href: "/admin/dashboard" },
  ],
} as const;

export const siteMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
  },
};

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};
