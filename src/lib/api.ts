import type { Job, JobSearchParams, JobType } from "@/types/job";

const ARBEITNOW_API = "https://www.arbeitnow.com/api/job-board-api";
const REMOTIVE_API = "https://remotive.com/api/remote-jobs";
const THE_MUSE_API = "https://www.themuse.com/api/public/jobs";
const REMOTE_OK_API = "https://remoteok.com/api";
const JOBICY_API = "https://jobicy.com/api/v2/remote-jobs";
const ARBEITNOW_PAGES = 8;
const THE_MUSE_PAGES = 20;
const JOBICY_COUNT = 100;
const DEFAULT_PAGE_SIZE = 15;

interface ArbeitnowJob {
  slug?: string;
  title?: string;
  company_name?: string;
  company_url?: string;
  company_logo?: string | null;
  location?: string;
  remote?: boolean;
  url?: string;
  description?: string;
  created_at?: string;
  tags?: string[];
  job_types?: string[];
  salary?: string | null;
}

interface ArbeitnowResponse {
  data?: ArbeitnowJob[];
}

interface RemotiveJob {
  id?: number;
  title?: string;
  company_name?: string;
  candidate_required_location?: string;
  url?: string;
  description?: string;
  publication_date?: string;
  job_type?: string;
  category?: string;
  salary?: string;
  tags?: string[];
}

interface RemotiveResponse {
  jobs?: RemotiveJob[];
}

interface TheMuseCompany {
  name?: string;
}

interface TheMuseRef {
  landing_page?: string;
}

interface TheMuseLocation {
  name?: string;
}

interface TheMuseCategory {
  name?: string;
}

interface TheMuseLevel {
  name?: string;
}

interface TheMuseJob {
  id?: number;
  name?: string;
  company?: TheMuseCompany;
  locations?: TheMuseLocation[];
  refs?: TheMuseRef;
  publication_date?: string;
  contents?: string;
  categories?: TheMuseCategory[];
  levels?: TheMuseLevel[];
}

interface TheMuseResponse {
  results?: TheMuseJob[];
}

interface RemoteOkJob {
  id?: number | string;
  slug?: string;
  date?: string;
  company?: string;
  company_logo?: string;
  position?: string;
  location?: string;
  tags?: string[];
  description?: string;
  salary_min?: number;
  salary_max?: number;
  url?: string;
}

interface JobicyJob {
  id?: number;
  url?: string;
  jobSlug?: string;
  jobTitle?: string;
  companyName?: string;
  companyLogo?: string;
  jobIndustry?: string[];
  jobType?: string[];
  jobGeo?: string;
  jobExcerpt?: string;
  jobDescription?: string;
  pubDate?: string;
  annualSalaryMin?: number;
  annualSalaryMax?: number;
}

interface JobicyResponse {
  jobs?: JobicyJob[];
}

