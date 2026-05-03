import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedJobs } from "@/lib/api";
import { decodeHtmlEntities, flagEmojiForLocation } from "@/lib/jobs-page";
import { BookmarkButton } from "@/components/bookmark-button";

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

        {/* Jobs Grid (3 featured cards styled like job page sidebar) */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
          {featuredJobs.slice(0, 3).map((job) => {
            const title = decodeHtmlEntities(job.title);
            const company = decodeHtmlEntities(job.company);
            const location = decodeHtmlEntities(job.location || "Worldwide");
            const salary = job.salary ? decodeHtmlEntities(job.salary).trim() : "Not disclosed";

            return (
              <div key={job.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#14213d]">{title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{company}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                  <span className="text-lg">{flagEmojiForLocation(location)}</span>
                  <span className="truncate">{location}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {job.categories?.[0] && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {job.categories[0]}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-xs text-slate-500">Salary</div>
                  <div className="text-sm font-semibold text-[#0f172a]">{salary}</div>
                </div>

                <div className="space-y-2">
                  <Link href={`/jobs/${job.slug}`} className="block text-center bg-[#1e293b] text-white font-bold py-2 rounded">
                    Apply Now
                  </Link>
                  <BookmarkButton job={job} />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="px-8 h-12 text-base font-semibold bg-[#b10f2e] hover:bg-[#930d24]">
            <Link href="/jobs">
              View All Jobs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="px-8 h-12 text-base font-semibold border-2 border-[#b10f2e] text-[#b10f2e] hover:bg-[#f3c9d3]">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
