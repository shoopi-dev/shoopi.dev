import type { Metadata } from "next";
import { eureka as e, eurekaDoc } from "@/data/eureka";
import { DocPage, LegalBody } from "@/components/doc";
import { social } from "@/lib/seo";

const description =
  "How to delete your Eureka account and everything in it, in the app or by email, what is deleted and what is kept.";

export const metadata: Metadata = {
  title: "Delete your account",
  description,
  alternates: { canonical: `${e.url}/delete-account` },
  ...social({
    title: "Delete your Eureka account",
    description,
    url: `${e.url}/delete-account`,
    image: e.ogImage,
    imageAlt: "Eureka: a glowing light bulb, the app's icon",
    siteName: e.name,
  }),
};

export default function DeleteAccountPage() {
  return (
    <DocPage
      app={eurekaDoc}
      title="Delete your account"
      updated={false}
      intro={
        <p>
          You can delete your Eureka account, and everything in it, whenever you like: in the app, or
          by email if you no longer have it.
        </p>
      }
    >
      <LegalBody sections={e.deletion} />
    </DocPage>
  );
}
