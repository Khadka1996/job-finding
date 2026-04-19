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
    <form action={action} method="get" className="rounded-3xl border border-[#c8d0df] bg-white p-4 shadow-xl shadow-[#14213d]/5 sm:p-5">
      <div className="mb-4 flex items-center gap-2 text-base font-semibold text-[#14213d]">
        <Search className="h-4 w-4 text-[#b10f2e]" />
        Find Visa Sponsorship Jobs
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.2fr_auto] xl:items-end">
        <label className="grid gap-2 text-sm font-medium text-[#14213d]" htmlFor="location">
          Location
          <select
            id="location"
            name="location"
            defaultValue={locationValue || "Any Country"}
            className="h-11 rounded-full border border-[#c8d0df] bg-white px-4 text-sm text-[#14213d] outline-none transition focus:border-[#b10f2e] focus:ring-2 focus:ring-[#f4c9d2]"
          >
            {countryOptions.map((country) => (
              <option key={country} value={country === "Any Country" ? "" : country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#14213d]" htmlFor="industry">
          Industry Classification
          <select
            id="industry"
            name="industry"
            defaultValue={industryValue || "Any Classification"}
            className="h-11 rounded-full border border-[#c8d0df] bg-white px-4 text-sm text-[#14213d] outline-none transition focus:border-[#b10f2e] focus:ring-2 focus:ring-[#f4c9d2]"
          >
            {industryOptions.map((industry) => (
              <option key={industry} value={industry === "Any Classification" ? "" : industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#14213d]" htmlFor="q">
          Keywords
          <Input id="q" name="q" defaultValue={titleValue} placeholder="Enter Keywords" className="h-11" />
        </label>

        <Button type="submit" className={compact ? "w-full" : "min-w-40"}>
          Search Jobs
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span>Popular:</span>
        <Link href="/jobs?q=engineer" className="rounded-full bg-[#eef2fb] px-3 py-1 transition hover:bg-[#e0e8f7]">
          Engineer
        </Link>
        <Link href="/jobs?q=healthcare" className="rounded-full bg-[#eef2fb] px-3 py-1 transition hover:bg-[#e0e8f7]">
          Healthcare
        </Link>
        <Link href="/jobs?industry=Engineering" className="rounded-full bg-[#eef2fb] px-3 py-1 transition hover:bg-[#e0e8f7]">
          Engineering
        </Link>
        <Link href="/jobs?location=Middle%20East" className="rounded-full bg-[#eef2fb] px-3 py-1 transition hover:bg-[#e0e8f7]">
          Middle East
        </Link>
        <Link href="/jobs?visa=yes" className="rounded-full bg-[#eef2fb] px-3 py-1 transition hover:bg-[#e0e8f7]">
          Visa sponsorship
        </Link>
      </div>
    </form>
  );
}