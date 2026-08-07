import { SectionHeader } from "shoopi.dev";
import { Frame } from "./_frame";

export function Default() {
  return (
    <Frame className="flex flex-col items-center gap-1">
      <SectionHeader title="About me" />
    </Frame>
  );
}

export function WithSubtitle() {
  return (
    <Frame className="flex flex-col items-center gap-1">
      <SectionHeader title="Updates" subtitle="The journey, as it happens." />
    </Frame>
  );
}

export function Small() {
  return (
    <Frame className="flex flex-col items-center gap-1">
      <SectionHeader title="Recent work" subtitle="A few things I shipped." small />
    </Frame>
  );
}
