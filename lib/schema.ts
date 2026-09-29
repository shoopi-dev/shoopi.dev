import { site } from "@/data/site";
import { stampstory as s } from "@/data/stampstory";

/* Structured data for the two pages that are about these entities: the home page and the StampStory
   landing page. One @id per entity, so every mention points at the same Person and Organization
   instead of inventing a new one. It used to ride on every route, the 404 included. */

const HOME = "https://shoopi.dev";
const id = {
  person: `${HOME}/#itay`,
  org: `${HOME}/#shoopi`,
  site: `${HOME}/#website`,
  gaia: `${HOME}/#gaia`,
  app: `${s.url}/#stampstory`,
};

// references that still say who they are, so a page carrying only a fragment stays readable
const personRef = { "@type": "Person", "@id": id.person, name: site.fullName, url: HOME };
const orgRef = { "@type": "Organization", "@id": id.org, name: "shoopi.dev", url: HOME };

const gaiaCard = site.projects.find((p) => p.name === "Gaia");

const stampstoryApp = {
  "@type": "MobileApplication",
  "@id": id.app,
  name: s.name,
  alternateName: "StampStory: Travel Passport", // the App Store title
  url: s.url,
  description: `${s.subtitle} No account, no server, no analytics.`,
  image: `${s.url}/stampstory/icon.png`,
  applicationCategory: "TravelApplication",
  operatingSystem: s.store.android.status === "live" ? "iOS, Android" : "iOS",
  installUrl: s.store.ios.status === "live" ? s.store.ios.url : undefined,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: personRef,
  publisher: orgRef,
};

export const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": id.person,
      name: site.fullName,
      givenName: "Itay",
      familyName: "Blokh",
      alternateName: "sho0pi",
      description: `${site.summary} Maker of Gaia, an open-source AI agent, and StampStory, a travel passport app for iPhone.`,
      image: `${HOME}/avatar.jpg`,
      jobTitle: site.jobTitle,
      url: HOME,
      email: `mailto:${site.socials.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
      nationality: { "@type": "Country", name: "Israel" },
      sameAs: [site.socials.github, site.socials.x, site.socials.linkedin, site.socials.instagram],
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
          serviceType: ["Web development", "System architecture", "Research and development"],
          provider: { "@id": id.person },
          areaServed: "Worldwide",
        },
      },
    },
    {
      // the brand behind the domain, kept apart from the person so "shoopi" resolves to this
      "@type": "Organization",
      "@id": id.org,
      name: "shoopi.dev",
      alternateName: site.handle, // "shoopi", what people type when they look for it
      url: HOME,
      logo: `${HOME}/brand/png/mark-1024.png`,
      email: site.socials.email,
      founder: personRef,
      sameAs: ["https://github.com/shoopi-dev", site.socials.instagram],
    },
    {
      "@type": "WebSite",
      "@id": id.site,
      name: "shoopi.dev",
      alternateName: site.handle,
      url: HOME,
      inLanguage: "en",
      publisher: orgRef,
      author: personRef,
    },
    {
      "@type": "SoftwareApplication",
      "@id": id.gaia,
      name: "Gaia",
      url: gaiaCard?.link,
      description: gaiaCard?.description,
      sameAs: "https://github.com/sho0pi/gaia",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: personRef,
    },
    stampstoryApp,
  ],
};

/** stampstory.shoopi.dev is its own site to Google, so it names itself: "StampStory", not "shoopi.dev" */
export const stampstoryGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${s.url}/#website`,
      name: s.name,
      url: s.url,
      inLanguage: "en",
      publisher: orgRef,
    },
    stampstoryApp,
  ],
};
