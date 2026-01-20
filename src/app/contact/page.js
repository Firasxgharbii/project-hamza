"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    // ✅ Petite validation front
    if (!payload.email || !payload.message) {
      setStatus({
        type: "error",
        message: "Email and message are required.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Failed to save message.");
      }

      setStatus({
        type: "success",
        message: "✅ Message saved successfully!",
      });

      form.reset();
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT */}
          <section className={styles.left}>
            <h1 className={styles.h1}>
              READY TO SHAPE YOUR STORY VISUALLY?
              <br />
              LET’S CONNECT!
            </h1>

            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <div className={styles.icon}>☎</div>
                <div className={styles.infoTitle}>+1 438 535 4855</div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.icon}>✉</div>
                <div className={styles.infoTitle}>
                  <a href="mailto:mejdhamza25@gmail.com">mejdhamza25@gmail.com</a>
                </div>
              </div>
            </div>

            <p className={styles.desc}>
              Please fill out the form below and I’ll get back to you as soon as
              possible.
            </p>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.label}>
                Name <span>*</span>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className={styles.label}>
                Email <span>*</span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                />
              </label>

              <label className={styles.label}>
                Phone
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                />
              </label>

              <label className={styles.label}>
                Message <span>*</span>
                <textarea
                  className={styles.textarea}
                  name="message"
                  placeholder="Your message"
                  required
                />
              </label>

              <button
                className={styles.button}
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Send Message"}
              </button>

              {status.message && (
                <p
                  className={styles.note}
                  style={{
                    opacity: 1,
                    color: status.type === "success" ? "#b7ffcc" : "#ffb7b7",
                  }}
                >
                  {status.message}
                </p>
              )}
            </form>
          </section>

          {/* RIGHT (PHOTO) */}
          <aside className={styles.right} aria-hidden="true">
            <div className={styles.photo} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
