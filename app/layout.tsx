import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { GradualBlur } from "@/components/gradual-blur";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const title = "Itay Blokh (sho0pi) - $13k a month from apps before 30";

/* one sentence that fits a result snippet (about 155 characters): who, what, the bet */
const description =
  "Itay Blokh (sho0pi) is a cybersecurity R&D engineer in Singapore, maker of Gaia and StampStory, chasing $13,000 a month in passive income before 30.";

export const metadata: Metadata = {
  metadataBase: new URL("https://shoopi.dev"),
  title: {
    default: title,
    template: "%s | shoopi.dev",
  },
  description,
  alternates: { canonical: "https://shoopi.dev" },
  /* theme-aware favicons per the brand asset sheet: light/dark SVG picked by
     the browser's scheme, PNG fallback + apple-touch stay light */
  icons: {
    icon: [
      {
        url: "/brand/favicon-small-light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/brand/favicon-small.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
      { url: "/brand/png/favicon-light-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/png/apple-touch-light-180.png", sizes: "180x180" }],
  },
  openGraph: {
    title,
    description,
    url: "https://shoopi.dev",
    siteName: "shoopi.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@sho0pi",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="wallpaper min-h-full font-sans text-ink">
        <div className="blob blob-a" aria-hidden />
        <div className="blob blob-b" aria-hidden />
        <div className="blob blob-c" aria-hidden />
        <div className="grain" aria-hidden />
        {children}
        {/* not on phones: three more backdrop-filter layers dropped frames while
            scrolling on a mid-range Android, and it blurred buttons at the edge */}
        <div className="max-sm:hidden">
          <GradualBlur
            target="page"
            position="bottom"
            height="5rem"
            strength={2}
            divCount={3}
            curve="bezier"
            exponential
          />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
