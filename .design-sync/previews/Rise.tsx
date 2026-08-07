import { Rise } from "shoopi.dev";
import { Frame } from "./_frame";

/** rise wrapping a glass card, its main job on the site */
export function GlassCard() {
  return (
    <Frame>
      <Rise className="glass max-w-md rounded-[22px] p-6">
        <p className="text-base leading-relaxed text-ink/80">
          You get a live preview URL from day one and a weekly update. No black
          box, no surprise reveal at the end.
        </p>
      </Rise>
    </Frame>
  );
}

/** as="p": the tag swap used for hero taglines */
export function AsParagraph() {
  return (
    <Frame>
      <Rise as="p" delay={0.1} className="max-w-md text-lg text-ink/70">
        Websites, systems, and R&amp;D for people building something real.
      </Rise>
    </Frame>
  );
}
