"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import { buildJobPath, flagEmojiForLocation, humanizeLabel, formatPublishDate, type Job } from "@/lib/jobs-page";

type JobsResponse = {
  jobs?: Job[];
};

const PAGE_SIZE = 21;

const countryFilters = [
  "All",
  "United Arab Emirates",
  "Qatar",
  "Saudi Arabia",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Malaysia",
  "Israel",
  "United Kingdom",
  "Germany",
];
const categorySeeds = ["All", "Engineering", "Design", "Product", "Marketing", "Data", "Sales", "Operations"];
const typeSeeds = ["All", "Full Time", "Contract", "Part Time", "Internship", "Temporary"];

function IconSearch() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.2 13.2L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
      <path d="M12.5 4.5L7 10l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
      <path d="M7.5 4.5L13 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCategory() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-3.5 w-3.5">
      <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
      <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function formatCompanyInitial(companyName: string) {
  const letters = companyName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return letters || "J";
}

function hashToPastel(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 68% 46%)`;
}

function matchesLocation(job: Job, locationFilter: string) {
  if (locationFilter === "All") {
    return true;
  }

  const normalizedLocation = job.location.toLowerCase();

  if (locationFilter === "United Arab Emirates") {
    return normalizedLocation.includes("united arab emirates") || normalizedLocation.includes("uae") || normalizedLocation.includes("dubai");
  }

  if (locationFilter === "United Kingdom") {
    return normalizedLocation.includes("united kingdom") || normalizedLocation.includes("uk") || normalizedLocation.includes("england");
  }

  return normalizedLocation.includes(locationFilter.toLowerCase());
}

function matchesCategory(job: Job, categoryFilter: string) {
  if (categoryFilter === "All") {
    return true;
  }

  return job.categories.some((category) => category.toLowerCase().includes(categoryFilter.toLowerCase()));
}

function matchesType(job: Job, typeFilter: string) {
  if (typeFilter === "All") {
    return true;
  }

  return job.jobType.toLowerCase().includes(typeFilter.toLowerCase());
}

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase();
}

function flagForFilterLabel(label: string) {
  return flagEmojiForLocation(label === "All" ? "worldwide" : label);
}

function LogoBadge({ job }: { job: Job }) {
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackColor = hashToPastel(job.companyName);

  if (imageFailed || !job.companyLogo) {
    return (
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
        style={{ backgroundColor: fallbackColor }}
        aria-hidden
      >
        {formatCompanyInitial(job.companyName)}
      </div>
    );
  }

  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-transparent">
      <Image
        src={job.companyLogo}
        alt={job.companyName}
        fill
        sizes="40px"
        className="object-contain"
        onError={() => setImageFailed(true)}
        unoptimized
      />
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const href = buildJobPath(job);
  const overflowCount = Math.max(job.categories.length - 1, 0);
  const primaryCategory = job.categories[0] ?? "General";
  const supplementalTag = job.seniority?.[0] ?? humanizeLabel(job.source);

  return (
    <Link
      href={href}
      className="group block w-full rounded-lg border border-[#eee] bg-white p-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[#f3c9d3] hover:shadow-[0_8px_20px_rgba(177,15,46,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b10f2e]/20 focus-visible:ring-offset-2"
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <h3 className="min-w-0 flex-1 text-base font-semibold leading-6 text-[#111] line-clamp-2">{job.title}</h3>
            <LogoBadge job={job} />
          </div>
          <p className="mt-1 text-sm text-[#64748b]">{job.companyName}</p>
        </div>
      </div>

      <div className="my-3 h-px w-full bg-[#eee]" />

      <div className="flex items-center gap-2 text-sm text-[#64748b]">
        <span className="text-base leading-none" aria-hidden>
          {flagEmojiForLocation(job.location)}
        </span>
        <span className="min-w-0 truncate">{job.location}</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-sm border border-[#f3c9d3] bg-[#fdf2f5] px-2 py-1 text-xs font-semibold text-[#b10f2e]">
          <IconCategory />
          {primaryCategory}
        </span>
        {overflowCount > 0 ? (
          <span className="inline-flex items-center rounded-sm bg-[#f1f5f9] px-2 py-1 text-xs font-medium text-[#64748b]">+{overflowCount}</span>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-sm bg-[#d1fae5] px-2 py-1 text-xs font-semibold text-[#065f46]">
          {job.jobType}
        </span>
        <span className="inline-flex items-center rounded-sm bg-[#f1f5f9] px-2 py-1 text-xs font-medium text-[#475569]">
          {supplementalTag}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[#64748b]">
        <span>Publish date</span>
        <span className="font-semibold text-[#111]">{formatPublishDate(job.publishDate)}</span>
      </div>
    </Link>
  );
}

export function JobsClient() {
  const searchParams = useSearchParams();
  const initialQuery = (searchParams.get("q") ?? "").trim();
  const locationParam = (searchParams.get("location") ?? "").trim();
  const categoryParam = (searchParams.get("category") ?? "").trim();
  const typeParam = (searchParams.get("type") ?? "").trim();

  const initialLocation = locationParam || "All";
  const initialCategory = categorySeeds.find((category) => category.toLowerCase() === categoryParam.toLowerCase()) ?? "All";
  const initialType = typeSeeds.find((type) => type.toLowerCase() === typeParam.toLowerCase()) ?? "All";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState(initialType);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadJobs() {
      try {
        setLoading(true);
        const response = await fetch("/api/jobs", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as JobsResponse;

        if (!mounted) {
          return;
        }

        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
        setError(null);
      } catch (loadError) {
        if (!mounted || controller.signal.aborted) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "Failed to load jobs.");
        setJobs([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadJobs();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  // Keep location choices curated, but preserve location coming from URL so
  // navbar links like /jobs?location=Australia still work correctly.
  const availableLocations = useMemo(() => {
    const values = new Set<string>(countryFilters);

    if (selectedLocation && selectedLocation !== "All") {
      values.add(selectedLocation);
    }

    return Array.from(values);
  }, [selectedLocation]);

  const availableCategories = useMemo(() => {
    const values = new Set<string>(categorySeeds);

    for (const job of jobs) {
      for (const category of job.categories) {
        values.add(category);
      }
    }

    return Array.from(values);
  }, [jobs]);

  const availableTypes = useMemo(() => {
    const values = new Set<string>(typeSeeds);

    for (const job of jobs) {
      values.add(job.jobType);
    }

    return Array.from(values);
  }, [jobs]);

  const normalizedSearch = normalizeSearchText(searchQuery);
  const filteredJobs = jobs.filter((job) => {
    const searchable = `${job.title} ${job.companyName}`.toLowerCase();
    const queryMatches = normalizedSearch === "" || searchable.includes(normalizedSearch);

    return (
      queryMatches &&
      matchesLocation(job, selectedLocation) &&
      matchesCategory(job, selectedCategory) &&
      matchesType(job, selectedType)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageJobs = filteredJobs.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="rounded-2xl sm:rounded-3xl border border-sky-100 bg-white p-4 sm:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:shadow-[0_10px_30px_rgba(15,23,42,0.05)] lg:p-8">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#b10f2e]">Visa jobs board</p>
              <h1 className="max-w-2xl text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f172a]">Find Your Next Visa Sponsored Job</h1>
              <p className="max-w-3xl text-sm sm:text-lg leading-7 sm:leading-8 text-[#64748b]">Curated listings focused on countries popular with Nepali workers</p>
            </div>

            <div className="rounded-lg sm:rounded-[18px] border border-slate-200 bg-[#f8fafc] p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#64748b]">Live feed</p>
              <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#0f172a]">{loading ? "--" : jobs.length}</p>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-base text-[#64748b]" suppressHydrationWarning>
                Jobs all over the world
              </p>
            </div>
          </div>

          <form
            className="mt-4 sm:mt-6 rounded-xl sm:rounded-3xl border border-[#f3c9d3] bg-[#fff7f9] p-3 sm:p-4 shadow-inner shadow-[#f3c9d3]/60"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-col gap-2 sm:gap-3">
              <label className="relative block">
                <span className="sr-only">Search jobs</span>
                <span className="pointer-events-none absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#b10f2e] h-4 w-4 sm:h-4 sm:w-4"><IconSearch /></span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by title or company"
                  className="h-10 sm:h-12 w-full rounded-lg sm:rounded-2xl border border-[#f3c9d3] bg-white pl-9 sm:pl-11 pr-3 sm:pr-4 text-sm sm:text-base text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#b10f2e] focus:outline-none focus:ring-0"
                />
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                <label className="block">
                  <span className="sr-only">Filter by location</span>
                  <select
                    value={selectedLocation}
                    onChange={(event) => {
                      setSelectedLocation(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-2xl border border-[#f3c9d3] bg-white px-2 sm:px-4 text-xs sm:text-base text-[#0f172a] outline-none transition focus:border-[#b10f2e] focus:outline-none focus:ring-0"
                  >
                    {availableLocations.map((location) => (
                      <option key={location} value={location}>
                        {flagForFilterLabel(location)} {location}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="sr-only">Filter by category</span>
                  <select
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-2xl border border-[#f3c9d3] bg-white px-2 sm:px-4 text-xs sm:text-base text-[#0f172a] outline-none transition focus:border-[#b10f2e] focus:outline-none focus:ring-0"
                  >
                    {availableCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block col-span-2 sm:col-span-1">
                  <span className="sr-only">Filter by job type</span>
                  <select
                    value={selectedType}
                    onChange={(event) => {
                      setSelectedType(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-2xl border border-[#f3c9d3] bg-white px-2 sm:px-4 text-xs sm:text-base text-[#0f172a] outline-none transition focus:border-[#b10f2e] focus:outline-none focus:ring-0"
                  >
                    {availableTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit" className="inline-flex h-10 sm:h-12 items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#b10f2e] px-4 sm:px-6 text-xs sm:text-base font-semibold text-white transition hover:bg-[#8b0a22] w-full sm:w-auto">
                Search
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div>
              <p className="text-sm sm:text-base font-semibold text-[#0f172a]">Showing {filteredJobs.length} jobs</p>
              <p className="text-xs sm:text-base text-[#64748b]">Page {safePage} of {totalPages}</p>
            </div>
            {searchQuery || selectedLocation !== "All" || selectedCategory !== "All" || selectedType !== "All" ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("All");
                  setSelectedCategory("All");
                  setSelectedType("All");
                  setPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#475569] transition hover:border-[#cbd5e1] hover:text-[#0f172a]"
              >
                <IconClose />
                Clear filters
              </button>
            ) : null}
          </div>

          {loading ? (
            <div className="grid gap-3 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg sm:rounded-[18px] border border-rose-200 bg-rose-50 p-4 sm:p-6 text-rose-900">
              <p className="text-base sm:text-lg font-semibold">We could not load the job feed</p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-rose-800">{error}</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid gap-3 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" id="jobs-grid">
              {pageJobs.map((job, index) => (
                <div
                  key={job.id}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="translate-y-3 opacity-0 animate-[fadeUp_0.45s_ease-out_forwards]"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg sm:rounded-[18px] border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <p className="text-base sm:text-lg font-semibold text-[#0f172a]">No jobs match your filters</p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#64748b]">Try a broader keyword search or clear the filters to see more results.</p>
            </div>
          )}

          {filteredJobs.length > 0 ? (
            <div className="flex items-center justify-center gap-2 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={safePage === 1}
                className="inline-flex h-9 sm:h-10 items-center justify-center gap-1 sm:gap-2 rounded-full border border-slate-200 bg-white px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#334155] transition hover:border-[#0ea5e9] hover:text-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconChevronLeft />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="text-xs sm:text-sm font-medium text-[#334155]">Page {safePage} of {totalPages}</div>

              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={safePage === totalPages}
                className="inline-flex h-9 sm:h-10 items-center justify-center gap-1 sm:gap-2 rounded-full border border-slate-200 bg-white px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#334155] transition hover:border-[#0ea5e9] hover:text-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="hidden sm:inline">Next</span>
                <IconChevronRight />
              </button>
            </div>
          ) : null}
        </section>

      </main>
    </div>
  );
}
