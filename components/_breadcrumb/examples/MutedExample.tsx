"use client";

import { Breadcrumb } from "../Breadcrumb";

export default function MutedExample() {
  return (
    <Breadcrumb
      variant="muted"
      items={[
        { label: "Home", href: "/" },
        { label: "Settings", href: "/settings" },
        { label: "Account" },
      ]}
    />
  );
}
