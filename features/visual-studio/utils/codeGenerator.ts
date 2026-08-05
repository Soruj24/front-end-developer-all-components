import type { CanvasNode } from "../types/canvas";
import { getComponentDef } from "../constants/components";
import {
  spacingToTailwind, borderRadiusToTailwind, shadowToTailwind,
  variantToTailwind, sizeToTailwind, borderWidthToTailwind,
  textAlignToTailwind, fontWeightToTailwind, flexDirectionToTailwind,
  alignItemsToTailwind, justifyContentToTailwind,
} from "./tailwindMap";

interface GeneratedCode {
  component: string;
  types: string;
  tailwindClasses: string;
  fullFile: string;
}

function nodeToTailwindClasses(node: CanvasNode): string {
  const def = getComponentDef(node.componentName);
  if (!def) return "";
  const classes: string[] = [];

  const p = node.props;
  if (typeof p.variant === "string") {
    const v = variantToTailwind(node.componentName, p.variant);
    if (v) classes.push(v);
  }
  if (typeof p.size === "string" && node.componentName !== "progress") {
    const s = sizeToTailwind(node.componentName, p.size);
    if (s) classes.push(s);
  }
  if (typeof p.borderRadius === "number") {
    const r = borderRadiusToTailwind(p.borderRadius);
    if (r) classes.push(r);
  }
  if (typeof p.shadow === "string") {
    const s = shadowToTailwind(p.shadow);
    if (s) classes.push(s);
  }
  if (typeof p.borderWidth === "number" && typeof p.borderStyle === "string") {
    const bw = borderWidthToTailwind(p.borderWidth, p.borderStyle, p.borderColor as string || "");
    if (bw) classes.push(bw);
  }
  if (typeof p.backgroundColor === "string" && p.backgroundColor) {
    if (p.backgroundColor.startsWith("#")) {
      classes.push(`bg-[${p.backgroundColor}]`);
    } else {
      classes.push(`bg-${p.backgroundColor}`);
    }
  }
  if (typeof p.color === "string" && p.color) {
    if (p.color.startsWith("#")) {
      classes.push(`text-[${p.color}]`);
    } else {
      classes.push(`text-${p.color}`);
    }
  }
  if (typeof p.fontSize === "number") {
    classes.push(`text-[${p.fontSize}px]`);
  }
  if (typeof p.fontWeight === "string") {
    const fw = fontWeightToTailwind(p.fontWeight);
    if (fw) classes.push(fw);
  }
  if (typeof p.textAlign === "string") {
    const ta = textAlignToTailwind(p.textAlign);
    if (ta) classes.push(ta);
  }
  if (typeof p.lineHeight === "number") {
    classes.push(`leading-[${p.lineHeight}]`);
  }
  if (typeof p.display === "string" && p.display === "flex") {
    classes.push("flex");
    if (typeof p.flexDirection === "string") {
      classes.push(flexDirectionToTailwind(p.flexDirection));
    }
    if (typeof p.alignItems === "string") {
      classes.push(alignItemsToTailwind(p.alignItems));
    }
    if (typeof p.justifyContent === "string") {
      classes.push(justifyContentToTailwind(p.justifyContent));
    }
  }
  if (typeof p.gap === "number" && p.gap > 0) {
    const gapVal = pxToTailwind(p.gap as number);
    if (gapVal) classes.push(`gap-${gapVal}`);
  }
  classes.push(...spacingToTailwind(p));
  if (typeof p.disabled === "boolean" && p.disabled) classes.push("disabled:pointer-events-none disabled:opacity-50");
  if (typeof p.objectFit === "string") {
    classes.push(`object-${p.objectFit}`);
  }
  if (typeof p.textDecoration === "string" && p.textDecoration === "underline") {
    classes.push("underline");
  }

  return classes.filter(Boolean).join(" ");
}

function pxToTailwind(px: number): string | null {
  const rem = px / 4;
  if (rem === 0) return null;
  if (rem % 1 !== 0) return `[${px}px]`;
  const mapping: Record<number, string> = {
    0.25: "0.5", 0.5: "1", 0.75: "1.5", 1: "2", 1.25: "2.5", 1.5: "3",
    2: "4", 2.5: "5", 3: "6", 3.5: "7", 4: "8", 5: "10", 6: "12",
    7: "14", 8: "16", 9: "20", 10: "24", 12: "28", 14: "32", 16: "36",
  };
  return mapping[rem] ?? `[${px}px]`;
}

