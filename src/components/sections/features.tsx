import { Globe2, Compass, ShieldCheck } from "lucide-react";

interface Feature {
  icon: typeof Globe2;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Globe2,
    title: "Regional feeds included",
    description: "Live APIs plus curated regional sources for UK, Australia, New Zealand, Canada, USA, Ireland, and Gulf countries.",
  },
  {
    icon: Compass,
    title: "Original apply links",
    description: "Every job posting links directly to the original source website or employer listing for a seamless application.",
  },
  {
    icon: ShieldCheck,
    title: "Faster filtering",
    description: "Use country, keyword, and sponsorship filters together to find perfect-fit roles quickly and efficiently.",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center space-y-4">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#b10f2e]">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213d]">
            The Easiest Way to Find Global Jobs
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 transition hover:border-[#b10f2e] hover:shadow-lg hover:shadow-[#b10f2e]/10"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#b10f2e]/5 to-transparent rounded-2xl opacity-0 transition group-hover:opacity-100" />

                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#b10f2e]/10 text-[#b10f2e] group-hover:bg-[#b10f2e]/20 transition">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#14213d] group-hover:text-[#b10f2e] transition">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
