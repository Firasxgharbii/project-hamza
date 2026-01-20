"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./about.module.css";
import Footer from "../components/Footer";

export default function AboutPage() {
  const [videoSrc, setVideoSrc] = useState("https://res.cloudinary.com/dko1fpcic/video/upload/v1768872837/Aboutme2_fsgpqw.mp4");

  useEffect(() => {
    const pickVideo = () => {
      const isMobile = window.matchMedia("(max-width: 1000px)").matches;
      setVideoSrc(isMobile ? "https://res.cloudinary.com/dko1fpcic/video/upload/v1768872795/Aboutmobile_g4gwhv.mp4" : "https://res.cloudinary.com/dko1fpcic/video/upload/v1768872837/Aboutme2_fsgpqw.mp4");
    };

    pickVideo();
    window.addEventListener("resize", pickVideo);
    return () => window.removeEventListener("resize", pickVideo);
  }, []);

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandDot} />
          <span className={styles.brandText}>HAMZA MEJD</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/#services" className={styles.navLink}>WORK</Link>
          <Link href="/about" className={`${styles.navLink} ${styles.navActive}`}>ABOUT</Link>
          <Link href="/contact" className={`${styles.navLink} ${styles.navCta}`}>CONTACT</Link>
          <span className={styles.navGlow} />
        </nav>
      </header>

      {/* HERO */}
      <main className={styles.hero}>
        {/* VIDEO */}
        <div className={styles.rightMedia} aria-hidden>
          <video
            key={videoSrc}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className={styles.videoFade} />
        </div>

        {/* OVERLAY */}
        <div className={styles.leftOverlay} />

        {/* CONTENT */}
        <section className={styles.content}>
          <div className={styles.panel}>
            <p className={styles.kicker}>ABOUT</p>
            <h1 className={styles.h1}>Hamza Mejd</h1>
            <p className={styles.role}>Filmmaker & Director of Photography</p>

            <div className={styles.copy}>
              <p>
                 Hamza Mejd is a filmmaker based in Canada, working as both a director and cinematographer across narrative, commercial, and branded projects.              </p>

              <p>
He began his journey in filmmaking at an early age in Casablanca, Morocco, where directing and working with the camera developed side by side through hands-on practice.
He later pursued professional film training in Morocco and Canada, building a strong foundation in directing, cinematography, mise-en-scène, and on-set workflow.              </p>

              <p>
His work is driven by a unified approach to storytelling, where direction and image are conceived as a single creative language. A filmmaker with a unified approach to directing, cinematography, editing, and color grading, he develops performance, framing, color, and movement together to maintain a cohesive visual and narrative vision.              </p>

              <p>
                He uses mise-en-scène and cinematography as narrative tools to convey emotion and meaning, shaping stories through visual rhythm and cinematic composition. Hamza collaborates closely with creative teams to bring projects from concept to screen, crafting films where storytelling, direction, and image exist as one.
              </p>
            </div>

            

            <div className={styles.divider} />

            <div className={styles.footerRow}>
          

              <div>
                <div className={styles.phone}>+1 (438) 535-4855</div>
                <a className={styles.email} href="mailto:hamzamejd@gmail.com">
                  mejdhamza25@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
