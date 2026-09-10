import { site } from "./site";

/** One block of a legal page: a heading, paragraphs, and optionally a list or a table. */
export type LegalSection = {
  id: string;
  title: string;
  body?: string[];
  list?: string[];
  table?: { head: [string, string]; rows: [string, string][] };
  /** Paragraphs rendered after the list or table. */
  after?: string[];
};

// forwarded by Porkbun to the personal inbox; create the forward before this goes live
const support = "stampstory-support@shoopi.dev";
// marketing copy only; the app and the terms always defer to the price the store shows
const price = "$1.99";

/** One tap from the support page: subject and a body skeleton, so every mail arrives sortable and complete. */
export const supportMail = (() => {
  const subject = "StampStory support";
  const body = [
    "Hi Itay,",
    "",
    "Phone and OS version: ",
    "What I did: ",
    "What happened instead: ",
    "",
  ].join("\n");
  return `mailto:${support}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
})();

/**
 * Everything the StampStory pages say. Keep this true to what the app actually does -
 * the privacy copy is derived from the settings keys in the app repo's README.
 */
export const stampstory = {
  name: "StampStory",
  tagline: "Where have you been?",
  subtitle:
    "Mark every country you have ever visited, and StampStory turns it into a passport worth sharing.",
  bundleId: "dev.shoopi.stampstory",
  price,
  support,
  updated: "2026-09-10",
  url: "https://stampstory.shoopi.dev",
  developer: {
    name: site.fullName,
    handle: site.handle,
    country: "Singapore",
  },
  store: {
    // flip to the real link the moment review clears
    ios: { status: "soon" as "soon" | "live", url: "" },
    android: { status: "soon" as "soon" | "live", url: "" },
  },

  steps: [
    { n: "01", title: "Mark where you've been", body: "Tap countries on the globe, or tick them off the checklist in one go." },
    { n: "02", title: "Watch the passport fill", body: "Stamps, continent bars and a rank appear as you go. All of it computed, none of it stored." },
    { n: "03", title: "Share the card", body: "One tap sends a 1080 x 1920 passport image to Stories, or anywhere else you like." },
  ],

  gold: {
    title: "StampStory Gold",
    price,
    line: "One payment. Yours forever. No subscription.",
    perks: [
      "Every theme, not just the two free ones",
      "All twelve traveler avatars",
      "Gold paper on every card you share: brushed gold pages, engraving, foil frame and a member badge",
      "Future Gold styles as they land",
    ],
  },

  faq: [
    {
      q: "How do I mark a country?",
      a: "Tap it on the globe. To add a lot at once, open the search button and tick them off the list; tapping a row flies the globe there instead, so you can check you picked the right place.",
    },
    {
      q: "Do I need an account?",
      a: "No. StampStory has no sign-in at all. Your countries are stored on your phone, so there is nothing to log into and nothing to forget.",
    },
    {
      q: "Where is my travel data stored?",
      a: "On your device, in the app's own settings storage. It is not uploaded anywhere and I cannot see it. That also means it is not backed up by me: if you delete the app, it is gone.",
    },
    {
      q: "Why does the app never ask when I visited?",
      a: "Because asking would make marking twenty countries a chore. The app quietly notes the day you ticked a country so it can tell you what is new, and never asks you for a date.",
    },
    {
      q: "What does StampStory Gold include?",
      a: "A one-time purchase that unlocks every theme, all twelve avatars, and gold paper on every card you share. There is no subscription and nothing expires.",
    },
    {
      q: "I bought Gold and it is gone after reinstalling. What now?",
      a: "Tap Restore purchase. It sits on the Gold screen and at the bottom of the Passport tab. Your purchase lives on your App Store or Google Play account, so it comes back on any device signed in to the same account.",
    },
    {
      q: "Can I move Gold from my iPhone to an Android phone?",
      a: "No. Apple and Google run separate purchase systems and there is no account tying them together. A purchase made on one store works only on that store.",
    },
    {
      q: "How do I delete my data?",
      a: "Delete the app. Everything the app stored goes with it, because none of it lives anywhere else. Your purchase record stays with Apple or Google, so Gold still restores if you install again.",
    },
    {
      q: "A country is missing, misnamed, or the wrong shape.",
      a: `Email me at ${support} and tell me which one. Borders and names come from a public dataset and I would rather fix a real complaint than argue with a map.`,
    },
    {
      q: "Can I get a refund?",
      a: "Refunds are handled by Apple and Google, not by me. On iOS use reportaproblem.apple.com; on Android use the Play Store order history. I have no way to issue one myself.",
    },
  ],

  privacy: [
    {
      id: "short",
      title: "The short version",
      body: [
        "StampStory has no accounts, no server, and no analytics. The countries you mark, your name, your avatar and your theme live on your phone and nowhere else.",
        "The only thing that ever leaves your device is a purchase receipt, and only if you buy Gold. If you never buy anything, the app sends nothing at all.",
      ],
    },
    {
      id: "who",
      title: "Who we are",
      body: [
        `StampStory is made by ${site.fullName} (${site.handle}), an independent developer based in Singapore. For anything in this policy, or to make a request about your data, email ${support}.`,
      ],
    },
    {
      id: "device",
      title: "What stays on your device",
      body: [
        "All of this is written to your phone's local app storage. It is never transmitted, and I have no way to read it.",
      ],
      table: {
        head: ["What", "Why it exists"] as [string, string],
        rows: [
          ["The countries you marked", "The whole point of the app"],
          ["The day you marked each one", "So the app can tell you what is new since your last visit. You are never asked for a date"],
          ["Your name", "Printed on the passport card and its machine-readable strip"],
          ["Your avatar and theme", "How your passport looks"],
          ["Whether Gold is active", "An offline copy of your purchase status, so the app works without a connection"],
          ["Whether you finished onboarding", "So it is not shown twice"],
        ] as [string, string][],
      },
    },
    {
      id: "leaves",
      title: "What leaves your device",
      body: ["Two things, and no more."],
      list: [
        "Purchases. Buying or restoring Gold goes through Apple or Google, and through RevenueCat, which validates the receipt on my behalf. RevenueCat receives an anonymous identifier it generates for that install, the store receipt, and basic device and app version information. It does not receive your name, your countries, or anything else from the app. RevenueCat's own privacy policy applies to that data.",
        "The image you share. When you tap Share, the passport image is handed to your phone's share sheet and goes wherever you send it. That is your action and your choice of destination; it does not pass through me.",
      ],
    },
    {
      id: "never",
      title: "What the app never collects",
      list: [
        "No account, email address, phone number or password",
        "No location. The app never asks for it and cannot read it",
        "No contacts, camera, microphone or photo library reads. If you choose Save Image in the share sheet, iOS asks your permission and the app writes that one image; it never reads your library",
        "No advertising identifier and no tracking across apps, so no App Tracking Transparency prompt",
        "No usage analytics, crash SDK or heat maps",
      ],
    },
    {
      id: "site",
      title: "What this website collects",
      body: [
        "These pages are served from shoopi.dev, which uses Vercel Analytics and Speed Insights. Those measure page views and load performance in aggregate and do not use cookies to identify you or follow you across sites.",
      ],
    },
    {
      id: "legal",
      title: "Legal bases",
      body: [
        "If you are in the EEA or the UK: processing a purchase is necessary to perform the contract you enter when you buy Gold (Article 6(1)(b) GDPR). Validating receipts to stop fraudulent unlocks rests on legitimate interests (Article 6(1)(f)). Everything else never reaches me, so there is nothing to have a basis for.",
      ],
    },
    {
      id: "sharing",
      title: "Who else is involved",
      list: [
        "Apple and Google process the payment and hold the purchase record. Their terms and privacy policies apply.",
        "RevenueCat validates receipts and stores the purchase status against an anonymous install identifier.",
        "Vercel hosts this website.",
      ],
      after: [
        "Each of these providers is bound by its own agreement with me to protect the data at least as well as this policy does, and to use it only to provide the service described here.",
        "RevenueCat and Vercel process data in the United States. Where that data comes from the EEA or the UK, the transfer relies on the European Commission's standard contractual clauses.",
        "Nobody else. Your data is not sold, rented, or shared for advertising, ever.",
      ],
    },
    {
      id: "retention",
      title: "How long things are kept",
      list: [
        "On-device data: until you delete it in the app or delete the app itself.",
        "Purchase records: kept by RevenueCat, Apple and Google for as long as they need to honour a restore and to meet their own tax and accounting obligations.",
      ],
    },
    {
      id: "rights",
      title: "Your rights and your choices",
      body: [
        "Deleting the app removes everything StampStory stored on your phone. There is no server-side copy to request, correct, or export, because there is no server.",
        `For the purchase record held on my behalf, you can ask me to access or delete it. Email ${support} from the address you use with your store account and tell me what you need. If you delete the purchase record, restoring Gold may no longer work.`,
        "If you are in the EEA or the UK you also have the right to complain to your local data protection authority.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "StampStory is not directed at children under 13, or under the age of digital consent where you live, and does not knowingly collect anything from them. There is nothing to collect: the app has no account and no messaging. If you believe a child has bought Gold, contact Apple or Google for a refund and email me.",
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "Your travel data never travels, which removes most of the risk. Purchase traffic to the stores and to RevenueCat is encrypted in transit. No system is perfect, and I will not pretend otherwise.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If the app starts doing something new, this page changes before that version ships, and the date at the top moves. Material changes will also be noted in the app's release notes.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`${support} - I read everything and aim to reply within a few days.`],
    },
  ] satisfies LegalSection[],

  terms: [
    {
      id: "who",
      title: "Who can use StampStory",
      body: [
        "You need to be old enough to hold an App Store or Google Play account in your country, and old enough to agree to these terms where you live. If you are using the app under a parent's account, they are agreeing on your behalf.",
      ],
    },
    {
      id: "what",
      title: "What StampStory does",
      body: [
        "StampStory lets you mark countries you have visited on a globe and turns that into a shareable passport image. It runs entirely on your device. It is a keepsake, not a travel document, an itinerary tracker, or a source of geographic truth.",
      ],
    },
    {
      id: "stores",
      title: "The stores' own terms",
      body: [
        "You get the app from Apple's App Store or Google Play. Apple's Licensed Application End User License Agreement, and Google Play's Terms of Service, apply to that download and purchase alongside these terms. Where they conflict, the store's terms win. Apple and Google are not responsible for the app and have no obligation to support it; that is on me.",
      ],
    },
    {
      id: "account",
      title: "There is no account",
      body: [
        "You do not sign in, so there is nothing to suspend and no password to lose. It also means your data is only as safe as your phone. If you lose the device or delete the app, the countries you marked are gone, and I cannot recover them for you.",
      ],
    },
    {
      id: "gold",
      title: "StampStory Gold",
      body: [
        "Gold is a one-time purchase at the price shown in the app before you buy, in your store's currency. It is not a subscription, it does not renew, and it does not expire.",
        "Gold unlocks the full set of themes and avatars and the gold styling on shared cards. What is included may grow over time; I will not remove something you already paid for.",
        "The purchase is tied to the store account you bought it with. Apple and Google run separate systems, so a purchase on one does not carry to the other. Restore purchase brings it back on any device signed in to the same store account.",
      ],
    },
    {
      id: "refunds",
      title: "Payments and refunds",
      body: [
        "Payment is handled entirely by Apple or Google. I never see your card details. Their terms govern the transaction.",
        "Refunds are theirs to grant, not mine. On iOS, use reportaproblem.apple.com. On Android, use your Play Store order history. If a refund is granted, Gold is switched off.",
      ],
    },
    {
      id: "use",
      title: "Acceptable use",
      list: [
        "Do not try to unlock paid features without paying for them, or distribute modified builds of the app.",
        "Do not use the app's imagery or brand to imply I endorse you or your product.",
        "Do not use the app to break the law where you are.",
      ],
    },
    {
      id: "content",
      title: "Your content",
      body: [
        "The countries you mark, your name, and the images you export are yours. I claim no rights over them and no copy reaches me. Where you share an image, and who sees it, is entirely up to you.",
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      body: [
        "The app, its design, its mascot and the StampStory name are mine. Map geometry comes from Natural Earth, which is in the public domain. Country flags are rendered by your operating system's emoji font.",
      ],
    },
    {
      id: "borders",
      title: "About borders and names",
      body: [
        "Country shapes, names and the continent each is grouped under come from a public dataset chosen because it is neutral and widely used. They are not a political statement, a claim about any territory, or an endorsement of any position. If a boundary in the app matters to you, please read it as cartography, not opinion.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimers",
      body: [
        'StampStory is provided "as is", without warranties of any kind. I do not promise it will be free of bugs, available at all times, or accurate about geography. Counts, percentages and stamps are for fun, not for anything that matters.',
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "To the fullest extent the law allows, I am not liable for indirect or consequential loss arising from your use of the app, including lost data. Where liability cannot be excluded, it is limited to the amount you paid for the app, which is at most the price of Gold. Nothing here removes rights your local consumer law gives you.",
      ],
    },
    {
      id: "termination",
      title: "Ending things",
      body: [
        "You can stop using StampStory at any time by deleting it. I may stop distributing or updating the app, though anything already installed keeps working as-is.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "If these terms change, the date at the top of this page changes with them, and continuing to use the app means you accept the new version.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      body: [
        "These terms are governed by the laws of Singapore, without regard to conflict-of-law rules. Mandatory consumer protections in your country of residence still apply to you.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [support],
    },
  ] satisfies LegalSection[],
};
