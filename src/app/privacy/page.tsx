import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how Visa Sponsor Jobs handles user privacy and bookmarks stored locally on your device.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Card>
        <CardContent className="space-y-5 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Privacy policy</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Privacy is minimal by design</h1>
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            <p>We do not require an account to browse jobs. Bookmarks are stored locally in your browser and never leave your device.</p>
            <p>External job listings are loaded from free public APIs. When you leave the site to apply, the destination site may collect its own data according to its own policy.</p>
            <p>WhatsApp links open a third-party service. Any conversation there is governed by WhatsApp&apos;s own terms and privacy policy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}