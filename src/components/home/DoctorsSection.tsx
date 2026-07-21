import Link from "next/link";
import { getDoctors } from "@/sanity/lib/fetchers";

import { bgImage } from "@/lib/bgImage";

export default async function DoctorsSection() {
  const doctors = await getDoctors();

  return (
    <section className="section doctors" id="doctors">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-copy">
            <div className="eyebrow">Meet our dermatologists</div>
            <h2>
              Three doctors. Three subspecialties.{" "}
              <span className="serif-italic" style={{ color: "var(--sage)" }}>
                One philosophy.
              </span>
            </h2>
          </div>
          <p>
            Procedures at Dermaheal are performed by trained technicians under the supervision of an MD dermatologist. The same doctor sees you from consultation through follow-up.
          </p>
        </div>
        <div className="doctors-grid">
          {doctors.map((d) => (
            <Link
              key={d.slug}
              className="doctor-card reveal"
              href={`/doctors/${d.slug}`}
            >
              <div className={"doctor-img " + d.img} style={bgImage(d.imageUrl)} />
              <div className="doctor-body">
                <div className="doctor-name">{d.name}</div>
                <div className="doctor-title">{d.title}</div>
                <div className="doctor-bio">{d.homeBio}</div>
                <div className="doctor-meta">
                  <div className="doctor-meta-item">
                    <div className="doctor-meta-num">
                      {d.years}
                      <sup>yrs</sup>
                    </div>
                    <div className="doctor-meta-label">Practising</div>
                  </div>
                  <div className="doctor-meta-item">
                    <div className="doctor-meta-num">{d.focus}</div>
                    <div className="doctor-meta-label">Focus</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
