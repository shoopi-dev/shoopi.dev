export type ProjectStatus = "live" | "building" | "soon";

export type Project = {
  name: string;
  emoji: string;
  description: string;
  status: ProjectStatus;
  icon?: string;
  cover?: string;
  revenueLabel?: string; // overrides the revenue amount in the pill
  revenue?: number; // US$ last full month, net - same basis as site.monthly
  link?: string;
};

export type Service = {
  title: string;
  description: string;
  emoji: string;
};

export type WorkItem = {
  name: string;
  url: string;
  summary: string;
  role: string;
  tags: string[];
  image?: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type Update = {
  date: string; // ISO, newest first
  title: string;
  body?: string;
};

export const site = {
  name: "Itay",
  fullName: "Itay Blokh",
  handle: "shoopi",
  say: 'Like "Italy" without the L 🇮🇹, or just think "eat Thai food" 🍜', // how to say "Itay"
  jobTitle: "Cybersecurity R&D Engineer",
  location: "Singapore",
  bio: "I'm from Israel, living in Singapore, and spent over two years traveling the world, collecting people and cultures along the way. These days I'm a cybersecurity R&D engineer who builds tools that make everyday life better. Right now that means two things: shipping the apps I actually want to use, and helping companies and founders build theirs - websites, system architecture, hands-on R&D. Gaia, my open-source AI agent, is the biggest of them. This site tracks the bet: $13,000 a month in passive income before I turn 30, in public. Only what my own products earn counts; client work pays the bills.",
  // About: who I am as icon capsules, then "Tech I Love" from the GitHub README
  // as logo-only capsules in each brand's colour (the README badge colours;
  // Kotlin's official gradient). Logos are Simple Icons (CC0)
  chips: [
    { label: "Israel → Singapore", icon: "/icons/pin.svg" },
    { label: "Cybersecurity R&D", icon: "/icons/shield.svg" },
    { label: "Agentic AI", icon: "/icons/sparkle.svg" },
  ],
  // `size` is optical: Go's wordmark is wide and thin, Kotlin's K is a solid
  // block, so each gets the size that makes the row read even (default h-4)
  stack: [
    { name: "Go", icon: "/icons/tech/go.svg", size: "h-6 w-6" },
    { name: "Kotlin", icon: "/icons/tech/kotlin.svg", size: "h-3 w-3" },
    { name: "Android", icon: "/icons/tech/android.svg" },
    { name: "Vim", icon: "/icons/tech/vim.svg", size: "h-[17px] w-[17px]" },
    { name: "Functional programming", icon: "/icons/tech/lambda.svg" },
  ] as { name: string; icon: string; size?: string }[],
  // ponytail: the About row is sized for exactly 3 (see about.tsx). A 4th spills
  // out of the column on phones - more photos means a swipeable strip or a gallery
  photos: [
    { src: "/photos/desert.jpg", alt: "Standing beside a giant cactus in the desert" },
    { src: "/photos/city.jpg", alt: "A lit-up city at night in winter" },
    { src: "/photos/mountain.jpg", alt: "Climbing mountain steps in the mist" },
  ],
  openForWork: true, // flip to false to drop the client-work pitch
  // ponytail: fixed figure, no FX. HKD is pegged at 7.75-7.85, so $13k is at
  // least HK$100k (the real target) anywhere in the band
  goal: 13_000, // US$ a month, passive
  startDate: "2026-08-05", // day 1 of the challenge
  deadline: "2031-07-07T00:00:00Z", // 30th birthday (born 2001-07-07)
  monthly: 0, // US$ last full month, net of store fees. Own products only, never client work
  repo: "https://github.com/shoopi-dev/shoopi.dev",
  socials: {
    github: "https://github.com/sho0pi",
    x: "https://x.com/sho0pi",
    instagram: "https://instagram.com/shoopi.dev",
    email: "hi@shoopi.dev",
  },
  // the travel blog, written with my girlfriend. It moves to babees.biz when that
  // launches: swap both lines (the list hides itself if the feed is missing)
  blog: {
    url: "https://itay.world",
    feed: "https://itay.world/index.xml",
  },
  projects: ([
    {
      name: "Gaia",
      emoji: "🌍",
      icon: "/icons/gaia.png",
      cover: "/covers/gaia.png",
      description:
        "AI assistant that forges specialist sub-agents on demand, remembers everything, and lives in Telegram, WhatsApp, and your terminal.",
      status: "live",
      revenue: 0,
      revenueLabel: "Open source",
      link: "https://gaia-agent.com",
    },
    {
      name: "Client work", // rename here if this ever gets its own brand
      emoji: "🧩",
      cover: "/covers/client-work.svg",
      description:
        "Websites, system architecture, and hands-on R&D for founders and small teams. See what I have shipped and how I work.",
      status: "live",
      revenueLabel: "Pays the bills, not counted", // active income never fills the grid
      link: "/work",
    },
    {
      name: "Work in progress",
      emoji: "🛠️",
      cover: "/covers/wip.svg",
      description: "Something new is cooking. Revealed when it ships.",
      status: "soon",
    },
  ] satisfies Project[]) as Project[],
  apps: ([
    {
      name: "StampStory",
      emoji: "🛂",
      icon: "/stampstory/icon.png",
      description:
        "Scratch map for your travels: mark every country you have visited and share the passport it makes.",
      status: "live",
      revenue: 0,
      link: "https://stampstory.shoopi.dev",
    },
  ] satisfies Project[]) as Project[],
  work: {
    tagline: "Websites, systems, and R&D for people building something real.",
    intro:
      "I'm a cybersecurity R&D engineer who ships product. If you're a founder or a small team without in-house engineering, I can take an idea from a sketch to something live - and stay long enough to make sure it holds up.",
    forWho: [
      "Founders who need a first product built properly, not prototyped twice",
      "Small businesses whose website is doing none of the work it should",
      "Teams that need senior help on architecture, security, or an AI-agent build",
    ],
    services: ([
      {
        title: "Websites & product front-ends",
        emoji: "🌐",
        description:
          "Fast, accessible marketing sites and product UIs. Built on Next.js, deployed so you can update content without calling me.",
      },
      {
        title: "System architecture & backend",
        emoji: "🏗️",
        description:
          "APIs, data models, infrastructure and the security thinking that usually gets bolted on too late. Go, Kotlin, TypeScript.",
      },
      {
        title: "AI agents & R&D",
        emoji: "🤖",
        description:
          "Agentic systems that do real work rather than demo well. I build these for myself too - Gaia is open source, so you can read exactly how I think.",
      },
    ] satisfies Service[]) as Service[],
    // curated from the GitHub profile README - grouped for clients, not a badge wall
    toolbox: [
      {
        label: "Languages",
        items: ["Go", "Kotlin", "TypeScript", "Python", "C / C++", "Java", "Assembly", "SQL"],
      },
      { label: "Platforms", items: ["Android & AOSP", "Linux", "Next.js", "NestJS", "Docker"] },
      { label: "AI", items: ["AI agents", "MCP"] },
    ],
    process: ([
      {
        title: "Scope it honestly",
        body: "A call, then a written plan with what I'd build, what I'd skip, and what it costs. Free, and yours to keep either way.",
      },
      {
        title: "Build in the open",
        body: "You get a live preview URL from day one and a weekly update. No black box, no surprise reveal at the end.",
      },
      {
        title: "Hand it over properly",
        body: "Documented, deployed, and yours. I'll show you how to run it, and I'm around afterwards if something breaks.",
      },
    ] satisfies ProcessStep[]) as ProcessStep[],
    recent: ([
      {
        name: "Flow With Grace",
        url: "https://flowwithgrace.space",
        role: "Design & build",
        summary:
          "A yoga instructor in Singapore needed a home that wasn't a social profile. Personal-brand site with reviews, class info, and WhatsApp booking - so enquiries land where she already answers them.",
        tags: ["Website", "Personal brand", "Bookings"],
        image: "/work/flowwithgrace.jpg",
      },
      {
        name: "Tuvalu Veggies Beach",
        url: "https://veggies.land",
        role: "Concept, design & build",
        summary:
          "A narrative site about a nation backing itself up to the cloud, with a playable Mahjong game embedded in it. Proof that a small site can carry a story and a product at once.",
        tags: ["Narrative site", "Interactive", "Game"],
        image: "/work/veggies-land.jpg",
      },
      {
        name: "Gaia",
        url: "https://gaia-agent.com",
        role: "Creator, open source",
        summary:
          "An AI agent that forges specialist sub-agents on demand and remembers across sessions. Multi-channel, MIT licensed - the code is public, so you can judge the engineering rather than take my word for it.",
        tags: ["AI agents", "Go", "Open source"],
        image: "/work/gaia.jpg",
      },
      {
        name: "shoopi.dev",
        url: "https://shoopi.dev",
        role: "Design & build",
        summary:
          "This site. A design system, generated OG images, structured data and a content model that lets one file drive the whole page.",
        tags: ["Next.js", "Design system", "SEO"],
        image: "/work/shoopi-dev.jpg",
      },
    ] satisfies WorkItem[]) as WorkItem[],
  },
  // weekly, and only when something moved: "+100 premium subs",
  // "1 new SaaS client, 2 cancellations". The section hides while empty
  updates: [] as Update[],
};
