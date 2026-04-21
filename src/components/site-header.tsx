"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/jobs", label: "Jobs" },
  { href: "/jobs?industry=Engineering", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const countryItems = [
  { href: "/jobs?location=United%20Kingdom", label: "UK" },
  { href: "/jobs?location=Australia", label: "Australia" },
  { href: "/jobs?location=New%20Zealand", label: "New Zealand" },
  { href: "/jobs?location=Canada", label: "Canada" },
  { href: "/jobs?location=United%20States", label: "USA" },
  { href: "/jobs?location=Ireland", label: "Ireland" },
  { href: "/jobs?location=United%20Arab%20Emirates", label: "UAE" },
  { href: "/jobs?location=Qatar", label: "Qatar" },
  { href: "/jobs?location=Saudi%20Arabia", label: "Saudi Arabia" },
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
        {/* Logo and Brand */}
        <Link href="/" className="group flex items-center gap-2 sm:gap-3 min-w-0 shrink-0" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b10f2e] to-[#8b0a22] text-white shadow-lg shadow-[#b10f2e]/30 transition-transform group-hover:scale-105">
            <Image
              src="/globe.svg"
              alt="Visa Sponsor Jobs"
              width={24}
              height={24}
              className="h-6 w-6"
              priority
            />
          </div>
          <span className="hidden sm:flex flex-col gap-0.5">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#14213d]">Visa Sponsor</span>
            <span className="text-xs text-slate-500">Global Jobs</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:gap-6 md:flex">
          <div className="relative" ref={countriesRef}>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-[#334155] transition hover:text-[#b10f2e]"
              onClick={() => setCountriesOpen((current) => !current)}
              aria-expanded={countriesOpen}
              aria-haspopup="menu"
            >
              Countries
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${countriesOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            {countriesOpen ? (
              <div className="absolute left-1/2 top-10 z-50 w-56 -translate-x-1/2 rounded-2xl border border-[#d6deec] bg-white p-2 shadow-xl shadow-[#14213d]/10" role="menu">
                {countryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-[#14213d] transition hover:bg-[#f4f6fb]"
                    onClick={() => {
                      setCountriesOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs md:text-sm font-medium text-[#334155] transition hover:text-[#b10f2e]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="outline" className="h-9 border-[#c8d0df] text-[#14213d] hover:border-[#b10f2e] hover:text-[#b10f2e] px-4">
            <Link href="/advertise">Advertise</Link>
          </Button>
          <Button asChild className="h-9 px-4">
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-[#14213d] hover:bg-slate-100 rounded-lg transition"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden border-t border-[#d6deec] bg-white/95 backdrop-blur-sm">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-[#14213d] rounded-lg hover:bg-[#f4f6fb] transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Countries Dropdown */}
            <div className="border-t border-slate-200 pt-2 mt-2">
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#14213d] rounded-lg hover:bg-[#f4f6fb] transition"
                onClick={() => setMobileCountriesOpen((current) => !current)}
              >
                Countries
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileCountriesOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {mobileCountriesOpen && (
                <div className="mt-2 ml-4 space-y-1">
                  {countryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-[#334155] rounded-lg hover:bg-slate-100 transition"
                      onClick={() => {
                        setOpen(false);
                        setMobileCountriesOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-3 mt-2 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="h-10 border-[#c8d0df] text-[#14213d] hover:border-[#b10f2e] hover:text-[#b10f2e]">
                <Link href="/advertise" onClick={() => setOpen(false)}>
                  Advertise
                </Link>
              </Button>
              <Button asChild className="h-10">
                <Link href="/jobs" onClick={() => setOpen(false)}>
                  Browse Jobs
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
