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

/** The app a document belongs to: its name, its landing page, when its documents last changed, and its footer links. */
export type DocApp = {
  name: string;
  /** The app's icon, shown beside its name at the top of its documents. */
  icon?: string;
  home: string;
  updated: string;
  links: { href: string; label: string }[];
};
