"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import Footer from "./components/Footer";

/* ===========================
   DATA
=========================== */

const FILTERS = ["ALL", "FILMS", "COMMERCIAL", "MUSIC VIDEOS"];

const PROJECTS = [
  {
    id: 1,
    title: "YOURS",
    category: "FILMS",
    thumb: "/projects/p1.jpeg",
    href: "/contact",
    previewVideo:
      "https://res.cloudinary.com/dko1fpcic/video/upload/v1768872409/Yours1_fi1fpj.mp4",
  },
  {
    id: 2,
    title: "ALTÉRER",
    category: "FILMS",
    thumb: "/projects/s3.jpg",
    href: "/contact",
    previewVideo:
      "https://res.cloudinary.com/dko1fpcic/video/upload/Alterer_ngdzuh.mp4",
  },
  {
    id: 3,
    title: "SALOPE",
    category: "FILMS",
    thumb: "/projects/p3.jpeg",
    href: "/contact",
    previewVideo:
      "https://res.cloudinary.com/dko1fpcic/video/upload/v1768872573/Salope2_txelgt.mp4",
  },
];

function getStillMeta(id) {
  if (id >= 1 && id <= 3)
    return {
      title: "ALTÉRER",
      role: "DOP / COLORIST",
      alt: "Altérer",
      filterCategory: "FILMS",
    };

  if (id >= 4 && id <= 6)
    return {
      title: "YOURS",
      role: "DOP / COLORIST",
      alt: "Yours",
      filterCategory: "FILMS",
    };

  if (id >= 7 && id <= 9)
    return {
      title: "HOMMAGE",
      role: "DOP / COLORIST",
      alt: "Hommage",
      filterCategory: "FILMS",
    };

  if (id >= 10 && id <= 12)
    return {
      title: "ELLE",
      role: "DOP / COLORIST",
      alt: "Elle",
      filterCategory: "FILMS",
    };

  if (id >= 13 && id <= 15)
    return {
      title: "SALOPE",
      role: "DOP / COLORIST",
      alt: "Salope",
      filterCategory: "FILMS",
    };

  if (id >= 16 && id <= 18)
    return {
      title: "AVOIR 30 ANS",
      role: "DOP / COLORIST",
      alt: "Avoir 30 ans",
      filterCategory: "FILMS",
    };

  if (id >= 19 && id <= 21)
    return {
      title: "DOCUMENTARY",
      role: "DOP / COLORIST",
      alt: "Documentary",
      filterCategory: "COMMERCIAL",
    };

  if (id >= 22 && id <= 24)
    return {
      title: "AD GURU",
      role: "FILMMAKER / EDITOR",
      alt: "Ad Guru",
      filterCategory: "COMMERCIAL",
    };

  if (id >= 25 && id <= 27)
    return {
      title: "AD CPHOUCA",
      role: "COLORIST",
      alt: "Ad Cphouca",
      filterCategory: "COMMERCIAL",
    };

  if (id >= 28 && id <= 30)
    return {
      title: "INSIDE",
      role: "COLORIST / LIGHTING",
      alt: "Inside",
      filterCategory: "MUSIC VIDEOS",
    };

  return {
    title: `STILL ${id}`,
    role: "DOP / COLORIST",
    alt: `Still ${id}`,
    filterCategory: "FILMS",
  };
}

const STILLS = Array.from({ length: 30 }).map((_, i) => {
  const id = i + 1;
  const meta = getStillMeta(id);
  return {
    id,
    src: `/stills/s${id}.jpg`,
    title: meta.title,
    role: meta.role,
    alt: meta.alt,
    filterCategory: meta.filterCategory,
  };
});

/* ===========================
   PAGE
=========================== */

