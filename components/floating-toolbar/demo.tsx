import * as React from "react";
import type { FloatingToolbarAction } from "@/components/ui";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const BoldIcon = () => (
  <Icon>
    <path d="M7 4h6a4 4 0 010 8H7V4z" />
    <path d="M7 12h7a4 4 0 010 8H7v-8z" />
  </Icon>
);

const ItalicIcon = () => (
  <Icon>
    <path d="M10 4h8M14 20H6M13 4L9 20" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const UnderlineIcon = () => (
  <Icon>
    <path d="M7 4v6a5 5 0 0010 0V4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 20h14" strokeLinecap="round" />
  </Icon>
);

const StrikeIcon = () => (
  <Icon>
    <path d="M4 12h16M8 5h8M8 19h8" strokeLinecap="round" />
  </Icon>
);

const AlignLeftIcon = () => (
  <Icon>
    <path d="M4 6h16M4 10h11M4 14h16M4 18h11" strokeLinecap="round" />
  </Icon>
);

const AlignCenterIcon = () => (
  <Icon>
    <path d="M4 6h16M6 10h12M4 14h16M6 18h12" strokeLinecap="round" />
  </Icon>
);

const AlignRightIcon = () => (
  <Icon>
    <path d="M4 6h16M9 10h11M4 14h16M9 18h11" strokeLinecap="round" />
  </Icon>
);

const TextColorIcon = () => (
  <Icon>
    <path d="M7 16L12 5l5 11M8.8 12h6.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 20h14" strokeLinecap="round" />
  </Icon>
);

const HighlightIcon = () => (
  <Icon>
    <path d="M9 11l4 4L21 7l-4-4-8 8z" strokeLinejoin="round" />
    <path d="M9 11l-4 4 4 4 4-4M5 19l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const ClearIcon = () => (
  <Icon>
    <path d="M7 16L12 5l5 11M8.8 12h6.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 4l12 16" strokeLinecap="round" />
  </Icon>
);

const CutIcon = () => (
  <Icon>
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="6" cy="18" r="2.6" />
    <path d="M8.2 7.8L20 19M8.2 16.2L20 5" strokeLinecap="round" />
  </Icon>
);

const CopyIcon = () => (
  <Icon>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 012-2h10" />
  </Icon>
);

const PasteIcon = () => (
  <Icon>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 012-2h10" />
    <path d="M12 13h5M12 17h5" strokeLinecap="round" />
  </Icon>
);

const LinkIcon = () => (
  <Icon>
    <path
      d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7L12 5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7L12 19"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const MentionIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="3" />
    <path d="M21 12a9 9 0 11-5.6-8.3" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const EmojiIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 10h.01M15.5 10h.01" strokeWidth={2.6} strokeLinecap="round" />
    <path d="M8.5 14.5c1 1.3 2.3 2 3.5 2s2.5-.7 3.5-2" strokeLinecap="round" />
  </Icon>
);

const QuoteIcon = () => (
  <Icon>
    <path d="M6 17h3l2-4V7H5v6h3l-2 4z" fill="currentColor" stroke="none" />
    <path d="M14 17h3l2-4V7h-6v6h3l-2 4z" fill="currentColor" stroke="none" />
  </Icon>
);

function act(
  id: string,
  label: string,
  icon: React.ReactNode,
  extra: Partial<FloatingToolbarAction> = {}
): FloatingToolbarAction {
  return { id, label, icon, ...extra };
}

/** Full rich-text formatting toolbar (selection demo). */
export const formatActions: FloatingToolbarAction[][] = [
  [
    act("bold", "Bold", <BoldIcon />, { shortcut: "⌘B", active: true }),
    act("italic", "Italic", <ItalicIcon />, { shortcut: "⌘I" }),
    act("underline", "Underline", <UnderlineIcon />, { shortcut: "⌘U" }),
    act("strike", "Strikethrough", <StrikeIcon />, { shortcut: "⇧⌘X" }),
  ],
  [
    act("align-left", "Align left", <AlignLeftIcon />),
    act("align-center", "Align center", <AlignCenterIcon />),
    act("align-right", "Align right", <AlignRightIcon />),
  ],
  [
    act("text-color", "Text color", <TextColorIcon />),
    act("highlight", "Highlight", <HighlightIcon />),
    act("clear", "Clear formatting", <ClearIcon />),
  ],
];

/** Compact writing toolbar (sticky demo). */
export const noteActions: FloatingToolbarAction[][] = [
  [
    act("bold", "Bold", <BoldIcon />, { shortcut: "⌘B" }),
    act("italic", "Italic", <ItalicIcon />, { shortcut: "⌘I" }),
  ],
  [act("link", "Insert link", <LinkIcon />, { shortcut: "⌘K" })],
  [act("mention", "Mention", <MentionIcon />), act("emoji", "Emoji", <EmojiIcon />)],
];

/** Clipboard + quote actions (selection-aware demo). */
export const selectionActions: FloatingToolbarAction[][] = [
  [
    act("cut", "Cut", <CutIcon />, { shortcut: "⌘X" }),
    act("copy", "Copy", <CopyIcon />, { shortcut: "⌘C" }),
    act("paste", "Paste", <PasteIcon />, { shortcut: "⌘V" }),
  ],
  [act("quote", "Quote", <QuoteIcon />), act("link", "Link", <LinkIcon />)],
];
