import { HandleMorph } from "shoopi.dev";
import { Frame } from "./_frame";

/** Rest state in hero context: the "o" that morphs into a slashed zero on
    hover of the surrounding group. The hover morph itself is not statically
    renderable. */
export function InHeading() {
  return (
    <Frame className="flex justify-center py-10">
      <h1 className="group font-display text-5xl font-bold tracking-tight">
        (sho
        <HandleMorph />
        pi)
      </h1>
    </Frame>
  );
}
