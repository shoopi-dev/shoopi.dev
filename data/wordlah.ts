import type { DocApp, LegalSection } from "./legal";
import { site } from "./site";

// forwarded by Porkbun to the personal inbox; create the forward before this goes live
const support = "wordlah-support@shoopi.dev";

/** One tap from the support page: subject and a body skeleton, so every mail arrives sortable and complete. */
export const supportMail = (() => {
  const subject = "WordLah support";
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
 * Everything the WordLah pages say. Keep it true to what the app does: the app repo's CLAUDE.md (what is stored, the
 * wallet, the account and its sync, guests, the board, the ads, the analytics and their events) is where each sentence
 * comes from, and a new SDK, data flow or analytics event changes this first.
 * Unlisted until launch: the pages are noindex (app/wordlah/layout.tsx), and out of the sitemap and site.apps.
 */
export const wordlah = {
  name: "WordLah",
  title: "WordLah: a daily Singlish word game",
  tagline: "Guess the word, then get the joke",
  subtitle: "A new Singlish word every day. Six tries to find it, and a joke when you do.",
  support,
  updated: "2026-10-28",
  url: "https://shoopi.dev/wordlah",
  ogImage: "https://shoopi.dev/wordlah/og.jpg", // 1200x630, public/wordlah/og.jpg
  store: {
    ios: { status: "soon" as "soon" | "live", url: "" },
    android: { status: "soon" as "soon" | "live", url: "" },
  },

  faq: [
    {
      q: "When does the new word come?",
      a: "At midnight on your phone's clock. Everyone gets the same word on the same date, so you can compare skies with friends.",
    },
    {
      q: "What are boosters?",
      a: "Help for when you are stuck. Hint shows one right letter in its spot, Remove 3 fades three letters that are not in the word off the keyboard, and One more try gives you a seventh row when your sixth guess misses. You start with 3 Hints, 3 Remove 3 and 2 One more try, and you can get more in the Mama shop.",
    },
    {
      q: "How do I get tokens?",
      a: "Watch a short ad for 50 free tokens, up to three a day, or buy a pack in the Mama shop. Tokens buy boosters. The three short ads come back at midnight.",
    },
    {
      q: "I watched a short ad and got nothing.",
      a: "The reward comes only when the ad has played to the end; closing it early gives nothing. If no ad is ready, try again in a minute or two. If you watched it through and still got nothing, email me with the time it happened.",
    },
    {
      q: "Do I have to sign in?",
      a: "No. Tap Play as guest and start. Save your progress with Apple or Google whenever you like, after your first win, in Settings or from the leaderboard, and your streak, your stats, your tokens and boosters, and No ads follow you: sign in on a new phone, or after reinstalling, and everything is back. On iPhone you can save with Apple, and hide your email if you like, or with Google; on Android with Google.",
    },
    {
      q: "My tokens and streak are gone on my new phone.",
      a: "Sign in with the same Apple or Google account you saved with before, and give it a moment online: your games and wallet come back from your account. Signing in with a different account starts a different one. Progress you never saved stays with the phone it was played on.",
    },
    {
      q: "Why am I not on the leaderboard?",
      a: "Guests are not on it: save your progress with Apple or Google, and the days you solved join it, today's too. A puzzle played later from the calendar is never on it.",
    },
    {
      q: "Can I change my name on the leaderboard?",
      a: `Not yet. Every account is given a made-up name, such as Shiok Kaya 27, and choosing your own comes in a later version. If yours reads badly, email me at ${support} and I will change it.`,
    },
    {
      q: "How do I remove the ads?",
      a: "Buy No ads in the Mama shop. It removes the banner for good, and previous days' puzzles open without a short ad. You can still watch short ads for free tokens and boosters, since you choose each one.",
    },
    {
      q: "What is Cheem Mode?",
      a: "Hard mode. Every letter you find has to be used again: a letter in the right spot stays there, and a letter in the word must be in your next guesses. Turn it on in Settings before your first guess of the day.",
    },
    {
      q: "How do I change my ad privacy choices?",
      a: "In the EEA, the UK and Switzerland, open Settings in WordLah and tap Privacy choices. WordLah never asks to track you on iPhone. On Android, your advertising ID is in your phone's Settings under Security & privacy (or Google), Ads.",
    },
    {
      q: "How do I delete my account?",
      a: "In WordLah, open Settings and tap Delete account. Without the app, see shoopi.dev/wordlah/delete-account.",
    },
    {
      q: "A word, a meaning or a joke is wrong.",
      a: `Tell me at ${support}. Singlish is spoken, not written down, and I would rather fix a word than argue about it.`,
    },
    {
      q: "Can I get a refund?",
      a: "Purchases go through Apple or Google, and refunds are theirs to give. On iPhone, use reportaproblem.apple.com. On Android, use your Google Play order history.",
    },
  ],

  privacy: [
    {
      id: "short",
      title: "The short version",
      body: [
        "You play WordLah as a guest, or signed in with Apple or Google. Either way your games, your streak, your tokens and boosters, and No ads are kept on your phone and with your account on WordLah's server; save a guest's progress with Apple or Google, and it follows you to every phone you sign in on. Other players never see any of it.",
        "Each day's word comes from WordLah's server when you start that day, and your finished game goes back to it to be checked. Every account is given a made-up name, such as Shiok Kaya 27, and the daily leaderboard shows it with your place, your tries and your time, and nothing else about you.",
        "WordLah is free and paid for by ads from Google AdMob: a banner under the keyboard, and short ads you choose to watch for tokens, a booster or a previous day's puzzle. To show them, Google's ad software in the app collects information from your phone, such as its internet address and how you interact with the ads, and on Android its advertising identifier. In the EEA, the UK and Switzerland the app asks for your consent first. WordLah never asks to track you on iPhone.",
        "The app counts what is done in it with PostHog, such as the screens seen, the guesses played and the ads watched, to learn what to make better: never the letters you guess, your email or your name. There is no crash reporting, and you can delete your account, and everything with it, in Settings.",
      ],
    },
    {
      id: "who",
      title: "Who we are",
      body: [
        `WordLah is made by ${site.fullName} (${site.handle}), an independent developer based in Singapore. For anything in this policy, or to make a request about your data, email ${support}.`,
      ],
    },
    {
      id: "account",
      title: "Your account",
      body: [
        "You can play as a guest, or sign in with Apple on iPhone, or with Google on iPhone and Android. The sign-in screen is Apple's or Google's own, and WordLah never sees your password.",
        "Play as guest makes an account on WordLah's server with no email, name or password, which only your phone can open. It keeps your games and wallet like any other account, but if the phone is lost or the app deleted, so is the way back into it. To keep your progress, save it with Apple or Google: after your first win, in Settings or from the leaderboard. Your guest account then becomes your Apple or Google account, with everything in it.",
        "If that Apple ID or Google account already has a WordLah account, saving signs you in to it instead, and this phone's games and wallet join it: on a day played on both, the account's game stays, unless only this phone's was finished. The guest account is left behind, and deleted after 60 days as below.",
        "From Apple, WordLah receives an identifier for your Apple ID and your email address, or a private relay address if you choose Hide My Email. From Google, it receives an identifier for your Google account, your email address, and your name and profile picture as Google shares them; WordLah keeps those with the account but does not show or use your name or picture. Settings shows your email so you know which account you are in.",
      ],
    },
    {
      id: "kept",
      title: "What WordLah keeps",
      body: [
        "On your phone and with your account, a guest's included, so every phone you sign in on has the same:",
      ],
      table: {
        head: ["What", "Why it exists"] as [string, string],
        rows: [
          ["Each day's game: the puzzle number, the word with its meaning, your guesses, any Hint letters, faded letters or extra row, and whether you played it later from the calendar", "So a game you leave is waiting when you come back, and for your streak and stats"],
          ["When the server handed you each day's word, and for each day you finished on the day: whether you solved it, your tries and your time", "To check results and rank the daily leaderboard"],
          ["The name WordLah made up for you when your account was made", "The name the daily leaderboard shows"],
          ["Every change to your wallet: tokens and boosters bought, earned and used, No ads, and the day of each short ad", "Your tokens, boosters and No ads, and the limit of three short ads a day"],
        ] as [string, string][],
      },
      after: [
        "On your phone only: Cheem Mode, whether you have seen How to play, whether the app has asked a guest to save, the random identifier described under How the app is used, and, kept by Google's consent software where it applies, your answer to the ad consent form.",
      ],
    },
    {
      id: "ads",
      title: "Ads",
      body: [
        "Ads are served by Google AdMob, through the Google Mobile Ads software built into the app. WordLah shows two kinds: a banner on the game screen, and short ads that play only when you tap to watch one: for 50 tokens or a booster, at most three a day, or to open a previous day's puzzle from the calendar (not with No ads).",
      ],
      list: [
        "What Google collects. To choose, show and measure ads and to prevent fraud, Google's software sends Google information such as your phone's advertising identifier (on Android only), an identifier for this app on your phone, your internet address and the rough location it implies, your phone's model, system and language, the app and its version, and which ads were shown and tapped. Google uses it as its own privacy policy describes, and explains how at policies.google.com/technologies/partner-sites. Your WordLah account is never shared with Google for ads.",
        "Consent. In the EEA, the UK and Switzerland, the app shows Google's consent form before any ads load, and your answer decides whether ads may be personalised and whether Google may store and read information on your phone for ads. You can change it at any time under Privacy choices in the app's Settings.",
        "No tracking on iPhone. WordLah never asks to track you across other companies' apps and websites, so on iPhone Google does not receive your advertising identifier and ads are not personalised from your activity elsewhere.",
        "On Android, you can reset or delete your advertising ID in your phone's Settings, under Security & privacy (or Google), Ads.",
        "No ads, bought in the Mama shop, removes the banner for good and the short ad before a previous day's puzzle. Short ads for tokens and boosters stay available, since you choose each one.",
      ],
      after: [
        "I see only Google's totals for the app, such as how many ads were shown and what they earned. Nothing in them is about you.",
      ],
    },
    {
      id: "board",
      title: "The leaderboard",
      body: [
        "Each day has one leaderboard for everyone who solved that day's word on the day, ranked by fewest tries and then the shortest time. Times are the server's own, from when it handed you the word to when it received your finished game. A puzzle played later from the calendar is never on it.",
        "Every account is given a name as it is made: a Singlish word and a food or a creature, with a number, such as Shiok Kaya 27. Other players see only that name, your place, your tries and your time: never your email, your name from Apple or Google, or your guesses. You cannot change the name yet, and it is deleted with your account.",
        "A guest's results are kept but not shown. Once the guest saves with Apple or Google, the days they solved on the day join the leaderboard, today's too.",
      ],
    },
    {
      id: "usage",
      title: "How the app is used",
      body: [
        "The app counts what is done in it, to learn what to make better: when it is opened and put away, which screens are seen, signing in, playing as a guest and saving, starting a day, each guess played (which try it was, never its letters), a word turned down and why, how a game ended, the boosters used and bought, the shop and purchases, short ads tapped and watched and the banner tapped, the leaderboard and previous games opened, Share my sky, pokes at the Merlion, and the daily reminder asked for, turned on or off (with its hour) and opened.",
        "Each of these events carries your account identifier, a guest's included. On the sign-in page, before you have an account, it carries a random identifier made on your phone instead, which joins your account's when you sign in or play as a guest. Every event also carries your phone's system and model, the app version, your language and your time zone, and PostHog keeps with your account how you signed in, whether you are a guest, and your name on the leaderboard. They never carry the letters you guess, your email or your name from Apple or Google.",
        "The events go from your phone to PostHog, in its EU cloud. PostHog works out roughly where an event came from, its country and city, from the internet address it came from, and then discards the address without storing it.",
        "To read the counts beside how the game is played, PostHog also keeps a copy of WordLah's game tables, refreshed from the server every 6 hours: games, results, when each day's word was handed out, wallet changes, leaderboard names, and the word list and its schedule. The copy never includes anything from your Apple or Google sign-in, such as your email.",
      ],
    },
    {
      id: "leaves",
      title: "What leaves your device",
      list: [
        "Your sign-in, to Apple or Google, and from them to WordLah's server. Play as guest asks WordLah's server alone for an account.",
        "Your games and your wallet's changes, to your account on WordLah's server, a moment after each change and when you open the app.",
        "When you start a day, your phone asks WordLah's server for that day's word. When you finish it, your guesses go to the server, which checks them and keeps your result for the leaderboard.",
        "Ad requests to Google, as described above.",
        "Usage counts, to PostHog, as described above.",
        "Purchases. Token packs and No ads are bought through Apple or Google with your store account, and I never see your card details. RevenueCat checks each purchase on WordLah's behalf, so what you bought reaches your account and follows it to any phone you sign in on. RevenueCat receives your account identifier, a guest's included, the store's receipt, and basic device and app version information, and never your games or your guesses. The shop also asks it for your store's prices, so they show in your currency.",
        "Reminders stay on your phone. If you turn on the daily reminder, your phone sets and shows it itself, at the time you chose; only the counts above about it leave the phone.",
        "The picture you share. When you tap Share my sky, the picture of your game is made on your phone and handed to your phone's share sheet, and goes wherever you send it. It shows the colours of your guesses, never the letters.",
      ],
    },
    {
      id: "never",
      title: "What the app never collects",
      list: [
        "No password and no phone number",
        "No location permission: the app never asks where you are. Google may work out a rough location from your internet address, as described under Ads",
        "No contacts, camera or microphone. If you choose Save Image in the share sheet, iOS asks your permission and the app adds that one picture to Photos; it never reads your library",
        "No crash reporting, session recording or heat maps",
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
        "If you are in the EEA or the UK: keeping your account, your games and your wallet, the leaderboard, and processing a purchase, are necessary to provide the game you signed up for (Article 6(1)(b) GDPR). Personalised ads, and Google storing and reading information on your phone for ads, rely on your consent (Article 6(1)(a)), given through Google's consent form. Counting usage, learning how the game is played, keeping the leaderboard fair and keeping the service secure rest on legitimate interests (Article 6(1)(f)).",
      ],
    },
    {
      id: "sharing",
      title: "Who else is involved",
      list: [
        "Supabase runs WordLah's server: your account, your games, your wallet, your name on the leaderboard and your results are stored in its Singapore region. Only your account can read its games and wallet; the leaderboard shows other players only names, places, tries and times.",
        "Apple and Google sign you in, and process payments and hold the purchase record. Their terms and privacy policies apply.",
        "RevenueCat checks purchases and keeps their record against your account identifier.",
        "Google shows and measures the ads, and decides how it uses what its ad software collects, under its own privacy policy.",
        "PostHog counts how the app is used, and keeps the copy of the game tables described above, in its EU cloud.",
        "Vercel hosts this website.",
      ],
      after: [
        "Supabase, Google, RevenueCat, PostHog and Vercel are companies in the United States, and some of the data may be processed there. Where it comes from the EEA or the UK, the transfer relies on the European Commission's standard contractual clauses or the EU-U.S. Data Privacy Framework.",
        "Nobody else. I do not sell your data or hand it to anyone.",
      ],
    },
    {
      id: "retention",
      title: "How long things are kept",
      list: [
        "Your account, games, wallet and results: for as long as you keep your account. Delete it, and they are deleted from the server.",
        "A guest account: until it is saved or deleted, or until nobody has used it for 60 days, when it is deleted with everything in it.",
        "On your phone: until you sign out or delete your account, either of which empties the phone of them, or delete the app.",
        "Usage counts: deleted with your account, and otherwise kept by PostHog for as long as the plan WordLah is on keeps them. PostHog's copy of the game tables follows the server's within 6 hours.",
        "Ad data: kept by Google as its own retention policy describes, at policies.google.com/technologies/retention.",
        "Purchase records: kept by Apple, Google and RevenueCat for as long as they need to honour a restore and to meet their tax and accounting obligations.",
      ],
    },
    {
      id: "rights",
      title: "Your rights and your choices",
      body: [
        "Delete account in Settings, a guest's included, deletes your account, your games, your wallet and your results from the server, deletes what PostHog counted about you, ends WordLah's link with your Apple ID if you signed in with Apple, and empties your phone. Without the app, shoopi.dev/wordlah/delete-account says how to ask by email.",
        `To get a copy of what your account holds, or to correct it, email ${support} from the address your account uses.`,
        "For ads, the choices are in your hands: Privacy choices in the app where consent applies, and your advertising ID on Android. Google also offers its own controls at myadcenter.google.com.",
        "If you are in the EEA or the UK you also have the right to complain to your local data protection authority.",
      ],
    },
    {
      id: "children",
      title: "Adults only",
      body: [
        "WordLah is for people 18 and over: some of its words and jokes are rude, and the sign-in page asks you to confirm your age. It is not directed at anyone under 18 and does not knowingly collect anything from them. If you believe someone under 18 has an account, email me and it will be deleted; if they bought tokens, contact Apple or Google for a refund.",
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "Your games and wallet travel encrypted to WordLah's server, where the database itself lets only your account read them. Your session is kept in your phone's secure storage. No system is perfect, and I will not pretend otherwise.",
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
      title: "Who can use WordLah",
      body: [
        "WordLah is for adults: you must be 18 or older, and old enough to agree to these terms where you live, and the sign-in page asks you to confirm it. Some of its words and jokes are rude.",
      ],
    },
    {
      id: "what",
      title: "What WordLah does",
      body: [
        "WordLah is a daily word game: one five-letter word a day, most of them Singlish, six tries to find it, and a joke when you do. It runs on your device. The meanings and origins it shows are written in good faith for fun; Singlish is spoken more than written, and they are not a dictionary.",
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
      title: "Your account",
      body: [
        "You play as a guest, or sign in with Apple or Google, and your games and wallet are kept with your account. A guest account lives on the phone it was made on: save it with Apple or Google, and it comes back on any phone you sign in on. Keep your Apple or Google account safe: whoever can sign in to it can play as you.",
        "A guest account nobody has used for 60 days is deleted, with its games, tokens, boosters and No ads.",
        "You can delete your account at any time in Settings, which deletes your games, tokens, boosters and No ads with it. I may close an account that breaks these terms, for example one used to cheat tokens or the leaderboard.",
      ],
    },
    {
      id: "tokens",
      title: "Tokens and boosters",
      body: [
        "Tokens and boosters are items for use in WordLah only. They have no cash value, cannot be exchanged for money or moved to another person or phone, and do not expire.",
        "You can buy token packs, earn 50 tokens for each short ad you watch to the end (up to three a day), and spend tokens on boosters. Each is sold at the price shown in the app before you buy, in your store's currency. Prices and amounts may change; anything you already have stays yours.",
        "Tokens and boosters are kept with your account, so once it is saved with Apple or Google they follow you to every phone you sign in on. Deleting your account, or a guest account being deleted after 60 days unused, deletes them, and they cannot be restored or refunded after that.",
      ],
    },
    {
      id: "noads",
      title: "No ads",
      body: [
        "No ads is one payment. It removes the banner from the game for good, and previous days' puzzles open without a short ad. It is kept with your account; Restore purchases also brings it back from your store account. Short ads for free tokens and boosters stay available, since you choose each one.",
      ],
    },
    {
      id: "refunds",
      title: "Payments and refunds",
      body: [
        "Payment is handled entirely by Apple or Google. I never see your card details. Their terms govern the transaction.",
        "Refunds are theirs to grant, not mine. On iOS, use reportaproblem.apple.com. On Android, use your Google Play order history. If a refund is granted, what it paid for may be taken back.",
      ],
    },
    {
      id: "use",
      title: "Acceptable use",
      list: [
        "Do not try to get tokens, boosters or No ads without paying or watching for them, for example with modified builds of the app or tools that fake purchases or ads.",
        "Do not tap ads you have no interest in, or ask others to; Google may stop showing ads in the app if it sees invalid clicks.",
        "Do not cheat the leaderboard, for example by faking results or playing on accounts made for it. I may remove results or accounts that do.",
        "Names on the leaderboard are made up by WordLah. I may change one that turns out to read badly or to be someone's real name.",
        "Do not use the app's imagery or brand to imply I endorse you or your product.",
        "Do not use the app to break the law where you are.",
      ],
    },
    {
      id: "content",
      title: "Your content",
      body: [
        "The pictures you share are yours. I claim no rights over them and no copy reaches me. Where you share a picture, and who sees it, is up to you.",
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      body: [
        "The app, its design, the Merlion mascot, the daily list with its jokes, and the WordLah name are mine. The words themselves belong to everyone who speaks them.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimers",
      body: [
        'WordLah is provided "as is", without warranties of any kind. I do not promise it will be free of bugs, available at all times, or right about every word. Streaks and stats are for fun, not for anything that matters.',
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "To the fullest extent the law allows, I am not liable for indirect or consequential loss arising from your use of the app, including lost data. Where liability cannot be excluded, it is limited to what you paid in the app in the twelve months before the claim. Nothing here removes rights your local consumer law gives you.",
      ],
    },
    {
      id: "termination",
      title: "Ending things",
      body: [
        "You can stop using WordLah at any time, and delete your account in Settings. If WordLah ever closes, I will say so in the app well before.",
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

  // the page Google Play asks for: how to delete an account, with the app or without it
  deletion: [
    {
      id: "in-the-app",
      title: "In the app",
      list: [
        "Open WordLah and tap the gear on home.",
        "Tap Delete account in the Account group at the top of Settings.",
        "Tap the red Delete account button. If you signed in with Apple, Apple asks once more that it is you.",
      ],
      after: [
        "Your account is deleted there and then, and your phone is emptied of your games and wallet. A guest deletes theirs the same way.",
      ],
    },
    {
      id: "by-email",
      title: "Without the app",
      body: [
        `Email ${support} with the subject "Delete my account", from the address your account uses (with Hide My Email, the one Apple made for WordLah), or say which Apple or Google account you sign in with. I may ask you to confirm it is you.`,
        "Your account is deleted within 30 days, usually within a few days, and you get a reply when it is done.",
        "A guest account has no email to ask from: delete it in the app, or leave it, and it is deleted once nobody has used it for 60 days.",
      ],
    },
    {
      id: "deleted",
      title: "What is deleted",
      list: [
        "Your account and the way you signed in",
        "Every game you played, and with them your streak and stats",
        "Your wallet: tokens, boosters and No ads",
        "Your name and your results on the leaderboard",
        "What the app counted about you in PostHog: your person there at once, and its events at PostHog's next clean-up, usually within a week. Your rows leave PostHog's copy of the game tables within 6 hours.",
        "WordLah's link with your Apple ID, when you delete in the app after signing in with Apple. After an email, you can end it yourself in your Apple ID settings, under Sign in with Apple.",
      ],
    },
    {
      id: "kept",
      title: "What is kept",
      body: [
        "Purchase records stay with Apple or Google, which need them for refunds, taxes and Restore purchases, and with RevenueCat, which checks purchases for WordLah, under an identifier that no longer leads to you.",
        "What Google's ad software collected stays with Google under its own retention policy; it was never tied to your WordLah account.",
      ],
    },
  ] satisfies LegalSection[],
};

/** What WordLah's documents need to know of it. */
export const wordlahDoc: DocApp = {
  name: wordlah.name,
  home: "/wordlah",
  updated: wordlah.updated,
  links: [
    { href: "/wordlah", label: "WordLah" },
    { href: "/wordlah/privacy", label: "privacy" },
    { href: "/wordlah/terms", label: "terms" },
    { href: "/wordlah/support", label: "support" },
    { href: "/wordlah/delete-account", label: "delete account" },
    { href: "https://shoopi.dev", label: "shoopi.dev" },
  ],
};
