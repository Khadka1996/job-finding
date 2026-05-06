'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/types/job";
import Image from "next/image";
import { BookmarkButton } from "@/components/bookmark-button";
import { useState } from "react";

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

// Helper function to get company initials
function getCompanyInitials(company: string): string {
  const words = company.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return company.slice(0, 2).toUpperCase();
}

// Helper function to generate consistent color from company name
function getCompanyColor(company: string): string {
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = ((hash << 5) - hash) + company.charCodeAt(i);
    hash = hash & hash;
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 70% 55%)`;
}

// Company Logo Component with fallback
function CompanyLogo({ company, logo }: { company: string; logo: string | null | undefined }) {
  const [imageError, setImageError] = useState(false);
  const initials = getCompanyInitials(company);
  const bgColor = getCompanyColor(company);

  // If no logo or image failed, show initials
  if (!logo || imageError) {
    return (
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg flex items-center justify-center border border-slate-200 text-sm sm:text-base font-bold text-white"
        style={{ backgroundColor: bgColor }}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  // Try to load the image
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-slate-200">
      <Image
        src={logo}
        alt={company}
        width={56}
        height={56}
        className="w-full h-full object-contain p-1"
        onError={() => setImageError(true)}
        unoptimized
      />
    </div>
  );
}

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
        <CardContent className="p-3 sm:p-4 md:p-5">
          {/* Header with logo and title - responsive */}
          <div className="flex items-start gap-2 sm:gap-3 mb-4 pb-3 border-b border-slate-200">
            <CompanyLogo company={job.company} logo={job.companyLogo} />
            <div className="grow min-w-0">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#14213d] line-clamp-2">{job.title}</h3>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-600 truncate">{job.company}</p>
            </div>
          </div>

          {/* Location - responsive */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
            <span className="text-base sm:text-lg shrink-0" aria-hidden>
              {job.countryFlag}
            </span>
            <span className="truncate">{job.location}</span>
          </div>

          {/* Category and Visa badges - responsive */}
          <div className="flex flex-col gap-2 mb-3 sm:mb-4">
            {primaryCategory && (
              <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 self-start">
                {primaryCategory}
              </div>
            )}
            {job.visaSponsorship && (
              <div className="inline-flex items-center gap-1 rounded-full bg-[#f3c9d3] px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#b10f2e] self-start">
                {visaLabel}
              </div>
            )}
          </div>

          {/* Footer with date and bookmark - responsive */}
          <div className="flex flex-col gap-2 sm:gap-3 pt-3 border-t border-slate-200">
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