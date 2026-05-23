import { CONCERNS } from "@/data/concerns";

export default function Concerns() {
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
          {CONCERNS.map((c) => (
            <div className="concern reveal" key={c.id}>
              <div className="concern-icon">{c.icon}</div>
              <div>
                <div className="concern-name">{c.name}</div>
                <div className="concern-count">{c.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
