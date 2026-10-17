import { eureka } from "@/data/eureka";
import { storeRedirect } from "@/lib/store-link";

/**
 * eureka.shoopi.dev/get: the one link for bios, posts and QR codes (lib/store-link.ts). Until the stores have the app,
 * an Android phone lands on the beta sign-up (/android) and an iPhone on the landing page.
 */
export function GET(request: Request) {
  return storeRedirect(request, eureka.store, eureka.url);
}
