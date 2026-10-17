import type { ProjectStatus } from "@/data/site";

/** one status vocabulary across the page, from the palette: green is
    available now, the mask violet is in progress, grey is coming soon */
export const statusDot: Record<ProjectStatus, string> = {
  live: "bg-success",
  building: "bg-mask",
  soon: "bg-ink/25",
};

/** the same three as badges: a soft fill with its own text colour */
export const statusBadge: Record<ProjectStatus, string> = {
  live: "bg-success-soft text-success",
  building: "bg-mask-soft text-mask-text",
  soon: "bg-raised text-ink-2",
};
