import type { NextConfig } from "next";

/**
 * stampstory.shoopi.dev, eureka.shoopi.dev and wordlah.shoopi.dev serve their app's pages from this
 * same project, so the apps' short links (the QR on every shared StampStory card points at the bare
 * domain) resolve without a second deployment. Static files and Next's own assets are excluded by the path regex,
 * and `beforeFiles` is required because `/` exists as a page here.
 */
const APP_SITES = [
  { host: "stampstory.shoopi.dev", base: "stampstory" },
  { host: "eureka.shoopi.dev", base: "eureka" },
  { host: "wordlah.shoopi.dev", base: "wordlah" },
];

const nextConfig: NextConfig = {
  /* the pages link to /<base>/... so they work on shoopi.dev too; on the subdomain those
     links bounce to the clean path. Files keep their extension-bearing paths untouched. */
  async redirects() {
    return APP_SITES.flatMap(({ host, base }) => {
      const has = [{ type: "host" as const, value: host }];
      return [
        { source: `/${base}`, has, destination: "/", permanent: true },
        { source: `/${base}/:path((?!.*\\.[a-z0-9]+$).*)`, has, destination: "/:path", permanent: true },
      ];
    });
  },
  async rewrites() {
    return {
      beforeFiles: APP_SITES.flatMap(({ host, base }) => {
        const has = [{ type: "host" as const, value: host }];
        return [
          { source: "/", has, destination: `/${base}` },
          { source: `/:path((?!_next/|${base}/?|.*\\.[a-z0-9]+$).*)`, has, destination: `/${base}/:path` },
        ];
      }),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
