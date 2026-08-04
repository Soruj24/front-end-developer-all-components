import { messageScrollerDefault } from "./message-scroller-default";
import { messageScrollerScrollButton } from "./message-scroller-scroll-button";
import { messageScrollerEmpty } from "./message-scroller-empty";
import type { RegistryEntry } from "../../types";

export const messageScrollers: RegistryEntry[] = [
  messageScrollerDefault,
  messageScrollerScrollButton,
  messageScrollerEmpty,
];
