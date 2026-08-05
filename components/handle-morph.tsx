/** (sho[o|0]pi) - the o morphs into a purple 0 while hovering the hero (group) */
export function HandleMorph() {
  return (
    <span className="inline-grid">
      <span className="col-start-1 row-start-1 transition-all duration-300 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-[4px] group-active:scale-75 group-active:opacity-0 group-active:blur-[4px]">
        o
      </span>
      <span
        className="col-start-1 row-start-1 scale-125 opacity-0 blur-[4px] text-accent transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-active:scale-100 group-active:opacity-100 group-active:blur-none"
        aria-hidden
      >
        0
      </span>
    </span>
  );
}
