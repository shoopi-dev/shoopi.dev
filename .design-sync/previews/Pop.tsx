import { Pop } from "shoopi.dev";
import { Frame } from "./_frame";

/** pop wrapping a glass card - springs in with overshoot on load */
export function GlassCard() {
  return (
    <Frame>
      <Pop className="glass max-w-md rounded-[22px] p-6">
        <h3 className="text-base font-semibold">Scope it honestly</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          A call, then a written plan with what I&apos;d build, what I&apos;d
          skip, and what it costs. Free, and yours to keep either way.
        </p>
      </Pop>
    </Frame>
  );
}

/** as="span" + tile-glossy: how Pill builds on Pop under the hood */
export function GlossyTile() {
  return (
    <Frame>
      <Pop
        as="span"
        delay={0.05}
        className="tile-glossy inline-flex items-center gap-2 rounded-full px-5 py-2 text-base font-semibold"
      >
        🌍 Gaia
      </Pop>
    </Frame>
  );
}
