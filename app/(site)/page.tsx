import {
  HomeHero,
  HeroCodePreview,
  FeaturesSection,
  FeaturedComponents,
  CategoriesSection,
  StatsSection,
  FinalCTA,
} from "@/components/home";
import {
  getFeaturedComponents,
  getCategories,
} from "@/features/registry/server";

export default async function Home() {
  const [featured, categories] = await Promise.all([
    getFeaturedComponents(6),
    getCategories(),
  ]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="flex flex-col">
        <HomeHero />
        <HeroCodePreview />
        <FeaturesSection />
        <FeaturedComponents components={featured} />
        <CategoriesSection categories={categories} />
        <StatsSection />
        <FinalCTA />
      </div>
    </div>
  );
}
