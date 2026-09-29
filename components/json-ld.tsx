/** Structured data for crawlers. `<` is escaped so no string inside the data can close the
    script tag (the escape Next's JSON-LD guide asks for). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
