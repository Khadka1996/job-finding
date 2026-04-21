import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/jobs", label: "Jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteFooter() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15551234567";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20am%20interested%20in%20jobs`;

  return (
    <footer className="border-t border-[#d6deec] bg-[#f8f9fc]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid w-full gap-10 sm:gap-12 lg:grid-cols-3 mb-8 lg:mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b10f2e] to-[#8b0a22] text-white shadow-lg shadow-[#b10f2e]/30 transition-transform group-hover:scale-105">
                <Image
                  src="/globe.svg"
                  alt="Visa Sponsor Jobs"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#14213d]">
                Visa Sponsor<br />
                <span className="text-xs text-slate-500 font-normal tracking-normal">Global Jobs</span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              A premium job board for candidates looking for visa sponsored roles across technology, healthcare, engineering, and remote-first teams.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b10f2e] mb-4">Explore</p>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 transition hover:text-[#14213d]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* WhatsApp Contact */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b10f2e] mb-4">Contact via WhatsApp</p>
            <p className="text-sm leading-6 text-slate-600 mb-4">
              Reach out for partnerships, featured listings, or help finding the right sponsor-friendly jobs.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-[#14213d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0e1831]"
            >
              Contact via WhatsApp
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/70" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Visa Sponsor Jobs. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Developed & Designed by{" "}
            <a
              href="https://www.intersect.com.np/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#b10f2e] transition hover:text-[#14213d] hover:underline decoration-[#b10f2e] underline-offset-2"
            >
              Intersect Info Developers
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}