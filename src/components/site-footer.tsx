import Link from "next/link";

const links = [
  { href: "/jobs", label: "Jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/jobs?location=Middle%20East", label: "Middle East Jobs" },
];

export function SiteFooter() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15551234567";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20am%20interested%20in%20jobs`;

  return (
    <footer className="border-t border-[#d6deec] bg-[#f8f9fc]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-[#14213d]">Visa Sponsor Jobs</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            A premium job board for candidates looking for visa sponsored roles across technology, healthcare, engineering, and remote-first teams.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b10f2e]">Explore</p>
          <div className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-600 transition hover:text-[#14213d]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b10f2e]">Contact via WhatsApp</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Reach out for partnerships, featured listings, or help finding the right sponsor-friendly jobs.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-full bg-[#14213d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0e1831]"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}