import type { Metadata } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteInfoBar } from "@/components/site-info-bar";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Visa Sponsor Jobs",
    template: "%s | Visa Sponsor Jobs",
  },
  description: "Find visa sponsored jobs worldwide with a fast, modern job board built for conversion.",
  openGraph: {
    title: "Visa Sponsor Jobs",
    description: "Find visa sponsored jobs worldwide with a fast, modern job board built for conversion.",
    url: "/",
    siteName: "Visa Sponsor Jobs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Sponsor Jobs",
    description: "Find visa sponsored jobs worldwide with a fast, modern job board built for conversion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[radial-gradient(circle_at_top,rgba(177,15,46,0.12),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(20,33,61,0.14),transparent_36%),linear-gradient(180deg,#ffffff,#f5f7fc_45%,#eef1f8_100%)] text-slate-950"
      >
        <SiteInfoBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
