/** Maps customization values to Tailwind CSS class names. */
export function generateTailwindClasses(
  values: Record<string, string>
): string[] {
  const classes: string[] = [];

  // Colors → bg-*, text-*, border-*
  if (values["Background"]) {
    classes.push(`bg-[${values["Background"]}]`);
  }
  if (values["Text"]) {
    classes.push(`text-[${values["Text"]}]`);
  }
  if (values["Border"]) {
    classes.push(`border-[${values["Border"]}]`);
  }
  if (values["Primary"]) {
    classes.push(`bg-primary`);
  }

  // Spacing → px-*, py-*, gap-*
  if (values["Padding X"]) {
    classes.push(`px-[${values["Padding X"]}px]`);
  }
  if (values["Padding Y"]) {
    classes.push(`py-[${values["Padding Y"]}px]`);
  }
  if (values["Gap"]) {
    classes.push(`gap-[${values["Gap"]}px]`);
  }

  // Border → border-*, border-style
  if (values["Width"]) {
    const w = Number(values["Width"]);
    if (w === 0) classes.push("border-0");
    else if (w === 1) classes.push("border");
    else classes.push(`border-[${w}px]`);
  }
  if (values["Style"] && values["Style"] !== "solid") {
    classes.push(`border-${values["Style"]}`);
  }

  // Radius
  if (values["Border Radius"]) {
    classes.push(values["Border Radius"]);
  }

  // Shadow
  if (values["Box Shadow"]) {
    classes.push(values["Box Shadow"]);
  }

  // Typography
  if (values["Font Size"]) {
    classes.push(values["Font Size"]);
  }
  if (values["Font Weight"]) {
    classes.push(values["Font Weight"]);
  }

  // Animation
  if (values["Transition"]) {
    classes.push(values["Transition"]);
  }
  if (values["Duration"]) {
    classes.push(values["Duration"]);
  }

  return classes.filter(Boolean);
}

/** Generates a full React + Tailwind component snippet from customization values. */
export function generateComponentCode(
  componentName: string,
  baseClasses: string,
  values: Record<string, string>
): string {
  const customClasses = generateTailwindClasses(values).join(" ");
  const allClasses = [baseClasses, customClasses].filter(Boolean).join(" ");

  return `import type { ReactNode } from "react";

export function ${componentName}({ children }: { children?: ReactNode }) {
  return (
    <div className="${allClasses}">
      {children ?? "${componentName}"}
    </div>
  );
}`;
}
