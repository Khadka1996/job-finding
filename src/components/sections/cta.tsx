import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#14213d] to-[#0a1622]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Work Abroad?
          </h2>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/80">
            Find your next visa-sponsored role in minutes.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4">
            <Button asChild className="px-8 h-12 bg-white text-[#14213d] hover:bg-white/90 font-semibold">
              <Link href="/jobs">
                Browse All Jobs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 h-12 border-white text-white hover:bg-white/10 font-semibold"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-8 border-t border-white/20 pt-12">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
            <p className="text-sm text-white/70 mt-1">Active Listings</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">100+</p>
            <p className="text-sm text-white/70 mt-1">Countries</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">10K+</p>
            <p className="text-sm text-white/70 mt-1">Monthly Users</p>
          </div>
        </div>
      </div>
    </section>
  );
}
