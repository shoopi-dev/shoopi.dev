export type ProjectStatus = "live" | "building" | "soon";

export type Project = {
  name: string;
  emoji: string;
  description: string;
  status: ProjectStatus;
  icon?: string;
  cover?: string;
  revenueLabel?: string; // overrides the revenue amount in the pill
  revenue?: number;
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
  jobTitle: "Cybersecurity R&D Engineer",
  location: "Singapore",
  bio: "Cybersecurity R&D engineer who builds tools that make everyday life better. Right now that means two things: shipping the apps I actually want to use, and helping companies and founders build theirs - websites, system architecture, hands-on R&D. Gaia, my open-source AI agent, is the biggest of them. This site tracks the bet: $1,000,000 before I turn 30, in public.",
  chips: ["Singapore", "Cybersecurity R&D", "Agentic AI", "Go · Kotlin · Android"],
  openForWork: true, // flip to false to drop the client-work pitch
  goal: 1_000_000,
  startDate: "2026-08-05", // day 1 of the challenge
  deadline: "2031-07-07T00:00:00Z", // 30th birthday (born 2001-07-07)
  revenue: 0, // total across every stream (apps + client work)
  repo: "https://github.com/shoopi-dev/shoopi.dev",
  socials: {
    github: "https://github.com/sho0pi",
    x: "https://x.com/sho0pi",
    instagram: "https://instagram.com/shoopi.dev",
    email: "hi@shoopi.dev",
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
      revenue: 0,
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
  apps: [] as Project[],
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
    // placeholder numbers - replace with your real rates
    pricing: [
      { label: "Landing page", price: "from $1,500", note: "1-2 weeks, design and build" },
      { label: "Full site or MVP", price: "from $6,000", note: "3-6 weeks, scoped per project" },
      { label: "Ongoing / advisory", price: "from $1,200/mo", note: "retainer, part-time" },
    ],
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
      },
      {
        name: "shoopi.dev",
        url: "https://shoopi.dev",
        role: "Design & build",
        summary:
          "This site. A design system, generated OG images, structured data and a content model that lets one file drive the whole page.",
        tags: ["Next.js", "Design system", "SEO"],
      },
    ] satisfies WorkItem[]) as WorkItem[],
  },
  updates: [
    {
      date: "2026-08-05",
      title: "shoopi.dev is live",
      body: "Day 1 of the challenge. Everything from here happens in public - every app, every dollar, every failure.",
    },
    {
      date: "2026-08-01", // edit me to the real date
      title: "Gaia goes open source",
      body: "MIT licensed, install in one command, runs on your own API keys.",
    },
  ] satisfies Update[],
};
