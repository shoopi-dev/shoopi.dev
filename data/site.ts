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
  bio: "Cybersecurity R&D engineer by day, agentic AI builder by night. I make tools that simplify everyday life - mostly in Go and Kotlin, always in the open. My main bet is Gaia, an open-source AI agent designed to be genuinely useful. This site tracks the bigger one: $1,000,000 from my own apps before I turn 30.",
  chips: ["Singapore", "Cybersecurity R&D", "Agentic AI", "Go · Kotlin · Android"],
  goal: 1_000_000,
  startDate: "2026-08-05", // day 1 of the challenge
  deadline: "2031-07-07T00:00:00Z", // 30th birthday (born 2001-07-07)
  revenue: 0, // edit me as money comes in
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
      name: "Work in progress",
      emoji: "🛠️",
      description: "Something new is cooking. Revealed when it ships.",
      status: "soon",
    },
  ] satisfies Project[]) as Project[],
  apps: [] as Project[],
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