const COUNTRY_ALIASES: Record<string, { countryName: string; countryCode: string }> = {
  "united kingdom": { countryName: "United Kingdom", countryCode: "GB" },
  uk: { countryName: "United Kingdom", countryCode: "GB" },
  england: { countryName: "United Kingdom", countryCode: "GB" },
  scotland: { countryName: "United Kingdom", countryCode: "GB" },
  wales: { countryName: "United Kingdom", countryCode: "GB" },
  ireland: { countryName: "Ireland", countryCode: "IE" },
  "united states": { countryName: "United States", countryCode: "US" },
  usa: { countryName: "United States", countryCode: "US" },
  canada: { countryName: "Canada", countryCode: "CA" },
  australia: { countryName: "Australia", countryCode: "AU" },
  "new zealand": { countryName: "New Zealand", countryCode: "NZ" },
  germany: { countryName: "Germany", countryCode: "DE" },
  netherlands: { countryName: "Netherlands", countryCode: "NL" },
  portugal: { countryName: "Portugal", countryCode: "PT" },
  singapore: { countryName: "Singapore", countryCode: "SG" },
  france: { countryName: "France", countryCode: "FR" },
  spain: { countryName: "Spain", countryCode: "ES" },
  belgium: { countryName: "Belgium", countryCode: "BE" },
  czechia: { countryName: "Czechia", countryCode: "CZ" },
  "czech republic": { countryName: "Czechia", countryCode: "CZ" },
  greece: { countryName: "Greece", countryCode: "GR" },
  hungary: { countryName: "Hungary", countryCode: "HU" },
  romania: { countryName: "Romania", countryCode: "RO" },
  bulgaria: { countryName: "Bulgaria", countryCode: "BG" },
  croatia: { countryName: "Croatia", countryCode: "HR" },
  slovakia: { countryName: "Slovakia", countryCode: "SK" },
  slovenia: { countryName: "Slovenia", countryCode: "SI" },
  estonia: { countryName: "Estonia", countryCode: "EE" },
  latvia: { countryName: "Latvia", countryCode: "LV" },
  lithuania: { countryName: "Lithuania", countryCode: "LT" },
  luxembourg: { countryName: "Luxembourg", countryCode: "LU" },
  iceland: { countryName: "Iceland", countryCode: "IS" },
  sweden: { countryName: "Sweden", countryCode: "SE" },
  norway: { countryName: "Norway", countryCode: "NO" },
  switzerland: { countryName: "Switzerland", countryCode: "CH" },
  austria: { countryName: "Austria", countryCode: "AT" },
  italy: { countryName: "Italy", countryCode: "IT" },
  poland: { countryName: "Poland", countryCode: "PL" },
  denmark: { countryName: "Denmark", countryCode: "DK" },
  finland: { countryName: "Finland", countryCode: "FI" },
  japan: { countryName: "Japan", countryCode: "JP" },
  "south korea": { countryName: "South Korea", countryCode: "KR" },
  china: { countryName: "China", countryCode: "CN" },
  taiwan: { countryName: "Taiwan", countryCode: "TW" },
  thailand: { countryName: "Thailand", countryCode: "TH" },
  vietnam: { countryName: "Vietnam", countryCode: "VN" },
  malaysia: { countryName: "Malaysia", countryCode: "MY" },
  indonesia: { countryName: "Indonesia", countryCode: "ID" },
  philippines: { countryName: "Philippines", countryCode: "PH" },
  "sri lanka": { countryName: "Sri Lanka", countryCode: "LK" },
  bangladesh: { countryName: "Bangladesh", countryCode: "BD" },
  pakistan: { countryName: "Pakistan", countryCode: "PK" },
  india: { countryName: "India", countryCode: "IN" },
  nepal: { countryName: "Nepal", countryCode: "NP" },
  "saudi arabia": { countryName: "Saudi Arabia", countryCode: "SA" },
  jordan: { countryName: "Jordan", countryCode: "JO" },
  lebanon: { countryName: "Lebanon", countryCode: "LB" },
  egypt: { countryName: "Egypt", countryCode: "EG" },
  turkey: { countryName: "Turkey", countryCode: "TR" },
  israel: { countryName: "Israel", countryCode: "IL" },
  mexico: { countryName: "Mexico", countryCode: "MX" },
  brazil: { countryName: "Brazil", countryCode: "BR" },
  argentina: { countryName: "Argentina", countryCode: "AR" },
  chile: { countryName: "Chile", countryCode: "CL" },
  colombia: { countryName: "Colombia", countryCode: "CO" },
  peru: { countryName: "Peru", countryCode: "PE" },
  "south africa": { countryName: "South Africa", countryCode: "ZA" },
  kenya: { countryName: "Kenya", countryCode: "KE" },
  nigeria: { countryName: "Nigeria", countryCode: "NG" },
  morocco: { countryName: "Morocco", countryCode: "MA" },
  ghana: { countryName: "Ghana", countryCode: "GH" },
  ethiopia: { countryName: "Ethiopia", countryCode: "ET" },
  "new york": { countryName: "United States", countryCode: "US" },
  california: { countryName: "United States", countryCode: "US" },
  texas: { countryName: "United States", countryCode: "US" },
  sydney: { countryName: "Australia", countryCode: "AU" },
  melbourne: { countryName: "Australia", countryCode: "AU" },
  toronto: { countryName: "Canada", countryCode: "CA" },
  vancouver: { countryName: "Canada", countryCode: "CA" },
  london: { countryName: "United Kingdom", countryCode: "GB" },
  dublin: { countryName: "Ireland", countryCode: "IE" },
  auckland: { countryName: "New Zealand", countryCode: "NZ" },
  uae: { countryName: "United Arab Emirates", countryCode: "AE" },
  "united arab emirates": { countryName: "United Arab Emirates", countryCode: "AE" },
  dubai: { countryName: "United Arab Emirates", countryCode: "AE" },
  saudi: { countryName: "Saudi Arabia", countryCode: "SA" },
  qatar: { countryName: "Qatar", countryCode: "QA" },
  oman: { countryName: "Oman", countryCode: "OM" },
  bahrain: { countryName: "Bahrain", countryCode: "BH" },
  kuwait: { countryName: "Kuwait", countryCode: "KW" },
};

