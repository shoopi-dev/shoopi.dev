import { AppIcon } from "shoopi.dev";
import { site } from "@/data/site";
import { Frame } from "./_frame";

const gaia = { ...site.projects[0], icon: undefined };

export function Live() {
  return (
    <Frame className="flex justify-center">
      <AppIcon p={gaia} />
    </Frame>
  );
}

export function Building() {
  return (
    <Frame className="flex justify-center">
      <AppIcon
        p={{
          name: "Nimbus",
          emoji: "🌤️",
          description: "Weather-aware focus timer for remote workers.",
          status: "building",
        }}
      />
    </Frame>
  );
}

export function ComingSoon() {
  return (
    <Frame className="flex justify-center">
      <AppIcon p={site.projects[2]} />
    </Frame>
  );
}
