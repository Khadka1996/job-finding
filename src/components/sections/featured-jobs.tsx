import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { getFeaturedJobs } from "@/lib/api";

export async function FeaturedJobsSection() {
  const featuredJobs = await getFeaturedJobs();

  if (!featuredJobs || featuredJobs.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#b10f2e]">
                Featured Opportunities
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213d]">
                Latest Visa Sponsor Jobs
              </h2>
            </div>
          </div>
          <p className="max-w-3xl text-base sm:text-lg text-slate-600">
            Handpicked opportunities from top employers worldwide looking for international talent.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} featured />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button asChild className="px-8 h-12 text-base font-semibold">
            <Link href="/jobs">
              View All Jobs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
