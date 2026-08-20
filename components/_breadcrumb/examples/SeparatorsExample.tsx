"use client";

import { Breadcrumb } from "../Breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings" },
];

const separators = [
  { label: "Chevron", sep: undefined },
  { label: "Slash", sep: "/" },
  { label: "Arrow", sep: "\u2192" },
  { label: "Dot", sep: "\u00b7" },
  { label: "Pipe", sep: "|" },
];

export default function SeparatorsExample() {
  return (
    <div className="flex flex-col gap-4">
      {separators.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {item.label}
          </span>
          <Breadcrumb items={items} separator={item.sep} />
        </div>
      ))}
    </div>
  );
}