const MIDDLE_EAST_COUNTRIES = new Set([
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Bahrain",
  "Kuwait",
  "Jordan",
  "Lebanon",
  "Egypt",
  "Turkey",
  "Israel",
]);

const REGION_COUNTRY_MAP: Record<string, Set<string>> = {
  asia: new Set([
    "India",
    "Nepal",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Japan",
    "South Korea",
    "China",
    "Taiwan",
    "Thailand",
    "Vietnam",
    "Malaysia",
    "Indonesia",
    "Philippines",
    "Singapore",
  ]),
  europe: new Set([
    "United Kingdom",
    "Ireland",
    "Germany",
    "Netherlands",
    "Portugal",
    "France",
    "Spain",
    "Belgium",
    "Czechia",
    "Greece",
    "Hungary",
    "Romania",
    "Bulgaria",
    "Croatia",
    "Slovakia",
    "Slovenia",
    "Estonia",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Iceland",
    "Sweden",
    "Norway",
    "Switzerland",
    "Austria",
    "Italy",
    "Poland",
    "Denmark",
    "Finland",
  ]),
  "australia/oceania": new Set(["Australia", "New Zealand"]),
  americas: new Set(["United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Peru"]),
  africa: new Set(["South Africa", "Kenya", "Nigeria", "Morocco", "Ghana", "Ethiopia", "Egypt"]),
  "middle east": MIDDLE_EAST_COUNTRIES,
};

const REGION_QUERY_ALIASES: Record<string, string> = {
  "australia and oceania": "australia/oceania",
  oceania: "australia/oceania",
  australia: "australia/oceania",
  "middle-east": "middle east",
  middleeast: "middle east",
};

function codeToFlagEmoji(code: string) {
  if (!/^[A-Z]{2}$/.test(code)) {
    return "🌍";
  }

  return String.fromCodePoint(...code.split("").map((char) => 127397 + char.charCodeAt(0)));
}

function inferCountryFromLocation(location: string) {
  const normalized = location.toLowerCase();

  for (const [alias, country] of Object.entries(COUNTRY_ALIASES)) {
    if (normalized.includes(alias)) {
      return {
        ...country,
        countryFlag: codeToFlagEmoji(country.countryCode),
      };
    }
  }

  if (normalized.includes("remote")) {
    return {
      countryName: "Global",
      countryCode: "GL",
      countryFlag: "🌍",
    };
  }

  return {
    countryName: "Global",
    countryCode: "GL",
    countryFlag: "🌍",
  };
}

