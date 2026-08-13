import type { Metadata } from "next";
import { ComponentPreview } from "@/components/preview/ComponentPreview";
import { BlogPageLayout } from "./components/BlogPageLayout";

export const metadata: Metadata = {
  title: "Blog | Insights, Tutorials & Updates",
  description:
    "Read the latest insights, tutorials, and updates from our team. Stay up-to-date with technology, design, AI, and more.",
  openGraph: {
    title: "Blog | Insights, Tutorials & Updates",
    description:
      "Read the latest insights, tutorials, and updates from our team.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <ComponentPreview id="blog-page">
      <BlogPageLayout />
    </ComponentPreview>
  );
}
