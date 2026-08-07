import { ProjectCard } from "shoopi.dev";
import { site } from "@/data/site";
import { Frame, gradientCover } from "./_frame";

const gaia = { ...site.projects[0], cover: gradientCover };

export function Live() {
  return (
    <Frame>
      <div className="max-w-sm">
        <ProjectCard p={gaia} index={0} />
      </div>
    </Frame>
  );
}

export function Building() {
  return (
    <Frame>
      <div className="max-w-sm">
        <ProjectCard
          p={{
            name: "Atlas",
            emoji: "🗺️",
            description: "Trip planner that turns a group chat into an itinerary.",
            status: "building",
            revenue: 120,
          }}
          index={1}
        />
      </div>
    </Frame>
  );
}

export function ComingSoon() {
  return (
    <Frame>
      <div className="max-w-sm">
        <ProjectCard p={{ ...site.projects[2], cover: undefined }} index={2} />
      </div>
    </Frame>
  );
}
