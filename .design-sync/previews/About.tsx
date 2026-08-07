import { About } from "shoopi.dev";
import { Frame } from "./_frame";

/* About reads site.bio + site.chips internally; single data-bound cell.
   The -mt-14 wrapper cancels the section's own top margin so the card
   sits flush inside the preview frame. */
export function Default() {
  return (
    <Frame>
      <div className="-mt-14">
        <About />
      </div>
    </Frame>
  );
}
