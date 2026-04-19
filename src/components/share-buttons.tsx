"use client";

import { useState } from "react";
import { Link2, MessageCircleMore } from "lucide-react";
import type { Job } from "@/types/job";

type ShareButtonsProps = {
  job: Job;
  compact?: boolean;
};

export function ShareButtons({ job, compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/jobs/${job.slug}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`I found this visa sponsored job: ${job.title} at ${job.company} ${url}`)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "sm:flex-nowrap" : ""}`}>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
        <MessageCircleMore className="h-4 w-4" />
        WhatsApp
      </a>
      <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
        <Link2 className="h-4 w-4" />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}