function normalizeSearchText(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeJobs(rawJobs: ArbeitnowJob[]) {
  return rawJobs.filter(isLikelyEnglish).map(normalizeArbeitnowJob);
}

function cleanHtml(input: string) {
  return input
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(input: string) {
  return cleanHtml(input).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getShortDescription(description: string) {
  const plain = stripTags(description);
  return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
}

const ENGLISH_SIGNALS = [
  "the",
  "and",
  "with",
  "for",
  "to",
  "of",
  "in",
  "your",
  "you",
  "team",
  "job",
  "role",
  "work",
  "experience",
  "skills",
  "requirements",
  "benefits",
  "remote",
  "application",
  "company",
  "full time",
  "part time",
];

const GERMAN_MARKERS = [
  "m/w/d",
  "w/m/d",
  "über",
  "fuer",
  "für",
  "und",
  "mit",
  "erfahrung",
  "kenntnisse",
  "stellenanzeige",
  "stellenangebot",
  "wir suchen",
  "aufgaben",
  "qualifikation",
  "verantwortung",
  "vollzeit",
  "teilzeit",
  "befristet",
  "unbefristet",
  "deutschlandweit",
  "bewerbung",
  "profil",
  "gehalt",
  "arbeitsort",
  "unternehmen",
];

function inferVisaSponsorship(raw: ArbeitnowJob, text: string) {
  const haystack = `${raw.title ?? ""} ${raw.location ?? ""} ${text}`.toLowerCase();
  return /visa|sponsor|sponsorship|relocation|work permit|permits?|blue card|h-1b/.test(haystack);
}

function inferJobTypes(raw: ArbeitnowJob): JobType[] {
  const types = new Set<JobType>();
  const source = `${raw.job_types?.join(" ") ?? ""} ${raw.tags?.join(" ") ?? ""} ${raw.description ?? ""} ${raw.location ?? ""}`.toLowerCase();

  if (source.includes("remote")) types.add("remote");
  if (source.includes("part-time") || source.includes("part time")) types.add("part-time");
  if (source.includes("contract")) types.add("contract");
  if (source.includes("intern")) types.add("internship");
  if (source.includes("hybrid")) types.add("hybrid");
  if (types.size === 0) types.add("full-time");

  return Array.from(types);
}

function inferCategories(raw: ArbeitnowJob): string[] {
  const text = `${raw.title ?? ""} ${raw.tags?.join(" ") ?? ""}`.toLowerCase();
  const categories = ["technology", "engineering", "healthcare", "product", "design", "cloud", "data", "sales"];
  return categories.filter((category) => text.includes(category)).slice(0, 4);
}

function isLikelyEnglish(raw: ArbeitnowJob) {
  const title = stripTags(raw.title ?? "").toLowerCase();
  const description = stripTags(raw.description ?? "").toLowerCase();
  const text = `${title} ${description}`.trim();
  if (!text) {
    return false;
  }

  if (/[\u0400-\u04FF\u4E00-\u9FFF\u0600-\u06FF]/.test(text)) {
    return false;
  }

  if (/\b(m\/w\/d|w\/m\/d|mw\/d)\b/.test(text)) {
    return false;
  }

  if (GERMAN_MARKERS.some((marker) => text.includes(marker))) {
    return false;
  }

  const englishSignals = ENGLISH_SIGNALS.reduce((count, signal) => {
    const pattern = new RegExp(`\\b${signal.replace(/\s+/g, "\\s+")}\\b`, "g");
    return count + (text.match(pattern)?.length ?? 0);
  }, 0);

  const germanSignals = [
    "und",
    "mit",
    "oder",
    "bei",
    "für",
    "uber",
    "über",
    "wir",
    "suchen",
    "ist",
    "sind",
    "ein",
    "eine",
    "als",
  ].reduce((count, signal) => {
    const pattern = new RegExp(`\\b${signal.replace(/\s+/g, "\\s+")}\\b`, "g");
    return count + (text.match(pattern)?.length ?? 0);
  }, 0);

  if (englishSignals < 3) {
    return false;
  }

  const asciiLetters = (text.match(/[a-z]/g) ?? []).length;
  const nonAsciiLetters = (text.match(/[^\x00-\x7F]/g) ?? []).length;

  if (asciiLetters > 0 && nonAsciiLetters / asciiLetters > 0.12) {
    return false;
  }

  if (germanSignals >= 2 && englishSignals < 5) {
    return false;
  }

  return true;
}

function matchesQuery(job: Job, query: string) {
  if (!query) {
    return true;
  }

  const searchable = normalizeSearchText([
    job.title,
    job.company,
    job.location,
    job.countryName,
    job.categories.join(" "),
    job.shortDescription,
    job.description,
    job.source,
  ].join(" "));

  const terms = normalizeSearchText(query).split(" ").filter(Boolean);
  if (terms.length === 0) {
    return true;
  }

  return terms.every((term) => searchable.includes(term));
}

function normalizeArbeitnowJob(raw: ArbeitnowJob, index: number): Job {
  const description = raw.description ? cleanHtml(raw.description) : "No description provided by the source API.";
  const title = raw.title?.trim() || "Untitled role";
  const company = raw.company_name?.trim() || "Confidential company";
  const location = raw.location?.trim() || (raw.remote ? "Remote" : "Worldwide");
  const slugBase = raw.slug?.trim() || `${title}-${company}-${location}`;
  const slug = slugBase
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const country = inferCountryFromLocation(location);

  return {
    id: raw.slug ?? `${slug}-${index}`,
    slug: slug || `job-${index}`,
    title,
    company,
    location,
    countryName: country.countryName,
    countryCode: country.countryCode,
    countryFlag: country.countryFlag,
    remote: Boolean(raw.remote) || location.toLowerCase().includes("remote"),
    visaSponsorship: inferVisaSponsorship(raw, description),
    jobTypes: inferJobTypes(raw),
    description,
    shortDescription: getShortDescription(description),
    applyUrl: raw.url || raw.company_url || `https://www.arbeitnow.com/${raw.slug ?? slug}`,
    companyUrl: raw.company_url,
    companyLogo: raw.company_logo ?? null,
    postedAt: raw.created_at ?? new Date().toISOString(),
    categories: inferCategories(raw),
    salary: raw.salary ?? null,
    source: "Arbeitnow",
  };
}

function normalizeRemotiveJob(raw: RemotiveJob): Job {
  const location = raw.candidate_required_location?.trim() || "Remote";
  const country = inferCountryFromLocation(location);
  const title = raw.title?.trim() || "Untitled role";
  const company = raw.company_name?.trim() || "Confidential company";
  const description = raw.description ? cleanHtml(raw.description) : "No description provided by the source API.";
  const slugBase = `${title}-${company}-${location}`;
  const slug = slugBase
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const typeSource = `${raw.job_type ?? ""} ${(raw.tags ?? []).join(" ")}`.toLowerCase();
  const jobTypes: JobType[] = typeSource.includes("contract")
    ? ["contract", "remote"]
    : ["remote", "full-time"];

  return {
    id: `remotive-${raw.id ?? slug}`,
    slug: `remotive-${slug}`,
    title,
    company,
    location,
    countryName: country.countryName,
    countryCode: country.countryCode,
    countryFlag: country.countryFlag,
    remote: true,
    visaSponsorship: inferVisaSponsorship(
      {
        title,
        location,
        description,
        tags: raw.tags,
      },
      description,
    ),
    jobTypes,
    description,
    shortDescription: getShortDescription(description),
    applyUrl: raw.url ?? "https://remotive.com/",
    postedAt: raw.publication_date ?? new Date().toISOString(),
    categories: [raw.category?.toLowerCase() ?? "technology"],
    salary: raw.salary ?? null,
    source: "Remotive",
  };
}

function normalizeTheMuseJob(raw: TheMuseJob): Job {
  const location = raw.locations?.[0]?.name?.trim() || "Remote";
  const country = inferCountryFromLocation(location);
  const title = raw.name?.trim() || "Untitled role";
  const company = raw.company?.name?.trim() || "Confidential company";
  const description = raw.contents ? cleanHtml(raw.contents) : "No description provided by the source API.";
  const slugBase = `${title}-${company}-${location}`;
  const slug = slugBase
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const levelText = (raw.levels ?? []).map((level) => level.name?.toLowerCase() ?? "").join(" ");
  const remote = location.toLowerCase().includes("remote");
  const jobTypes: JobType[] = remote
    ? ["remote", "full-time"]
    : levelText.includes("intern")
      ? ["internship"]
      : ["full-time"];

  return {
    id: `themuse-${raw.id ?? slug}`,
    slug: `themuse-${slug}`,
    title,
    company,
    location,
    countryName: country.countryName,
    countryCode: country.countryCode,
    countryFlag: country.countryFlag,
    remote,
    visaSponsorship: inferVisaSponsorship(
      {
        title,
        location,
        description,
        tags: (raw.categories ?? []).map((category) => category.name ?? ""),
      },
      description,
    ),
    jobTypes,
    description,
    shortDescription: getShortDescription(description),
    applyUrl: raw.refs?.landing_page ?? "https://www.themuse.com/jobs",
    postedAt: raw.publication_date ?? new Date().toISOString(),
    categories: (raw.categories ?? []).map((category) => (category.name ?? "").toLowerCase()).filter(Boolean).slice(0, 5),
    salary: null,
    source: "The Muse",
  };
}

function normalizeRemoteOkJob(raw: RemoteOkJob): Job {
  const location = raw.location?.trim() || "Remote";
  const country = inferCountryFromLocation(location);
  const title = raw.position?.trim() || "Untitled role";
  const company = raw.company?.trim() || "Confidential company";
  const description = raw.description ? cleanHtml(raw.description) : "No description provided by the source API.";
  const slugBase = raw.slug?.trim() || `${title}-${company}-${location}`;
  const slug = slugBase
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const typeSource = `${(raw.tags ?? []).join(" ")} ${title} ${location}`.toLowerCase();
  const jobTypes: JobType[] = [];

  if (typeSource.includes("remote")) jobTypes.push("remote");
  if (typeSource.includes("contract")) jobTypes.push("contract");
  if (typeSource.includes("part time") || typeSource.includes("part-time")) jobTypes.push("part-time");
  if (typeSource.includes("intern")) jobTypes.push("internship");
  if (typeSource.includes("hybrid")) jobTypes.push("hybrid");
  if (jobTypes.length === 0) jobTypes.push("remote", "full-time");

  const salary =
    typeof raw.salary_min === "number" && typeof raw.salary_max === "number"
      ? `$${raw.salary_min.toLocaleString()} - $${raw.salary_max.toLocaleString()}`
      : null;

  return {
    id: `remoteok-${raw.id ?? slug}`,
    slug: `remoteok-${slug}`,
    title,
    company,
    location,
    countryName: country.countryName,
    countryCode: country.countryCode,
    countryFlag: country.countryFlag,
    remote: true,
    visaSponsorship: inferVisaSponsorship(
      {
        title,
        location,
        description,
        tags: raw.tags,
      },
      description,
    ),
    jobTypes,
    description,
    shortDescription: getShortDescription(description),
    applyUrl: raw.url?.startsWith("http") ? raw.url : `https://remoteok.com/${raw.url ?? "remote-jobs"}`,
    companyLogo: raw.company_logo ?? null,
    postedAt: raw.date ?? new Date().toISOString(),
    categories: (raw.tags ?? []).map((tag) => tag.toLowerCase()).slice(0, 6),
    salary,
    source: "RemoteOK",
  };
}

function normalizeJobicyJob(raw: JobicyJob): Job {
  const location = raw.jobGeo?.trim() || "Remote";
  const country = inferCountryFromLocation(location);
  const title = raw.jobTitle?.trim() || "Untitled role";
  const company = raw.companyName?.trim() || "Confidential company";
  const description = raw.jobDescription
    ? cleanHtml(raw.jobDescription)
    : raw.jobExcerpt?.trim() || "No description provided by the source API.";
  const slugBase = raw.jobSlug?.trim() || `${title}-${company}-${location}`;
  const slug = slugBase
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const typeSource = (raw.jobType ?? []).join(" ").toLowerCase();
  const jobTypes: JobType[] = [];
  if (typeSource.includes("remote")) jobTypes.push("remote");
  if (typeSource.includes("contract")) jobTypes.push("contract");
  if (typeSource.includes("part-time") || typeSource.includes("part time")) jobTypes.push("part-time");
  if (typeSource.includes("intern")) jobTypes.push("internship");
  if (typeSource.includes("hybrid")) jobTypes.push("hybrid");
  if (jobTypes.length === 0) jobTypes.push("remote", "full-time");

  const salary =
    typeof raw.annualSalaryMin === "number" && typeof raw.annualSalaryMax === "number"
      ? `$${raw.annualSalaryMin.toLocaleString()} - $${raw.annualSalaryMax.toLocaleString()}`
      : null;

  return {
    id: `jobicy-${raw.id ?? slug}`,
    slug: `jobicy-${slug}`,
    title,
    company,
    location,
    countryName: country.countryName,
    countryCode: country.countryCode,
    countryFlag: country.countryFlag,
    remote: true,
    visaSponsorship: inferVisaSponsorship(
      {
        title,
        location,
        description,
        tags: raw.jobIndustry,
      },
      description,
    ),
    jobTypes,
    description,
    shortDescription: getShortDescription(description),
    applyUrl: raw.url ?? "https://jobicy.com/jobs",
    companyLogo: raw.companyLogo ?? null,
    postedAt: raw.pubDate ?? new Date().toISOString(),
    categories: (raw.jobIndustry ?? []).map((item) => item.toLowerCase()).slice(0, 6),
    salary,
    source: "Jobicy",
  };
}

function dedupeJobs(jobs: Job[]) {
  const seen = new Set<string>();
  const deduped: Job[] = [];

  for (const job of jobs) {
    const key = `${job.title.toLowerCase()}|${job.company.toLowerCase()}|${job.applyUrl.toLowerCase()}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(job);
  }

  return deduped;
}

function matchesLocationFilter(job: Job, locationQuery: string) {
  if (!locationQuery) {
    return true;
  }

  const query = locationQuery.trim().toLowerCase();
  const searchable = `${job.location} ${job.countryName} ${job.countryCode}`.toLowerCase();
  const normalizedRegionQuery = REGION_QUERY_ALIASES[query] ?? query;

  const regionCountries = REGION_COUNTRY_MAP[normalizedRegionQuery];
  if (regionCountries) {
    return regionCountries.has(job.countryName);
  }

  if (query === "middle east") {
    return MIDDLE_EAST_COUNTRIES.has(job.countryName) || searchable.includes("middle east");
  }

  if (query === "uk") {
    return searchable.includes("united kingdom") || searchable.includes(" gb");
  }

  if (query === "usa" || query === "us") {
    return searchable.includes("united states") || searchable.includes(" us");
  }

  return searchable.includes(query);
}

async function fetchArbeitnowJobs() {
  const pages = Array.from({ length: ARBEITNOW_PAGES }, (_, index) => index + 1);

  const responses = await Promise.all(
    pages.map(async (page) => {
      const response = await fetch(`${ARBEITNOW_API}?page=${page}`, {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "User-Agent": "VisaSponsorJobs/1.0",
        },
      });

      if (!response.ok) {
        return [] as ArbeitnowJob[];
      }

      const data = (await response.json()) as ArbeitnowResponse;
      return Array.isArray(data.data) ? data.data : [];
    }),
  );

  return responses.flat();
}

async function fetchRemotiveJobs() {
  const response = await fetch(REMOTIVE_API, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "VisaSponsorJobs/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Remotive API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as RemotiveResponse;
  return Array.isArray(data.jobs) ? data.jobs : [];
}

async function fetchTheMuseJobs() {
  const pages = Array.from({ length: THE_MUSE_PAGES }, (_, index) => index + 1);

  const responses = await Promise.all(
    pages.map(async (page) => {
      const response = await fetch(`${THE_MUSE_API}?page=${page}`, {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "User-Agent": "VisaSponsorJobs/1.0",
        },
      });

      if (!response.ok) {
        return [] as TheMuseJob[];
      }

      const data = (await response.json()) as TheMuseResponse;
      return Array.isArray(data.results) ? data.results : [];
    }),
  );

  return responses.flat();
}

function isRemoteOkJob(entry: unknown): entry is RemoteOkJob {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const maybeJob = entry as RemoteOkJob;
  return Boolean(maybeJob.position || maybeJob.company || maybeJob.slug);
}

async function fetchRemoteOkJobs() {
  const response = await fetch(REMOTE_OK_API, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "VisaSponsorJobs/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`RemoteOK API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as unknown;
  if (!Array.isArray(data)) {
    return [] as RemoteOkJob[];
  }

  return data.filter(isRemoteOkJob);
}

async function fetchJobicyJobs() {
  const response = await fetch(`${JOBICY_API}?count=${JOBICY_COUNT}`, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "VisaSponsorJobs/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Jobicy API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as JobicyResponse;
  return Array.isArray(data.jobs) ? data.jobs : [];
}

async function getAllJobs() {
  const [arbeitnow, remotive, muse, remoteOk, jobicy] = await Promise.allSettled([
    fetchArbeitnowJobs(),
    fetchRemotiveJobs(),
    fetchTheMuseJobs(),
    fetchRemoteOkJobs(),
    fetchJobicyJobs(),
  ]);

  const jobsFromArbeitnow = arbeitnow.status === "fulfilled" ? normalizeJobs(arbeitnow.value) : [];
  const jobsFromRemotive = remotive.status === "fulfilled" ? remotive.value.map(normalizeRemotiveJob) : [];
  const jobsFromMuse = muse.status === "fulfilled" ? muse.value.map(normalizeTheMuseJob) : [];
  const jobsFromRemoteOk = remoteOk.status === "fulfilled" ? remoteOk.value.map(normalizeRemoteOkJob) : [];
  const jobsFromJobicy = jobicy.status === "fulfilled" ? jobicy.value.map(normalizeJobicyJob) : [];

  return dedupeJobs([...jobsFromArbeitnow, ...jobsFromRemotive, ...jobsFromMuse, ...jobsFromRemoteOk, ...jobsFromJobicy]);
}

export async function getJobs(params: JobSearchParams = {}) {
  try {
    const jobs = await getAllJobs();

    const query = (params.q ?? "").trim();
    const location = (params.location ?? "").trim().toLowerCase();
    const industry = (params.industry ?? "").trim().toLowerCase();
    const type = (params.type ?? "").trim().toLowerCase();
    const visa = (params.visa ?? "").trim().toLowerCase();
    const page = Math.max(Number.parseInt(params.page ?? "1", 10) || 1, 1);

    const filtered = jobs.filter((job) => {
      const searchable = `${job.title} ${job.company} ${job.location} ${job.description} ${job.categories.join(" ")}`.toLowerCase();
      const matchesSearch = matchesQuery(job, query);
      const matchesLocation = matchesLocationFilter(job, location);
      const matchesIndustry = !industry || searchable.includes(industry);
      const matchesType = !type || job.jobTypes.includes(type as JobType) || (type === "full-time" && job.jobTypes.includes("full-time"));
      const matchesVisa = visa !== "yes" || job.visaSponsorship;

      return matchesSearch && matchesLocation && matchesIndustry && matchesType && matchesVisa;
    });

    const sorted = filtered.sort((left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime());
    const total = sorted.length;
    const totalPages = Math.max(Math.ceil(total / DEFAULT_PAGE_SIZE), 1);
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * DEFAULT_PAGE_SIZE;
    const paginated = sorted.slice(start, start + DEFAULT_PAGE_SIZE);

    return {
      jobs: paginated,
      total,
      page: safePage,
      totalPages,
      pageSize: DEFAULT_PAGE_SIZE,
      apiStatus: "live" as const,
    };
  } catch {
    const page = Math.max(Number.parseInt(params.page ?? "1", 10) || 1, 1);

    return {
      jobs: [] as Job[],
      total: 0,
      page,
      totalPages: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      apiStatus: "unavailable" as const,
    };
  }
}

export async function getFeaturedJobs() {
  try {
    const liveJobs = await getAllJobs();

    if (liveJobs.length > 0) {
      return liveJobs.slice(0, 3);
    }
    return [];
  } catch {
    return [];
  }
}

export async function getJobBySlug(slug: string) {
  const normalizedSlug = slug.toLowerCase();

  try {
    const allJobs = await getAllJobs();
    return allJobs.find((job) => job.slug === normalizedSlug) ?? null;
  } catch {
    return null;
  }
}

export function buildJobPath(job: Pick<Job, "slug">) {
  return `/jobs/${job.slug}`;
}

export function getCategoryPresets() {
  return [
    { label: "Technology", value: "technology" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Engineering", value: "engineering" },
    { label: "Design", value: "design" },
    { label: "Data", value: "data" },
    { label: "Cloud", value: "cloud" },
    { label: "Hospitality", value: "hospitality" },
    { label: "Construction", value: "construction" },
    { label: "Trades", value: "trades" },
  ];
}
