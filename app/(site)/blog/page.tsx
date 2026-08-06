"use client";

import { ComponentPreview } from "@/components/preview/ComponentPreview";
import { BlogPageLayout } from "./components/BlogPageLayout";

export default function BlogPage() {
  return (
    <ComponentPreview id="blog-page">
      <BlogPageLayout />
    </ComponentPreview>
  );
}
