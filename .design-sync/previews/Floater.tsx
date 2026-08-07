import { Floater } from "shoopi.dev";
import { Frame, gradientCover } from "./_frame";

/* Small SVG "photos" as data URIs - public/photos/*.jpg 404 in previews. */
const sunsetPhoto =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23ffb347'/><stop offset='1' stop-color='%23ff5e62'/></linearGradient></defs><rect width='200' height='200' fill='url(%23s)'/><circle cx='100' cy='118' r='34' fill='%23fff3d6' opacity='0.9'/><rect y='150' width='200' height='50' fill='%23b8433d'/></svg>";

const mountainPhoto =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='m' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23aee3f5'/><stop offset='1' stop-color='%237ec8a9'/></linearGradient></defs><rect width='200' height='200' fill='url(%23m)'/><path d='M-20 200 L70 70 L160 200 Z' fill='%23335e50'/><path d='M80 200 L160 90 L240 200 Z' fill='%23224437'/><path d='M55 92 L70 70 L85 92 L70 100 Z' fill='%23f3fbf7'/></svg>";

/** Hero-style cluster: three polaroids at different positions and tilts.
    Floater is hidden below lg (1024px), so the card viewport must stay wide. */
export function HeroCluster() {
  return (
    <Frame className="relative h-72">
      <Floater
        src={sunsetPhoto}
        alt="Desert sunset with a low sun"
        className="left-10 top-8 -rotate-12"
      />
      <Floater
        src={mountainPhoto}
        alt="Snow-capped mountain over a green ridge"
        className="left-1/2 top-24 -translate-x-1/2 rotate-6"
      />
      <Floater
        src={gradientCover}
        alt="Brand gradient polaroid"
        className="right-10 top-6 rotate-12"
      />
    </Frame>
  );
}
