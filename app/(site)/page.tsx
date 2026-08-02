import {
  HomeHero,
  HomeFeatureGrid,
  HomePopularComponents,
  HomeCategories,
  HomeCodePreview,
  HomeInstallation,
  HomeWhyUs,
  HomeSponsors,
  HomeTestimonials,
  HomeLatestComponents,
  HomeDeveloperExperience,
  HomeFooter,
} from "@/components/home";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px] dark:bg-accent/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-12rem] top-[68rem] -z-10 h-[26rem] w-[42rem] rounded-full bg-violet-500/10 blur-[130px] dark:bg-violet-500/[0.07]"
        aria-hidden="true"
      />

      <div className="flex flex-col">
        <HomeHero />
        <HomeFeatureGrid />
        <HomePopularComponents />
        <HomeCategories />
        <HomeCodePreview />
        <HomeInstallation />
        <HomeWhyUs />
        <HomeSponsors />
        <HomeTestimonials />
        <HomeLatestComponents />
        <HomeDeveloperExperience />
        <HomeFooter />
      </div>
    </div>
  );
}
