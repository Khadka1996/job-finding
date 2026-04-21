import { Search, Filter, FileCheck, Send } from "lucide-react";

interface Step {
  icon: typeof Search;
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Search,
    number: 1,
    title: "Search",
    description: "Use our intuitive search bar to find jobs by keyword, location, or company name across 50K+ listings.",
  },
  {
    icon: Filter,
    number: 2,
    title: "Filter",
    description: "Narrow down results by country, job type, remote status, and visa sponsorship requirements.",
  },
  {
    icon: FileCheck,
    number: 3,
    title: "Review",
    description: "View complete job details including full description, requirements, and company information.",
  },
  {
    icon: Send,
    number: 4,
    title: "Apply",
    description: "Click through to the original job posting and apply directly with the employer.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center space-y-4">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#b10f2e]">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213d]">
            How It Works
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-600">
            Get your dream job abroad in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="group relative">
                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 h-full transition hover:border-[#b10f2e] hover:shadow-lg hover:shadow-[#b10f2e]/10">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#b10f2e] text-white font-bold text-sm shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#b10f2e]/10 text-[#b10f2e] group-hover:bg-[#b10f2e]/20 transition">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-[#14213d] group-hover:text-[#b10f2e] transition">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (hidden on last item and mobile) */}
                {step.number < steps.length && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2">
                    <svg className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
