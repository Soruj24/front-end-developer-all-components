"use client";

import { Breadcrumb } from "../Breadcrumb";

export default function BasicExample() {
  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Breadcrumb" },
      ]}
    />
  );
}
