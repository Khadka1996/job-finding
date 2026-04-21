import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  activeJobs: number;
};

export function HeroSection({ activeJobs }: HeroSectionProps) {
  const formattedJobs = new Intl.NumberFormat("en-US").format(activeJobs);

  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-image.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "480px", maxHeight: "520px" }}
    >
      {/* Strong dark overlay for text clarity */}
      <div className="absolute inset-0 bg-black/70 sm:bg-black/60" />

      {/* Content and worker image side by side, text at left */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
        {/* Text and buttons at left */}
        <div className="flex flex-col items-start justify-center gap-6 text-left max-w-xl w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              <span className="block">Work Abroad with</span>
              <span className="block">Visa Sponsorship Jobs.</span>
              <span className="block mt-2" style={{
                color: '#fff',
                WebkitTextStroke: '1px #b10f2e',
                fontWeight: 800
              }}>Globally. Easily.</span>
            </h1>
            <p className="mt-4 text-base font-normal text-white/90 sm:text-lg md:text-lg max-w-lg">
              Explore our comprehensive list of verified visa sponsored jobs from all over the world.<br />
              Your journey to working abroad starts here.
            </p>
          </div>
          <div className="mt-3 flex w-full flex-col items-start gap-3 sm:flex-row sm:justify-start">
            <Button asChild className="h-11 w-full max-w-xs bg-[#b10f2e] text-white text-base font-bold shadow-lg hover:bg-[#930d24]">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 w-full max-w-xs border-white/40 bg-white/10 text-white font-bold backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <Link href="/contact">Contact via WhatsApp</Link>
            </Button>
          </div>
        </div>
        {/* Worker image at far right */}
        <div className="flex items-end justify-end h-full ml-2 lg:ml-0 xl:-ml-20">
          <Image
            src="/worker.png"
            alt="Worker"
            width={160}
            height={480}
            className="object-contain drop-shadow-2xl opacity-90"
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
}
