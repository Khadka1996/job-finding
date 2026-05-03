import type { Metadata } from "next";
import { JobsPageClient } from "./jobs-page-client";

export const metadata: Metadata = {
  title: "Find Your Next Visa Sponsored Job | Visa Sponsor Global Jobs",
  description: "Curated visa sponsorship job listings from high-demand destinations worldwide.",
};

export default function JobsPage() {
  return <JobsPageClient />;
}