export default function HomeClient() {
  const videoRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState(
    "https://res.cloudinary.com/dko1fpcic/video/upload/v1768874946/version_pc_nws1e5.mp4"
  );

  const PINNED_STILLS = [1, 2, 3];
  const [favorites, setFavorites] = useState({});

  const scrollToStills = () => {
    const el = document.getElementById("stills");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionTitle = activeFilter;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("hm_favorites") || "{}");
      setFavorites(saved && typeof saved === "object" ? saved : {});
    } catch {
      setFavorites({});
    }
  }, []);

  useEffect(() => {
    setFavorites((prev) => {
      const next = { ...prev };
      PINNED_STILLS.forEach((id) => {
        if (next[`still-${id}`] === undefined) next[`still-${id}`] = true;
      });
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hm_favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (key) => {
    setFavorites((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const pickVideo = () => {
      const isMobile = window.matchMedia("(max-width: 820px)").matches;
      setVideoSrc(
        isMobile
          ? "https://res.cloudinary.com/dko1fpcic/video/upload/v1768874946/Version_mb_1920_nlju1q.mp4"
          : "https://res.cloudinary.com/dko1fpcic/video/upload/v1768874946/version_pc_nws1e5.mp4"
      );
    };

    pickVideo();
    window.addEventListener("resize", pickVideo);
    return () => window.removeEventListener("resize", pickVideo);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.volume = 0;

    v.load();
    const p = v.play();
    if (p?.catch) p.catch(() => {});
    setIsPlaying(true);
    setVolume(0);
  }, [videoSrc]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return PROJECTS.slice(0, 12);
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const orderedStills = useMemo(() => {
    const pinned = STILLS.filter((s) => PINNED_STILLS.includes(s.id));
    const rest = STILLS.filter((s) => !PINNED_STILLS.includes(s.id));
    return [...pinned, ...rest];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredStills = useMemo(() => {
    if (activeFilter === "ALL") return orderedStills;
    return orderedStills.filter((s) => s.filterCategory === activeFilter);
  }, [activeFilter, orderedStills]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      await v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleVolume = (val) => {
    const v = videoRef.current;
    const newVol = Number(val);

    setVolume(newVol);
    if (!v) return;

    v.volume = newVol;
    v.muted = newVol === 0;
  };

  const toggleMute = () => handleVolume(volume === 0 ? 0.35 : 0);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <header className={styles.topbar}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setMenuOpen(false)}
        >
          <span className={styles.logoWrap} aria-hidden="true">
            <Image
              src="/OFF.jpeg"
              alt="OFF"
              width={32}
              height={32}
              className={styles.logoImg}
              priority
            />
          </span>

          <span className={styles.brandText}>HAMZA MEJD</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          <button
            type="button"
            className={styles.navLink}
            onClick={() => {
              setMenuOpen(false);
              scrollToStills();
            }}
          >
            Work
          </button>

          <Link className={styles.navLink} href="/about">
            About
          </Link>

          <Link
            className={`${styles.navLink} ${styles.navCta}`}
            href="/contact"
          >
            Contact
          </Link>

          <span className={styles.navGlow} aria-hidden="true" />
        </nav>

        <button
          className={styles.kebab}
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((s) => !s);
          }}
        >
          <span />
          <span />
          <span />
        </button>

        {menuOpen && (
          <div
            className={styles.mobileMenu}
            role="menu"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.mobileLink}
              onClick={() => {
                setMenuOpen(false);
                setTimeout(scrollToStills, 80);
              }}
            >
              Work
            </button>

            <Link
              className={styles.mobileLink}
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link
              className={`${styles.mobileLink} ${styles.mobileCta}`}
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <main className={styles.hero}>
        <div className={styles.filtersWrap}>
          <div className={styles.filters} role="tablist" aria-label="Project filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={activeFilter === f}
                className={`${styles.filterBtn} ${
                  activeFilter === f ? styles.filterActive : ""
                }`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          key={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className={styles.overlay} />

        <div className={styles.heroText}>
          <h1 className={styles.h1}>Hamza Mejd</h1>
          <p className={styles.sub}>Filmmaker & Director of Photography</p>

          <div className={styles.heroCtas}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={scrollToStills}
            >
              View Work
            </button>

            <Link className={styles.ghostBtn} href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            onClick={togglePlay}
            className={styles.controlBtn}
            aria-label="Play / Pause"
            type="button"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </button>

          <button
            onClick={toggleMute}
            className={styles.controlBtn}
            aria-label="Mute / Unmute"
            type="button"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
            </svg>
          </button>

          <input
            className={styles.volume}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolume(e.target.value)}
            aria-label="Volume"
          />
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span />
        </div>
      </main>

      {/* PROJECTS */}
      <section className={styles.projectsSection} aria-label="Projects">
        <div className={styles.projectsGrid}>
          {filteredProjects.map((p) => (
            <Link key={p.id} href={p.href} className={styles.projectCard}>
              <div
                className={styles.projectThumb}
                onMouseEnter={(e) => {
                  const v = e.currentTarget.querySelector("video");
                  if (!v) return;
                  v.currentTime = 0;
                  const playPromise = v.play();
                  if (playPromise?.catch) playPromise.catch(() => {});
                }}
                onMouseLeave={(e) => {
                  const v = e.currentTarget.querySelector("video");
                  if (!v) return;
                  try {
                    v.pause();
                  } catch {}
                }}
              >
                <img src={p.thumb} alt={p.title} loading="lazy" />

                <video
                  className={styles.previewVid}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                >
                  <source src={p.previewVideo} type="video/mp4" />
                </video>

                <div className={styles.cardOverlay} />

                <button
                  type="button"
                  className={styles.favBtn}
                  aria-label={
                    favorites[`project-${p.id}`]
                      ? "Remove favorite"
                      : "Add favorite"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(`project-${p.id}`);
                  }}
                >
                  {favorites[`project-${p.id}`] ? "★" : "☆"}
                </button>

                <div className={styles.cardText}>
                  <div className={styles.projectTitle}>{p.title}</div>
                  <div className={styles.projectCta}>DOP / COLORIST</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STILLS */}
      <section id="stills" className={styles.stillsSection} aria-label="Stills">
        <div className={styles.sectionHead}>
          <h2>{sectionTitle}</h2>
        </div>

        <div className={styles.stillsGrid}>
          {filteredStills.map((s) => (
            <div key={s.id} className={styles.stillCard}>
              <div className={styles.projectThumb}>
                <img src={s.src} alt={s.alt} loading="lazy" />
                <div className={styles.cardOverlay} />

                <button
                  type="button"
                  className={styles.favBtn}
                  aria-label={
                    favorites[`still-${s.id}`] ? "Remove favorite" : "Add favorite"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(`still-${s.id}`);
                  }}
                >
                  {favorites[`still-${s.id}`] ? "★" : "☆"}
                </button>

                <div className={styles.cardText}>
                  <div className={styles.projectTitle}>{s.title}</div>
                  <div className={styles.projectCta}>{s.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
