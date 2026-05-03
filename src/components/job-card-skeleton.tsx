import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <div className="rounded-[12px] border border-[#eee] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-5/6 rounded-full bg-slate-200/90" />
              <Skeleton className="h-4 w-3/5 rounded-full bg-slate-200/90" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full bg-slate-200/90" />
          </div>
          <Skeleton className="mt-2 h-3.5 w-36 rounded-full bg-slate-200/90" />
        </div>
      </div>
      <div className="my-3 h-px w-full bg-[#eee]" />
      <Skeleton className="h-3.5 w-44 rounded-full bg-slate-200/90" />
      <div className="mt-3 flex flex-wrap gap-2">
        <Skeleton className="h-7 w-32 rounded-[4px] bg-slate-200/90" />
        <Skeleton className="h-7 w-12 rounded-[4px] bg-slate-200/90" />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Skeleton className="h-7 w-24 rounded-[4px] bg-slate-200/90" />
        <Skeleton className="h-7 w-20 rounded-[4px] bg-slate-200/90" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <Skeleton className="h-3 w-24 rounded-full bg-slate-200/90" />
        <Skeleton className="h-3 w-20 rounded-full bg-slate-200/90" />
      </div>
    </div>
  );
}