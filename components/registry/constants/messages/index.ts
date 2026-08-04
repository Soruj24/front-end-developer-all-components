import { messageDefault } from "./message-default";
import { messageBubble } from "./message-bubble";
import { messageStatus } from "./message-status";
import { messageAvatar } from "./message-avatar";
import type { RegistryEntry } from "../../types";

export const messages: RegistryEntry[] = [
  messageDefault,
  messageBubble,
  messageStatus,
  messageAvatar,
];
