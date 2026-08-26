"use client";

import { useEffect, useRef, useCallback } from "react";
import * as view from "@codemirror/view";
import * as state from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import * as commands from "@codemirror/commands";
import * as lang from "@codemirror/language";
import * as autocomplete from "@codemirror/autocomplete";
import * as search from "@codemirror/search";
import * as lint from "@codemirror/lint";
import { tags as t } from "@lezer/highlight";
import type { CodeMirrorProps, CodeMirrorLanguage } from "./CodeMirror.types";

const THEME_BASE = view.EditorView.theme({
  "&": {
    height: "100%",
    fontSize: "13px",
  },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },
  ".cm-content": {
    padding: "8px 0",
  },
  ".cm-gutters": {
    minWidth: "44px",
    backgroundColor: "transparent",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#aeafad",
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "rgba(62, 164, 245, 0.2) !important",
  },
  ".cm-selectionBackground": {
    backgroundColor: "rgba(62, 164, 245, 0.15)",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#9ca3af",
    borderRadius: "3px",
    padding: "0 4px",
  },
  ".cm-matchingBracket": {
    backgroundColor: "rgba(229, 192, 123, 0.2)",
    outline: "1px solid rgba(229, 192, 123, 0.4)",
    borderRadius: "2px",
  },
  ".cm-tooltip": {
    backgroundColor: "#1f1f23",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li": {
      padding: "4px 8px",
    },
    "& > ul > li[aria-selected]": {
      backgroundColor: "rgba(62, 164, 245, 0.15)",
    },
  },
  ".cm-panels": {
    backgroundColor: "#1f1f23",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  ".cm-panel.cm-search": {
    backgroundColor: "#252526",
  },
  ".cm-textfield": {
    backgroundColor: "#3c3c3c",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#d4d4d8",
    borderRadius: "3px",
  },
  ".cm-button": {
    backgroundColor: "#3c3c3c",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#d4d4d8",
    borderRadius: "3px",
  },
});

const DARK_SYNTAX = lang.HighlightStyle.define([
  { tag: t.keyword, color: "#c678dd" },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: "#e06c75" },
  { tag: [t.propertyName], color: "#e5c07b" },
  { tag: [t.function(t.variableName), t.labelName], color: "#61afef" },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: "#d19a66" },
  { tag: [t.definition(t.name), t.separator], color: "#abb2bf" },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: "#e5c07b" },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: "#56b6c2" },
  { tag: [t.meta, t.comment], color: "#5c6370", fontStyle: "italic" },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: "#61afef", textDecoration: "underline" },
  { tag: t.heading, fontWeight: "bold", color: "#e06c75" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#d19a66" },
  { tag: [t.processingInstruction, t.string, t.inserted], color: "#98c379" },
  { tag: t.invalid, color: "#f44747" },
  { tag: t.tagName, color: "#e06c75" },
  { tag: t.attributeName, color: "#d19a66" },
  { tag: t.attributeValue, color: "#98c379" },
  { tag: t.bracket, color: "#abb2bf" },
  { tag: t.meta, color: "#61afef" },
]);

const LIGHT_SYNTAX = lang.HighlightStyle.define([
  { tag: t.keyword, color: "#a626a4" },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: "#e45649" },
  { tag: [t.propertyName], color: "#986801" },
  { tag: [t.function(t.variableName), t.labelName], color: "#4078f2" },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: "#986801" },
  { tag: [t.definition(t.name), t.separator], color: "#383a42" },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: "#c18401" },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: "#0184bc" },
  { tag: [t.meta, t.comment], color: "#a0a1a7", fontStyle: "italic" },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: "#4078f2", textDecoration: "underline" },
  { tag: t.heading, fontWeight: "bold", color: "#e45649" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#986801" },
  { tag: [t.processingInstruction, t.string, t.inserted], color: "#50a14f" },
  { tag: t.invalid, color: "#f44747" },
  { tag: t.tagName, color: "#e45649" },
  { tag: t.attributeName, color: "#986801" },
  { tag: t.attributeValue, color: "#50a14f" },
  { tag: t.bracket, color: "#383a42" },
  { tag: t.meta, color: "#4078f2" },
]);

const LIGHT_THEME = view.EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "#ffffff",
    color: "#383a42",
  },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },
  ".cm-content": {
    caretColor: "#526fff",
    padding: "8px 0",
  },
  ".cm-gutters": {
    backgroundColor: "#ffffff",
    color: "#abb2bf",
    borderRight: "1px solid #e5e5e6",
    minWidth: "44px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#f0f0f1",
  },
  ".cm-activeLine": {
    backgroundColor: "#f0f0f1",
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#526fff",
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "rgba(82, 111, 255, 0.2) !important",
  },
  ".cm-selectionBackground": {
    backgroundColor: "rgba(82, 111, 255, 0.15)",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "#f0f0f1",
    border: "1px solid #d0d0d1",
    color: "#6a6a72",
    borderRadius: "3px",
    padding: "0 4px",
  },
  ".cm-matchingBracket": {
    backgroundColor: "rgba(152, 104, 1, 0.15)",
    outline: "1px solid rgba(152, 104, 1, 0.3)",
    borderRadius: "2px",
  },
  ".cm-tooltip": {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e6",
    borderRadius: "6px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li": {
      padding: "4px 8px",
    },
    "& > ul > li[aria-selected]": {
      backgroundColor: "rgba(82, 111, 255, 0.1)",
    },
  },
}, { dark: false });

