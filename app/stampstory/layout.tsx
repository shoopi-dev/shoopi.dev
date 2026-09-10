import type { Metadata } from "next";

/**
 * StampStory pages carry the app's own logo in the tab and its own title suffix - on
 * stampstory.shoopi.dev these are the product's pages, not a section of the personal site.
 * Declared here rather than through the app-dir `icon` file convention, which would collide
 * with the static /stampstory/icon.png used by the hero and the app tile.
 */
export const metadata: Metadata = {
  title: { default: "StampStory", template: "%s | StampStory" },
  icons: {
    icon: [
      { url: "/stampstory/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/stampstory/icon.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/stampstory/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function StampStoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
