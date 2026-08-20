import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { getNavigationSections } from "@/features/registry/server";

/**
 * Public-facing site chrome: global header, documentation sidebar, and footer.
 * Every marketing / component-docs page renders inside this shell, while
 * the admin group ships its own dedicated shell.
 */
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections = await getNavigationSections();

  return (
    <>
      <Header
        version="v2.0"
        userName="Developer"
        role="user"
      />
      <div className="flex flex-1">
        <Sidebar sections={sections} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
