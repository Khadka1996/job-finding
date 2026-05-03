import { JobCardSkeleton } from "@/components/job-card-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}