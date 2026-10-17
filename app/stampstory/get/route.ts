import { stampstory } from "@/data/stampstory";
import { storeRedirect } from "@/lib/store-link";

/** stampstory.shoopi.dev/get: the one link for bios, posts and QR codes (lib/store-link.ts). */
export function GET(request: Request) {
  return storeRedirect(request, stampstory.store, stampstory.url);
}
