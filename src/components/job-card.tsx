import Link from "next/link";
import { ArrowUpRight, Building2, MapPin, Sparkles } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";
import { ShareButtons } from "@/components/share-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildJobPath } from "@/lib/api";
import type { Job } from "@/types/job";

type JobCardProps = {
  job: Job;
  featured?: boolean;
};

export function JobCard({ job, featured = false }: JobCardProps) {
  return (
    <Card className={`group overflow-hidden border-[#d6deec] transition duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#14213d]/10 ${featured ? "ring-2 ring-[#f3c9d3]" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={job.visaSponsorship ? "success" : "muted"}>{job.visaSponsorship ? "Visa sponsorship" : "Open to all"}</Badge>
              {job.remote ? <Badge variant="accent">Remote</Badge> : null}
              <span className="rounded-full bg-[#eef2fb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#14213d]">
                {job.source}
              </span>
            </div>
            <CardTitle className="text-balance">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {job.company}
            </CardDescription>
          </div>
          <BookmarkButton job={job} compact />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>{job.countryFlag}</span>
            <span>{job.location}</span>
          </span>
        </CardDescription>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{job.shortDescription}</p>

        <div className="flex flex-wrap gap-2">
          {job.categories.slice(0, 3).map((category) => (
            <span key={category} className="rounded-full bg-[#f4f6fb] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#475569]">
              {category}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="secondary">
            <Link href={buildJobPath(job)}>
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <a href={job.applyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#14213d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0e1831]">
            Apply
            <Sparkles className="h-4 w-4" />
          </a>
        </div>
        <div className="w-full border-t border-slate-200/70 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Share this job</p>
          <ShareButtons job={job} compact />
        </div>
      </CardFooter>
    </Card>
  );
}