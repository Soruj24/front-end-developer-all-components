import fs from "fs";
 
import { wasm } from "esbuild-wasm";

const file = process.argv[2];
const s = fs.readFileSync(file, "utf8");

const re = /source:\s*`((?:[^\\`]|\\[\s\S])*)`\s*,/g;
const sources = [];
let m;
while ((m = re.exec(s))) sources.push(m[1]);

(async () => {
  await wasm.initialize();
let bad = 0;
for (let i = 0; i < sources.length; i++) {
  const runtime = sources[i].replace(/\\`/g, "`").replace(/\\\$/g, "$");
  try {
    await wasm.transform(runtime, { loader: "jsx", jsx: "automatic" });
  } catch (e) {
    bad++;
    console.log(`FAIL #${i}: ${String(e.message || e)}`);
  }
}
  console.log(`sources: ${sources.length}, failures: ${bad}`);
})();
