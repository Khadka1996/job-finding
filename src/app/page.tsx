import Link from "next/link";
import { ArrowRight, Compass, Globe2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { JobCard } from "@/components/job-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedJobs } from "@/lib/api";

export const metadata = {
  title: "Work Abroad with Visa Sponsorship Jobs",
  description: "Explore verified visa sponsorship jobs worldwide with quick search, global filters, and real jobs from free public APIs.",
};

const countryLinks = [
  { label: "UK", flag: "🇬🇧", href: "/jobs?location=United%20Kingdom" },
  { label: "Australia", flag: "🇦🇺", href: "/jobs?location=Australia" },
  { label: "New Zealand", flag: "🇳🇿", href: "/jobs?location=New%20Zealand" },
  { label: "Canada", flag: "🇨🇦", href: "/jobs?location=Canada" },
  { label: "USA", flag: "🇺🇸", href: "/jobs?location=United%20States" },
  { label: "Ireland", flag: "🇮🇪", href: "/jobs?location=Ireland" },
  { label: "Middle East", flag: "🌍", href: "/jobs?location=Middle%20East" },
  { label: "India", flag: "🇮🇳", href: "/jobs?location=India" },
  { label: "Nepal", flag: "🇳🇵", href: "/jobs?location=Nepal" },
];

const industryLinks = [
  { label: "Accounting", href: "/jobs?q=accounting" },
  { label: "Education", href: "/jobs?q=education" },
  { label: "Health and Care", href: "/jobs?q=healthcare" },
  { label: "Engineering", href: "/jobs?q=engineering" },
  { label: "Trades and Services", href: "/jobs?q=trades" },
];

const highlights = [
  {
    title: "Regional feeds included",
    text: "Live APIs plus curated regional sources for UK, Australia, New Zealand, Canada, USA, Ireland, Middle East, India, and Nepal.",
    icon: Globe2,
  },
  {
    title: "Original apply links",
    text: "Every Apply button sends candidates to the original source website or employer listing.",
    icon: Compass,
  },
  {
    title: "Faster filtering",
    text: "Use country, keyword, and sponsorship filters together to find a better-fit role quickly.",
    icon: ShieldCheck,
  },
];

export default async function Home() {
  const featuredJobs = await getFeaturedJobs();

  return (
    <div className="w-full">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[90vh] w-full overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-screen" style={{ backgroundImage: "url('/bg-image.jpg')" }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-l from-[#0a1622]/85 via-[#0a1622]/60 to-[#0a1622]/40" />
        
        {/* Decorative blur elements */}
        <div className="absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#b10f2e]/20 blur-3xl" />
        <div className="absolute -right-10 top-20 h-56 w-56 rounded-full bg-[#14213d]/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[90vh] max-w-7xl items-center gap-8 px-4 py-12 sm:min-h-screen sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          {/* Left Column - Content */}
          <div className="relative space-y-8 lg:-translate-y-8">
            {/* Mobile-only worker background near CTA */}
            <div className="pointer-events-none absolute right-0 bottom-12 z-0 sm:hidden">
              <div className="absolute inset-0 rounded-full bg-[#b10f2e]/20 blur-2xl" />
              <Image
                src="/worker.png"
                alt="Professional worker"
                width={160}
                height={160}
                className="relative h-auto w-32 object-contain"
                loading="eager"
                priority
              />
            </div>

            <div className="space-y-6">
              <h1 className="relative z-10 max-w-4xl text-4xl font-bold tracking-tight text-balance text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl">
                Find Jobs Abroad.
                <span className="mt-2 block text-white/90">
                  Clean, Fast, Global Listings.
                </span>
              </h1>
              <p className="relative z-10 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
                Search global and regional job sources in one place, then apply on the original website. Built to keep the search simple, clear, and visual.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="relative z-10 flex flex-wrap gap-4 pt-4">
              <Button asChild className="h-12 px-6 bg-white text-[#14213d] hover:bg-white/90 hover:shadow-xl">
                <Link href="/jobs">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6 border-white/30 bg-transparent text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
                <Link href="/contact">Contact via WhatsApp</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Worker Image */}
          <div className="hidden lg:flex lg:order-0 lg:items-start lg:justify-center lg:pb-0 lg:-translate-y-16">
            <div className="relative">
              {/* Image glow effect */}
              <div className="absolute inset-0 rounded-full bg-[#b10f2e]/20 blur-2xl" />
              <Image
                src="/worker.png"
                alt="Professional worker ready for international opportunities"
                width={180}
                height={180}
                className="relative z-10 h-auto w-28 object-contain drop-shadow-2xl sm:w-36 md:w-40 lg:w-45"
                loading="eager"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

      {/* ========== QUICK SEARCH SECTION ========== */}
      <section className="mt-16 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-linear-to-r from-[#b10f2e] to-[#d61d4f]" />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b10f2e]">Quick Search</p>
          </div>
          <h2 className="text-3xl font-bold text-[#14213d]">Find Visa Sponsorship Jobs</h2>
          <p className="text-slate-600 max-w-2xl">Use filters below to discover sponsor-friendly roles across industries and locations worldwide.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Countries Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#14213d]">
              Countries and Regions
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {countryLinks.map((country) => (
                <Link 
                  key={country.label} 
                  href={country.href} 
                  className="group rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#14213d] transition-all hover:border-[#b10f2e] hover:bg-[#fff1f4] hover:shadow-md"
                >
                  <span className="mr-2" aria-hidden>{country.flag}</span>
                  {country.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar Component */}
          <div className="lg:col-span-2 rounded-3xl bg-white shadow-xl shadow-[#14213d]/10 ring-1 ring-slate-100">
            <SearchBar />
          </div>

          {/* Industry Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#14213d]">
              Industry Classification
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {industryLinks.map((industry) => (
                <Link 
                  key={industry.label} 
                  href={industry.href} 
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#14213d] transition-all hover:border-[#b10f2e] hover:bg-[#fff1f4] hover:shadow-md"
                >
                  {industry.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title} className="border-white/80">
            <CardContent className="space-y-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef2fb] text-[#14213d]">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-[#14213d]">{item.title}</h2>
              <p className="text-sm leading-6 text-slate-600">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-14 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b10f2e]">Featured jobs</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#14213d]">Browse live opportunities from connected APIs</h2>
          </div>
          <Link href="/jobs" className="hidden text-sm font-medium text-[#14213d] underline-offset-4 hover:underline sm:inline-flex">
            View all API jobs
          </Link>
        </div>

        {featuredJobs.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-14 text-center">
              <h3 className="text-2xl font-semibold text-[#14213d]">Live jobs are temporarily unavailable</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">We only display real API jobs. Please try again in a moment or open the full listings page.</p>
              <div className="mt-5">
                <Button asChild>
                  <Link href="/jobs">Open live listings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="mt-16 overflow-hidden rounded-4xl bg-[radial-gradient(circle_at_top_left,#1e3a5f_0%,#14213d_52%,#09101a_100%)] px-6 py-10 text-white sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f3c9d3]">Explore the possibilities</p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Explore work abroad opportunities in the U.K., Australia, New Zealand, Canada, the U.S., Ireland, Middle East, India, Nepal, and beyond.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-200">
              Use live job sources, fast filters, and direct application links to move from search to action faster.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="secondary">
                <Link href="/jobs">Explore visa opportunities globally</Link>
              </Button>
              <Button asChild className="bg-white/10 text-white hover:bg-white/20">
                <Link href="/advertise">Advertise your jobs here all around the world</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              { label: "Live APIs", value: "24/7" },
              { label: "Fast filters", value: "3x" },
              { label: "Direct apply", value: "1 click" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm text-slate-300">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
