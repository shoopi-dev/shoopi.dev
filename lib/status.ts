import type { ProjectStatus } from "@/data/site";

/** one dot vocabulary across the page: status -> dot color */
export const statusDot: Record<ProjectStatus, string> = {
  live: "bg-accent",
  building: "bg-sky-blue",
  soon: "bg-ink/25",
};
