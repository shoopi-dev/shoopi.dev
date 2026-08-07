import { Countdown } from "shoopi.dev";
import { site } from "@/data/site";
import { Frame } from "./_frame";

/** Live ticking clock to the site's real deadline (30th birthday). */
export function ToDeadline() {
  return (
    <Frame className="flex justify-center">
      <Countdown deadline={site.deadline} />
    </Frame>
  );
}

export function FinalWeek() {
  return (
    <Frame className="flex justify-center">
      <Countdown deadline={new Date(Date.now() + 6.5 * 86400_000).toISOString()} />
    </Frame>
  );
}
