import { tags as t, highlightTree, tagHighlighter, type Tag } from "@lezer/highlight";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import type { LanguageSupport } from "@codemirror/language";

export type SyntaxToken = {
  from: number;
  to: number;
  text: string;
  className: string;
};

export type SupportedLanguage =
  | "typescript"
  | "tsx"
  | "javascript"
  | "jsx"
  | "css"
  | "html"
  | "json"
  | "bash"
  | "plaintext";

const TAG_TO_CLASS: [Tag, string][] = [
  [t.keyword, "tok-keyword"],
  [t.controlKeyword, "tok-keyword"],
  [t.definitionKeyword, "tok-keyword"],
  [t.moduleKeyword, "tok-keyword"],
  [t.operatorKeyword, "tok-keyword"],
  [t.self, "tok-keyword"],
  [t.operator, "tok-operator"],
  [t.punctuation, "tok-punct"],
  [t.squareBracket, "tok-punct"],
  [t.brace, "tok-punct"],
  [t.paren, "tok-punct"],
  [t.derefOperator, "tok-punct"],
  [t.string, "tok-string"],
  [t.regexp, "tok-string"],
  [t.escape, "tok-string"],
  [t.special(t.string), "tok-string"],
  [t.number, "tok-number"],
  [t.integer, "tok-number"],
  [t.float, "tok-number"],
  [t.bool, "tok-number"],
  [t.null, "tok-number"],
  [t.comment, "tok-comment"],
  [t.lineComment, "tok-comment"],
  [t.blockComment, "tok-comment"],
  [t.docComment, "tok-comment"],
  [t.typeName, "tok-type"],
  [t.className, "tok-type"],
  [t.tagName, "tok-tag"],
  [t.attributeName, "tok-attr"],
  [t.attributeValue, "tok-string"],
  [t.propertyName, "tok-prop"],
  [t.function(t.variableName), "tok-function"],
  [t.function(t.propertyName), "tok-function"],
  [t.name, "tok-plain"],
  [t.variableName, "tok-plain"],
];

const customHighlighter = tagHighlighter(
  TAG_TO_CLASS.map(([tag, className]) => ({ tag, class: className })),
);

function getLanguageParser(lang: SupportedLanguage): LanguageSupport | null {
  switch (lang) {
    case "tsx":
      return javascript({ jsx: true, typescript: true });
    case "typescript":
      return javascript({ jsx: false, typescript: true });
    case "jsx":
      return javascript({ jsx: true, typescript: false });
    case "javascript":
      return javascript({ jsx: false, typescript: false });
    case "css":
      return css();
    case "html":
      return html();
    case "json":
      return json();
    default:
      return null;
  }
}

function tokenizePlainText(code: string): SyntaxToken[] {
  return [{ from: 0, to: code.length, text: code, className: "tok-plain" }];
}

export function tokenize(
  code: string,
  language: SupportedLanguage,
): SyntaxToken[] {
  if (!code) return [];

  if (language === "bash" || language === "plaintext") {
    return tokenizePlainText(code);
  }

  const parser = getLanguageParser(language);
  if (!parser) return tokenizePlainText(code);

  try {
    const tree = parser.language.parser.parse(code);
    const tokens: SyntaxToken[] = [];
    let pos = 0;

    highlightTree(
      tree,
      customHighlighter,
      (from: number, to: number, classes: string) => {
        if (from > pos) {
          tokens.push({
            from: pos,
            to: from,
            text: code.slice(pos, from),
            className: "tok-plain",
          });
        }
        tokens.push({
          from,
          to,
          text: code.slice(from, to),
          className: classes || "tok-plain",
        });
        pos = to;
      },
    );

    if (pos < code.length) {
      tokens.push({
        from: pos,
        to: code.length,
        text: code.slice(pos),
        className: "tok-plain",
      });
    }

    return tokens;
  } catch {
    return tokenizePlainText(code);
  }
}
