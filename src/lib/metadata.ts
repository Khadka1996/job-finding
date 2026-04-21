import { Metadata } from "next";
import type { Job } from "@/types/job";

export const siteConfig = {
  name: "Visa Sponsor Jobs",
  description: "Find verified visa sponsorship jobs worldwide. Search 50K+ jobs across 180+ countries with fast filters and real opportunities.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.visasponsorjobs.com",
  ogImage: process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png` : "https://www.visasponsorjobs.com/og-image.png",
  twitterHandle: "@visasponsorjobs",
};

export function getMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const baseMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "visa sponsored jobs",
      "work abroad",
      "immigration jobs",
      "sponsor jobs",
      "global jobs",
      "international jobs",
      "remote jobs with visa",
      "UK jobs visa",
      "Canada jobs",
      "Australia jobs",
      "USA jobs",
    ],
    authors: [{ name: "Intersect Info Developers", url: "https://www.intersect.com.np/" }],
    creator: "Intersect Info Developers",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
  };

  return { ...baseMetadata, ...overrides };
}

export function generateJobMetadata(job: Job, baseUrl: string): Metadata {
  const jobUrl = `${baseUrl}/jobs/${job.slug}`;
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}&location=${encodeURIComponent(job.location)}`;

  return {
    title: `${job.title} at ${job.company} | ${siteConfig.name}`,
    description: job.shortDescription || job.description.substring(0, 160),
    keywords: [...job.categories, job.company, job.location, "visa sponsorship"],
    openGraph: {
      type: "website",
      url: jobUrl,
      title: `${job.title} at ${job.company}`,
      description: job.shortDescription || job.description.substring(0, 160),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.company}`,
      description: job.shortDescription || job.description.substring(0, 160),
      images: [ogImage],
    },
    alternates: {
      canonical: jobUrl,
    },
  };
}

export function generateJobStructuredData(job: Job, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    baseSalary: job.salary
      ? {
          "@type": "PriceSpecification",
          currency: "USD",
          value: job.salary,
        }
      : undefined,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: job.countryCode,
        addressLocality: job.location,
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      url: job.companyUrl || baseUrl,
      logo: job.companyLogo || `${baseUrl}/globe.svg`,
    },
    url: `${baseUrl}/jobs/${job.slug}`,
    employmentType: job.jobTypes.map((type) => type.toUpperCase()).join(","),
    validThroughDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
