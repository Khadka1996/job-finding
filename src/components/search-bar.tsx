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
};

const countryOptions = [
  "Any Country",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Canada",
  "United States",
  "Ireland",
  "Middle East",
  "India",
  "Nepal",
  "Germany",
  "Singapore",
  "Netherlands",
  "Portugal",
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

export function SearchBar({ compact = false, action = "/jobs", titleValue = "", locationValue = "", industryValue = "" }: SearchBarProps) {
  return (
    <form action={action} method="get" className="rounded-3xl border border-[#c8d0df] bg-white p-3 sm:p-4 md:p-5 shadow-xl shadow-[#14213d]/5">
      <div className="mb-3 sm:mb-4 flex items-center gap-2 text-xs sm:text-sm md:text-base font-semibold text-[#14213d]">
        <Search className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
        Find Visa Jobs
      </div>

      <div className="grid gap-2 sm:gap-3 md:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1.2fr_auto] xl:items-end">
        <label className="grid gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#14213d]" htmlFor="location">
          Location
          <select
            id="location"
            name="location"
            defaultValue={locationValue || "Any Country"}
            className="h-10 sm:h-11 rounded-full border border-[#c8d0df] bg-white px-3 sm:px-4 text-xs sm:text-sm text-[#14213d] outline-none transition focus:border-[#b10f2e] focus:ring-2 focus:ring-[#f4c9d2]"
          >
            {countryOptions.map((country) => (
              <option key={country} value={country === "Any Country" ? "" : country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#14213d]" htmlFor="industry">
          Industry
          <select
            id="industry"
            name="industry"
            defaultValue={industryValue || "Any Classification"}
            className="h-10 sm:h-11 rounded-full border border-[#c8d0df] bg-white px-3 sm:px-4 text-xs sm:text-sm text-[#14213d] outline-none transition focus:border-[#b10f2e] focus:ring-2 focus:ring-[#f4c9d2]"
          >
            {industryOptions.map((industry) => (
              <option key={industry} value={industry === "Any Classification" ? "" : industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#14213d]" htmlFor="q">
          Keywords
          <Input id="q" name="q" defaultValue={titleValue} placeholder="Keywords" className="h-10 sm:h-11 text-xs sm:text-sm" />
        </label>

        <Button type="submit" className={`${compact ? "w-full" : "w-full md:w-auto"} h-10 sm:h-11 text-xs sm:text-sm min-h-10`}>
          Search
        </Button>
      </div>

      <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-slate-500">
        <span>Popular:</span>
        <Link href="/jobs?q=engineer" className="rounded-full bg-[#eef2fb] px-2 sm:px-3 py-0.5 sm:py-1 text-xs transition hover:bg-[#e0e8f7]">
          Engineer
        </Link>
        <Link href="/jobs?q=healthcare" className="rounded-full bg-[#eef2fb] px-2 sm:px-3 py-0.5 sm:py-1 text-xs transition hover:bg-[#e0e8f7]">
          Healthcare
        </Link>
        <Link href="/jobs?industry=Engineering" className="rounded-full bg-[#eef2fb] px-2 sm:px-3 py-0.5 sm:py-1 text-xs transition hover:bg-[#e0e8f7]">
          Engineering
        </Link>
      </div>
    </form>
  );
}