import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/page";
import { getNavigationSections } from "@/features/registry/server";
import { LAYOUT } from "@/constants/tokens";
import { cn } from "@/lib/cn";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections = await getNavigationSections();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header version="v2.0" userName="Developer" role="user" sections={sections} />

      <div className="flex flex-1">
        <Sidebar sections={sections} />

        <main id="main-content" tabIndex={-1} className={cn("min-w-0 flex-1 focus:outline-none", LAYOUT.px, "pb-16 pt-6 lg:pt-8")}>
          <div className={cn(LAYOUT.maxWidth, "mx-auto min-w-0")}>
            <Breadcrumbs className="mb-5" />
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
