import Image from "next/image";
import Link from "next/link";

const industryCards = [
  {
    name: "Industry Workers",
    href: "/jobs?q=industry%20worker",
    image: "https://images.pexels.com/photos/8292793/pexels-photo-8292793.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Construction Workers",
    href: "/jobs?q=construction%20worker",
    image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Plumbers",
    href: "/jobs?q=plumber",
    image: "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Engineers",
    href: "/jobs?q=engineer",
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Drivers",
    href: "/jobs?q=driver",
    image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export function IndustryClassifications() {
  return (
    <section className="relative mt-10 overflow-hidden rounded-4xl border border-[#dbe3f1] bg-white/75 px-4 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:px-6 sm:py-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(177,15,46,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(20,33,61,0.10),transparent_28%)]" />

      <div className="relative flex flex-col gap-5 border-b border-[#e7edf6] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-[#14213d] sm:text-4xl">
            Browse by job name
          </h2>
        </div>

        <div />
      </div>

      <div className="relative mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {industryCards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="group block overflow-hidden rounded-[1.75rem] border border-[#d6deec] bg-slate-950 shadow-[0_20px_50px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.22)]"
          >
            <div className="relative isolate h-80 w-full">
              <Image
                src={card.image}
                alt={card.name}
                width={1200}
                height={800}
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#09101d] via-[#09101d]/50 to-transparent" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(177,15,46,0.22),transparent_42%,rgba(20,33,61,0.16))]" />

              <div className="absolute inset-0 flex items-end justify-center p-5 text-center">
                <div className="rounded-full border border-white/15 bg-black/30 px-5 py-2.5 backdrop-blur-md transition duration-300 group-hover:bg-black/40">
                  <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {card.name}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}