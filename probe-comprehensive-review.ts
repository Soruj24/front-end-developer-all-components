import { parseComprehensiveReview } from "./features/ai/server/nodes/comprehensiveReview";

const sampleOutput = `\`\`\`json
{
  "qualityScore": 85,
  "warnings": [
    { "dimension": "accessibility", "severity": "error", "message": "Missing aria-label on interactive element", "line": 12 },
    { "dimension": "tailwind", "severity": "warn", "message": "Using arbitrary value instead of design token" },
    { "dimension": "performance", "severity": "warn", "message": "Unnecessary re-render on every keystroke" }
  ],
  "suggestions": [
    { "dimension": "reusability", "description": "Extract shared button variant into a primitive", "priority": "high" },
    { "dimension": "maintainability", "description": "Add JSDoc comments to the public API", "priority": "medium" }
  ],
  "autoFixes": [
    { "dimension": "accessibility", "description": "Add aria-label to the button", "code": "<button aria-label=\"Close\">X</button>" },
    { "dimension": "tailwind", "description": "Replace arbitrary value with design token", "code": "className=\"bg-primary-500\"" }
  ],
  "report": "# Component Review Report\n\n## Quality Score: 85/100\n\n### Warnings\n- **accessibility** (error): Missing aria-label on interactive element (line 12)\n- **tailwind** (warn): Using arbitrary value instead of design token\n- **performance** (warn): Unnecessary re-render on every keystroke\n\n### Suggestions\n- **reusability** (high): Extract shared button variant into a primitive\n- **maintainability** (medium): Add JSDoc comments to the public API\n\n### Auto Fixes\n1. **accessibility**: Add aria-label to the button\n2. **tailwind**: Replace arbitrary value with design token\n"
}
\`\`\``
  .replace(/^`{3}json\s*/, "")
  .replace(/\s*`{3}$/, "");

const review = parseComprehensiveReview(sampleOutput);
console.log("Parsed review:", JSON.stringify(review, null, 2));
console.assert(review !== null, "Should parse successfully");
console.assert(review!.qualityScore === 85, "Score should be 85");
console.assert(review!.warnings.length === 3, "Should have 3 warnings");
console.assert(review!.suggestions.length === 2, "Should have 2 suggestions");
console.assert(review!.autoFixes.length === 2, "Should have 2 autoFixes");
console.assert(review!.report.includes("Quality Score"), "Report should include header");

// Test null input
const nullResult = parseComprehensiveReview("not json");
console.assert(nullResult === null, "Should return null for invalid input");

console.log("All comprehensive review assertions passed!");
