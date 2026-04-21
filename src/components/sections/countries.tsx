import Link from "next/link";

interface CountryLink {
  label: string;
  flag: string;
  href: string;
  description: string;
}

const countries: CountryLink[] = [
  { label: "USA", flag: "🇺🇸", href: "/jobs?location=United%20States", description: "Diverse opportunities" },
  { label: "UK", flag: "🇬🇧", href: "/jobs?location=United%20Kingdom", description: "Tech & Financial jobs" },
  { label: "Australia", flag: "🇦🇺", href: "/jobs?location=Australia", description: "Engineering & Healthcare" },
  { label: "UAE", flag: "🇦🇪", href: "/jobs?location=United%20Arab%20Emirates", description: "Business & Tech" },
  { label: "Qatar", flag: "🇶🇦", href: "/jobs?location=Qatar", description: "Professional roles" },
  { label: "Saudi Arabia", flag: "🇸🇦", href: "/jobs?location=Saudi%20Arabia", description: "Engineering & Tech" },
];

export function CountriesSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 text-center space-y-4">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#b10f2e]">
            Work Worldwide
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213d]">
            Popular Destinations
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-600">
            Find visa-sponsored opportunities in your dream destination
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <Link
              key={country.href}
              href={country.href}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#b10f2e] hover:shadow-lg hover:shadow-[#b10f2e]/10"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#b10f2e]/5 to-transparent rounded-2xl opacity-0 transition group-hover:opacity-100" />
              
              <div className="relative space-y-3">
                {/* Flag & Country */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden>
                    {country.flag}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#14213d] group-hover:text-[#b10f2e] transition">
                      {country.label}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 group-hover:text-slate-700 transition">
                  {country.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-sm font-semibold text-[#b10f2e] pt-2 group-hover:gap-3 transition-all">
                  <span>Browse jobs</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
