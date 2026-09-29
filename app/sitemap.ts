import type { MetadataRoute } from "next";

/* No lastModified, changeFrequency or priority. Google ignores the last two, and a lastmod that is
   `new Date()` on every deploy teaches it to distrust the first as well. Add lastModified back for a
   page only when it is the real date that page's content changed. */
const urls = [
  "https://shoopi.dev",
  "https://shoopi.dev/work",
  "https://stampstory.shoopi.dev",
  "https://stampstory.shoopi.dev/support",
  "https://stampstory.shoopi.dev/privacy",
  "https://stampstory.shoopi.dev/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return urls.map((url) => ({ url }));
}
