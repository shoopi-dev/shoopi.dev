import type { ReactNode } from "react";

/** Shared preview frame: the site's wallpaper + ink text (the classes
    app/layout.tsx puts on <body>), so glass surfaces read the way they do
    on shoopi.dev instead of washing out on white. */
export function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`wallpaper relative min-h-24 p-6 text-ink ${className}`}>
      {children}
    </div>
  );
}

/** Brand-gradient SVG cover as a data URI - stands in for /covers/*.png,
    which lives in the site's public/ dir and can't ship with the bundle. */
export const gradientCover =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23db3fff'/><stop offset='1' stop-color='%230094ff'/></linearGradient></defs><rect width='1200' height='630' fill='url(%23g)'/></svg>";
