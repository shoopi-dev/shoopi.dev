import type { Metadata } from "next";
import { eureka as e, eurekaDoc } from "@/data/eureka";
import { Rise } from "@/components/animate";
import { Lockup } from "@/components/lockup";
import { FooterLinks, footerClass } from "@/components/doc";
import { BackLink, HOME_URL, StoreTrademarks } from "@/components/stampstory";
import { EurekaStory } from "@/components/eureka/story";
import { social } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { eurekaGraph } from "@/lib/schema";

// names what the app is, next to the App Store title
const title = `${e.title} - brainstorm out loud`;
const description =
  "Voice-first idea notes for iPhone: say a thought on your walk, and AI files it into the right idea and keeps that idea's page up to date. Now on the App Store, and coming soon to Google Play.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: e.url },
  ...social({
    title,
    description,
    url: e.url,
    image: e.ogImage,
    imageAlt: "Eureka: a glowing light bulb, the app's icon",
    siteName: e.name,
  }),
};

export default function EurekaPage() {
  return (
    <>
      <JsonLd data={eurekaGraph} />
      <BackLink href={HOME_URL} label={<Lockup className="text-base" />} delay={0.05} />
      <EurekaStory />
      <div className="mx-auto w-full max-w-4xl px-4">
        <Rise as="footer" delay={0.2} className={footerClass}>
          <FooterLinks links={eurekaDoc.links} />
          <StoreTrademarks />
        </Rise>
      </div>
    </>
  );
}
