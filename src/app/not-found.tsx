import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-950">Page not found</h1>
      <p className="text-slate-600">The page you requested does not exist.</p>
      <Link href="/" className="rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-white">
        Go home
      </Link>
    </div>
  );
}