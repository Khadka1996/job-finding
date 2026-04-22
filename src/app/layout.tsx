import type { Metadata } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteInfoBar } from "@/components/site-info-bar";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getMetadata, siteConfig } from "@/lib/metadata";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/jobs?q={search_term_string}`,
      },
      query_input: "required name=search_term_string",
    },
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Visa Sponsor Jobs",
    url: siteConfig.url,
    logo: `${siteConfig.url}/globe.svg`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "info@visasponsorjobs.com",
    },
    sameAs: [
      "https://www.intersect.com.np/",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${ibmPlexMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/bg-image.jpg" />
        <link rel="preload" as="image" href="/worker.png" />
        <link rel="preload" as="image" href="/globe.svg" />
        {/* Vercel compatibility meta tag */}
        <meta name="vercel" content="deploy" />

        {/* Prefetch DNS for external resources */}
        <link rel="dns-prefetch" href="https://www.arbeitnow.com" />
        <link rel="dns-prefetch" href="https://remotive.com" />
        <link rel="dns-prefetch" href="https://www.themuse.com" />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
          suppressHydrationWarning
        />

        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Google AdSense */}
        {adsenseClientId ? (
          <Script
            id="google-adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          />
        ) : null}
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-slate-950 antialiased"
      >
        {/* Google Analytics */}
        {gaMeasurementId ? (
          <>
            <Script
              id="google-analytics-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        ) : null}

        <SiteInfoBar />
        <SiteHeader />
        <main className="flex-1">
          <Suspense fallback={<div className="h-screen bg-white" />}>
            {children}
          </Suspense>
        </main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
