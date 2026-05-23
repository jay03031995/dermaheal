"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CLINIC } from "@/data/clinic";
import { TREATMENTS, TREATMENT_CATS } from "@/data/treatments";
import { DOCTORS } from "@/data/doctors";
import { ArrowRight, Phone } from "@/components/icons";
import BookButton from "@/components/BookButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ddTreatments = TREATMENT_CATS.filter((c) => c !== "All").map((cat) => {
    const sample = TREATMENTS.find((t) => t.cat === cat);
    return { cat, sample, count: TREATMENTS.filter((t) => t.cat === cat).length };
  });

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label={CLINIC.name}>
          <img src="/dermaheal-logo.png" alt={CLINIC.name} className="logo-img" />
        </Link>

        <div className="nav-links">
          <div className="nav-item">
            <Link className="nav-link has-dd" href="/treatments">
              Treatments
            </Link>
            <div className="nav-dd wide">
              <div className="nav-dd-hd">
                Browse by category · {TREATMENTS.length} treatments
              </div>
              {ddTreatments.map(({ cat, sample, count }) => (
                <Link
                  key={cat}
                  className="nav-dd-item"
                  href={`/treatments#cat-${cat}`}
                >
                  <span>{cat}</span>
                  <small>
                    {count} treatments · {sample ? sample.name : ""}
                  </small>
                </Link>
              ))}
              <div className="nav-dd-foot">
                <span>{TREATMENTS.length} treatments in total</span>
                <Link href="/treatments">
                  See full menu <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          <Link className="nav-link" href="/#concerns">
            Concerns
          </Link>

          <div className="nav-item">
            <Link className="nav-link has-dd" href="/doctors">
              Doctors
            </Link>
            <div className="nav-dd">
              <div className="nav-dd-hd">Our dermatologists</div>
              {DOCTORS.map((d) => (
                <Link
                  key={d.slug}
                  className="nav-dd-item"
                  href={`/doctors/${d.slug}`}
                >
                  <span>{d.name}</span>
                  <small>{d.title}</small>
                </Link>
              ))}
              <div className="nav-dd-foot">
                <span>All MD-Dermatology certified</span>
                <Link href="/doctors">
                  All doctors <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          <Link className="nav-link" href="/#results">
            Results
          </Link>
          <Link className="nav-link" href="/#insights">
            Journal
          </Link>
          <Link className="nav-link" href="/#contact">
            Contact
          </Link>
        </div>

        <div className="nav-cta">
          <span className="nav-phone">
            <Phone /> {CLINIC.phone}
          </span>
          <BookButton>Book Consultation</BookButton>
        </div>
      </div>
    </nav>
  );
}
