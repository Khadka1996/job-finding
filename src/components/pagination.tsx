import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  params: URLSearchParams;
};

function createPageUrl(params: URLSearchParams, page: number) {
  const next = new URLSearchParams(params.toString());
  next.set("page", String(page));
  return `/jobs?${next.toString()}`;
}

export function Pagination({ page, totalPages, params }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4">
      <p className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={createPageUrl(params, Math.max(page - 1, 1))}
          className={`rounded-full border px-4 py-2 text-sm transition ${page <= 1 ? "pointer-events-none border-slate-200 text-slate-400" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
        >
          Previous
        </Link>
        <Link
          href={createPageUrl(params, Math.min(page + 1, totalPages))}
          className={`rounded-full border px-4 py-2 text-sm transition ${page >= totalPages ? "pointer-events-none border-slate-200 text-slate-400" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}