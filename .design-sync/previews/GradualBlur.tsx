import { GradualBlur } from "shoopi.dev";
import { Frame } from "./_frame";

/* GradualBlur is a backdrop-filter overlay - it needs crisp, busy content
   behind it to be visible. Bold display-font lines in the brand gradient
   colors give hard edges the blur can visibly soften. */
function BusyBackdrop() {
  return (
    <div className="flex flex-col gap-2 font-display text-3xl font-bold leading-tight">
      <span className="text-[#db3fff]">Build in public.</span>
      <span className="text-[#0094ff]">Ship every week.</span>
      <span>$1,000,000 before 30.</span>
      <span className="text-[#db3fff]">Gaia · client work · shoopi.dev</span>
      <span className="text-[#0094ff]">Every app, every dollar.</span>
      <span>Day 3 of the challenge.</span>
    </div>
  );
}

export function Bottom() {
  return (
    <Frame className="relative h-64 overflow-hidden">
      <BusyBackdrop />
      <GradualBlur position="bottom" target="parent" height="6rem" strength={2} />
    </Frame>
  );
}

export function Top() {
  return (
    <Frame className="relative h-64 overflow-hidden">
      <BusyBackdrop />
      <GradualBlur position="top" target="parent" height="6rem" strength={2} />
    </Frame>
  );
}

export function Strong() {
  return (
    <Frame className="relative h-64 overflow-hidden">
      <BusyBackdrop />
      <GradualBlur
        position="bottom"
        target="parent"
        height="8rem"
        strength={3}
        exponential
      />
    </Frame>
  );
}
