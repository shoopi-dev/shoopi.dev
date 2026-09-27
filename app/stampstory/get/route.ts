import { storeLink } from "@/lib/store-link";

/**
 * stampstory.shoopi.dev/get: the one link for bios, posts and QR codes. Each device lands in its own app store, or on
 * the landing page when there is none for it yet (lib/store-link.ts).
 */
export function GET(request: Request) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: storeLink(request.headers.get("user-agent")),
      // one URL, a different answer per device: no browser or CDN may keep one answer for everybody
      "Cache-Control": "no-store",
      Vary: "User-Agent",
    },
  });
}
