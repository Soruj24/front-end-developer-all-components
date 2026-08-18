export const GREEK: Record<string, string> = {
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ϵ", varepsilon: "ε",
  zeta: "ζ", eta: "η", theta: "θ", vartheta: "ϑ", iota: "ι", kappa: "κ",
  lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", omicron: "ο", pi: "π", varpi: "ϖ",
  rho: "ρ", varrho: "ϱ", sigma: "σ", varsigma: "ς", tau: "τ", upsilon: "υ",
  phi: "φ", varphi: "ϕ", chi: "χ", psi: "ψ", omega: "ω",
  Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π",
  Sigma: "Σ", Upsilon: "Υ", Phi: "Φ", Psi: "Ψ", Omega: "Ω",
};

export const LATEX_SYMBOLS: Record<string, string> = {
  infty: "∞", sum: "∑", int: "∫", prod: "∏", partial: "∂", nabla: "∇",
  forall: "∀", exists: "∃", neg: "¬", ldots: "…", cdots: "⋯", prime: "′",
  degree: "°", angle: "∠", emptyset: "∅", in: "∈", notin: "∉", subset: "⊂",
  supset: "⊃", subseteq: "⊆", supseteq: "⊇", cup: "∪", cap: "∩",
  land: "∧", lor: "∨", leftrightarrow: "↔", Leftarrow: "⇐", Rightarrow: "⇒",
  leftarrow: "←", rightarrow: "→", uparrow: "↑", downarrow: "↓",
};

export const LATEX_BINOP: Record<string, string> = {
  cdot: "·", times: "×", div: "÷", pm: "±", mp: "∓", le: "≤", ge: "≥",
  ne: "≠", approx: "≈", equiv: "≡", sim: "∼", propto: "∝", oplus: "⊕",
  otimes: "⊗", ast: "∗", star: "⋆", bullet: "•",
};

export const INLINE_PATTERNS: Array<[string, string]> = [
  ["image", "!\\[(?<imgAlt>[^\\]]*)\\]\\((?<imgSrc>[^)\\s]+)(?:\\s+[\"'](?<imgTitle>[^\"']*)[\"'])?\\)"],
  ["link", "\\[(?<linkText>[^\\]]+)\\]\\((?<linkHref>[^)\\s]+)(?:\\s+[\"'][^\"']*[\"'])?\\)"],
  ["cite2", "\\[\\[(?<cite2Id>\\d+)\\]\\]"],
  ["code", "(?<code>[^`]+)"],
  ["cite1", "\\[(?<cite1Id>\\d+)\\]"],
  ["mathBlock", "\\$\\$(?<mathBlockSrc>[^$]+)\\$\\$"],
  ["math", "\\$(?<mathSrc>[^$]+)\\$"],
  ["bold", "\\*\\*(?<boldSrc>[^*]+)\\*\\*"],
  ["bold2", "__(?<bold2Src>[^_]+)__"],
  ["italic", "\\*(?<italicSrc>[^*]+)\\*"],
  ["italic2", "_(?<italic2Src>[^_]+)_"],
  ["strike", "~~(?<strikeSrc>[^~]+)~~"],
];

export const INLINE_SOURCE = INLINE_PATTERNS.map(([, pattern]) => `(?:${pattern})`).join("|");
