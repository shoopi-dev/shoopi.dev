import { stampstory } from "@/data/stampstory";

/** stampstory.shoopi.dev/beta was the closed test's sign-up until Google Play opened the app to everyone (2026-11-03). */
export function GET() {
  return Response.redirect(stampstory.store.android.url, 308);
}
