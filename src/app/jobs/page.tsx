import type { Metadata } from "next";
import { SearchBar } from "@/components/search-bar";
import { Filters } from "@/components/filters";
import { JobCard } from "@/components/job-card";
import { Pagination } from "@/components/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { getJobs } from "@/lib/api";
import type { JobSearchParams } from "@/types/job";

type JobsPageProps = {
  searchParams: Promise<JobSearchParams>;
};

export const metadata: Metadata = {
  title: "Jobs",
  description: "Browse visa sponsored jobs with filters for location, job type, and sponsorship availability.",
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const result = await getJobs(params);
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="space-y-6 rounded-4xl border border-[#d6deec] bg-[linear-gradient(135deg,rgba(177,15,46,0.08),rgba(255,255,255,0.96),rgba(20,33,61,0.1))] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b10f2e]">Job listings</p>
            <h1 className="text-4xl font-semibold tracking-tight text-[#14213d] text-balance">Find Visa Sponsorship Jobs</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Search and filter sponsor-friendly roles across countries and industries. Each listing shows its source and takes you to the original application page.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#d6deec] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Total jobs</p>
              <p className="mt-2 text-3xl font-semibold text-[#14213d]">{result.total}</p>
            </div>
            <div className="rounded-3xl border border-[#d6deec] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">On this page</p>
              <p className="mt-2 text-3xl font-semibold text-[#14213d]">{result.jobs.length}</p>
            </div>
            <div className="rounded-3xl border border-[#d6deec] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Page</p>
              <p className="mt-2 text-3xl font-semibold text-[#14213d]">{result.page}/{result.totalPages}</p>
            </div>
          </div>
        </div>

        <SearchBar compact action="/jobs" titleValue={params.q ?? ""} locationValue={params.location ?? ""} industryValue={params.industry ?? ""} />
        <Filters values={params} />
      </section>

      <section className="mt-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Showing {result.jobs.length} of {result.total} jobs found
          </p>
          <p className="text-sm text-slate-500">Page {result.page} of {result.totalPages}</p>
        </div>

        {result.jobs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {result.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <h2 className="text-2xl font-semibold text-[#14213d]">
                {result.apiStatus === "unavailable" ? "Live API is temporarily unavailable" : "No jobs matched your filters"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {result.apiStatus === "unavailable"
                  ? "This page combines multiple live job APIs. Please retry shortly while upstream sources recover."
                  : "Try a broader keyword search or remove one of the filters to see more sponsor-friendly roles."}
              </p>
            </CardContent>
          </Card>
        )}

        <Pagination page={result.page} totalPages={result.totalPages} params={query} />
      </section>
    </div>
  );
}