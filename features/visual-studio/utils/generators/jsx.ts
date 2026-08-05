import type { CanvasNode } from "../../types/canvas";
import { getComponentDef } from "../../constants/components";
import { nodeToTailwindClasses } from "./tailwind";

export function renderComponentJSX(
  node: CanvasNode,
  nodes: Record<string, CanvasNode>,
  indent: string
): string {
  const def = getComponentDef(node.componentName);
  if (!def) return "";
  const classes = nodeToTailwindClasses(node);
  const childNodes = node.children
    .map((id) => nodes[id])
    .filter(Boolean)
    .sort((a, b) => a.zIndex - b.zIndex);

  const childIndent = indent + "  ";
  const childJSX = childNodes
    .map((c) => renderComponentJSX(c, nodes, childIndent))
    .join("\n\n");

  const p = node.props;
  switch (node.componentName) {
    case "button":
      return `${indent}<button className="${classes}"${p.disabled ? " disabled" : ""}>\n${childIndent}{${JSON.stringify(p.text ?? "Button")}}\n${indent}</button>`;
    case "text":
      return `${indent}<p className="${classes}">${p.text ?? "Text"}</p>`;
    case "heading": {
      const tag = (p.level as string) ?? "h2";
      return `${indent}<${tag} className="${classes}">${p.text ?? "Heading"}</${tag}>`;
    }
    case "input":
      return `${indent}<input\n${childIndent}type="${p.inputType ?? "text"}"\n${childIndent}placeholder="${p.placeholder ?? ""}"\n${childIndent}className="${classes}"\n${childIndent}${p.disabled ? "disabled" : ""}\n${indent}/>`;
    case "textarea":
      return `${indent}<textarea\n${childIndent}placeholder="${p.placeholder ?? ""}"\n${childIndent}rows={${p.rows ?? 4}}\n${childIndent}className="${classes}"\n${childIndent}${p.disabled ? "disabled" : ""}\n${indent}/>`;
    case "badge":
      return `${indent}<span className="${classes}">${p.text ?? "Badge"}</span>`;
    case "avatar":
      return `${indent}<div className="${classes}">${p.initials ?? "AV"}</div>`;
    case "alert":
      return `${indent}<div className="${classes}" role="alert">\n${childIndent}<div className="font-semibold">${p.title ?? ""}</div>\n${childIndent}<div>${p.description ?? ""}</div>\n${indent}</div>`;
    case "divider":
      return `${indent}<hr className="${classes}" />`;
    case "image":
      return `${indent}<img src="${p.src ?? ""}" alt="${p.alt ?? ""}" className="${classes}" />`;
    case "progress":
      return `${indent}<div className="w-full" role="progressbar" aria-valuenow={${p.value ?? 0}}>\n${childIndent}<div className="${classes}">\n${childIndent}  <div className="h-full rounded-full bg-current" style={{ width: \`${p.value ?? 0}%\` }} />\n${childIndent}</div>\n${indent}</div>`;
    case "checkbox":
      return `${indent}<label className="flex items-center gap-2">\n${childIndent}<input type="checkbox" className="rounded" ${p.checked ? "checked" : ""} ${p.disabled ? "disabled" : ""} />\n${childIndent}<span>${p.label ?? "Checkbox"}</span>\n${indent}</label>`;
    case "toggle":
      return `${indent}<label className="flex items-center gap-2">\n${childIndent}<input type="checkbox" className="sr-only peer" ${p.checked ? "checked" : ""} ${p.disabled ? "disabled" : ""} />\n${childIndent}<div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-primary" />\n${childIndent}<span>${p.label ?? "Toggle"}</span>\n${indent}</label>`;
    case "link":
      return `${indent}<a href="${p.href ?? "#"}" className="${classes}" ${p.target ? `target="${p.target}"` : ""}>${p.text ?? "Link"}</a>`;
    case "spinner":
      return `${indent}<div className="animate-spin ${classes}" />`;
    case "skeleton":
      return `${indent}<div className="animate-pulse bg-muted ${classes}" />`;
    case "tooltip":
      return `${indent}<div className="group relative inline-block">\n${childIndent}<span className="${classes}">${p.text ?? "Tooltip"}</span>\n${childIndent}<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-1 text-sm bg-foreground text-background rounded shadow-lg whitespace-nowrap">${p.content ?? ""}</div>\n${indent}</div>`;
    case "select":
      return `${indent}<select className="${classes}"${p.disabled ? " disabled" : ""}>\n${childIndent}<option value="">${p.placeholder ?? "Select..."}</option>\n${indent}</select>`;
    case "table": {
      const cols = ((p.columns as string) ?? "Col1,Col2").split(",");
      return `${indent}<div className="overflow-x-auto">\n${childIndent}<table className="${classes}">\n${childIndent}  <thead>\n${childIndent}    <tr>\n${cols.map((c: string) => `${childIndent}      <th className="px-4 py-2 text-left font-medium">${c.trim()}</th>`).join("\n")}\n${childIndent}    </tr>\n${childIndent}  </thead>\n${childIndent}  <tbody>{/* rows */}</tbody>\n${childIndent}</table>\n${indent}</div>`;
    }
    case "list": {
      const items = ((p.items as string) ?? "Item 1,Item 2").split(",");
      const tag = p.ordered ? "ol" : "ul";
      return `${indent}<${tag} className="${classes}">\n${items.map((item: string) => `${childIndent}  <li>${item.trim()}</li>`).join("\n")}\n${indent}</${tag}>`;
    }
    case "pagination":
      return `${indent}<nav className="${classes}" aria-label="Pagination">\n${childIndent}{/* page buttons */}\n${indent}</nav>`;
    case "navbar":
      return `${indent}<nav className="${classes}">\n${childIndent}<div className="flex items-center justify-between px-4 h-full">\n${childIndent}  <span className="font-bold">${p.brand ?? "Brand"}</span>\n${childIndent}  <div className="flex gap-4">\n${(p.items as string ?? "").split(",").map((item: string) => `${childIndent}    <a href="#" className="hover:text-primary">${item.trim()}</a>`).join("\n")}\n${childIndent}  </div>\n${childIndent}</div>\n${indent}</nav>`;
    case "card":
    case "container":
      return `${indent}<div className="${classes}">\n${childJSX || `${childIndent}{/* Add content here */}`}\n${indent}</div>`;
    default:
      return `${indent}<div className="${classes}">\n${childJSX || `${childIndent}{/* ${node.componentName} */}`}\n${indent}</div>`;
  }
}
