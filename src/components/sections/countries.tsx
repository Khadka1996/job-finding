"use client";

import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface CountryLink {
  label: string;
  countryCode: string;
  href: string;
  description: string;
}

const countries: CountryLink[] = [
  { label: "Australia", countryCode: "AU", href: "/jobs?location=Australia", description: "Visa sponsorship jobs" },
  { label: "Canada", countryCode: "CA", href: "/jobs?location=Canada", description: "Visa sponsorship jobs" },
  { label: "Germany", countryCode: "DE", href: "/jobs?location=Germany", description: "Visa sponsorship jobs" },
  { label: "Ireland", countryCode: "IE", href: "/jobs?location=Ireland", description: "Visa sponsorship jobs" },
  { label: "Netherlands", countryCode: "NL", href: "/jobs?location=Netherlands", description: "Visa sponsorship jobs" },
  { label: "New Zealand", countryCode: "NZ", href: "/jobs?location=New%20Zealand", description: "Visa sponsorship jobs" },
  { label: "Portugal", countryCode: "PT", href: "/jobs?location=Portugal", description: "Visa sponsorship jobs" },
  { label: "Singapore", countryCode: "SG", href: "/jobs?location=Singapore", description: "Visa sponsorship jobs" },
  { label: "United Kingdom", countryCode: "GB", href: "/jobs?location=United%20Kingdom", description: "Visa sponsorship jobs" },
  { label: "United States", countryCode: "US", href: "/jobs?location=United%20States", description: "Visa sponsorship jobs" },
];

export function CountriesSection() {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14213d]">
            Popular Destinations
          </h2>
        </div>

        {/* Countries Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {countries.map((country) => (
            <Link
              key={country.href}
              href={country.href}
              className="group flex flex-col items-start justify-between gap-4 p-4 rounded-3xl border border-slate-200 bg-white transition hover:border-[#b10f2e] hover:shadow-lg hover:shadow-[#b10f2e]/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl" aria-hidden>
                  <ReactCountryFlag
                    countryCode={country.countryCode}
                    svg
                    style={{ width: '2.2rem', height: '2.2rem' }}
                    title={country.label}
                  />
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#14213d] leading-tight">
                  {country.label}
                </h3>
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-[#b10f2e] font-semibold">
                Browse jobs
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}