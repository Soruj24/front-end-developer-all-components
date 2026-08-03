import { Fragment, useMemo, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GREEK, LATEX_SYMBOLS, LATEX_BINOP } from "./StreamingResponse.constants";

function Fraction({ num, den }: { num: ReactNode; den: ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex flex-col items-center self-center leading-none" style={{ verticalAlign: "middle" }}>
      <span className="px-1 pb-0.5">{num}</span>
      <span className="w-full border-t border-current px-1 pt-0.5">{den}</span>
    </span>
  );
}

function SqrtRoot({ index, body }: { index?: string; body: ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-end">
      {index ? <span className="mr-0.5 self-start text-[0.7em]">{index}</span> : null}
      <span className="text-[1.05em]">√</span>
      <span className="border-t border-current px-1 leading-none">{body}</span>
    </span>
  );
}

function Matrix({ env, content }: { env: string; content: string }) {
  const rows = content.split("\\\\").map((row) => row.split("&").map((cell) => cell.trim())).filter((row) => row.some((cell) => cell.length > 0));
  const cols = Math.max(1, ...rows.map((row) => row.length));
  const wrappers: Record<string, [string, string]> = {
    pmatrix: ["(", ")"], bmatrix: ["[", "]"], Bmatrix: ["{", "}"],
    vmatrix: ["|", "|"], Vmatrix: ["‖", "‖"], matrix: ["", ""],
    cases: ["{", ""], align: ["", ""], aligned: ["", ""], array: ["", ""],
    equation: ["", ""], gather: ["", ""],
  };
  const [open, close] = wrappers[env] ?? ["", ""];
  const isStacked = env === "align" || env === "aligned" || env === "gather" || env === "equation";
  return (
    <span className="mx-0.5 inline-flex items-center align-middle">
      <span className={cn("select-none text-[1.2em]", !open && "hidden")}>{open}</span>
      <span className="mx-1 inline-grid items-center" style={isStacked ? { rowGap: "0.15em" } : { gridTemplateColumns: `repeat(${cols}, auto)`, rowGap: "0.15em", columnGap: "0.7em" }}>
        {isStacked
          ? rows.map((row, ri) => <span key={ri} className="text-center">{renderLatex(row.join(" = "))}</span>)
          : rows.flatMap((row, ri) => row.map((cell, ci) => <Fragment key={`${ri}-${ci}`}><span className="text-center">{renderLatex(cell)}</span></Fragment>))}
      </span>
      <span className={cn("select-none text-[1.2em]", !close && "hidden")}>{close}</span>
    </span>
  );
}

