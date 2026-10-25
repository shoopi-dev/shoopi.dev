import type { Metadata } from "next";
import { stampstory as s } from "@/data/stampstory";
import { Lockup } from "@/components/lockup";
import { BackLink, HOME_URL, StampFooter } from "@/components/stampstory";
import { StampStoryStory } from "@/components/stampstory-landing/story";
import { JsonLd } from "@/components/json-ld";
import { stampstoryGraph } from "@/lib/schema";
import { social } from "@/lib/seo";

// names what the app is, next to the App Store title: several other things are called StampStory
const title = "StampStory: Travel Passport - where have you been?";
// iOS first, Android follows: say "iPhone" until the Play link is live
const description =
  "Scratch map and travel passport for iPhone: mark every country you have visited and share the passport it makes. No account, no server, and your countries never leave your phone.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: s.url },
  ...social({
    title,
    description,
    url: s.url,
    image: s.ogImage,
    imageAlt: "StampStory: a passport page of 23 countries posted to a Story, with friends reacting",
    siteName: s.name,
  }),
};

export default function StampStoryPage() {
  return (
    <>
      <JsonLd data={stampstoryGraph} />
      <BackLink href={HOME_URL} label={<Lockup className="text-base" />} delay={0.05} />
      <StampStoryStory />
      <div className="mx-auto w-full max-w-4xl px-4">
        <StampFooter delay={0.2} />
      </div>
    </>
  );
}
