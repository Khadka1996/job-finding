import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ArrowUpRight, Building2, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";
import { ShareButtons } from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getJobBySlug, getJobs } from "@/lib/api";
import { generateJobMetadata, generateJobStructuredData, siteConfig } from "@/lib/metadata";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job not found",
    };
  }

  return generateJobMetadata(job, siteConfig.url);
}

export const revalidate = 3600; // Revalidate every hour

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const similarJobs = (await getJobs({ q: job.title.split(" ")[0], page: "1" })).jobs.filter((item) => item.slug !== job.slug).slice(0, 2);

  const structuredData = generateJobStructuredData(job, siteConfig.url);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* JSON-LD Structured Data */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        suppressHydrationWarning
      />

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="space-y-4 md:space-y-6">
          <Card>
            <CardContent className="space-y-6 p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={job.visaSponsorship ? "success" : "muted"}>{job.visaSponsorship ? "Visa sponsorship available" : "Review sponsorship details"}</Badge>
                {job.remote ? <Badge variant="accent">Remote friendly</Badge> : null}
                <span className="rounded-full bg-[#eef2fb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#14213d]">Source: {job.source}</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-950 text-balance">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" />{job.company}</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{job.countryFlag} {job.location}</span>
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(job.postedAt))}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href={job.applyUrl} target="_blank" rel="noreferrer">
                    Apply
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <BookmarkButton job={job} />
              </div>

              <Separator />

              <div className="prose-safe max-w-none">
                <h2>Full description</h2>
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">Why candidates click through</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Visa sponsorship", text: job.visaSponsorship ? "Highlighted when the listing suggests relocation or work permit support." : "This role does not explicitly mention sponsorship in the source copy." },
                  { title: "Apply externally", text: "Clear outbound links keep the application path short and conversion-friendly." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </article>

        <aside className="space-y-4 md:space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="space-y-5 p-3 sm:p-4 md:p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Apply</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">External application link</h2>
              </div>
              <a href={job.applyUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 min-h-12 text-sm font-semibold text-white transition hover:bg-slate-800">
                Apply
                <Sparkles className="h-4 w-4" />
              </a>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                Be ready with your resume, visa status summary, and a short note on relocation availability.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-950">Job info</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <p><span className="font-medium text-slate-950">Company:</span> {job.company}</p>
                <p><span className="font-medium text-slate-950">Location:</span> {job.countryFlag} {job.location}</p>
                <p><span className="font-medium text-slate-950">Country:</span> {job.countryName}</p>
                <p><span className="font-medium text-slate-950">Job type:</span> {job.jobTypes.join(", ")}</p>
                <p><span className="font-medium text-slate-950">Salary:</span> {job.salary ?? "Not disclosed"}</p>
                <p><span className="font-medium text-slate-950">Visa:</span> {job.visaSponsorship ? "Yes" : "Check"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-950">Share this job</h3>
              <ShareButtons job={job} />
            </CardContent>
          </Card>

          {similarJobs.length > 0 ? (
            <Card>
              <CardContent className="space-y-4 p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-950">Similar jobs</h3>
                <div className="space-y-3">
                  {similarJobs.map((similarJob) => (
                    <a key={similarJob.slug} href={`/jobs/${similarJob.slug}`} className="block rounded-2xl border border-slate-200 p-4 transition hover:border-sky-200 hover:bg-sky-50/40">
                      <p className="font-medium text-slate-950">{similarJob.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{similarJob.company}</p>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </aside>
      </div>
    </div>
  );
}