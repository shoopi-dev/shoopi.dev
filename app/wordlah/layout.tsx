import type { Metadata } from "next";
import { WordlahGround } from "@/components/wordlah/ground";

/**
 * WordLah pages carry the app's own icon in the tab and its own title suffix, as StampStory's and Eureka's do.
 * Unlisted until launch: the stores and AdMob need the privacy policy and support pages before the app is out, but
 * the app stays a surprise, so search engines are asked to skip these pages. Drop `robots` the day it ships, and add
 * the pages to the sitemap and WordLah to site.apps.
 */
export const metadata: Metadata = {
  title: { default: "WordLah", template: "%s | WordLah" },
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/wordlah/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/wordlah/icon.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/wordlah/apple-touch-icon.png", sizes: "180x180" }],
  },
};

/** Every WordLah page is in the game's own colours and faces, over the site's aurora. */
export default function WordLahLayout({ children }: { children: React.ReactNode }) {
  return <WordlahGround>{children}</WordlahGround>;
}
