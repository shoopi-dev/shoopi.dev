/* GitHub's public contribution calendar - the same HTML fragment the profile
   page loads, so no token. Regexes on purpose: each day is one <td> carrying
   its date and level, and its exact count sits in a matching <tool-tip>. */

export type Day = { date: string; level: number; count: number };

export function parseContributions(html: string): Day[] {
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>\s*(No|[\d,]+) contributions? on/g)) {
    counts.set(m[1], m[2] === "No" ? 0 : Number(m[2].replaceAll(",", "")));
  }
  const days: Day[] = [];
  for (const [tag] of html.matchAll(/<td\b[^>]*\bdata-date="[^"]*"[^>]*>/g)) {
    const date = tag.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
    const level = Number(tag.match(/\bdata-level="(\d)"/)?.[1]);
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    if (date && level >= 0 && level <= 4) days.push({ date, level, count: (id && counts.get(id)) || 0 });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

/** a year of days, refreshed daily. Any failure logs and returns [], which
    hides the widget - a stale day beats a red deploy over a decoration */
export async function getContributions(user: string): Promise<Day[]> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      next: { revalidate: 86_400 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const days = parseContributions(await res.text());
    if (!days.length) throw new Error("no days parsed - did GitHub change its markup?");
    return days;
  } catch (e) {
    console.error(`[activity] GitHub contributions for ${user} unavailable, hiding the widget:`, e);
    return [];
  }
}
