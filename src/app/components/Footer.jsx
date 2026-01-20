"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  useRevealOnScroll();

  // Année côté client (safe hydration)
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="w-full px-6 sm:px-10 lg:px-20 py-20">
        {/* TOP CREDIT */}
        <div className="mb-16 text-xs tracking-[0.28em] uppercase text-white/50">
          Made by OffClassic Studio
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-14 lg:grid-cols-12 items-start">
          {/* LEFT NAV */}
          <div className="lg:col-span-3">
            <nav className="space-y-4 text-xs font-semibold tracking-[0.25em] uppercase">
              <Link href="/#services" className="block hover:opacity-70 transition">
                Work
              </Link>

              <Link href="/#gallery" className="block hover:opacity-70 transition">
                About 
              </Link>

              {/* Si tu veux que CONTACT mène vers la page /contact : */}
              <Link href="/contact" className="block hover:opacity-70 transition">
                Contact
              </Link>
            </nav>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-3 text-sm space-y-3 text-white/70">
            

            <a
              href="https://www.instagram.com/mejdhamza/"
              target="_blank"
              rel="noreferrer"
              className="block hover:text-white underline underline-offset-4 transition"
            >
              Instagram
            </a>

            <a
              href="https://www.linkedin.com/in/hamza-mejd-975662294/"
              target="_blank"
              rel="noreferrer"
              className="block hover:text-white underline underline-offset-4 transition"
            >
              Linkedin
            </a>

            
          </div>

          {/* BRAND */}
          <div className="lg:col-span-6 ml-auto text-right flex flex-col items-end">
            <div
              data-reveal
              className="reveal font-serif text-[64px] sm:text-[88px] lg:text-[120px] leading-[0.9]"
            >
              Hamza
              <br />
              Mejd
            </div>

            <div className="mt-4 text-xs text-white/50">© {year} Hamza Mejd</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-12 border border-white text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition"
          >
            LET’S CONNECT
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ===========================
   Reveal on scroll hook
=========================== */
function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
