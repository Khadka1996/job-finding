'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/types/job";
import Image from "next/image";
import { BookmarkButton } from "@/components/bookmark-button";

type JobCardProps = {
  job: Job;
  featured?: boolean;
};

// Helper function to create a slug from job title and company
const buildJobPath = (job: Job): string => {
  // If job has a slug field, use it
  if (job.slug) {
    return `/jobs/${job.slug}`;
  }
  
  // Otherwise create a slug from title and company
  const titleSlug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const companySlug = job.company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `/jobs/${companySlug}-${titleSlug}`;
};

export const JobCard = ({ job, featured = false }: JobCardProps) => {
  const publishDate = new Date(job.postedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Use the first category only, display it directly without "Classification" prefix
  const primaryCategory = job.categories[0] || "";
  const visaLabel = job.visaSponsorship ? "H-1B" : "Visa";
  
  // Build the job URL path
  const jobUrl = buildJobPath(job);

  return (
    <Link href={jobUrl} className="block">
      <Card className={`group overflow-hidden border border-slate-200 transition duration-200 hover:shadow-lg cursor-pointer ${featured ? "ring-2 ring-[#f3c9d3]" : ""}`}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3 mb-4 pb-3 border-b border-slate-200">
            {job.companyLogo ? (
              <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-slate-200">
                <Image
                  src={job.companyLogo}
                  alt={job.company}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain p-1"
                  unoptimized
                  onError={(event) => {
                    const img = event.currentTarget as HTMLImageElement;
                    img.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-[#14213d] flex items-center justify-center border border-slate-200">
                <span className="text-sm font-bold uppercase text-white">{job.company.slice(0, 2)}</span>
              </div>
            )}
            <div className="flex-grow min-w-0">
              <h3 className="text-lg font-semibold text-[#14213d] line-clamp-2">{job.title}</h3>
              <p className="mt-1 text-sm text-slate-600 truncate">{job.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
            <span className="text-lg" aria-hidden>
              {job.countryFlag}
            </span>
            <span className="truncate">{job.location}</span>
          </div>

          {/* Category and Visa badges - stacked vertically like screenshot */}
          <div className="flex flex-col gap-2 mb-4">
            {primaryCategory && (
              <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 self-start">
                {primaryCategory}
              </div>
            )}
            {job.visaSponsorship && (
              <div className="inline-flex items-center gap-1 rounded-full bg-[#f3c9d3] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#b10f2e] self-start">
                {visaLabel}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-slate-200">
            <span className="text-xs text-slate-500">Publish date {publishDate}</span>
            <div onClick={(e) => e.preventDefault()}>
              <BookmarkButton job={job} compact={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};