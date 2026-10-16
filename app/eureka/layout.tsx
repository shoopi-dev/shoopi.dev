import type { Metadata } from "next";

/**
 * Eureka pages carry the app's own icon in the tab and its own title suffix: they are the product's
 * pages, not a section of the personal site. Declared here, as StampStory's are, rather than through
 * the app-dir `icon` file convention, which would collide with the static /eureka/icon.png the hero uses.
 */
export const metadata: Metadata = {
  title: { default: "Eureka", template: "%s | Eureka" },
  icons: {
    icon: [
      { url: "/eureka/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/eureka/icon.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/eureka/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function EurekaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
