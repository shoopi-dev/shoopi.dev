import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { site } from "@/data/site";
import { GradualBlur } from "@/components/gradual-blur";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const description =
  "Itay Blokh (sho0pi) is a cybersecurity R&D engineer and agentic AI builder based in Singapore. Creator of Gaia, an open-source AI agent. Available for client work - websites, system architecture and hands-on R&D - while chasing $1,000,000 before turning 30, built in public.";

export const metadata: Metadata = {
  metadataBase: new URL("https://shoopi.dev"),
  title: {
    default: "Itay Blokh (sho0pi) - $1M from apps before 30",
    template: "%s | shoopi.dev",
  },
  description,
  alternates: { canonical: "https://shoopi.dev" },
  openGraph: {
    title: "Itay Blokh (sho0pi) - $1M from apps before 30",
    description,
    url: "https://shoopi.dev",
    siteName: "shoopi.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Itay Blokh (sho0pi) - $1M from apps before 30",
    description,
    creator: "@sho0pi",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://shoopi.dev/#itay",
      name: site.fullName,
      alternateName: "sho0pi",
      jobTitle: site.jobTitle,
      url: "https://shoopi.dev",
      email: `mailto:${site.socials.email}`,
      address: { "@type": "PostalAddress", addressCountry: "SG" },
      nationality: { "@type": "Country", name: "Israel" },
      sameAs: [site.socials.github, site.socials.x, site.socials.instagram],
      knowsAbout: [
        "Cybersecurity",
        "Agentic AI",
        "AI Agents",
        "Software Architecture",
        "Web Development",
        "Go",
        "Kotlin",
        "Android",
      ],
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software development and R&D",
          serviceType: [
            "Web development",
            "System architecture",
            "Research and development",
          ],
          provider: { "@id": "https://shoopi.dev/#itay" },
          areaServed: "Worldwide",
        },
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Gaia",
      url: "https://gaia-agent.com",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": "https://shoopi.dev/#itay" },
    },
    {
      "@type": "WebSite",
      name: "shoopi.dev",
      url: "https://shoopi.dev",
      author: { "@id": "https://shoopi.dev/#itay" },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} h-full antialiased`}>
      <body className="wallpaper min-h-full font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="blob blob-a" aria-hidden />
        <div className="blob blob-b" aria-hidden />
        <div className="blob blob-c" aria-hidden />
        {children}
        <GradualBlur
          target="page"
          position="bottom"
          height="5rem"
          strength={2}
          divCount={3}
          curve="bezier"
          exponential
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