function renderComponentJSX(node: CanvasNode, nodes: Record<string, CanvasNode>, indent: string): string {
  const def = getComponentDef(node.componentName);
  if (!def) return "";
  const classes = nodeToTailwindClasses(node);
  const childNodes = node.children
    .map((id) => nodes[id])
    .filter(Boolean)
    .sort((a, b) => a.zIndex - b.zIndex);

  const childIndent = indent + "  ";
  const childJSX = childNodes.map((c) => renderComponentJSX(c, nodes, childIndent)).join("\n\n");

  switch (node.componentName) {
    case "button":
      return `${indent}<button className="${classes}"${node.props.disabled ? " disabled" : ""}>\n${childIndent}{${JSON.stringify(node.props.text ?? "Button")}}\n${indent}</button>`;
    case "text":
      return `${indent}<p className="${classes}">${node.props.text ?? "Text"}</p>`;
    case "heading": {
      const tag = (node.props.level as string) ?? "h2";
      return `${indent}<${tag} className="${classes}">${node.props.text ?? "Heading"}</${tag}>`;
    }
    case "input":
      return `${indent}<input\n${childIndent}type="${node.props.inputType ?? "text"}"\n${childIndent}placeholder="${node.props.placeholder ?? ""}"\n${childIndent}className="${classes}"\n${childIndent}${node.props.disabled ? "disabled" : ""}\n${indent}/>`;
    case "textarea":
      return `${indent}<textarea\n${childIndent}placeholder="${node.props.placeholder ?? ""}"\n${childIndent}rows={${node.props.rows ?? 4}}\n${childIndent}className="${classes}"\n${childIndent}${node.props.disabled ? "disabled" : ""}\n${indent}/>`;
    case "badge":
      return `${indent}<span className="${classes}">${node.props.text ?? "Badge"}</span>`;
    case "avatar":
      return `${indent}<div className={${JSON.stringify(classes)}}>${node.props.initials ?? "AV"}</div>`;
    case "alert":
      return `${indent}<div className="${classes}" role="alert">\n${childIndent}<div className="font-semibold">${node.props.title ?? ""}</div>\n${childIndent}<div>${node.props.description ?? ""}</div>\n${indent}</div>`;
    case "divider":
      return `${indent}<hr className="${classes}" />`;
    case "image":
      return `${indent}<img src="${node.props.src ?? ""}" alt="${node.props.alt ?? ""}" className="${classes}" />`;
    case "progress":
      return `${indent}<div className="w-full" role="progressbar" aria-valuenow={${node.props.value ?? 0}}>\n${childIndent}<div className="${classes}">\n${childIndent}  <div className="h-full rounded-full bg-current" style={{ width: \`${node.props.value ?? 0}%\` }} />\n${childIndent}</div>\n${indent}</div>`;
    case "checkbox":
      return `${indent}<label className="flex items-center gap-2">\n${childIndent}<input type="checkbox" className="rounded" ${node.props.checked ? "checked" : ""} ${node.props.disabled ? "disabled" : ""} />\n${childIndent}<span>${node.props.label ?? "Checkbox"}</span>\n${indent}</label>`;
    case "toggle":
      return `${indent}<label className="flex items-center gap-2">\n${childIndent}<input type="checkbox" className="sr-only peer" ${node.props.checked ? "checked" : ""} ${node.props.disabled ? "disabled" : ""} />\n${childIndent}<div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-primary" />\n${childIndent}<span>${node.props.label ?? "Toggle"}</span>\n${indent}</label>`;
    case "link":
      return `${indent}<a href="${node.props.href ?? "#"}" className="${classes}" ${node.props.target ? `target="${node.props.target}"` : ""}>${node.props.text ?? "Link"}</a>`;
    case "spinner":
      return `${indent}<div className="animate-spin ${classes}" />`;
    case "skeleton":
      return `${indent}<div className="animate-pulse bg-muted ${classes}" />`;
    case "tooltip":
      return `${indent}<div className="group relative inline-block">\n${childIndent}<span className="${classes}">${node.props.text ?? "Tooltip"}</span>\n${childIndent}<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-1 text-sm bg-foreground text-background rounded shadow-lg whitespace-nowrap">${node.props.content ?? ""}</div>\n${indent}</div>`;
    case "select":
      return `${indent}<select className="${classes}"${node.props.disabled ? " disabled" : ""}>\n${childIndent}<option value="">${node.props.placeholder ?? "Select..."}</option>\n${indent}</select>`;
    case "table": {
      const cols = ((node.props.columns as string) ?? "Col1,Col2").split(",");
      return `${indent}<div className="overflow-x-auto">\n${childIndent}<table className="${classes}">\n${childIndent}  <thead>\n${childIndent}    <tr>\n${cols.map((c: string) => `${childIndent}      <th className="px-4 py-2 text-left font-medium">${c.trim()}</th>`).join("\n")}\n${childIndent}    </tr>\n${childIndent}  </thead>\n${childIndent}  <tbody>{/* rows */}</tbody>\n${childIndent}</table>\n${indent}</div>`;
    }
    case "list": {
      const items = ((node.props.items as string) ?? "Item 1,Item 2").split(",");
      const tag = node.props.ordered ? "ol" : "ul";
      return `${indent}<${tag} className="${classes}">\n${items.map((item: string) => `${childIndent}  <li>${item.trim()}</li>`).join("\n")}\n${indent}</${tag}>`;
    }
    case "pagination":
      return `${indent}<nav className="${classes}" aria-label="Pagination">\n${childIndent}{/* page buttons */}\n${indent}</nav>`;
    case "navbar":
      return `${indent}<nav className="${classes}">\n${childIndent}<div className="flex items-center justify-between px-4 h-full">\n${childIndent}  <span className="font-bold">${node.props.brand ?? "Brand"}</span>\n${childIndent}  <div className="flex gap-4">\n${(node.props.items as string ?? "").split(",").map((item: string) => `${childIndent}    <a href="#" className="hover:text-primary">${item.trim()}</a>`).join("\n")}\n${childIndent}  </div>\n${childIndent}</div>\n${indent}</nav>`;
    case "card":
    case "container":
      return `${indent}<div className="${classes}">\n${childJSX || `${childIndent}{/* Add content here */}`}\n${indent}</div>`;
    default:
      return `${indent}<div className="${classes}">\n${childJSX || `${childIndent}{/* ${node.componentName} */}`}\n${indent}</div>`;
  }
}

