"use client";

import { Breadcrumb } from "../Breadcrumb";

export default function DeepNestedExample() {
  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Website Redesign", href: "/projects/website" },
        { label: "Assets", href: "/projects/website/assets" },
        { label: "Images" },
      ]}
    />
  );
}
