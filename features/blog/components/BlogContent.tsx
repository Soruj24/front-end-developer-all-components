"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";

interface BlogContentProps {
  content: string;
  className?: string;
}

function parseMarkdownToSections(markdown: string) {
  const lines = markdown.trim().split("\n");
  const sections: { type: string; content: string; id: string }[] = [];
  let currentSection = { type: "p", content: "", id: "" };
  let inCodeBlock = false;
  let codeContent = "";

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeContent = "";
      } else {
        inCodeBlock = false;
        sections.push({
          type: "code",
          content: codeContent.trim(),
          id: "",
        });
        codeContent = "";
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      continue;
    }

    const h2Match = line.match(/^## (.+)/);
    const h3Match = line.match(/^### (.+)/);

    if (h2Match) {
      if (currentSection.content.trim()) {
        sections.push(currentSection);
      }
      const id = h2Match[1]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      currentSection = { type: "h2", content: h2Match[1], id };
      sections.push(currentSection);
      currentSection = { type: "p", content: "", id: "" };
      continue;
    }

    if (h3Match) {
      if (currentSection.content.trim()) {
        sections.push(currentSection);
      }
      const id = h3Match[1]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      currentSection = { type: "h3", content: h3Match[1], id };
      sections.push(currentSection);
      currentSection = { type: "p", content: "", id: "" };
      continue;
    }

    if (line.trim() === "") {
      if (currentSection.content.trim()) {
        sections.push(currentSection);
        currentSection = { type: "p", content: "", id: "" };
      }
      continue;
    }

    currentSection.content += (currentSection.content ? "\n" : "") + line;
  }

  if (currentSection.content.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground/80"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return (
          <strong key={`${i}-${j}`} className="font-semibold text-foreground">
            {bp.slice(2, -2)}
          </strong>
        );
      }
      return bp;
    });
  });
}

function renderList(text: string) {
  const items = text.split("\n").filter((l) => l.trim().startsWith("- "));
  return (
    <ul className="my-4 space-y-2 pl-6">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative text-muted-foreground before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/40"
        >
          {renderInlineCode(item.replace(/^-\s+/, ""))}
        </li>
      ))}
    </ul>
  );
}

function renderNumberedList(text: string) {
  const items = text
    .split("\n")
    .filter((l) => /^\d+\.\s/.test(l.trim()));
  return (
    <ol className="my-4 space-y-2 pl-6 list-decimal">
      {items.map((item, i) => (
        <li key={i} className="text-muted-foreground">
          {renderInlineCode(item.replace(/^\d+\.\s+/, ""))}
        </li>
      ))}
    </ol>
  );
}

function CodeBlock({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/50 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm font-mono text-muted-foreground">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-4 select-none text-right text-xs text-muted-foreground/40">
                {i + 1}
              </span>
              <span>{line || " "}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function Paragraph({ text }: { text: string }) {
  const lines = text.split("\n");
  const hasList = lines.some((l) => l.trim().startsWith("- "));
  const hasNumberedList = lines.some((l) => /^\d+\.\s/.test(l.trim()));

  if (hasList) {
    const listItems = lines.filter((l) => l.trim().startsWith("- "));
    const otherLines = lines.filter((l) => !l.trim().startsWith("- "));
    return (
      <div className="my-4">
        {otherLines.length > 0 && (
          <p className="mb-4 leading-7 text-muted-foreground">
            {renderInlineCode(otherLines.join("\n"))}
          </p>
        )}
        {renderList(listItems.join("\n"))}
      </div>
    );
  }

  if (hasNumberedList) {
    const listItems = lines.filter((l) => /^\d+\.\s/.test(l.trim()));
    const otherLines = lines.filter((l) => !/^\d+\.\s/.test(l.trim()));
    return (
      <div className="my-4">
        {otherLines.length > 0 && (
          <p className="mb-4 leading-7 text-muted-foreground">
            {renderInlineCode(otherLines.join("\n"))}
          </p>
        )}
        {renderNumberedList(listItems.join("\n"))}
      </div>
    );
  }

  return (
    <p className="my-4 leading-7 text-muted-foreground">
      {renderInlineCode(text)}
    </p>
  );
}

export function BlogContent({ content, className }: BlogContentProps) {
  const sections = useMemo(() => parseMarkdownToSections(content), [content]);

  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        className,
      )}
    >
      {sections.map((section, i) => {
        if (section.type === "h2") {
          return (
            <h2
              key={i}
              id={section.id}
              className="mb-4 mt-10 text-2xl font-bold tracking-tight text-foreground"
            >
              {section.content}
            </h2>
          );
        }
        if (section.type === "h3") {
          return (
            <h3
              key={i}
              id={section.id}
              className="mb-3 mt-8 text-lg font-semibold text-foreground"
            >
              {section.content}
            </h3>
          );
        }
        if (section.type === "code") {
          return <CodeBlock key={i} content={section.content} />;
        }
        return <Paragraph key={i} text={section.content} />;
      })}
    </div>
  );
}
