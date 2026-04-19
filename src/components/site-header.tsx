"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/jobs", label: "Jobs" },
  { href: "/jobs?industry=Engineering", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const regionItems = [
  { href: "/jobs?location=Asia", label: "Asia" },
  { href: "/jobs?location=Europe", label: "Europe" },
  { href: "/jobs?location=Australia%2FOceania", label: "Australia/Oceania" },
  { href: "/jobs?location=Americas", label: "Americas" },
  { href: "/jobs?location=Africa", label: "Africa" },
  { href: "/jobs?location=Middle%20East", label: "Middle East" },
  { href: "/jobs?location=Nepal", label: "Nepal" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);
  const countriesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (countriesRef.current && !countriesRef.current.contains(event.target as Node)) {
        setCountriesOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCountriesOpen(false);
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d6deec] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2 sm:gap-3 min-w-0" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-[#b10f2e] text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#b10f2e]/20 transition-transform group-hover:-rotate-6">
            VS
          </span>
          <span className="hidden sm:block">
            <span className="block text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-[#14213d] truncate">Visa Sponsor Jobs</span>
            <span className="block text-xs text-slate-500 truncate">Global jobs</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:gap-6 md:flex">\n          <div className="relative" ref={countriesRef}>\n            <button\n              type="button"\n              className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-[#334155] transition hover:text-[#b10f2e]"\n              onClick={() => setCountriesOpen((current) => !current)}\n              aria-expanded={countriesOpen}\n              aria-haspopup="menu"\n            >\n              Countries\n              <ChevronDown className={`h-4 w-4 transition-transform ${countriesOpen ? "rotate-180" : "rotate-0"}`} />\n            </button>\n            {countriesOpen ? (\n              <div className="absolute left-1/2 top-10 z-50 w-56 -translate-x-1/2 rounded-2xl border border-[#d6deec] bg-white p-2 shadow-xl shadow-[#14213d]/10" role="menu">\n                {regionItems.map((item) => (\n                  <Link\n                    key={item.href}\n                    href={item.href}\n                    className="block rounded-xl px-3 py-2 text-sm font-medium text-[#14213d] transition hover:bg-[#f4f6fb]"\n                    onClick={() => {\n                      setCountriesOpen(false);\n                    }}\n                  >\n                    {item.label}\n                  </Link>\n                ))}\n              </div>\n            ) : null}\n          </div>\n\n          {navItems.map((item) => (\n            <Link key={item.href} href={item.href} className="text-xs md:text-sm font-medium text-[#334155] transition hover:text-[#b10f2e]">\n              {item.label}\n            </Link>\n          ))}\n        </nav>\n\n        <div className=\"flex items-center gap-1 sm:gap-2\">\n          <Button asChild variant=\"outline\" className=\"hidden sm:inline-flex h-9 sm:h-10 text-xs md:text-sm border-[#c8d0df] text-[#14213d] hover:border-[#b10f2e] hover:text-[#b10f2e] px-2 sm:px-4\">\n            <Link href=\"/advertise\">Advertise</Link>\n          </Button>\n          <Button asChild className=\"hidden sm:inline-flex h-9 sm:h-10 text-xs md:text-sm px-2 sm:px-4\">\n            <Link href=\"/jobs\">Browse</Link>\n          </Button>\n          <button\n            type=\"button\"\n            onClick={() => {\n              setOpen((current) => !current);\n              setCountriesOpen(false);\n            }}\n            className=\"inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-[#c8d0df] bg-white text-[#14213d] md:hidden\"\n            aria-label=\"Toggle navigation\"\n            aria-expanded={open}\n          >\n            {open ? <X className=\"h-5 w-5\" /> : <Menu className=\"h-5 w-5\" />}\n          </button>\n        </div>\n      </div>

      {open ? (
        <div className="border-t border-[#d6deec] bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
            <div className="rounded-xl border border-[#c8d0df] px-4 py-3">
              <button
                type="button"
                onClick={() => setMobileCountriesOpen((current) => !current)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={mobileCountriesOpen}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Countries</span>
                <ChevronDown className={`h-4 w-4 text-slate-600 transition-transform ${mobileCountriesOpen ? "rotate-180" : "rotate-0"}`} />
              </button>

              {mobileCountriesOpen ? (
                <div className="mt-2 grid gap-2">
                  {regionItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-2 py-2 text-sm font-medium text-[#14213d] transition hover:bg-[#f4f6fb]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[#c8d0df] px-4 py-3 text-sm font-medium text-[#14213d] transition hover:bg-[#f4f6fb]"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="outline" className="border-[#c8d0df] text-[#14213d] hover:border-[#b10f2e] hover:text-[#b10f2e]">
              <Link href="/advertise" onClick={() => setOpen(false)}>
                Advertise
              </Link>
            </Button>
            <Button asChild>
              <Link href="/jobs" onClick={() => setOpen(false)}>
                Browse Jobs
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