function generateComponentName(): string {
  return "DesignedComponent";
}

export function generateCode(nodes: Record<string, CanvasNode>): GeneratedCode {
  const rootNodes = Object.values(nodes)
    .filter((n) => n.parentId === null)
    .sort((a, b) => a.zIndex - b.zIndex);

  const componentName = generateComponentName();
  const classNames = Object.values(nodes).map((n) => nodeToTailwindClasses(n)).filter(Boolean);
  const uniqueClasses = [...new Set(classNames.join(" ").split(" ").filter(Boolean))];

  const jsxLines = rootNodes.map((n) => renderComponentJSX(n, nodes, "      ")).join("\n\n");
  const hasState = Object.values(nodes).some((n) =>
    typeof n.props.checked === "boolean" || typeof n.props.disabled === "boolean"
  );

  const imports: string[] = [];
  if (hasState) imports.push('import { useState } from "react";');

  const fullFile = `"use client";

${imports.join("\n")}

interface ${componentName}Props {
  className?: string;
}

export function ${componentName}({ className = "" }: ${componentName}Props) {
  return (
    <div className={\`${uniqueClasses.join(" ")} \${className}\`.trim()}>
${jsxLines || "      {/* Component content */}"}
    </div>
  );
}

export default ${componentName};
`;

  const types = `interface ${componentName}Props {
  className?: string;
}`;

  return {
    component: fullFile,
    types,
    tailwindClasses: uniqueClasses.join("\n"),
    fullFile,
  };
}

export function generateTailwindClasses(nodes: Record<string, CanvasNode>): string {
  return Object.values(nodes)
    .map((n) => nodeToTailwindClasses(n))
    .filter(Boolean)
    .join("\n");
}

export function generateTypescriptTypes(nodes: Record<string, CanvasNode>): string {
  const componentName = "DesignedComponent";
  const propEntries: string[] = [];

  for (const node of Object.values(nodes)) {
    const def = getComponentDef(node.componentName);
    if (!def) continue;
    for (const field of def.propFields) {
      const val = node.props[field.id] ?? field.defaultValue;
      let tsType = "string";
      switch (field.type) {
        case "slider": case "number": tsType = "number"; break;
        case "boolean": tsType = "boolean"; break;
        default: tsType = "string";
      }
      propEntries.push(`  /** ${field.label} for ${def.name} */\n  ${field.id}?: ${tsType};`);
    }
  }

  const uniqueProps = [...new Set(propEntries)].join("\n");

  return `export interface ${componentName}Props {
  className?: string;
${uniqueProps}
}`;
}

export function generateDocumentation(nodes: Record<string, CanvasNode>): string {
  const usedComponents = new Map<string, number>();
  for (const node of Object.values(nodes)) {
    usedComponents.set(node.componentName, (usedComponents.get(node.componentName) ?? 0) + 1);
  }

  const lines: string[] = [
    "# DesignedComponent Documentation",
    "",
    "## Overview",
    `This component was designed visually in the Visual Component Studio.`,
    `It contains ${Object.keys(nodes).length} element(s).`,
    "",
    "## Components Used",
    "",
  ];

  for (const [name, count] of usedComponents) {
    const def = getComponentDef(name);
    lines.push(`- **${def?.name ?? name}** (${count}x) — ${def?.description ?? ""}`);
  }

  lines.push("", "## Props", "");
  lines.push("| Prop | Type | Description |");
  lines.push("|------|------|-------------|");
  lines.push("| className | string | Additional CSS classes |");

  lines.push("", "## Usage", "");
  lines.push("```tsx");
  lines.push('import { DesignedComponent } from "./DesignedComponent";');
  lines.push("");
  lines.push("export default function Page() {");
  lines.push("  return <DesignedComponent />;");
  lines.push("}");
  lines.push("```");

  return lines.join("\n");
}
