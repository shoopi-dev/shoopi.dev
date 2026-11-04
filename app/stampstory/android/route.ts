import { stampstory } from "@/data/stampstory";

/**
 * stampstory.shoopi.dev/android was the waitlist until Google Play had the app (2026-11-03). The list stays in
 * Upstash (lib/waitlist.ts); the link, already in posts and the list's own emails, now opens the Play listing.
 */
export function GET() {
  return Response.redirect(stampstory.store.android.url, 308);
}
