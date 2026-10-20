import { eureka } from "@/data/eureka";
import { storeRedirect } from "@/lib/store-link";

/**
 * eureka.shoopi.dev/get: the one link for bios, posts and QR codes (lib/store-link.ts). An iPhone lands on the App Store;
 * until Google Play has the app, an Android phone lands on the beta sign-up (/android).
 */
export function GET(request: Request) {
  return storeRedirect(request, eureka.store, eureka.url);
}
