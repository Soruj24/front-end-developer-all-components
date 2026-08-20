"use client";

import { Breadcrumb } from "../Breadcrumb";

export default function TruncatedExample() {
  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "...", href: "/collapsed" },
        { label: "Deeply", href: "/a/b/c/deeply" },
        { label: "Nested", href: "/a/b/c/deeply/nested" },
        { label: "Page" },
      ]}
    />
  );
}
