"use client";

export const DiscSpinner_SOURCE =
  '"use client";\n\n' +
  'import { useState } from "react";\n\n' +
  "type SpinnerSize = \"sm\" | \"md\" | \"lg\" | \"xl\";\n" +
  "type SpinnerColor = \"primary\" | \"muted\" | \"blue\" | \"green\" | \"orange\" | \"red\" | \"purple\";\n\n" +
  "const sizeMap: Record<SpinnerSize, string> = {\n" +
  "  sm: \"h-4 w-4\",\n" +
  "  md: \"h-6 w-6\",\n" +
  "  lg: \"h-8 w-8\",\n" +
  "  xl: \"h-12 w-12\",\n" +
 "};\n" +
 "const colorMap: Record<SpinnerColor, string> = {\n" +
 "  primary: \"border-primary\",\n" +
 "  muted: \"border-muted-foreground\",\n" +
 "  blue: \"border-blue-500\",\n" +
 "  green: \"border-emerald-500\",\n" +
 "  orange: \"border-orange-500\",\n" +
 "  red: \"border-red-500\",\n" +
 "  purple: \"border-purple-500\",\n" +
 "};\n\n" +
 "function DiscSpinner({\n" +
 "  size = \"md\",\n" +
 "  color = \"primary\",\n" +
 "  className = \"\",\n" + "}: {\n" +
 "  size?: SpinnerSize;\n" +
 "  color?: SpinnerColor;\n" +
 "  className?: string;\n" +
 "}) {\n" +
 "  return (\n" +
 "    <div\n" +
 "      className={\`rounded-full border-2 border-t-transparent \${sizeMap[size]} \${colorMap[color]} animate-spin \${className}\`}\n" +
 "    />\n" +
 "  );\n" +
 "}\n\n" +
 "export { DiscSpinner, SpinnerSize, SpinnerColor, sizeMap, colorMap };\n";