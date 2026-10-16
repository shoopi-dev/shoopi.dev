import type { DocApp, LegalSection } from "./legal";
import { site } from "./site";

// forwarded by Porkbun to the personal inbox; create the forward before this goes live
const support = "eureka-support@shoopi.dev";

/** One tap from the support page: subject and a body skeleton, so every mail arrives sortable and complete. */
export const supportMail = (() => {
  const subject = "Eureka support";
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
 * Everything the Eureka pages say. Keep it true to what the app does: the app's own CLAUDE.md and its
 * "Eureka Legal.html" are where each sentence comes from, and a new event or data flow changes this first.
 */
export const eureka = {
  name: "Eureka",
  title: "Eureka: AI Idea Notes",
  tagline: "Brainstorm out loud",
  subtitle: "Talk through an idea on your walk. Find it later as a clean page.",
  support,
  updated: "2026-10-16",
  url: "https://eureka.shoopi.dev",
  ogImage: "https://eureka.shoopi.dev/eureka/og.jpg", // 1200x630, public/eureka/og.jpg
  store: {
    // flip to the real link the moment review clears
    ios: { status: "soon" as "soon" | "live", url: "" },
    android: { status: "soon" as "soon" | "live", url: "" },
  },

  steps: [
    { n: "01", title: "Say it", body: "Tap the mic and talk, or type. Your phone turns your voice into words, and no recording is kept." },
    { n: "02", title: "AI files it", body: "Allow AI filing, and AI puts each thought into the idea it is about and brings that page up to date, or starts a new idea. When it is not sure where, it asks." },
    { n: "03", title: "Find a clean page", body: "Every idea is one page of what you have worked out, with everything you said into it below. Search finds any of it, typos and all." },
    { n: "04", title: "Bring your old notes", body: "Paste your notes, or pick a text file or a WhatsApp chat you kept ideas in, and AI sorts them into ideas, each with its own page." },
  ],

  privacy: [
    {
      id: "short",
      title: "The short version",
      body: [
        "Eureka keeps your ideas on your phone and, because you sign in, a copy in your account, so they are the same on every phone you use.",
        "AI filing is off until you allow it. Once you do, the words of each thought, and what it takes to file it, go through Eureka's server to an outside AI service, which files the thought and brings the idea's page up to date. Old notes you import go there too, if you choose to have AI sort them. That service does not train on any of it.",
        "There are no ads, no tracking across apps, and nothing is sold. Speech is turned into words by your phone's own speech recognition, and Eureka never keeps or sends a recording.",
        "Eureka counts how the app is used, such as how often it is opened and whether thoughts are filed, to learn what to make better. Those counts never include what you write.",
      ],
    },
    {
      id: "who",
      title: "Who we are",
      body: [
        `Eureka is made by ${site.fullName} (${site.handle}), an independent developer based in Singapore. For anything in this policy, or to make a request about your data, email ${support}.`,
      ],
    },
    {
      id: "account",
      title: "Your account",
      body: [
        "You sign in with Apple or Google. Eureka's sign-in system, run by Supabase, keeps what that sign-in hands over:",
      ],
      list: [
        "With Apple: an identifier for your Apple account and an email address, which can be a private relay address if you chose to hide yours.",
        "With Google: an identifier for your Google account, your email address, and your name and profile picture, which Google shares with every sign-in. Eureka does not use or show your name or picture.",
      ],
      after: [
        "Your session is kept on your phone, in the iPhone's Keychain or in Android's private app storage, so you stay signed in.",
      ],
    },
    {
      id: "device",
      title: "What stays on your phone",
      body: ["This is written to your phone's local app storage and does not leave it."],
      table: {
        head: ["What", "Why it exists"],
        rows: [
          ["Pictures you add to an idea or use as its icon", "Shown on the idea. They are not in your account yet, so another phone shows the idea without them"],
          ["Thoughts waiting to be filed", "A thought said with no connection, or past a limit, is kept here until it can be filed"],
          ["What each filed thought changed on a page", "So Undo can put a page back, and so the next thought about the idea knows what the last one did"],
          ["Your settings", "Appearance, speech language, how you signed in, and which accounts on this phone allowed AI filing, so it is still on when you sign back in"],
        ],
      },
    },
    {
      id: "synced",
      title: "What is kept in your account",
      body: [
        "So your ideas are on every phone you sign in on, Eureka keeps a copy of them on its server, on Supabase in Frankfurt, Germany:",
      ],
      list: [
        "Each idea: its title, its one line, its page, its icon and color, its kind and status, whether it is pinned, and when it changed.",
        "Each thought that fed an idea, in your own words, with when you said or typed it and whether it was spoken. Notes you import are kept the same way, a chat's messages with the day each was written.",
      ],
      after: [
        "Only you can read your ideas: the server gives each signed-in person their own rows and nobody else's. Deleting an idea marks it deleted, so your other phones learn of it, and the copy is removed with your account.",
      ],
    },
    {
      id: "ai",
      title: "AI filing",
      body: [
        "AI filing is off until you allow it on the sheet that asks, and you can turn it off at any time in Settings. While it is off, nothing goes to the AI service and each thought is kept as you said it. Sorting imported notes with AI needs it on too, and adding them as they are sends nothing.",
        "While it is on, each thought goes from your phone to Eureka's server, which passes it on to an outside AI service, Claude by Anthropic, and sends back where it goes and the page after it. What is sent:",
      ],
      list: [
        "To decide where a thought goes: its words, whether it was spoken, and the title, one line and section headings of each of your ideas, never their pages.",
        "To bring an idea's page up to date: the words of the thought, that idea's title, one line, kind and page, today's date, and the last five thoughts about that idea with what each changed.",
        "To sort old notes you import, when you choose Sort with AI: the notes, in batches, with the title, one line and kind of each idea found so far in the same import. From a chat, only the messages of the person you pick are sent, each with the day it was written and without anyone's name; the other people's messages, photos and voice notes are left out. Each new idea's page is then written from its notes, as for a thought.",
      ],
      after: [
        "Anthropic does not use these requests to train its models. Under its commercial terms it deletes them within 30 days, unless a request is flagged for breaking its usage policy.",
        "Eureka's server keeps a short record of each request, to count your free thoughts and your usage and to keep costs in check: your account, which step it was, the model, how many tokens it used and what it cost, when, and a one-way hash of the thought or of the imported notes, never their words. An import's requests also carry its own identifier, so the whole import counts once.",
        "The AI can be wrong. It may put a thought in the wrong idea or change a page in a way you did not mean. What it wrote stays marked, and Undo puts the page back.",
      ],
    },
    {
      id: "speech",
      title: "Speech",
      body: [
        "When you record a thought, your phone's own speech recognition turns your voice into words: Apple's on an iPhone and your phone's default recognizer on Android. Eureka asks for the microphone and speech recognition only when you first record.",
        "On an iPhone the words are usually made on the phone itself. For a language without a model on the phone, Apple's servers may do it, and some Android recognizers send audio to Google. Apple's and Google's own privacy policies apply to that.",
        "Eureka never keeps or sends a recording. Only the words are kept, as the thought.",
      ],
    },
    {
      id: "purchases",
      title: "Eureka Pro",
      body: [
        "Buying, renewing and cancelling Pro go through Apple or Google, and Eureka never sees your card. RevenueCat checks the purchase on Eureka's behalf, so Pro follows your account to any phone you sign in on. RevenueCat receives your Eureka account identifier, the store's receipt, and basic device and app version information, and not your ideas or your thoughts.",
        "Eureka's server keeps whether you have Pro and until when, which it learns from RevenueCat, so that it files your thoughts when it should.",
      ],
    },
    {
      id: "usage",
      title: "How the app is used",
      body: [
        "Once you are signed in, the app counts what is done in it, to learn what to make better: when it is opened and put away, which screens are seen, whether a thought was spoken or typed and whether it was filed, asked about or kept waiting, when Undo or Move is used, when the Pro screen shows and when Pro starts, and whether AI filing was allowed.",
        "Each of these events carries your account identifier, your phone's system and model, the app version, your language and your time zone. They never carry the words of a thought or an idea, your email or your name.",
        "The events go from your phone to PostHog, in its EU cloud. PostHog works out roughly where an event came from, its country, city and area, from the internet address it came from, and then discards the address without storing it.",
      ],
    },
    {
      id: "never",
      title: "What Eureka never collects",
      list: [
        "No advertising identifier and no tracking across apps, so no App Tracking Transparency prompt",
        "No precise location: only the rough area worked out for usage counts, from an address that is then discarded. No contacts or calendar. Pictures and files come only from what you pick, through your phone's own pickers",
        "No recordings of your voice",
        "No crash reporting or session recording in the app, and no counting of what you do before you sign in",
        "Your data is not sold, rented or shared for advertising, ever",
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
        "If you are in the EEA or the UK: your account, keeping your ideas in it and Pro are needed to perform the contract you enter when you use Eureka (Article 6(1)(b) GDPR). Sending thoughts, and the imported notes you choose to sort, to the AI service rests on your consent, which you give on the sheet that asks and can withdraw in Settings at any time (Article 6(1)(a)). Counting usage, learning how the app is used, keeping limits, preventing abuse and keeping the service secure rest on legitimate interests (Article 6(1)(f)).",
      ],
    },
    {
      id: "sharing",
      title: "Who else is involved",
      list: [
        "Supabase runs Eureka's sign-in, database and server, in Frankfurt, Germany.",
        "Anthropic runs the AI service that files thoughts, sorts imported notes and writes pages, while AI filing is on.",
        "Apple and Google run sign-in, payments and, depending on your phone and language, speech recognition. Their terms and privacy policies apply.",
        "RevenueCat checks purchases and keeps their status against your account identifier.",
        "PostHog counts how the app is used, in its EU cloud.",
        "Vercel hosts this website.",
      ],
      after: [
        "Each of these providers is bound by its own agreement with Eureka to protect the data at least as well as this policy does, and to use it only to provide the service described here.",
        "Supabase, Anthropic, RevenueCat, PostHog and Vercel are companies in the United States, and some of the data may be processed there. Where it comes from the EEA or the UK, the transfer relies on the European Commission's standard contractual clauses.",
        "Nobody else.",
      ],
    },
    {
      id: "retention",
      title: "How long things are kept",
      list: [
        "Your ideas and the thoughts in them: for as long as you keep your account. Delete your account, and they are deleted from the server.",
        "The record of AI requests: for as long as you keep your account, since the free thoughts and the free import are counted once for each account.",
        "Purchase records: kept by Apple, Google and RevenueCat for as long as they need to honour a restore and to meet their tax and accounting obligations.",
        "Usage counts: deleted with your account, and otherwise kept by PostHog for as long as the plan Eureka is on keeps them.",
        "Your ideas on your phone: until you sign out or delete your account, either of which empties the phone of them, or delete the app. Pictures stay in the app's own storage until you delete your account or the app.",
      ],
    },
    {
      id: "rights",
      title: "Your rights and your choices",
      body: [
        "Export all ideas in Settings gives you every idea as Markdown, and you can change or delete any idea in the app.",
        "Delete account in Settings deletes your account, your ideas, the record of your AI requests and your usage counts, and ends Eureka's link with your Apple ID if you signed in with Apple. A Pro subscription is the store's to cancel: deleting your account does not stop it.",
        `For anything else, such as a copy of what the server holds about you, email ${support} from the address you sign in with.`,
        "If you are in the EEA or the UK you also have the right to complain to your local data protection authority.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "Eureka is not directed at children under 13, or under the age of digital consent where you live, and does not knowingly collect anything from them. If you believe a child has an account, email us and it will be deleted.",
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "Everything between the app, Eureka's server and its providers is encrypted in transit. The server lets each signed-in person reach only their own data, and the key that reaches the AI service never leaves the server. No system is perfect, and we will not pretend otherwise.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If Eureka starts doing something new with your data, this page changes before that version ships, and the date at the top moves. Material changes are also noted in the app's release notes.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`${support}. Every email is read, and we aim to reply within a few days.`],
    },
  ] satisfies LegalSection[],

  terms: [
    {
      id: "who",
      title: "Who can use Eureka",
      body: [
        "You need to be old enough to hold an App Store or Google Play account in your country, and old enough to agree to these terms where you live. If you are using Eureka under a parent's account, they are agreeing on your behalf.",
      ],
    },
    {
      id: "what",
      title: "What Eureka does",
      body: [
        "Eureka is an inbox for ideas. You say or type a thought, and, with AI filing on, an outside AI service puts it into the idea it is about, or starts a new one, and keeps each idea's page up to date. With AI filing off, each thought is kept as you said it. You can also bring in old notes, pasted or from a file, and have AI sort them into ideas.",
        "Eureka is a notebook, not advice. What the AI writes is a draft of your own thinking, and decisions that matter, about health, money, law or anything else, are yours to check.",
      ],
    },
    {
      id: "stores",
      title: "The stores' own terms",
      body: [
        "You get Eureka from Apple's App Store or Google Play. Apple's Licensed Application End User License Agreement, and Google Play's Terms of Service, apply to that download and purchase alongside these terms. Where they conflict, the store's terms win. Apple and Google are not responsible for Eureka and have no obligation to support it; that is on us.",
      ],
    },
    {
      id: "account",
      title: "Your account",
      body: [
        "Eureka needs an account, made when you sign in with Apple or Google. It is for one person. You are responsible for what happens on a phone signed in to it.",
        "You can sign out at any time, which empties the phone, and delete your account in Settings, which deletes your ideas from the server.",
      ],
    },
    {
      id: "content",
      title: "Your ideas",
      body: [
        "Your ideas, your thoughts, the notes you import and your pictures are yours. To run Eureka we need to keep them, sync them between your phones and, while AI filing is on, send them to the AI service as the privacy policy describes. You give us permission to do exactly that, and nothing more.",
        "You are responsible for what you put into Eureka. Do not put in what you have no right to share, or someone else's sensitive information without their say.",
      ],
    },
    {
      id: "ai",
      title: "AI filing",
      body: [
        "AI filing is optional and off until you allow it. While it is on, an outside AI service reads your thoughts and the ideas they may belong to, and the notes you choose to have it sort, as the privacy policy describes.",
        "The AI can be wrong. It may file a thought in the wrong idea, misread what you said, or change a page in a way you did not mean. What it wrote stays marked, Undo puts a page back, and Move sends a thought somewhere else. Sorting an import, it may leave out notes it did not take for ideas: the app says how many, and Undo takes the whole import back. Read what matters before you rely on it.",
      ],
    },
    {
      id: "plans",
      title: "Eureka Free and Eureka Pro",
      body: [
        "Capturing thoughts, typing on a page, sync and export are free and stay free, and so is importing notes as they are.",
        "Each account gets its first 5 thoughts filed by AI for free, once. After that, AI filing needs Eureka Pro, and thoughts said without it are kept as you said them and wait, so none is lost. Pro files them all.",
        "Each account also gets its first import of old notes sorted by AI for free, of up to 300 notes. With Pro, AI sorts up to 4 imports a day, of up to 500 notes each. A longer import keeps a chat's newest messages or a paste's first notes, and the app says so before it starts.",
        "Pro is sold by the week or by the year, at the price shown in the app before you buy, in your store's currency. The yearly plan may start with a free trial for new subscribers; each store account can have one trial.",
        "A subscription renews automatically at the end of each period until you cancel it. Your store charges you when the trial ends, or when you confirm the purchase if there is no trial, and again for each renewal within the 24 hours before the period ends.",
        "Cancel any time in your store account's subscription settings (on an iPhone: Settings, your name, Subscriptions), at least 24 hours before the trial or the period ends to avoid the next charge. Pro stays on until the end of the period you paid for.",
        "If a subscription's price goes up, your store tells you before the change applies, and asks for your consent where the law or the store requires it.",
        "Pro is tied to your Eureka account, so it works on any phone you sign in on, as long as the subscription is active on the store account that bought it. Restore purchases brings it back after a reinstall.",
      ],
    },
    {
      id: "fair",
      title: "Fair use",
      body: [
        "Pro includes AI filing and sorting imports for your own personal use, subject to usage limits that keep the service fast and fair for everyone. Ordinary personal use stays well within them. The limits may change over time.",
        "If you reach a limit, your thoughts are kept as you said them and filed once the limit resets. The app tells you when that happens.",
      ],
    },
    {
      id: "refunds",
      title: "Payments and refunds",
      body: [
        "Payment is handled entirely by Apple or Google. We never see your card details, and their terms govern the transaction.",
        "Refunds are theirs to grant, not ours. On iOS, use reportaproblem.apple.com. On Android, use your Play Store order history. If a refund is granted, Pro is switched off.",
      ],
    },
    {
      id: "use",
      title: "Acceptable use",
      list: [
        "Do not use Eureka by script or automation, share an account, or resell access to it.",
        "Do not try to get around the free thoughts, the free import, Pro or the usage limits, or to reach anyone else's data.",
        "Do not use Eureka to make or store anything illegal where you are, or to harass anyone.",
        "Do not reverse engineer Eureka's server, overload it, or use what the AI writes to build a competing service.",
      ],
      after: ["If an account breaks these terms, we may limit or suspend it, and tell you why where we can."],
    },
    {
      id: "service",
      title: "The service",
      body: [
        "Eureka depends on its server and on outside providers, the AI service among them. We work to keep it running, but cannot promise it will always be available or that every feature will stay as it is. If a provider changes, the privacy policy says so first.",
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      body: [
        "The app, its design, its artwork and the Eureka name are ours. The fonts and icons it uses come under their own open licenses, listed in the app's Acknowledgements.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimers",
      body: [
        'Eureka is provided "as is", without warranties of any kind. We do not promise it will be free of bugs, always available, or right about what it writes. Keep your own copy of anything you cannot afford to lose: Export all ideas in Settings gives you one.',
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "To the fullest extent the law allows, we are not liable for indirect or consequential loss arising from your use of Eureka, including lost data. Where liability cannot be excluded, it is limited to what you paid for Pro in the twelve months before the claim. Nothing here removes rights your local consumer law gives you.",
      ],
    },
    {
      id: "termination",
      title: "Ending things",
      body: [
        "You can stop using Eureka at any time, and delete your account in Settings. If Eureka ever closes, we will say so in the app well before, so you can export your ideas.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "If these terms change, the date at the top of this page changes with them, and the app tells you about material changes. Continuing to use Eureka after that means you accept the new version.",
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

  faq: [
    {
      q: "How does AI filing work?",
      a: "Say or type a thought. With AI filing on, Eureka works out which of your ideas it is about, adds it there and brings that idea's page up to date, or starts a new idea. When it is not sure, it asks. What the AI wrote stays marked, and Undo puts the page back.",
    },
    {
      q: "Can I use Eureka without AI?",
      a: "Yes. Turn AI filing off in Settings. Each thought is then kept as you said it, as its own idea, or as a new line on the page you said it on.",
    },
    {
      q: "Can I bring in my old notes?",
      a: "Yes. Tap the plus in the capture field on Home, or Import notes in Settings, then paste your notes or choose a text file or a WhatsApp chat export (an iPhone's ZIP works too). Sort with AI makes ideas from them, each with its own page; Add as they are brings them in without AI. From a chat, only the messages of the person you pick are used, and photos and voice notes are left out.",
    },
    {
      q: "What is free, and what is Pro?",
      a: "Capture, typing, sync, export and importing notes as they are cost nothing. Your first 5 thoughts are filed by AI for free, and your first import of up to 300 notes is sorted by AI for free. After that, Pro files every thought, and the thoughts you said meanwhile wait and are filed the moment you start. Pro also sorts up to 4 imports a day, of up to 500 notes each.",
    },
    {
      q: "How do I cancel Pro?",
      a: "On an iPhone, open Settings, tap your name, then Subscriptions. On Android, open the Play Store, your profile, then Payments and subscriptions. Pro stays on until the end of the period you paid for.",
    },
    {
      q: "I have Pro and it is gone after reinstalling. What now?",
      a: "Sign in with the same Apple or Google account, then tap Restore purchases in Settings. Your subscription lives on your App Store or Google Play account.",
    },
    {
      q: "Where are my ideas, and who can read them?",
      a: "On your phone, and a copy in your account on Eureka's server, so every phone you sign in on has them. Only you can read them. While AI filing is on, a thought and the ideas it may belong to go to the AI service to be filed, and it does not train on them.",
    },
    {
      q: "How do I get my ideas out, or delete them?",
      a: "Export all ideas in Settings gives you every idea as Markdown. Delete account in Settings deletes your account and your ideas from the server, and eureka.shoopi.dev/delete-account says how to ask for it by email if you no longer have the app.",
    },
    {
      q: "Recording does not work.",
      a: "Eureka uses your phone's own speech recognition. Check that Eureka may use the microphone and speech recognition in your phone's settings, and that Speech language in Eureka's Settings is one your phone offers.",
    },
    {
      q: "Can I get a refund?",
      a: "Refunds are handled by Apple and Google. On iOS use reportaproblem.apple.com; on Android use the Play Store order history.",
    },
  ],

  // the page Google Play asks for: how to delete an account, with the app or without it
  deletion: [
    {
      id: "in-the-app",
      title: "In the app",
      list: [
        "Open Eureka and tap the gear on Home.",
        "Tap your account at the top of Settings, then Delete account.",
        "Tap the red button. If you signed in with Apple, Apple asks once more that it is you.",
      ],
      after: ["Your account is deleted there and then, and your phone is emptied of its ideas, pictures and settings."],
    },
    {
      id: "by-email",
      title: "Without the app",
      body: [
        `Email ${support} with the subject "Delete my account", from the address your account uses (with Hide My Email, the one Apple made for Eureka), or say which Apple or Google account you sign in with. We may ask you to confirm it is you.`,
        "Your account is deleted within 30 days, usually within a few days, and you get a reply when it is done.",
      ],
    },
    {
      id: "deleted",
      title: "What is deleted",
      list: [
        "Your account and the way you signed in",
        "Your ideas, their pages and everything you said into them",
        "The record of your AI requests",
        "Your usage counts",
        "Eureka's link with your Apple ID, when you delete in the app after signing in with Apple. After an email, you can end it yourself in your Apple ID settings, under Sign in with Apple.",
      ],
    },
    {
      id: "kept",
      title: "What is kept",
      body: [
        "Purchase records stay with Apple or Google, and with RevenueCat, which checks purchases for Eureka, under an ID that no longer leads to you.",
        "Thoughts already sent to the AI service are deleted by Anthropic within 30 days under its commercial terms, unless one was flagged for breaking its usage policy.",
        "Deleting your account does not cancel a Pro subscription. Cancel it in your App Store or Google Play subscriptions, or it goes on renewing.",
      ],
    },
  ] satisfies LegalSection[],
};

/** What Eureka's documents need to know of it. */
export const eurekaDoc: DocApp = {
  name: eureka.name,
  home: "/eureka",
  updated: eureka.updated,
  links: [
    { href: "/eureka", label: "Eureka" },
    { href: "/eureka/privacy", label: "privacy" },
    { href: "/eureka/terms", label: "terms" },
    { href: "/eureka/support", label: "support" },
    { href: "/eureka/delete-account", label: "delete account" },
    { href: "https://shoopi.dev", label: "shoopi.dev" },
  ],
};