export function renderLatex(src: string): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0; let k = 0;
  const push = (node: ReactNode) => { if (node != null) out.push(node); };
  const pushStr = (text: string) => { out.push(text); };
  const peek = () => (i < src.length ? src[i] : "");
  const isLetter = (c: string) => /[a-zA-Z]/.test(c);
  const readGroup = (): string => {
    if (src[i] !== "{") return ""; i++; const start = i; let depth = 1;
    while (i < src.length && depth > 0) { if (src[i] === "{") depth++; else if (src[i] === "}") { depth--; if (depth === 0) break; } i++; }
    const content = src.slice(start, i); i++; return content;
  };
  const readAtomRaw = (): string => {
    if (i >= src.length) return ""; const c = src[i];
    if (c === "{") return readGroup();
    if (c === "\\") { const start = i; i++; if (i < src.length && /[0-9]/.test(src[i])) return src.slice(start, ++i); while (i < src.length && isLetter(src[i])) i++; return src.slice(start, i); }
    i++; return c;
  };
  const renderCommand = (name: string): ReactNode => {
    switch (name) {
      case "frac": case "dfrac": case "tfrac": { const num = readGroup(); const den = readGroup(); return <Fraction key={k++} num={renderLatex(num)} den={renderLatex(den)} />; }
      case "sqrt": { if (peek() === "[") { i++; const start = i; while (i < src.length && src[i] !== "]") i++; const index = src.slice(start, i); i++; const body = readGroup(); return <SqrtRoot key={k++} index={index} body={renderLatex(body)} />; } const body = readGroup(); return <SqrtRoot key={k++} body={renderLatex(body)} />; }
      case "text": return <span key={k++} className="font-sans not-italic">{readGroup()}</span>;
      case "mathrm": return <span key={k++} className="font-sans not-italic">{renderLatex(readGroup())}</span>;
      case "mathbf": return <span key={k++} className="font-bold not-italic">{renderLatex(readGroup())}</span>;
      case "mathit": return <span key={k++}>{renderLatex(readGroup())}</span>;
      case "mathbb": return <span key={k++} className="font-serif not-italic">{renderLatex(readGroup())}</span>;
      case "operatorname": return <span key={k++} className="font-sans not-italic">{readGroup()}</span>;
      case "overline": return <span key={k++} className="border-t border-current px-0.5">{renderLatex(readGroup())}</span>;
      case "underline": return <span key={k++} className="border-b border-current px-0.5">{renderLatex(readGroup())}</span>;
      case "hat": case "widehat": return <span key={k++} className="inline-flex flex-col items-center leading-none"><span className="text-[0.65em]">^</span><span>{renderLatex(readGroup())}</span></span>;
      case "bar": return <span key={k++} className="inline-flex flex-col items-center leading-none"><span className="text-[0.65em]">¯</span><span>{renderLatex(readGroup())}</span></span>;
      case "left": case "right": case "big": case "Big": case "bigg": case "Bigg": { let delim = peek(); if (delim === "\\") { delim = src[i + 1] ?? ""; i += 2; } else { i++; } const map: Record<string, string> = { "(": "(", ")": ")", "[": "[", "]": "]", "{": "{", "}": "}", "|": "|", ".": "" }; return <span key={k++} className="text-[1.15em]">{map[delim] ?? delim}</span>; }
      case "begin": { const env = readGroup(); if (["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "cases", "align", "aligned", "array", "equation", "gather"].includes(env)) { const endTag = `\\end{${env}}`; const endIdx = src.indexOf(endTag, i); const body = endIdx === -1 ? src.slice(i) : src.slice(i, endIdx); if (endIdx !== -1) i = endIdx + endTag.length; return <Matrix key={k++} env={env} content={body} />; } const endIdx = src.indexOf("\\end{", i); if (endIdx !== -1) i = endIdx; return <span key={k++} className="font-sans text-[0.85em] opacity-70">[{env}]</span>; }
      case "end": { readGroup(); return null; }
      case ",": case ";": return " "; case "quad": return "  "; case "qquad": return "    ";
      default: if (GREEK[name]) return GREEK[name]; if (LATEX_SYMBOLS[name]) return LATEX_SYMBOLS[name]; if (LATEX_BINOP[name]) return LATEX_BINOP[name]; return name;
    }
  };
  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\t" || c === "\n") { i++; continue; }
    if (c === "^" || c === "_") { const sup = c === "^"; i++; const atom = readAtomRaw(); const inner: ReactNode = atom.startsWith("\\") ? renderCommand(atom.slice(1)) : renderLatex(atom); push(<span key={k++} className="mx-[1px] inline-block text-[0.72em] leading-none" style={{ verticalAlign: sup ? "super" : "sub" }}>{inner}</span>); continue; }
    if (c === "{") { const content = readGroup(); push(<span key={k++}>{renderLatex(content)}</span>); continue; }
    if (c === "\\") { i++; let name = ""; if (i < src.length && /[0-9]/.test(src[i])) name = src[i++]; else while (i < src.length && isLetter(src[i])) name += src[i++]; if (name === "") { const esc = src[i] ?? ""; i++; const map: Record<string, string> = { "{": "{", "}": "}", "\\": "\\", "%": "%", "&": "&", "#": "#", "_": "_", "$": "$" }; pushStr(map[esc] ?? esc); } else { push(renderCommand(name)); } continue; }
    pushStr(c); i++;
  }
  return out;
}

export function MathTeX({ value, block = false }: { value: string; block?: boolean }) {
  const rendered = useMemo(() => renderLatex(value), [value]);
  const content = <span className="font-serif italic text-foreground [text-rendering:optimizeLegibility]">{rendered}</span>;
  if (!block) return content;
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-border bg-muted/40 px-4 py-3.5">
      <div className="flex min-h-[2.25rem] items-center justify-center overflow-x-auto text-[16px]">{content}</div>
    </div>
  );
}
