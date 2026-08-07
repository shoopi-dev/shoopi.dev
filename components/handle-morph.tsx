/** (sho[o|0]pi) - the o morphs into a slashed zero while hovering the hero (group).
    The slash is coral at 35 degrees - the same slash the o0 mark carries, so the
    hover ties the handle to the logo. Drawn rather than typed, because most
    display faces have no slashed-zero feature and the combining-overlay
    character renders unreliably. */
export function HandleMorph() {
  return (
    <span className="inline-grid">
      <span className="col-start-1 row-start-1 transition-all duration-300 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-[4px] group-active:scale-75 group-active:opacity-0 group-active:blur-[4px]">
        o
      </span>
      <span
        className="relative col-start-1 row-start-1 scale-125 opacity-0 blur-[4px] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-active:scale-100 group-active:opacity-100 group-active:blur-none"
        aria-hidden
      >
        0
        <span className="absolute left-1/2 top-1/2 h-[0.68em] w-[0.07em] -translate-x-1/2 -translate-y-1/2 rotate-[35deg] rounded-full bg-accent" />
      </span>
    </span>
  );
}
