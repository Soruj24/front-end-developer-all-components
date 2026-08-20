"use client";

import { Breadcrumb } from "../Breadcrumb";

export default function PillExample() {
  return (
    <Breadcrumb
      variant="pill"
      items={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Analytics" },
      ]}
    />
  );
}
