import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  compact?: boolean;
  action?: string;
  titleValue?: string;
  locationValue?: string;
  industryValue?: string;
  dark?: boolean;
  showTitle?: boolean;
  showPopular?: boolean;
};

const countryOptions = [
  "Any Country",
  "United States",
  "United Kingdom",
  "Australia",
  "United Arab Emirates",
  "Qatar",
  "Saudi Arabia",
];

const industryOptions = [
  "Any Classification",
  "Accounting",
  "Education",
  "Health and Care",
  "Engineering",
  "Trades and Services",
  "Technology",
  "Construction",
  "Hospitality",
];

export function SearchBar({
  compact = false,
  action = "/jobs",
  titleValue = "",
  locationValue = "",
  industryValue = "",
  dark = false,
  showTitle = true,
  showPopular = true,
}: SearchBarProps) {
  const containerClasses = dark
    ? "rounded-[2rem] border border-white/14 bg-white/10 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:p-5 md:p-6"
    : "rounded-3xl border border-[#c8d0df] bg-white p-3 shadow-xl shadow-[#14213d]/5 sm:p-4 md:p-5";

  const titleClasses = dark
    ? "mb-3 flex items-center gap-2 text-xs font-semibold text-white sm:mb-4 sm:text-sm md:text-base"
    : "mb-3 flex items-center gap-2 text-xs font-semibold text-[#14213d] sm:mb-4 sm:text-sm md:text-base";

  const fieldLabelClasses = dark
    ? "grid gap-1 text-xs font-medium text-white/92 sm:gap-2 sm:text-sm"
    : "grid gap-1 text-xs font-medium text-[#14213d] sm:gap-2 sm:text-sm";

  const fieldClasses = dark
    ? "h-10 rounded-full border border-white/16 bg-black/20 px-3 text-xs text-white placeholder:text-white/65 outline-none transition focus:border-white/35 focus:ring-2 focus:ring-white/10 sm:h-11 sm:px-4 sm:text-sm"
    : "h-10 rounded-full border border-[#c8d0df] bg-white px-3 text-xs text-[#14213d] outline-none transition focus:border-[#b10f2e] focus:ring-2 focus:ring-[#f4c9d2] sm:h-11 sm:px-4 sm:text-sm";

  const selectClasses = dark
    ? "h-10 rounded-full border border-white/16 bg-black/20 px-3 text-xs text-white outline-none transition focus:border-white/35 focus:ring-2 focus:ring-white/10 sm:h-11 sm:px-4 sm:text-sm"
    : "h-10 rounded-full border border-[#c8d0df] bg-white px-3 text-xs text-[#14213d] outline-none transition focus:border-[#b10f2e] focus:ring-2 focus:ring-[#f4c9d2] sm:h-11 sm:px-4 sm:text-sm";

  const popularLinkClasses = dark
    ? "rounded-full border border-white/12 bg-white/8 px-2 py-0.5 text-xs text-white/86 transition hover:bg-white/12 sm:px-3 sm:py-1"
    : "rounded-full bg-[#eef2fb] px-2 py-0.5 text-xs transition hover:bg-[#e0e8f7] sm:px-3 sm:py-1";

  const popularTextClasses = dark ? "text-xs text-white/72" : "text-xs text-slate-500";

  const buttonClasses = dark
    ? `${compact ? "w-full" : "w-full md:w-auto"} h-10 min-h-10 text-xs text-white sm:h-11 sm:text-sm bg-[#b10f2e] hover:bg-[#930d24] rounded-full`
    : `${compact ? "w-full" : "w-full md:w-auto"} h-10 min-h-10 text-xs sm:h-11 sm:text-sm rounded-full`;

  return (
    <form action={action} method="get" className={containerClasses}>
      {showTitle ? (
        <div className={titleClasses}>
          <Search className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
          Find Visa Jobs
        </div>
      ) : null}

      <div className="grid gap-2 sm:gap-3 md:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1.2fr_auto] xl:items-end">
        <label className={fieldLabelClasses} htmlFor="location">
          Location
          <select
            id="location"
            name="location"
            defaultValue={locationValue || "Any Country"}
            className={selectClasses}
          >
            {countryOptions.map((country) => (
              <option key={country} value={country === "Any Country" ? "" : country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label className={fieldLabelClasses} htmlFor="industry">
          Industry
          <select
            id="industry"
            name="industry"
            defaultValue={industryValue || "Any Classification"}
            className={selectClasses}
          >
            {industryOptions.map((industry) => (
              <option key={industry} value={industry === "Any Classification" ? "" : industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>

        <label className={fieldLabelClasses} htmlFor="q">
          Keywords
          <Input id="q" name="q" defaultValue={titleValue} placeholder="Keywords" className={fieldClasses} />
        </label>

        <Button type="submit" className={buttonClasses}>
          Search
        </Button>
      </div>

      {showPopular ? (
        <div className={`mt-2 flex flex-wrap items-center gap-1 sm:mt-3 sm:gap-2 md:mt-4 ${popularTextClasses}`}>
          <span>Popular:</span>
          <Link href="/jobs?q=engineer" className={popularLinkClasses}>
            Engineer
          </Link>
          <Link href="/jobs?q=healthcare" className={popularLinkClasses}>
            Healthcare
          </Link>
          <Link href="/jobs?industry=Engineering" className={popularLinkClasses}>
            Engineering
          </Link>
          <Link href="/jobs?industry=Accounting" className={popularLinkClasses}>
            Accounting
          </Link>
          <Link href="/jobs?industry=Education" className={popularLinkClasses}>
            Education
          </Link>
          <Link href="/jobs?industry=Health%20and%20Care" className={popularLinkClasses}>
            Health and Care
          </Link>
          <Link href="/jobs?industry=Trades%20and%20Services" className={popularLinkClasses}>
            Trades and Services
          </Link>
        </div>
      ) : null}
    </form>
  );
}