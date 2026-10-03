import { campaignOf, storeLink } from "@/lib/store-link";

/**
 * stampstory.shoopi.dev/get: the one link for bios, posts and QR codes. Each device lands in its own app store, or on
 * the landing page when there is none for it yet (lib/store-link.ts). The App Store link names where the visit came
 * from, so App Store Connect counts downloads per source: `?c=<source>` (`/get?c=reddit`), else a guess from the
 * in-app browser or the referrer.
 */
export function GET(request: Request) {
  const userAgent = request.headers.get("user-agent");
  const campaign = campaignOf(request.url, userAgent, request.headers.get("referer"));
  return new Response(null, {
    status: 302,
    headers: {
      Location: storeLink(userAgent, campaign),
      // one URL, a different answer per device and source: no browser or CDN may keep one answer for everybody
      "Cache-Control": "no-store",
      Vary: "User-Agent, Referer",
    },
  });
}
