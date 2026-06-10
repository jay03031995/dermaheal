/**
 * Renders one or more JSON-LD nodes into a <script> tag. Pass a single schema
 * object or an array of nodes. The `<` escaping prevents a `</script>` inside
 * any string value from breaking out of the tag.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
