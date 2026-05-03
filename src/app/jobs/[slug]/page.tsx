import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildJobPath, decodeHtmlEntities } from "@/lib/jobs-page";
import { getJobBySlug, getJobs } from "@/lib/api";
import { siteConfig } from "@/lib/metadata";
import { BookmarkButton } from "@/components/bookmark-button";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job not found",
    };
  }

  return {
    title: `${job.title} at ${job.company} | ${siteConfig.name}`,
    description: job.description.slice(0, 160),
    alternates: {
      canonical: buildJobPath(job),
    },
  };
}

export const revalidate = 0;

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const allJobs = await getJobs();
  const similarJobs = allJobs.jobs.filter((item) => item.slug !== job.slug).slice(0, 3);

  const cleanTitle = decodeHtmlEntities(job.title);
  const cleanCompanyName = decodeHtmlEntities(job.company);
  const cleanLocation = decodeHtmlEntities(job.location || "Worldwide");
  const cleanCategories = (job.categories ?? []).map((category) => decodeHtmlEntities(category));
  const cleanSalary = job.salary ? decodeHtmlEntities(job.salary).trim() : "Not disclosed";
  const postedDate = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Unknown";

 function getFlagEmoji(location = "") {
    const loc = location.toLowerCase();
    
    // Original entries (kept at the top for priority)
    if (loc.includes("united states") || loc.includes("usa") || loc === "us") return "🇺🇸";
    if (loc.includes("united kingdom") || loc.includes("uk") || loc.includes("great britain") || loc.includes("britain") || loc.includes("england")) return "🇬🇧";
    if (loc.includes("australia")) return "🇦🇺";
    if (loc.includes("germany")) return "🇩🇪";
    if (loc.includes("france")) return "🇫🇷";
    if (loc.includes("ireland")) return "🇮🇪";
    if (loc.includes("canada")) return "🇨🇦";
    if (loc.includes("netherlands") || loc.includes("holland")) return "🇳🇱";
    if (loc.includes("new zealand")) return "🇳🇿";
    if (loc.includes("singapore")) return "🇸🇬";
    if (loc.includes("portugal")) return "🇵🇹";
    if (loc.includes("spain")) return "🇪🇸";
    if (loc.includes("india")) return "🇮🇳";
    if (loc.includes("brazil")) return "🇧🇷";
    if (loc.includes("nigeria")) return "🇳🇬";
    if (loc.includes("pakistan")) return "🇵🇰";
    if (loc.includes("bulgaria")) return "🇧🇬";
    if (loc.includes("serbia")) return "🇷🇸";

    // All remaining countries (and widely recognized territories)
    if (loc.includes("afghanistan")) return "🇦🇫";
    if (loc.includes("albania")) return "🇦🇱";
    if (loc.includes("algeria")) return "🇩🇿";
    if (loc.includes("andorra")) return "🇦🇩";
    if (loc.includes("angola")) return "🇦🇴";
    if (loc.includes("antigua and barbuda")) return "🇦🇬";
    if (loc.includes("argentina")) return "🇦🇷";
    if (loc.includes("armenia")) return "🇦🇲";
    if (loc.includes("austria")) return "🇦🇹";
    if (loc.includes("azerbaijan")) return "🇦🇿";
    if (loc.includes("bahamas")) return "🇧🇸";
    if (loc.includes("bahrain")) return "🇧🇭";
    if (loc.includes("bangladesh")) return "🇧🇩";
    if (loc.includes("barbados")) return "🇧🇧";
    if (loc.includes("belarus")) return "🇧🇾";
    if (loc.includes("belgium")) return "🇧🇪";
    if (loc.includes("belize")) return "🇧🇿";
    if (loc.includes("benin")) return "🇧🇯";
    if (loc.includes("bhutan")) return "🇧🇹";
    if (loc.includes("bolivia")) return "🇧🇴";
    if (loc.includes("bosnia and herzegovina") || loc.includes("bosnia")) return "🇧🇦";
    if (loc.includes("botswana")) return "🇧🇼";
    if (loc.includes("brunei")) return "🇧🇳";
    if (loc.includes("burkina faso")) return "🇧🇫";
    if (loc.includes("burundi")) return "🇧🇮";
    if (loc.includes("cabo verde") || loc.includes("cape verde")) return "🇨🇻";
    if (loc.includes("cambodia")) return "🇰🇭";
    if (loc.includes("cameroon")) return "🇨🇲";
    if (loc.includes("central african republic")) return "🇨🇫";
    if (loc.includes("chad")) return "🇹🇩";
    if (loc.includes("chile")) return "🇨🇱";
    if (loc.includes("china")) return "🇨🇳";
    if (loc.includes("colombia")) return "🇨🇴";
    if (loc.includes("comoros")) return "🇰🇲";
    if (loc.includes("congo, democratic republic of the") || loc.includes("democratic republic of the congo") || loc.includes("congo-kinshasa") || loc.includes("drc")) return "🇨🇩";
    if (loc.includes("congo, republic of the") || loc.includes("republic of the congo") || loc.includes("congo-brazzaville")) return "🇨🇬";
    if (loc.includes("costa rica")) return "🇨🇷";
    if (loc.includes("côte d'ivoire") || loc.includes("ivory coast")) return "🇨🇮";
    if (loc.includes("croatia")) return "🇭🇷";
    if (loc.includes("cuba")) return "🇨🇺";
    if (loc.includes("cyprus")) return "🇨🇾";
    if (loc.includes("czech republic") || loc.includes("czechia")) return "🇨🇿";
    if (loc.includes("denmark")) return "🇩🇰";
    if (loc.includes("djibouti")) return "🇩🇯";
    if (loc.includes("dominica")) return "🇩🇲";
    if (loc.includes("dominican republic")) return "🇩🇴";
    if (loc.includes("ecuador")) return "🇪🇨";
    if (loc.includes("egypt")) return "🇪🇬";
    if (loc.includes("el salvador")) return "🇸🇻";
    if (loc.includes("equatorial guinea")) return "🇬🇶";
    if (loc.includes("eritrea")) return "🇪🇷";
    if (loc.includes("estonia")) return "🇪🇪";
    if (loc.includes("eswatini") || loc.includes("swaziland")) return "🇸🇿";
    if (loc.includes("ethiopia")) return "🇪🇹";
    if (loc.includes("fiji")) return "🇫🇯";
    if (loc.includes("finland")) return "🇫🇮";
    if (loc.includes("gabon")) return "🇬🇦";
    if (loc.includes("gambia")) return "🇬🇲";
    if (loc.includes("georgia")) return "🇬🇪";
    if (loc.includes("ghana")) return "🇬🇭";
    if (loc.includes("greece")) return "🇬🇷";
    if (loc.includes("grenada")) return "🇬🇩";
    if (loc.includes("guatemala")) return "🇬🇹";
    if (loc.includes("guinea")) return "🇬🇳";
    if (loc.includes("guinea-bissau")) return "🇬🇼";
    if (loc.includes("guyana")) return "🇬🇾";
    if (loc.includes("haiti")) return "🇭🇹";
    if (loc.includes("honduras")) return "🇭🇳";
    if (loc.includes("hungary")) return "🇭🇺";
    if (loc.includes("iceland")) return "🇮🇸";
    if (loc.includes("indonesia")) return "🇮🇩";
    if (loc.includes("iran")) return "🇮🇷";
    if (loc.includes("iraq")) return "🇮🇶";
    if (loc.includes("israel")) return "🇮🇱";
    if (loc.includes("italy")) return "🇮🇹";
    if (loc.includes("jamaica")) return "🇯🇲";
    if (loc.includes("japan")) return "🇯🇵";
    if (loc.includes("jordan")) return "🇯🇴";
    if (loc.includes("kazakhstan")) return "🇰🇿";
    if (loc.includes("kenya")) return "🇰🇪";
    if (loc.includes("kiribati")) return "🇰🇮";
    if (loc.includes("north korea") || loc.includes("democratic people's republic of korea") || loc.includes("dprk")) return "🇰🇵";
    if (loc.includes("south korea") || loc.includes("republic of korea") || loc.includes("korea")) return "🇰🇷";
    if (loc.includes("kuwait")) return "🇰🇼";
    if (loc.includes("kyrgyzstan")) return "🇰🇬";
    if (loc.includes("laos")) return "🇱🇦";
    if (loc.includes("latvia")) return "🇱🇻";
    if (loc.includes("lebanon")) return "🇱🇧";
    if (loc.includes("lesotho")) return "🇱🇸";
    if (loc.includes("liberia")) return "🇱🇷";
    if (loc.includes("libya")) return "🇱🇾";
    if (loc.includes("liechtenstein")) return "🇱🇮";
    if (loc.includes("lithuania")) return "🇱🇹";
    if (loc.includes("luxembourg")) return "🇱🇺";
    if (loc.includes("madagascar")) return "🇲🇬";
    if (loc.includes("malawi")) return "🇲🇼";
    if (loc.includes("malaysia")) return "🇲🇾";
    if (loc.includes("maldives")) return "🇲🇻";
    if (loc.includes("mali")) return "🇲🇱";
    if (loc.includes("malta")) return "🇲🇹";
    if (loc.includes("marshall islands")) return "🇲🇭";
    if (loc.includes("mauritania")) return "🇲🇷";
    if (loc.includes("mauritius")) return "🇲🇺";
    if (loc.includes("mexico")) return "🇲🇽";
    if (loc.includes("micronesia")) return "🇫🇲";
    if (loc.includes("moldova")) return "🇲🇩";
    if (loc.includes("monaco")) return "🇲🇨";
    if (loc.includes("mongolia")) return "🇲🇳";
    if (loc.includes("montenegro")) return "🇲🇪";
    if (loc.includes("morocco")) return "🇲🇦";
    if (loc.includes("mozambique")) return "🇲🇿";
    if (loc.includes("myanmar") || loc.includes("burma")) return "🇲🇲";
    if (loc.includes("namibia")) return "🇳🇦";
    if (loc.includes("nauru")) return "🇳🇷";
    if (loc.includes("nepal")) return "🇳🇵";
    if (loc.includes("nicaragua")) return "🇳🇮";
    if (loc.includes("niger")) return "🇳🇪";
    if (loc.includes("north macedonia") || loc.includes("macedonia")) return "🇲🇰";
    if (loc.includes("norway")) return "🇳🇴";
    if (loc.includes("oman")) return "🇴🇲";
    if (loc.includes("palau")) return "🇵🇼";
    if (loc.includes("palestine")) return "🇵🇸";
    if (loc.includes("panama")) return "🇵🇦";
    if (loc.includes("papua new guinea")) return "🇵🇬";
    if (loc.includes("paraguay")) return "🇵🇾";
    if (loc.includes("peru")) return "🇵🇪";
    if (loc.includes("philippines")) return "🇵🇭";
    if (loc.includes("poland")) return "🇵🇱";
    if (loc.includes("qatar")) return "🇶🇦";
    if (loc.includes("romania")) return "🇷🇴";
    if (loc.includes("russia")) return "🇷🇺";
    if (loc.includes("rwanda")) return "🇷🇼";
    if (loc.includes("saint kitts and nevis") || loc.includes("st kitts and nevis")) return "🇰🇳";
    if (loc.includes("saint lucia") || loc.includes("st lucia")) return "🇱🇨";
    if (loc.includes("saint vincent and the grenadines") || loc.includes("st vincent and the grenadines")) return "🇻🇨";
    if (loc.includes("samoa")) return "🇼🇸";
    if (loc.includes("san marino")) return "🇸🇲";
    if (loc.includes("sao tome and principe")) return "🇸🇹";
    if (loc.includes("saudi arabia")) return "🇸🇦";
    if (loc.includes("senegal")) return "🇸🇳";
    if (loc.includes("seychelles")) return "🇸🇨";
    if (loc.includes("sierra leone")) return "🇸🇱";
    if (loc.includes("slovakia")) return "🇸🇰";
    if (loc.includes("slovenia")) return "🇸🇮";
    if (loc.includes("solomon islands")) return "🇸🇧";
    if (loc.includes("somalia")) return "🇸🇴";
    if (loc.includes("south africa")) return "🇿🇦";
    if (loc.includes("south sudan")) return "🇸🇸";
    if (loc.includes("sri lanka")) return "🇱🇰";
    if (loc.includes("sudan")) return "🇸🇩";
    if (loc.includes("suriname")) return "🇸🇷";
    if (loc.includes("sweden")) return "🇸🇪";
    if (loc.includes("switzerland")) return "🇨🇭";
    if (loc.includes("syria")) return "🇸🇾";
    if (loc.includes("taiwan")) return "🇹🇼";
    if (loc.includes("tajikistan")) return "🇹🇯";
    if (loc.includes("tanzania")) return "🇹🇿";
    if (loc.includes("thailand")) return "🇹🇭";
    if (loc.includes("timor-leste") || loc.includes("east timor")) return "🇹🇱";
    if (loc.includes("togo")) return "🇹🇬";
    if (loc.includes("tonga")) return "🇹🇴";
    if (loc.includes("trinidad and tobago")) return "🇹🇹";
    if (loc.includes("tunisia")) return "🇹🇳";
    if (loc.includes("turkey")) return "🇹🇷";
    if (loc.includes("turkmenistan")) return "🇹🇲";
    if (loc.includes("tuvalu")) return "🇹🇻";
    if (loc.includes("uganda")) return "🇺🇬";
    if (loc.includes("ukraine")) return "🇺🇦";
    if (loc.includes("united arab emirates") || loc.includes("uae")) return "🇦🇪";
    if (loc.includes("uruguay")) return "🇺🇾";
    if (loc.includes("uzbekistan")) return "🇺🇿";
    if (loc.includes("vanuatu")) return "🇻🇺";
    if (loc.includes("vatican city") || loc.includes("holy see")) return "🇻🇦";
    if (loc.includes("venezuela")) return "🇻🇪";
    if (loc.includes("vietnam")) return "🇻🇳";
    if (loc.includes("yemen")) return "🇾🇪";
    if (loc.includes("zambia")) return "🇿🇲";
    if (loc.includes("zimbabwe")) return "🇿🇼";

    // Common territories with flag emojis
    if (loc.includes("hong kong")) return "🇭🇰";
    if (loc.includes("macau")) return "🇲🇴";
    if (loc.includes("puerto rico")) return "🇵🇷";

    return "🌍";
}

  return (
    <div style={{ background: "#ffffff" }}>
      {/* Light blue header banner */}
      <div style={{ background: "linear-gradient(135deg, #e8f0f7 0%, #d4e4f1 100%)", paddingTop: 24, paddingBottom: 32 }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" style={{ color: "#64748b", fontSize: 14, textDecoration: "none", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 6 }}>
            ← Vacancies
          </Link>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{cleanTitle}</h1>
        </div>
      </div>

      {/* Main content area */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="job-detail-layout" style={{ display: "grid", gap: 40, gridTemplateColumns: "minmax(0, 1fr) 35%", alignItems: "start" }}>
          
          {/* Left column: main content */}
          <div style={{ minWidth: 0 }}>
            {/* Job description and structured content */}
            <div className="prose" style={{ fontSize: 15, lineHeight: 1.75, color: "#374151", maxWidth: "100%", marginBottom: 40 }}>
              {job.description ? (
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              ) : (
                <p>No description provided.</p>
              )}
            </div>

            {/* Similar jobs section */}
            {similarJobs.length > 0 ? (
              <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #e2e8f0" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>More jobs like this</h2>
                <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  {similarJobs.map((s) => (
                    <Link key={s.slug} href={buildJobPath(s)} style={{ display: "block", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, textDecoration: "none", color: "inherit", transition: "all 0.2s ease", background: "#ffffff" }}>
                      <div style={{ fontWeight: 600, color: "#0f172a", fontSize: 15 }}>{s.title}</div>
                      <div style={{ marginTop: 8, fontSize: 13, color: "#64748b" }}>{s.company}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right column: sticky sidebar card */}
          <div className="job-sidebar" style={{ position: "sticky", top: 24, height: "fit-content" }}>
            <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              
              {/* Company name */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Company</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{cleanCompanyName}</div>
              </div>

              {/* Location with flag */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Location</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#374151", fontWeight: 500 }}>
                  <span style={{ fontSize: 18 }}>{getFlagEmoji(cleanLocation)}</span>
                  <span>{cleanLocation}</span>
                </div>
              </div>

              {/* Category badge */}
              {cleanCategories.length > 0 ? (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Category</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cleanCategories.map((cat) => (
                      <span key={cat} style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: 20, fontSize: 13, padding: "6px 14px", fontWeight: 600 }}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Salary */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Salary</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>{cleanSalary}</div>
              </div>

              {/* Posted date */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Posted</div>
                <div style={{ fontSize: 14, color: "#64748b" }}>{postedDate}</div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #f1f5f9", marginBottom: 20 }} />

              {/* Apply button */}
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", textAlign: "center", background: "#1e293b", color: "#ffffff", fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", padding: 14, borderRadius: 8, textDecoration: "none", border: "none", cursor: "pointer", marginBottom: 12, transition: "background 0.2s ease" }}>
                Apply Now
              </a>

              {/* Bookmark button */}
              <div style={{ marginBottom: 12 }}>
                <BookmarkButton job={job} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .job-detail-layout { display: grid; gap: 40px; align-items: start; grid-template-columns: minmax(0, 1fr) 35%; }
        @media (max-width: 768px) {
          .job-detail-layout { grid-template-columns: 1fr !important; gap: 24px; }
          .job-sidebar { width: 100% !important; position: static !important; }
        }
        .prose { font-size: 15px; line-height: 1.75; color: #374151; max-width: 100%; }
        .prose h1, .prose h2, .prose h3 { font-weight: 700; color: #111827; margin-top: 1.5em; margin-bottom: 0.75em; }
        .prose h2 { font-size: 18px; }
        .prose h3 { font-size: 16px; }
        .prose p { margin-bottom: 1em; }
        .prose ul, .prose ol { padding-left: 1.5em; margin-bottom: 1em; }
        .prose li { margin-bottom: 0.5em; }
        .prose strong, .prose b { font-weight: 600; color: #111827; }
        .prose a { color: #0ea5e9; text-decoration: underline; }
      `}</style>
    </div>
  );
}