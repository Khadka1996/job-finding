"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const JobsClient = dynamic(() => import("./jobs-client").then((module) => module.JobsClient), {
  ssr: false,
  loading: () => <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10" />,
});

export function JobsPageClient() {
  const searchParams = useSearchParams();
  return <JobsClient key={searchParams.toString()} />;
}