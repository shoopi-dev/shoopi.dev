import type { NextConfig } from "next";

/**
 * stampstory.shoopi.dev serves the /stampstory pages from this same project, so the app's
 * short links (the QR on every shared card points at the bare domain) resolve without a
 * second deployment. Static files and Next's own assets are excluded by the path regex,
 * and `beforeFiles` is required because `/` exists as a page here.
 */
const STAMPSTORY_HOST = "stampstory.shoopi.dev";

const nextConfig: NextConfig = {
  /* the pages link to /stampstory/... so they work on shoopi.dev too; on the subdomain those
     links bounce to the clean path. Files keep their extension-bearing paths untouched. */
  async redirects() {
    const has = [{ type: "host" as const, value: STAMPSTORY_HOST }];
    return [
      { source: "/stampstory", has, destination: "/", permanent: true },
      { source: "/stampstory/:path((?!.*\\.[a-z0-9]+$).*)", has, destination: "/:path", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: STAMPSTORY_HOST }],
          destination: "/stampstory",
        },
        {
          source: "/:path((?!_next/|stampstory/?|.*\\.[a-z0-9]+$).*)",
          has: [{ type: "host", value: STAMPSTORY_HOST }],
          destination: "/stampstory/:path",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
