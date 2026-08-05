import type { CanvasNode } from "../types/canvas";
import { nodeToTailwindClasses } from "./generators/tailwind";
import { renderComponentJSX } from "./generators/jsx";
import { generateTypescriptTypes, generatePropSchema } from "./generators/types";
import { generateVariantSystem, generateVariantDocs } from "./generators/variants";
import { generateResponsiveOutput, generateMediaQueries } from "./generators/responsive";
import { generateDocumentation } from "./generators/docs";
import { generateExamples, formatExamples } from "./generators/examples";
import { extractUtilities, formatUtilities } from "./generators/extract";

interface GeneratedCode {
  component: string;
  types: string;
  variants: string;
  responsive: string;
  documentation: string;
  examples: string;
  utilities: string;
  fullFile: string;
}

function generateComponentName(): string {
  return "DesignedComponent";
}

export function generateCode(nodes: Record<string, CanvasNode>): GeneratedCode {
  const rootNodes = Object.values(nodes)
    .filter((n) => n.parentId === null)
    .sort((a, b) => a.zIndex - b.zIndex);

  const componentName = generateComponentName();
  const uniqueClasses = getUniqueClasses(nodes);
  const jsxLines = rootNodes
    .map((n) => renderComponentJSX(n, nodes, "      "))
    .join("\n\n");

  const hasState = Object.values(nodes).some(
    (n) => typeof n.props.checked === "boolean" || typeof n.props.disabled === "boolean"
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
    <div className={\`${uniqueClasses} \${className}\`.trim()}>
${jsxLines || "      {/* Component content */}"}
    </div>
  );
}

export default ${componentName};
`;

  const types = generateTypescriptTypes(nodes);
  const variants = generateVariantSystem(nodes);
  const responsive = generateResponsiveOutput(nodes);
  const documentation = generateDocumentation(nodes);
  const examples = formatExamples(generateExamples(nodes));
  const utilities = formatUtilities(extractUtilities(nodes));

  return { component: fullFile, types, variants, responsive, documentation, examples, utilities, fullFile };
}

function getUniqueClasses(nodes: Record<string, CanvasNode>): string {
  const allClasses = Object.values(nodes)
    .map((n) => nodeToTailwindClasses(n))
    .filter(Boolean)
    .join(" ")
    .split(" ");
  return [...new Set(allClasses)].join(" ");
}

export function generateTailwindClasses(nodes: Record<string, CanvasNode>): string {
  return Object.values(nodes)
    .map((n) => nodeToTailwindClasses(n))
    .filter(Boolean)
    .join("\n");
}

export { generateTypescriptTypes, generateDocumentation, generateResponsiveOutput, generateMediaQueries, generatePropSchema };
