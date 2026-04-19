import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Globe2, Sparkles, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Advertise Visa Sponsor Jobs",
  description: "Advertise visa sponsor jobs with Visa Sponsor Jobs and reach monthly candidates worldwide.",
};

const topCountries = ["United Kingdom", "India", "United States"];
const topIndustries = ["Healthcare", "Construction", "Tech", "Hospitality", "Seasonal Work"];
const faqs = [
  "How do I submit a job posting?",
  "What is the pricing for a job post?",
  "How long will my job post be displayed on the job board?",
  "How does the knockout questionnaire work?",
  "How can I get in touch with you?",
];

const benefits = [
  "Pinned to the top of search results for 14 days.",
  "Emailed to candidates via targeted job alerts.",
  "Google indexed for worldwide discovery.",
  "SEO optimized for stronger search visibility.",
];

export default function AdvertisePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white px-6 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b0000]">Visa sponsorship advertise</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance text-[#14213d] sm:text-5xl">
              Advertise Your Visa Sponsor Jobs with Us
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Reach 100,000+ monthly candidates worldwide with a job board built specifically for visa sponsorship discovery.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="secondary">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button asChild className="bg-[#14213d] text-white hover:bg-[#0f1825]">
                <Link href="/jobs">See live jobs</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-slate-200 bg-slate-50 text-slate-950 sm:col-span-2">
              <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
                {[
                  ["100,000+", "monthly candidates"],
                  ["1.2 million", "monthly job board views"],
                  ["Global", "candidate reach"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="mt-1 text-sm text-slate-600">{label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50 text-slate-950">
              <CardContent className="space-y-3 p-5">
                <BriefcaseBusiness className="h-5 w-5" />
                <p className="text-lg font-semibold">Top Countries</p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                  {topCountries.map((item) => (
                    <span key={item} className="rounded-full bg-white px-3 py-1">{item}</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50 text-slate-950">
              <CardContent className="space-y-3 p-5">
                <Target className="h-5 w-5" />
                <p className="text-lg font-semibold">Top Industries</p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                  {topIndustries.map((item) => (
                    <span key={item} className="rounded-full bg-white px-3 py-1">{item}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Globe2,
            title: "Global Reach",
            text: "Post once and reach candidates worldwide without advertising on multiple country-specific job boards.",
          },
          {
            icon: BadgeCheck,
            title: "Visa Sponsorship Focus",
            text: "Highlight requirements like in-country hiring or visa transfers only to attract the right candidates.",
          },
          {
            icon: Users,
            title: "Custom Knockout Questionnaires",
            text: "Filter applications so you only receive relevant candidates and save time.",
          },
        ].map((item) => (
          <Card key={item.title} className="border-slate-200 shadow-sm">
            <CardContent className="space-y-3 p-5">
              <item.icon className="h-5 w-5 text-[#b10f2e]" />
              <p className="text-lg font-semibold text-slate-950">{item.title}</p>
              <p className="text-sm leading-6 text-slate-600">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-10 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b10f2e]">Additional benefits</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Built to help your job ad stand out</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{benefit}</div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b0000]">Testimonials</p>
            <div className="mt-4 space-y-4">
              <blockquote className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-100">
                Visa Sponsor Jobs helped us find candidates from multiple countries quickly and efficiently.
                <footer className="mt-3 text-xs text-slate-300">Recruiter, Healthcare focus, United Kingdom</footer>
              </blockquote>
              <blockquote className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-100">
                The candidates are suited, and I will be moving forward with them.
                <footer className="mt-3 text-xs text-slate-300">Director, Construction Company, Australia</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-4xl border border-slate-200 bg-white px-6 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b10f2e]">FAQ</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Common questions about job advertising</h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Clear answers for employers who want to post visa sponsor roles, reach the right candidates, and move faster.
              </p>
            </div>

            <div className="grid gap-3">
              {faqs.map((item, index) => (
                <div
                  key={item}
                  className="group rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#14213d] text-sm font-semibold text-white">
                      0{index + 1}
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-semibold text-slate-950">{item}</p>
                      <p className="text-sm leading-6 text-slate-600">
                        {index === 0 && "Send your role details through the contact page and we’ll help you publish it."}
                        {index === 1 && "Pricing depends on placement and visibility needs. Reach out and we’ll share the options."}
                        {index === 2 && "Standard listings stay live based on the package you choose, with visible placement for the full duration."}
                        {index === 3 && "Use knockout questions to filter out unqualified applicants before they reach your inbox."}
                        {index === 4 && "Use the contact page and we’ll respond with the best way to launch your campaign."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-[radial-gradient(circle_at_top_left,#1e3a5f_0%,#14213d_72%,#09101a_100%)] p-6 text-white shadow-lg">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b0000]">Ready to start?</p>
              <h3 className="text-2xl font-semibold text-white">Let’s place your visa sponsor jobs in front of the right candidates.</h3>
              <p className="text-sm leading-6 text-slate-200">Send us your role details and we’ll help you get started.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Pinned 14 days", "Top visibility for active seekers"],
                ["Job alerts", "Sent directly to matching candidates"],
                ["Google indexed", "Searchable worldwide"],
                ["SEO optimized", "Built for stronger discovery"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-200">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/contact">
                  Contact us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild className="bg-white/10 text-white hover:bg-white/20">
                <Link href="/jobs">Explore jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
