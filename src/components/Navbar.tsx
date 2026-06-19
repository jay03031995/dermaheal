"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CLINIC, telHref } from "@/data/clinic";
import { TREATMENTS, TREATMENT_CATS } from "@/data/treatments";
import { DOCTORS } from "@/data/doctors";
import { CONCERNS } from "@/data/concerns";
import {
  ArrowRight,
  Phone,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "@/components/icons";
import BookButton from "@/components/BookButton";

const NAV_SOCIALS = [
  { href: CLINIC.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: CLINIC.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: CLINIC.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

const MOBILE_LINKS = [
  { href: "/treatments", label: "Treatments" },
  { href: "/concerns", label: "Concerns" },
  { href: "/doctors", label: "Doctors" },
  { href: "/results", label: "Results" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const ddConcerns = CONCERNS.slice(0, 6);

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

          <div className="nav-item">
            <Link className="nav-link has-dd" href="/concerns">
              Concerns
            </Link>
            <div className="nav-dd wide">
              <div className="nav-dd-hd">By concern · 12 in total</div>
              {ddConcerns.map((c) => (
                <Link key={c.id} className="nav-dd-item" href={`/concerns/${c.slug}`}>
                  <span>{c.name}</span>
                  <small>{c.count}</small>
                </Link>
              ))}
              <div className="nav-dd-foot">
                <span>Every concern reviewed by an MD</span>
                <Link href="/concerns">
                  See all concerns <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

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

          <Link className="nav-link" href="/results">
            Results
          </Link>
          <Link className="nav-link" href="/#contact">
            Contact
          </Link>
        </div>

        <div className="nav-cta">
          <div className="nav-social">
            {NAV_SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
          <a className="nav-phone" href={telHref()} aria-label={`Call ${CLINIC.phone}`}>
            <Phone /> {CLINIC.phone}
          </a>
          <BookButton>Book Consultation</BookButton>
          <button
            type="button"
            className={"nav-burger" + (menuOpen ? " open" : "")}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={"nav-mobile" + (menuOpen ? " open" : "")}>
        {MOBILE_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            className="nav-mobile-link"
            href={href}
            onClick={() => setMenuOpen(false)}
          >
            {label}
            <ArrowRight size={14} />
          </Link>
        ))}
        <a className="nav-mobile-phone" href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}>
          <Phone /> {CLINIC.phone}
        </a>
        <div className="nav-mobile-social">
          {NAV_SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
        <BookButton className="btn btn-primary nav-mobile-book">
          Book Consultation
        </BookButton>
      </div>
    </nav>
  );
}
