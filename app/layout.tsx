import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteMetadata, siteViewport } from "@/config/site";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = siteViewport;

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = (() => {
                  try { return localStorage.getItem("theme"); } catch (e) { return null; }
                })();
                const mq = window.matchMedia("(prefers-color-scheme: dark)");
                const apply = (dark) => {
                  document.documentElement.classList.toggle("dark", dark);
                };
                if (stored === "dark") apply(true);
                else if (stored === "light") apply(false);
                else {
                  apply(mq.matches);
                  mq.addEventListener("change", (e) => {
                    if (!localStorage.getItem("theme")) apply(e.matches);
                  });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
