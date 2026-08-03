"use client";

import Image from "next/image";
import type { Values } from "../types";
import { boxToCss, shadowToCss, sizeToCss } from "../utils/style";
import { Icon } from "../components/Icon";

const THEME_BG: Record<string, string> = {
  light: "#ffffff",
  dark: "#1e1e2f",
  midnight: "#0b1020",
};

const THEME_TEXT: Record<string, string> = {
  light: "#111827",
  dark: "#f3f4f6",
  midnight: "#cbd5e1",
};

const THEME_MUTED: Record<string, string> = {
  light: "#6b7280",
  dark: "#94a3b8",
  midnight: "#64748b",
};

/** Live preview target for the props editor demo. */
export function ProfileCard({ values }: { values: Values }) {
  const title = String(values.title ?? "");
  const subtitle = String(values.subtitle ?? "");
  const description = String(values.description ?? "");
  const image = String(values.image ?? "");
  const accent = String(values.accentColor ?? "#6366f1");
  const theme = String(values.theme ?? "light");
  const size = String(values.size ?? "md");
  const rounded = Number(values.rounded ?? 16);
  const showBadge = Boolean(values.showBadge);

  const sizeScale = size === "sm" ? 0.8 : size === "lg" ? 1.2 : 1;

  const styles: Record<string, React.CSSProperties> = {
    card: {
      backgroundColor: THEME_BG[theme],
      color: THEME_TEXT[theme],
      borderRadius: `${rounded}px`,
      boxShadow: shadowToCss(String(values.shadow ?? "none")),
      padding: boxToCss(values.padding as never),
      margin: boxToCss(values.margin as never),
      width: sizeToCss(values.width as never),
      height: sizeToCss(values.height as never),
      transform: `scale(${sizeScale})`,
      transformOrigin: "top center",
      transition: "all 200ms ease",
    },
    subtitle: { color: accent },
    muted: { color: THEME_MUTED[theme] },
  };

  return (
    <div style={styles.card} className="flex flex-col gap-3">
      {showBadge && (
        <span
          className="flex w-max items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
          PRO
        </span>
      )}
      {image ? (
        <Image
          src={image}
          alt="Avatar"
          width={64}
          height={64}
          unoptimized
          className="h-16 w-16 rounded-full border-2 object-cover"
          style={{ borderColor: accent }}
        />
      ) : (
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          <Icon name={String(values.icon ?? "user")} width={28} height={28} />
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <p className="text-sm font-medium" style={styles.subtitle}>
          {subtitle}
        </p>
      </div>
      <p className="text-sm leading-relaxed" style={styles.muted}>
        {description}
      </p>
    </div>
  );
}
