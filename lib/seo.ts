import type { Metadata } from "next";

/* Next merges route metadata shallowly: a page that sets `openGraph` or `twitter` replaces the
   layout's whole object, image and creator included, so its share card went out with no picture and
   the home page's title. Every page with a title of its own goes through here, so the card is complete. */
export function social({
  title,
  description,
  url,
  image,
  imageAlt,
  siteName = "shoopi.dev",
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
  siteName?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@sho0pi",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}
