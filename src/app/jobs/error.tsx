"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-950">We could not load jobs</h1>
      <p className="text-slate-600">The job source may be unavailable. You can retry or come back shortly.</p>
      <button type="button" onClick={reset} className="rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-white">
        Try again
      </button>
    </div>
  );
}