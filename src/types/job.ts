export type JobType = "remote" | "full-time" | "part-time" | "contract" | "internship" | "hybrid";

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  countryName: string;
  countryCode: string;
  countryFlag: string;
  remote: boolean;
  visaSponsorship: boolean;
  jobTypes: JobType[];
  description: string;
  shortDescription: string;
  applyUrl: string;
  companyUrl?: string;
  companyLogo?: string | null;
  postedAt: string;
  categories: string[];
  salary?: string | null;
  source: string;
}

export interface JobSearchParams {
  q?: string;
  location?: string;
  industry?: string;
  type?: string;
  visa?: string;
  page?: string;
}