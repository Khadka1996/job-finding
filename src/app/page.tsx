import { getMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/sections/hero";
import { SearchBar } from "@/components/search-bar";
import { IndustryClassifications } from "@/components/industry-classifications";
import { FeaturedJobsSection } from "@/components/sections/featured-jobs";
import { CountriesSection } from "@/components/sections/countries";
import { FeaturesSection } from "@/components/sections/features";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { CTASection } from "@/components/sections/cta";
import { getJobs } from "@/lib/api";

export const metadata = getMetadata({
  title: "Find Visa Sponsored Jobs Worldwide | Visa Sponsor Jobs",
  description: "Explore 50K+ verified visa sponsorship jobs worldwide. Search jobs in UK, Australia, Canada, USA, UAE, and 180+ countries. Fast filters, real opportunities, direct apply links.",
});

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const jobsResult = await getJobs({ page: "1" });

  return (
    <div>
      {/* Hero Section */}
      <HeroSection activeJobs={jobsResult.total} />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Quick Search Section */}
        <section className="mt-8 space-y-10 lg:mt-10">
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <div className="h-1 w-12 rounded-full bg-linear-to-r from-[#b10f2e] to-[#d61d4f]" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b10f2e]">Quick Search</p>
            </div>
            <h2 className="text-3xl font-bold text-[#14213d]">Visa Sponsorship Jobs.</h2>
            <h3 className="text-2xl font-semibold text-[#14213d]">and Globally. Easily.</h3>
            <p className="mx-auto max-w-2xl text-slate-600 sm:mx-0">okey</p>
          </div>

          <SearchBar />
        </section>
      </div>

      {/* Countries Section */}
      <CountriesSection />

      {/* Industry Section */}
      <IndustryClassifications />

      {/* Featured Jobs Section */}
      <FeaturedJobsSection />

      {/* Features Section */}
      <FeaturesSection />


      {/* How It Works Section */}
      <HowItWorksSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