function getLanguageExtension(lang: CodeMirrorLanguage) {
  switch (lang) {
    case "javascript":
      return javascript();
    case "typescript":
      return javascript({ typescript: true });
    case "tsx":
      return javascript({ jsx: true, typescript: true });
    case "jsx":
      return javascript({ jsx: true });
    case "css":
      return css();
    case "json":
      return json();
    case "markdown":
      return markdown();
    case "html":
      return html();
    default:
      return javascript({ jsx: true, typescript: true });
  }
}

function detectLanguage(filename: string): CodeMirrorLanguage {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "tsx") return "tsx";
  if (ext === "jsx") return "jsx";
  if (ext === "ts") return "typescript";
  if (ext === "js") return "javascript";
  if (ext === "css" || ext === "scss" || ext === "less") return "css";
  if (ext === "json") return "json";
  if (ext === "md" || ext === "mdx") return "markdown";
  if (ext === "html" || ext === "htm") return "html";
  return "typescript";
}

export function CodeMirror({
  value,
  onChange,
  language,
  theme = "dark",
  readOnly = false,
  fontSize = 13,
  tabSize = 2,
  lineNumbers = true,
  highlightActiveLine: highlightActiveLineProp = true,
  highlightActiveLineGutter: highlightActiveLineGutterProp = true,
  foldGutter: foldGutterProp = true,
  bracketMatching: bracketMatchingProp = true,
  closeBrackets: closeBracketsProp = true,
  autocompletion: autocompletionProp = true,
  indentOnInput: indentOnInputProp = true,
  placeholder,
  minHeight,
  className,
  onKeyDown,
  onFocus,
  onBlur,
  onCreateEditor,
}: CodeMirrorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<view.EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const onKeyDownRef = useRef(onKeyDown);
  const onFocusRef = useRef(onFocus);
  const onBlurRef = useRef(onBlur);
  const valueRef = useRef(value);
  const isInternalChange = useRef(false);

  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { onKeyDownRef.current = onKeyDown; }, [onKeyDown]);
  useEffect(() => { onFocusRef.current = onFocus; }, [onFocus]);
  useEffect(() => { onBlurRef.current = onBlur; }, [onBlur]);
  useEffect(() => { valueRef.current = value; }, [value]);

  const resolvedLang = language ?? detectLanguage("file.tsx");

  useEffect(() => {
    if (!containerRef.current) return;

    const extensions = [
      view.lineNumbers(),
      view.highlightActiveLineGutter(),
      commands.history(),
      lang.foldGutter(),
      view.drawSelection(),
      lang.indentOnInput(),
      lang.bracketMatching(),
      autocomplete.closeBrackets(),
      autocomplete.autocompletion(),
      view.rectangularSelection(),
      view.crosshairCursor(),
      view.highlightActiveLine(),
      search.highlightSelectionMatches(),
      view.highlightSpecialChars(),
      view.keymap.of([
        ...autocomplete.closeBracketsKeymap,
        ...commands.defaultKeymap,
        ...search.searchKeymap,
        ...commands.historyKeymap,
        ...lang.foldKeymap,
        ...autocomplete.completionKeymap,
        ...lint.lintKeymap,
        commands.indentWithTab,
      ]),
      getLanguageExtension(resolvedLang),
      theme === "dark" ? [oneDark, THEME_BASE, DARK_SYNTAX] : [LIGHT_THEME, LIGHT_SYNTAX],
      view.EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          isInternalChange.current = true;
          onChangeRef.current?.(update.state.doc.toString());
          isInternalChange.current = false;
        }
        if (update.focusChanged) {
          if (update.view.hasFocus) {
            onFocusRef.current?.();
          } else {
            onBlurRef.current?.();
          }
        }
      }),
      view.EditorView.domEventHandlers({
        keydown: (event) => {
          onKeyDownRef.current?.(event);
        },
      }),
      state.EditorState.tabSize.of(tabSize),
      view.EditorView.lineWrapping,
    ];

    if (readOnly) extensions.push(state.EditorState.readOnly.of(true));
    if (placeholder) extensions.push(view.EditorView.contentAttributes.of({ "aria-placeholder": placeholder }));

    const editorState = state.EditorState.create({
      doc: valueRef.current,
      extensions,
    });

    const cmView = new view.EditorView({
      state: editorState,
      parent: containerRef.current,
    });

    viewRef.current = cmView;
    onCreateEditor?.(cmView);

    return () => {
      editorView.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedLang, theme, readOnly, tabSize, lineNumbers, foldGutterProp, bracketMatchingProp, closeBracketsProp, autocompletionProp, indentOnInputProp]);

  useEffect(() => {
    const editorView = viewRef.current;
    if (!editorView) return;
    const current = editorView.state.doc.toString();
    if (current !== value) {
      editorView.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  useEffect(() => {
    const editorView = viewRef.current;
    if (!editorView) return;
    editorView.dispatch({
      effects: view.EditorView.scrollIntoView(0, { y: "start" }),
    });
  }, [value, resolvedLang]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={minHeight ? { minHeight } : undefined}
    />
  );
}
