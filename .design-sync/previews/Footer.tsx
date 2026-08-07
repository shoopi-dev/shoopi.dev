import { Footer } from "shoopi.dev";
import { Frame } from "./_frame";

/* Footer reads site.repo internally; next/link is shimmed to <a>.
   The -mt-16 wrapper cancels the footer's own top margin so the
   border-t rule sits near the top of the frame instead of 4rem down. */
export function Default() {
  return (
    <Frame>
      <div className="-mt-16">
        <Footer />
      </div>
    </Frame>
  );
}
