import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const message = String(body?.message || "").trim();

    if (!email || !message) {
      return Response.json(
        { success: false, error: "Email et message sont obligatoires." },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO_EMAIL;
    const FROM = process.env.MAIL_FROM;

    if (!RESEND_API_KEY || !TO || !FROM) {
      return Response.json(
        {
          success: false,
          error:
            "Variables manquantes: RESEND_API_KEY / CONTACT_TO_EMAIL / MAIL_FROM",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject = `Nouveau message (hamzamejd.com) — ${name || "Sans nom"}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Nouveau message via hamzamejd.com</h2>
        <p><b>Nom:</b> ${escapeHtml(name || "-")}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Téléphone:</b> ${escapeHtml(phone || "-")}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(
          message
        )}</pre>
      </div>
    `;

    // ✅ IMPORTANT: Resend retourne { data, error }
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return Response.json(
        { success: false, error: error.message || "Resend error" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("API /contact error:", err);
    return Response.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
