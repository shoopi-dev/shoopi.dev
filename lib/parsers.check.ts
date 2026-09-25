// Self-check for the two scrapers: bun lib/parsers.check.ts
import assert from "node:assert/strict";
import { parseContributions } from "./github";
import { parseFeed } from "./feed";

const calendar = `
<td data-ix="1" data-date="2026-09-21" id="contribution-day-component-1-0" data-level="2" class="ContributionCalendar-day"></td>
<td data-ix="0" data-date="2026-09-20" id="contribution-day-component-0-0" data-level="0" class="ContributionCalendar-day"></td>
<td data-date="2026-09-22" id="contribution-day-component-2-0" data-level="4"></td>
<tool-tip for="contribution-day-component-0-0" popover="manual">No contributions on September 20th.</tool-tip>
<tool-tip for="contribution-day-component-1-0" popover="manual">1 contribution on September 21st.</tool-tip>
<tool-tip for="contribution-day-component-2-0" popover="manual">1,204 contributions on September 22nd.</tool-tip>`;

assert.deepEqual(parseContributions(calendar), [
  { date: "2026-09-20", level: 0, count: 0 },
  { date: "2026-09-21", level: 2, count: 1 },
  { date: "2026-09-22", level: 4, count: 1204 },
]);
assert.deepEqual(parseContributions("<html>changed markup</html>"), []);

const rss = `<rss><channel><title>Itay's World</title>
<item><title>Why I Love Hainan</title><link>https://itay.world/posts/hainan/</link><pubDate>Sat, 16 May 2026 16:13:46 +0800</pubDate></item>
<item><title><![CDATA[Tom &amp; Jerry&#39;s &lt;Trip&gt;]]></title><link>https://itay.world/posts/trip/</link><pubDate>Thu, 21 May 2026 17:37:43 +0800</pubDate></item>
<item><title>No date</title><link>https://itay.world/x/</link><pubDate>soon</pubDate></item>
</channel></rss>`;

assert.deepEqual(parseFeed(rss), [
  { title: "Tom & Jerry's <Trip>", url: "https://itay.world/posts/trip/", date: "2026-05-21T09:37:43.000Z" },
  { title: "Why I Love Hainan", url: "https://itay.world/posts/hainan/", date: "2026-05-16T08:13:46.000Z" },
]);
assert.deepEqual(parseFeed(rss, 1).length, 1);
console.log("parsers ok");
