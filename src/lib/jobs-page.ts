export type JobSource = "jobicy" | "himalayas" | "remotive";

export type Job = {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  categories: string[];
  jobType: string;
  publishDate: string;
  description: string;
  applyUrl: string;
  source: JobSource;
  seniority: string[];
};

function normalizeSlugPart(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidSlugFallback(fallback: string): boolean {
  // Check if fallback contains URL-like patterns or malformed data
  if (!fallback) return false;
  // Check for URL indicators: protocols, domains, paths
  if (/https?|\.com|\.app|\.net|\.org|\/|:/i.test(fallback)) return false;
  // Check for extremely long segments (likely malformed)
  if (fallback.split(/[-_]/).some(segment => segment.length > 25)) return false;
  return true;
}

export function buildJobSlug(source: JobSource, title: string, companyName: string, location: string, fallback?: string) {
  // Only use fallback if it looks valid; otherwise generate from title-company-location
  const isValidFallback = fallback && isValidSlugFallback(fallback);
  const base = isValidFallback ? fallback.trim() : `${title}-${companyName}-${location}`;
  return `${source}-${normalizeSlugPart(base)}`;
}

export function buildJobPath(job: Pick<Job, "slug">) {
  return `/jobs/${job.slug}`;
}

const LOCATION_FLAG_ALIASES: Record<string, string> = {
  "united states": "US",
  usa: "US",
  us: "US",
  america: "US",
  "united kingdom": "GB",
  uk: "GB",
  england: "GB",
  scotland: "GB",
  wales: "GB",
  ireland: "IE",
  canada: "CA",
  australia: "AU",
  "new zealand": "NZ",
  germany: "DE",
  netherlands: "NL",
  portugal: "PT",
  singapore: "SG",
  france: "FR",
  spain: "ES",
  belgium: "BE",
  czechia: "CZ",
  "czech republic": "CZ",
  greece: "GR",
  hungary: "HU",
  romania: "RO",
  bulgaria: "BG",
  croatia: "HR",
  slovakia: "SK",
  slovenia: "SI",
  estonia: "EE",
  latvia: "LV",
  lithuania: "LT",
  luxembourg: "LU",
  iceland: "IS",
  sweden: "SE",
  norway: "NO",
  switzerland: "CH",
  austria: "AT",
  italy: "IT",
  poland: "PL",
  denmark: "DK",
  finland: "FI",
  japan: "JP",
  "south korea": "KR",
  china: "CN",
  taiwan: "TW",
  thailand: "TH",
  vietnam: "VN",
  malaysia: "MY",
  indonesia: "ID",
  philippines: "PH",
  india: "IN",
  nepal: "NP",
  pakistan: "PK",
  bangladesh: "BD",
  "sri lanka": "LK",
  "saudi arabia": "SA",
  qatar: "QA",
  oman: "OM",
  bahrain: "BH",
  kuwait: "KW",
  uae: "AE",
  "united arab emirates": "AE",
  dubai: "AE",
  turkey: "TR",
  israel: "IL",
  mexico: "MX",
  brazil: "BR",
  argentina: "AR",
  chile: "CL",
  colombia: "CO",
  peru: "PE",
  "south africa": "ZA",
  kenya: "KE",
  nigeria: "NG",
  morocco: "MA",
  ghana: "GH",
  ethiopia: "ET",
  guatemala: "GT",
  honduras: "HN",
  "el salvador": "SV",
  nicaragua: "NI",
  panama: "PA",
  "costa rica": "CR",
  uruguay: "UY",
  paraguay: "PY",
  bolivia: "BO",
  ecuador: "EC",
  venezuela: "VE",
  jordan: "JO",
  lebanon: "LB",
  egypt: "EG",
  iraq: "IQ",
  iran: "IR",
  russia: "RU",
  ukraine: "UA",
  georgia: "GE",
  kazakhstan: "KZ",
};

function countryCodeToFlag(countryCode: string) {
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    return "🌍";
  }

  return String.fromCodePoint(...countryCode.split("").map((character) => 127397 + character.charCodeAt(0)));
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function decodeHtmlEntities(value: string) {
  if (!value) {
    return value;
  }

  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function humanizeLabel(value: string) {
  const normalized = normalizeWhitespace(value.replace(/[_-]+/g, " "));

  if (!normalized) {
    return "";
  }

  return normalized
    .split(" ")
    .map((word) => {
      if (word.length <= 2) {
        return word.toUpperCase();
      }

      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

export function uniqueLabels(values: Array<string | undefined | null>) {
  const seen = new Set<string>();
  const labels: string[] = [];

  for (const value of values) {
    if (!value) {
      continue;
    }

    const label = humanizeLabel(value);
    const key = label.toLowerCase();

    if (!label || seen.has(key)) {
      continue;
    }

    seen.add(key);
    labels.push(label);
  }

  return labels;
}

export function formatPublishDate(value?: string | number | null) {
  if (!value) {
    return "01-01-1970";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "01-01-1970";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function isValidLogoUrl(value?: string | null) {
  if (!value) {
    return false;
  }

  const trimmed = value.trim();

  if (!trimmed || /^(null|undefined|n\/a|na)$/i.test(trimmed)) {
    return false;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function flagEmojiForLocation(location: string) {
  const normalized = location.toLowerCase();
  const normalizedTokens = ` ${normalized.replace(/[^a-z0-9]+/g, " ").trim()} `;

  // Fast path for explicit 2-letter country codes present in location text.
  // Examples: "US", "UK", "AE", or "Berlin, DE".
  const codeMatch = location.match(/\b([A-Z]{2})\b/);
  if (codeMatch) {
    const code = codeMatch[1] === "UK" ? "GB" : codeMatch[1];
    if (/^[A-Z]{2}$/.test(code)) {
      return countryCodeToFlag(code);
    }
  }

  // Use token/phrase matching to avoid false positives like:
  // "Australia" accidentally matching alias "us".
  const aliasEntries = Object.entries(LOCATION_FLAG_ALIASES).sort((left, right) => right[0].length - left[0].length);

  for (const [needle, countryCode] of aliasEntries) {
    const normalizedNeedle = needle.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

    if (!normalizedNeedle) {
      continue;
    }

    if (normalizedTokens.includes(` ${normalizedNeedle} `)) {
      return countryCodeToFlag(countryCode);
    }
  }

  return "🌍";
}

export function dedupeJobs(jobs: Job[]) {
  const seen = new Set<string>();
  const deduped: Job[] = [];

  for (const job of jobs) {
    const key = `${job.title.toLowerCase()}|${job.companyName.toLowerCase()}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(job);
  }

  return deduped;
}

export function shuffleJobs<T>(jobs: T[]) {
  const shuffled = [...jobs];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function stripHtml(value: string) {
  return normalizeWhitespace(
    value
      .replace(/<\/(p|div|li|h\d|br|ul|ol)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&"),
  );
}
