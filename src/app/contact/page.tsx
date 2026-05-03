import type { Metadata } from "next";
import { MessageCircleMore } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Visa Sponsor Jobs via WhatsApp for partnerships and support.",
};

export default function ContactPage({ searchParams }: { searchParams?: { job?: string; company?: string } }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15551234567";
  const jobTitle = searchParams?.job ? decodeURIComponent(searchParams.job) : "a job opportunity";
  const companyName = searchParams?.company ? decodeURIComponent(searchParams.company) : "the employer";
  const message = `Hello, I am interested in the ${jobTitle} role at ${companyName}. Please share more details.`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Card>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Speak with us on WhatsApp</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            For partnerships, featured listings, or support, use the WhatsApp channel below. Your message is prefilled with the selected job details.
          </p>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
            <MessageCircleMore className="h-4 w-4" />
            Contact via WhatsApp
          </a>
        </CardContent>
      </Card>
    </div>
  );
}