"use client";

import { useEffect } from "react";
import styles from "./WorkGrid.module.css";

const WORKS = [
  {
    id: "sting",
    category: "commercial",
    title: "STING ENERGY PIGEON",
    image: "/works/sting.jpg",
    badge: "",
  },
  {
    id: "inwi",
    category: "commercial",
    title: "INWI X ACHRAF HAKIMI",
    image: "/works/inwi.jpg",
    badge: "VIEW PROJECT",
  },
  {
    id: "coca",
    category: "commercial",
    title: "COCA COLA – MANAL BERRED SAYFEK",
    image: "/works/coca.jpg",
    badge: "",
  },
];

const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "commercial", label: "COMMERCIAL" },
  { key: "music", label: "MUSIC" },
  { key: "institutional", label: "INSTITUTIONAL" },
];

export default function WorkGrid() {

  /* 🔒 Bloque clic droit sur cette section */
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    return () => document.removeEventListener("contextmenu", prevent);
  }, []);

  return (
    <section className={styles.wrap}>
      {/* Filters */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`${styles.filterBtn} ${
              f.key === "all" ? styles.active : ""
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {WORKS.map((w) => (
          <article key={w.id} className={styles.card}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url("${w.image}")` }}
            >
              {/* 🔒 couche invisible anti-save */}
              <div className={styles.noSaveLayer} />

              {/* Title */}
              <div className={styles.cardTitle}>{w.title}</div>

              {/* Badge */}
              {w.badge && <div className={styles.badge}>{w.badge}</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
