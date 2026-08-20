import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { getNavigationSections } from "@/features/registry/server";
import { LAYOUT, BG } from "@/constants/tokens";
import { cn } from "@/lib/cn";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections = await getNavigationSections();

  return (
    <div className={cn("flex min-h-screen flex-col", BG.base)}>
      <Header version="v2.0" userName="Developer" role="user" />

      <div className="flex flex-1">
        <Sidebar sections={sections} />

        <main
          className={cn(
            "min-w-0 flex-1",
            LAYOUT.px,
            "py-8",
          )}
        >
          <div className={cn(LAYOUT.maxWidth, "mx-auto")}>{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
