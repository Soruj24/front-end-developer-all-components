import { bubbleDefault } from "./bubble-default";
import { bubbleVariants } from "./bubble-variants";
import { bubbleSizes } from "./bubble-sizes";
import { bubbleWithTail } from "./bubble-with-tail";
import { bubbleChatLayout } from "./bubble-chat-layout";
import { bubbleWithIcon } from "./bubble-with-icon";
import { bubbleStatus } from "./bubble-status";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Bubble page. */
export const bubbles: RegistryEntry[] = [
  bubbleDefault,
  bubbleVariants,
  bubbleSizes,
  bubbleWithTail,
  bubbleChatLayout,
  bubbleWithIcon,
  bubbleStatus,
];
