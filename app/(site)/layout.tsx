import { SiteHeader } from "@/components/layout/SiteHeader";
import { Sidebar } from "@/components/navigation";
import { Footer } from "@/components/design-system/Footer";
import { getNavigationSections, getNavbarLinks } from "@/features/registry/server";

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
  const [sections, navLinks] = await Promise.all([
    getNavigationSections(),
    getNavbarLinks(),
  ]);

  return (
    <>
      <SiteHeader navLinks={navLinks} />
      <div className="flex flex-1">
        <Sidebar sections={sections} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
