import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn how Visa Sponsor Jobs helps candidates discover employer-sponsored opportunities worldwide.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white px-6 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b0000]">About us</p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-[#14213d] sm:text-5xl">Built for candidates who need sponsorship clarity</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Visa Sponsor Jobs helps candidates discover sponsor-friendly roles faster, with clear search paths, live listings, and an experience designed around action.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="secondary">
                <Link href="/jobs">Browse live jobs</Link>
              </Button>
              <Button asChild className="bg-[#14213d] text-white hover:bg-[#0f1825]">
                <Link href="/advertise">Advertise with us</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Globe2, title: "Global reach", text: "Roles from multiple regions in one place." },
              { icon: ShieldCheck, title: "Sponsorship focus", text: "Filters and labels designed for visa sponsor jobs." },
              { icon: Users, title: "Candidate-first", text: "Built to reduce friction between search and application." },
              { icon: Sparkles, title: "Fast discovery", text: "A clean UI that makes relevant jobs easier to scan." },
            ].map((item) => (
              <Card key={item.title} className="border-slate-200 bg-slate-50 text-slate-950">
                <CardContent className="space-y-3 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#14213d]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Discovery", "Surface roles from free public APIs and normalize the data for quick browsing."],
          ["Clarity", "Highlight location, job type, and sponsorship signals in a clean card layout."],
          ["Conversion", "Use WhatsApp, share links, and concise job details to drive applicant action."],
        ].map(([title, text]) => (
          <Card key={title} className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <p className="text-lg font-semibold text-slate-950">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-10 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b10f2e]">Why it matters</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">A cleaner way to find sponsor-friendly roles</h2>
            <p className="text-slate-600">
              The goal is simple: help candidates find opportunities that are realistic, relevant, and easier to act on without digging through noisy listings.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Live job discovery",
              "Fast WhatsApp contact paths",
              "Direct apply links",
              "Sponsorship-aware filters",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
