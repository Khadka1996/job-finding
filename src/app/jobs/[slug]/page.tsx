import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildJobPath, decodeHtmlEntities, isValidLogoUrl } from "@/lib/jobs-page";
import { getJobBySlug, getJobs } from "@/lib/api";
import { siteConfig } from "@/lib/metadata";
import { BookmarkButton } from "@/components/bookmark-button";
import { CompanyLogoBadge } from "@/components/company-logo-badge";
import ReactCountryFlag from "react-country-flag";

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
  const companyLogoUrl: string | null = isValidLogoUrl(job.companyLogo) ? job.companyLogo ?? null : null;
  const postedDate = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Unknown";

function getFlagEmoji(location = "") {
  const loc = location.toLowerCase();

  const flag = (code: string, title?: string) => (
    <ReactCountryFlag svg countryCode={code} style={{ width: '1.2rem', height: '1.2rem' }} title={title ?? code} />
  );

  if (loc.includes("united states") || loc.includes("usa") || loc === "us") return flag("US", "United States");
  if (loc.includes("united kingdom") || loc.includes("uk") || loc.includes("great britain") || loc.includes("britain") || loc.includes("england")) return flag("GB", "United Kingdom");
  if (loc.includes("australia")) return flag("AU", "Australia");
  if (loc.includes("germany")) return flag("DE", "Germany");
  if (loc.includes("france")) return flag("FR", "France");
  if (loc.includes("ireland")) return flag("IE", "Ireland");
  if (loc.includes("canada")) return flag("CA", "Canada");
  if (loc.includes("netherlands") || loc.includes("holland")) return flag("NL", "Netherlands");
  if (loc.includes("new zealand")) return flag("NZ", "New Zealand");
  if (loc.includes("singapore")) return flag("SG", "Singapore");
  if (loc.includes("portugal")) return flag("PT", "Portugal");
  if (loc.includes("spain")) return flag("ES", "Spain");
  if (loc.includes("india")) return flag("IN", "India");
  if (loc.includes("brazil")) return flag("BR", "Brazil");
  if (loc.includes("nigeria")) return flag("NG", "Nigeria");
  if (loc.includes("pakistan")) return flag("PK", "Pakistan");
  if (loc.includes("bulgaria")) return flag("BG", "Bulgaria");
  if (loc.includes("serbia")) return flag("RS", "Serbia");

  // Remaining countries (sample subset kept for brevity) — map to codes similarly
  if (loc.includes("afghanistan")) return flag("AF");
  if (loc.includes("albania")) return flag("AL");
  if (loc.includes("algeria")) return flag("DZ");
  if (loc.includes("andorra")) return flag("AD");
  if (loc.includes("angola")) return flag("AO");
  if (loc.includes("argentina")) return flag("AR");
  if (loc.includes("armenia")) return flag("AM");
  if (loc.includes("austria")) return flag("AT");
  if (loc.includes("azerbaijan")) return flag("AZ");
  if (loc.includes("bahamas")) return flag("BS");
  if (loc.includes("bahrain")) return flag("BH");
  if (loc.includes("bangladesh")) return flag("BD");
  if (loc.includes("barbados")) return flag("BB");
  if (loc.includes("belarus")) return flag("BY");
  if (loc.includes("belgium")) return flag("BE");
  if (loc.includes("belize")) return flag("BZ");
  if (loc.includes("benin")) return flag("BJ");
  if (loc.includes("bhutan")) return flag("BT");
  if (loc.includes("bolivia")) return flag("BO");
  if (loc.includes("bosnia")) return flag("BA");
  if (loc.includes("botswana")) return flag("BW");
  if (loc.includes("brunei")) return flag("BN");
  if (loc.includes("burkina faso")) return flag("BF");
  if (loc.includes("burundi")) return flag("BI");
  if (loc.includes("cambodia")) return flag("KH");
  if (loc.includes("cameroon")) return flag("CM");
  if (loc.includes("chile")) return flag("CL");
  if (loc.includes("china")) return flag("CN");
  if (loc.includes("colombia")) return flag("CO");
  if (loc.includes("croatia")) return flag("HR");
  if (loc.includes("cuba")) return flag("CU");
  if (loc.includes("cyprus")) return flag("CY");
  if (loc.includes("czech")) return flag("CZ");
  if (loc.includes("denmark")) return flag("DK");
  if (loc.includes("ecuador")) return flag("EC");
  if (loc.includes("egypt")) return flag("EG");
  if (loc.includes("estonia")) return flag("EE");
  if (loc.includes("finland")) return flag("FI");
  if (loc.includes("greece")) return flag("GR");
  if (loc.includes("hungary")) return flag("HU");
  if (loc.includes("iceland")) return flag("IS");
  if (loc.includes("indonesia")) return flag("ID");
  if (loc.includes("iran")) return flag("IR");
  if (loc.includes("iraq")) return flag("IQ");
  if (loc.includes("italy")) return flag("IT");
  if (loc.includes("japan")) return flag("JP");
  if (loc.includes("kenya")) return flag("KE");
  if (loc.includes("kuwait")) return flag("KW");
  if (loc.includes("laos")) return flag("LA");
  if (loc.includes("latvia")) return flag("LV");
  if (loc.includes("lebanon")) return flag("LB");
  if (loc.includes("libya")) return flag("LY");
  if (loc.includes("lithuania")) return flag("LT");
  if (loc.includes("luxembourg")) return flag("LU");
  if (loc.includes("madagascar")) return flag("MG");
  if (loc.includes("malaysia")) return flag("MY");
  if (loc.includes("malta")) return flag("MT");
  if (loc.includes("mauritius")) return flag("MU");
  if (loc.includes("mexico")) return flag("MX");
  if (loc.includes("moldova")) return flag("MD");
  if (loc.includes("monaco")) return flag("MC");
  if (loc.includes("mongolia")) return flag("MN");
  if (loc.includes("morocco")) return flag("MA");
  if (loc.includes("mozambique")) return flag("MZ");
  if (loc.includes("myanmar") || loc.includes("burma")) return flag("MM");
  if (loc.includes("nepal")) return flag("NP");
  if (loc.includes("norway")) return flag("NO");
  if (loc.includes("oman")) return flag("OM");
  if (loc.includes("pakistan")) return flag("PK");
  if (loc.includes("panama")) return flag("PA");
  if (loc.includes("peru")) return flag("PE");
  if (loc.includes("philippines")) return flag("PH");
  if (loc.includes("poland")) return flag("PL");
  if (loc.includes("qatar")) return flag("QA");
  if (loc.includes("romania")) return flag("RO");
  if (loc.includes("russia")) return flag("RU");
  if (loc.includes("rwanda")) return flag("RW");
  if (loc.includes("saudi arabia")) return flag("SA");
  if (loc.includes("senegal")) return flag("SN");
  if (loc.includes("seychelles")) return flag("SC");
  if (loc.includes("slovakia")) return flag("SK");
  if (loc.includes("slovenia")) return flag("SI");
  if (loc.includes("solomon islands")) return flag("SB");
  if (loc.includes("somalia")) return flag("SO");
  if (loc.includes("south africa")) return flag("ZA");
  if (loc.includes("south sudan")) return flag("SS");
  if (loc.includes("sri lanka")) return flag("LK");
  if (loc.includes("sudan")) return flag("SD");
  if (loc.includes("suriname")) return flag("SR");
  if (loc.includes("sweden")) return flag("SE");
  if (loc.includes("switzerland")) return flag("CH");
  if (loc.includes("syria")) return flag("SY");
  if (loc.includes("taiwan")) return flag("TW");
  if (loc.includes("thailand")) return flag("TH");
  if (loc.includes("togo")) return flag("TG");
  if (loc.includes("trinidad and tobago")) return flag("TT");
  if (loc.includes("tunisia")) return flag("TN");
  if (loc.includes("turkey")) return flag("TR");
  if (loc.includes("turkmenistan")) return flag("TM");
  if (loc.includes("uganda")) return flag("UG");
  if (loc.includes("ukraine")) return flag("UA");
  if (loc.includes("united arab emirates") || loc.includes("uae")) return flag("AE");
  if (loc.includes("uruguay")) return flag("UY");
  if (loc.includes("uzbekistan")) return flag("UZ");
  if (loc.includes("vanuatu")) return flag("VU");
  if (loc.includes("vatican")) return flag("VA");
  if (loc.includes("venezuela")) return flag("VE");
  if (loc.includes("vietnam")) return flag("VN");
  if (loc.includes("yemen")) return flag("YE");
  if (loc.includes("zambia")) return flag("ZM");
  if (loc.includes("zimbabwe")) return flag("ZW");

  // Territories
  if (loc.includes("hong kong")) return flag("HK");
  if (loc.includes("macau")) return flag("MO");
  if (loc.includes("puerto rico")) return flag("PR");

  return <span aria-hidden>🌍</span>;
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
            <div className="mobile-job-summary">
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 56, height: 56, flexShrink: 0, borderRadius: 16, background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", border: "1px solid #dbe3ee", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CompanyLogoBadge logoUrl={companyLogoUrl} companyName={cleanCompanyName} />
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Company</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{cleanCompanyName}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Location</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#374151", fontWeight: 500 }}>
                      <span style={{ fontSize: 18 }}>{getFlagEmoji(cleanLocation)}</span>
                      <span>{cleanLocation}</span>
                    </div>
                  </div>

                  {cleanCategories.length > 0 ? (
                    <div>
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

                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Salary</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>{cleanSalary}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Posted</div>
                    <div style={{ fontSize: 14, color: "#64748b" }}>{postedDate}</div>
                  </div>

                  <div>
                    <BookmarkButton job={job} />
                  </div>
                </div>
              </div>
            </div>

            {/* Job description and structured content */}
            <div className="prose" style={{ fontSize: 15, lineHeight: 1.75, color: "#374151", maxWidth: "100%", marginBottom: 40 }}>
              {job.description ? (
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              ) : (
                <p>No description provided.</p>
              )}
            </div>

            <div className="mobile-apply-bar">
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", textAlign: "center", background: "#1e293b", color: "#ffffff", fontSize: 16, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", padding: 18, borderRadius: 8, textDecoration: "none", border: "none", cursor: "pointer" }}>
                Apply Now
              </a>
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
          .job-sidebar { display: none !important; }
          .mobile-job-summary { display: block !important; }
          .mobile-apply-bar { display: block !important; margin-top: 24px; }
        }
        @media (min-width: 769px) {
          .mobile-job-summary { display: none !important; }
          .mobile-apply-bar { display: none !important; }
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