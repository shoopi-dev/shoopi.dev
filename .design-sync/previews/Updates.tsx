import { Updates } from "shoopi.dev";
import { Frame } from "./_frame";

/* Updates reads site.updates internally; single data-bound cell.
   The -mt-14 wrapper cancels the section's own top margin. */
export function Default() {
  return (
    <Frame>
      <div className="-mt-14">
        <Updates />
      </div>
    </Frame>
  );
}
