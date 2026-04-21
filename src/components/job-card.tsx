import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
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

export const JobCard = ({ job, featured = false }: JobCardProps) => {
  return (
    <Card className={`group overflow-hidden border-[#d6deec] transition duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#14213d]/10 ${featured ? "ring-2 ring-[#f3c9d3]" : ""}`}>
      <CardHeader className="p-3 sm:p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <Badge variant={job.visaSponsorship ? "success" : "muted"} className="text-xs">{job.visaSponsorship ? "Visa" : "Open"}</Badge>
              {job.remote ? <Badge variant="accent" className="text-xs">Remote</Badge> : null}
              <span className="rounded-full bg-[#eef2fb] px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#14213d]">
                {job.source}
              </span>
            </div>
            <CardTitle className="text-balance text-sm sm:text-base">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="truncate">{job.company}</span>
            </CardDescription>
          </div>
          <div className="shrink-0">
            <BookmarkButton job={job} compact />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-3 sm:p-4 md:p-5">
        <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
          <span className="inline-flex items-center gap-1 sm:gap-2">
            <span aria-hidden>{job.countryFlag}</span>
            <span className="truncate">{job.location}</span>
          </span>
        </CardDescription>
        <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">{job.shortDescription}</p>

        <div className="flex flex-wrap gap-1 sm:gap-2">
          {job.categories.slice(0, 2).map((category) => (
            <span key={category} className="rounded-full bg-[#f4f6fb] px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium uppercase tracking-wide text-[#475569]">
              {category}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 p-3 sm:p-4 md:p-5">
        {/* View Details Button */}
        <Button asChild variant="secondary" className="w-full h-9 sm:h-10 text-xs sm:text-sm">
          <Link href={buildJobPath(job)}>
            View Details
            <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>

        {/* Share Section */}
        <div className="w-full">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Share</p>
          <ShareButtons job={job} compact />
        </div>
      </CardFooter>
    </Card>
  );
};