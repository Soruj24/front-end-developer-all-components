"use client";

import { AuthTab, BodyTab } from "./AuthBody";
import { HeadersTab, ParamsTab } from "./KeyValue";
import type { RequestTabPanelProps } from "./types";

export function RequestTabPanel(props: RequestTabPanelProps) {
  if (props.tab === "params") return <ParamsTab {...props} />;
  if (props.tab === "headers") return <HeadersTab {...props} />;
  if (props.tab === "auth") return <AuthTab {...props} />;
  return <BodyTab {...props} />;
}
