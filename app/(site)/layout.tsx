import { SiteHeader } from "@/components/layout";
import { Sidebar } from "@/components/navigation";
import { getNavigationSections, getNavbarLinks } from "@/features/registry/server";

/**
 * Public-facing site chrome: global header and documentation sidebar.
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
    </>
  );
}
