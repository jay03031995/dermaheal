import { INSIGHTS } from "@/data/site";

export default function Insights() {
  return (
    <section className="section insights" id="insights">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-copy">
            <div className="eyebrow">The Dermaheal journal</div>
            <h2>Dermatology, demystified.</h2>
          </div>
          <p>
            Long-form reads from our doctors on the science behind every
            treatment we offer, written for patients, not peers.
          </p>
        </div>
        <div className="insights-grid">
          {INSIGHTS.map((p, i) => (
            <article
              key={i}
              className={"insight reveal" + (p.feature ? " feature" : "")}
            >
              <div className={"insight-img " + p.img} />
              <div className="insight-body">
                <div className="insight-tag">{p.tag}</div>
                <div className="insight-title">{p.title}</div>
                <div className="insight-meta">
                  <span>{p.date}</span>
                  <span className="insight-meta-dot" />
                  <span>{p.read}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
