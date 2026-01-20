"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // ✅ lock scroll quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // ✅ scroll helper (WORK => #stills)
  const goToStills = () => {
    setOpen(false);

    // si tu es déjà sur la home, scroll direct
    const el = document.getElementById("stills");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // sinon, aller à la home puis scroll (si un jour tu réutilises Navbar sur /about, /contact)
    window.location.href = "/#stills";
  };

  // ✅ active route auto (plus de /films)
  const active =
    pathname.startsWith("/about") ? "about"
    : pathname.startsWith("/contact") ? "contact"
    : "home";

  return (
    <>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.brandText}>HAMZA MEJD</span>
        </Link>

        {/* ✅ Desktop nav */}
        <nav className={styles.navDesktop} aria-label="Primary">
          {/* ✅ WORK = scroll (pas /films) */}
          <button
            type="button"
            onClick={goToStills}
            className={`${styles.link} ${active === "home" ? styles.active : ""}`}
          >
            WORK
          </button>

          <Link
            className={`${styles.link} ${active === "about" ? styles.active : ""}`}
            href="/about"
          >
            ABOUT
          </Link>

          <Link
            className={`${styles.link} ${styles.cta} ${active === "contact" ? styles.activeCta : ""}`}
            href="/contact"
          >
            CONTACT
          </Link>
        </nav>

        {/* ✅ Mobile button (3 dots) */}
        <button
          type="button"
          className={styles.moreBtn}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className={styles.moreDot} />
          <span className={styles.moreDot} />
          <span className={styles.moreDot} />
        </button>
      </header>

      {/* ✅ Mobile drawer */}
      {open && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <button
            className={styles.backdrop}
            onClick={() => setOpen(false)}
            aria-label="Close"
            type="button"
          />

          <aside className={styles.drawer}>
            <div className={styles.drawerTop}>
              <div className={styles.drawerTitle}>Menu</div>
              <button
                className={styles.closeBtn}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                type="button"
              >
                ✕
              </button>
            </div>

            <div className={styles.drawerLinks}>
              {/* ✅ WORK mobile = scroll */}
              <button
                type="button"
                onClick={goToStills}
                className={`${styles.drawerLink} ${active === "home" ? styles.drawerActive : ""}`}
              >
                WORK
              </button>

              <Link
                className={`${styles.drawerLink} ${active === "about" ? styles.drawerActive : ""}`}
                href="/about"
                onClick={() => setOpen(false)}
              >
                ABOUT
              </Link>

              <Link
                className={`${styles.drawerLink} ${active === "contact" ? styles.drawerActive : ""}`}
                href="/contact"
                onClick={() => setOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
