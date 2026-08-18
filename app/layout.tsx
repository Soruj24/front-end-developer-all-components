import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteMetadata, siteViewport } from "@/config/site";
import "@/styles/globals.css";
import { ThemeInit } from "@/components/theme-init";

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
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
