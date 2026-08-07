import { WorkCard } from "shoopi.dev";
import { site } from "@/data/site";
import { Frame, gradientCover } from "./_frame";

export function WithImage() {
  return (
    <Frame>
      <div className="max-w-sm">
        <WorkCard item={{ ...site.work.recent[0], image: gradientCover }} />
      </div>
    </Frame>
  );
}

export function NoImage() {
  return (
    <Frame>
      <div className="max-w-sm">
        <WorkCard item={{ ...site.work.recent[3], image: undefined }} />
      </div>
    </Frame>
  );
}
