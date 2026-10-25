import type { Metadata } from "next";

/* the home page's words, shared by the layout's defaults, the home page's share card and its image */
export const home = {
  title: "Itay Blokh (sho0pi) - $13k a month from apps before 30",
  /* one sentence that fits a result snippet (about 155 characters): who, what, the bet */
  description:
    "Itay Blokh (sho0pi) is a cybersecurity R&D engineer in Singapore, maker of StampStory, Eureka and Gaia, chasing $13,000 a month in passive income before 30.",
  imageAlt: "Itay Blokh (sho0pi): follow my journey of making $13,000/mo while I sleep, before 30",
};

/** The share image's address changes whenever what it shows does (the day, the money, the apps):
    X and LinkedIn keep an image for days by its URL, so a new URL is what makes them fetch the new
    picture. The image route ignores the query; it is only a name. */
export const shareVersion = (day: number, cents: number, apps: number) => `${day}-${cents}-${apps}`;

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
