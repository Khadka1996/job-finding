import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  activeJobs: number;
};

export function HeroSection({ activeJobs }: HeroSectionProps) {
  const formattedJobs = new Intl.NumberFormat("en-US").format(activeJobs);

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "480px", height: "480px" }}>
      {/* Background image */}
      <Image
        src="/bg-image.jpg"
        alt="Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay — stronger on mobile so text is readable over worker image */}
      <div className="absolute inset-0 bg-black/70 sm:bg-black/55" />

      {/* 
        Worker image:
        - Mobile: z-10 (above bg, below text overlay which is z-20), centered/right, covers full height
        - Desktop: z-10, pinned to right side, does NOT overlap text column
      */}
      <div
        className="
          absolute bottom-0 z-10 pointer-events-none
          right-0
          w-[55%] sm:w-[42%] md:w-[36%] lg:w-[30%] xl:w-[26%]
          h-full
          flex items-end justify-end
        "
      >
        <Image
          src="/worker.png"
          alt="Worker"
          width={400}
          height={480}
          className="object-contain object-bottom w-full drop-shadow-2xl"
          style={{ maxHeight: "100%", height: "100%" }}
          priority
        />
      </div>

      {/* Text content — z-20 so it renders above the worker on mobile */}
      <div
        className="relative z-20 mx-auto h-full w-full max-w-7xl flex items-center px-4 py-10 sm:px-6 lg:px-8"
        style={{ minHeight: "480px" }}
      >
        {/* Text is constrained to left ~60% on desktop, full width on mobile */}
        <div className="flex flex-col items-start gap-3 w-full sm:max-w-[55%] md:max-w-[58%] lg:max-w-[60%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            <span className="block">Work Abroad with</span>
            <span className="block">Visa Sponsorship Jobs.</span>
            <span className="block text-[#b10f2e] mt-1 font-bold">Globally. Easily.</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
            Explore our comprehensive list of verified visa sponsored jobs from all over the world.
            <br className="hidden sm:block" />
            Your journey to working abroad starts here.
          </p>
          <Button
            asChild
            className="mt-1 h-10 px-6 bg-[#b10f2e] hover:bg-[#930d24] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg"
          >
            <Link href="/jobs">VIEW ALL JOBS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}