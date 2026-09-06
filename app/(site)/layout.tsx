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
      <Header version="v2.0" userName="Developer" role="user" sections={sections} />

      <div className="flex flex-1">
        <Sidebar sections={sections} />

        <main className={cn("min-w-0 flex-1", LAYOUT.px, "pb-16 pt-6 lg:pt-8")}>
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
