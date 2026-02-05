"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./MissionVision.module.css";

export default function MissionVision({
  imageSrc = "/about/mission.jpg",
  missionTitle = "Our Mission",
  missionText = "To create cinematic stories with a strong visual language — directing, cinematography and color.",
  visionTitle = "Our Vision",
  visionText = "To be a leader in visual storytelling, delivering premium craft, emotion, and rhythm in every project.",
}) {
  // 🔒 bloque clic droit sur toute la section (optionnel mais utile)
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    return () => document.removeEventListener("contextmenu", prevent);
  }, []);

  // 🔒 props anti-save pour l'image (drag + clic droit)
  const noSaveImgProps = {
    draggable: false,
    onContextMenu: (e) => e.preventDefault(),
    onDragStart: (e) => e.preventDefault(),
  };

  return (
    <section className={styles.section} aria-label="Mission and Vision">
      <div className={styles.inner}>
        {/* LEFT IMAGE */}
        <div className={styles.media}>
          <Image
            src={imageSrc}
            alt="Mission and vision"
            fill
            className={styles.img}
            sizes="(min-width: 1000px) 460px, 90vw"
            priority
            {...noSaveImgProps}
          />

          {/* 🔒 couche invisible au-dessus de l'image */}
          <div
            className={styles.noSaveLayer}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles.content}>
          <div className={styles.block}>
            <div className={styles.icon} aria-hidden="true">
              {/* target icon */}
              <svg viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2zm7.5 6.5-1.4 1.4-2.1-2.1 1.4-1.4 2.1 2.1zM12 7a5 5 0 1 0 5 5h-2a3 3 0 1 1-3-3V7zm8-1h2v4h-2V6z" />
              </svg>
            </div>

            <div className={styles.text}>
              <h3 className={styles.title}>{missionTitle}</h3>
              <p className={styles.p}>{missionText}</p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <div className={styles.icon} aria-hidden="true">
              {/* chart icon */}
              <svg viewBox="0 0 24 24">
                <path d="M4 19h16v2H2V3h2v16zm4-2H6v-6h2v6zm5 0h-2V7h2v10zm5 0h-2V11h2v6z" />
              </svg>
            </div>

            <div className={styles.text}>
              <h3 className={styles.title}>{visionTitle}</h3>
              <p className={styles.p}>{visionText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
