import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    // ✅ Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // ✅ Envoi email avec Resend
    await resend.emails.send({
      from: "Hamza Mejd <onboarding@resend.dev>", // OK pour test
      to: ["mejdhamza25@gmail.com"],               // 👉 TON EMAIL
      replyTo: email,
      subject: `New contact message — ${name}`,
      html: `
        <div style="font-family:Arial;background:#0b0b0b;padding:30px;color:#fff">
          <h2>New contact message</h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "-"}</p>

          <div style="margin-top:20px;padding:15px;background:#151515;border-radius:10px">
            ${message}
          </div>

          <p style="margin-top:30px;font-size:12px;color:#999">
            Sent from hamzamejd.com contact form
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
