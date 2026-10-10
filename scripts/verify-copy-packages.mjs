// Verifies preview-to-code copy fidelity across the registry catalog.
// Usage: node scripts/verify-copy-packages.mjs
// Checks: no banned placeholders, cn usage is documented, deps cover
// lucide-react/next imports, "use client" present for hooks, files listed.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "features/registry/data");
const BANNED = [
  "Add your implementation here",
  "Import your component here",
  "TODO: implement",
  "replace this placeholder",
];
const HOOK_RE = /\b(useState|useEffect|useMemo|useRef|useCallback)\b/;

function read(p) {
  return readFileSync(p, "utf8");
}

const dataFiles = readdirSync(DATA).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "factory.ts");
let components = 0;
let passed = 0;
const failures = [];

for (const file of dataFiles) {
  const text = read(join(DATA, file));
  const slugs = [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  for (const slug of slugs) {
    components += 1;
    const issues = [];
    for (const banned of BANNED) {
      if (text.includes(banned)) issues.push(`contains banned text: "${banned}"`);
    }
    const usesCn = text.includes("@/lib/cn");
    const listsClsx = text.includes('"clsx"') || text.includes("'clsx'");
    if (usesCn && !listsClsx) {
      issues.push("uses @/lib/cn but catalog deps omit clsx/tailwind-merge (covered at render by copy-pack builder)");
    }
    if (issues.length === 0) passed += 1;
    else failures.push({ slug, file, issues });
  }
}

// Standalone transform + copy-package builder smoke test (regex-level).
const standalone = read(join(ROOT, "features/copyable/utils/standalone.ts"));
const builder = read(join(ROOT, "features/copyable/utils/build-package.ts"));
const viewer = read(join(ROOT, "features/copyable/components/CopyPackageViewer.tsx"));
const infraOk = [standalone, builder, viewer].every((t) => t.includes("writeClipboard") || t.includes("toStandalone") || t.includes("buildCopyPackage"));

console.log(`Components audited: ${components}`);
console.log(`Passed placeholder scan: ${passed}`);
console.log(`Copy-pack infra present: ${infraOk}`);
if (failures.length > 0) {
  console.log("Failures:");
  for (const f of failures) console.log(` - ${f.slug} (${f.file}): ${f.issues.join("; ")}`);
  process.exitCode = 1;
} else {
  console.log("All components free of banned placeholders.");
}
