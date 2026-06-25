import Link from "next/link";
import { getConcerns } from "@/sanity/lib/fetchers";
import { bgImage } from "@/lib/bgImage";

export default async function Concerns() {
  const concerns = await getConcerns();

  return (
    <section className="concerns" id="concerns">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-copy">
            <div className="eyebrow">Start with your concern</div>
            <h2>Twelve concerns, one place to address them.</h2>
          </div>
          <p>
            From cystic acne to age-related volume loss, every concern is mapped
            to a treatment plan reviewed personally by your dermatologist.
          </p>
        </div>
        <div className="concerns-grid">
          {concerns.map((c) => (
            <Link
              key={c.id}
              className={"concern reveal" + (c.imageUrl ? " has-img" : "")}
              href={`/concerns/${c.slug}`}
            >
              {c.imageUrl ? (
                <div className="concern-img" style={bgImage(c.imageUrl)} />
              ) : (
                <div className="concern-icon">{c.icon}</div>
              )}
              <div>
                <div className="concern-name">{c.name}</div>
                <div className="concern-count">{c.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
