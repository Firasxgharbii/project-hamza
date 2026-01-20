"use client";

import styles from "./WorkGrid.module.css";

const WORKS = [
  {
    id: "sting",
    category: "commercial",
    title: "STING ENERGY PIGEON",
    image: "/works/sting.jpg", // ✅ mets l'image dans /public/works/sting.jpg
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
  // Ajoute d’autres items ici...
];

const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "commercial", label: "COMMERCIAL" },
  { key: "music", label: "MUSIC" },
  { key: "institutional", label: "INSTITUTIONAL" },
];

export default function WorkGrid() {
  // 🔹 Version UI simple (pas de filtre JS pour l’instant)
  // Si tu veux filtrer après, je te le fais.
  return (
    <section className={styles.wrap}>
      {/* Top filters */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`${styles.filterBtn} ${f.key === "all" ? styles.active : ""}`}
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
              {/* Overlay title */}
              <div className={styles.cardTitle}>{w.title}</div>

              {/* Small badge (ex: VIEW PROJECT) */}
              {w.badge ? <div className={styles.badge}>{w.badge}</div> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
