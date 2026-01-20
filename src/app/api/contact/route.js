import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Hamza Mejd <onboarding@resend.dev>",
      to: ["firassgharbi@gmail.com"], // ⬅️ TON EMAIL
      replyTo: email,
      subject: `New inquiry — ${name}`,
      html: `
        <div style="background:#0b0b0b;padding:32px;font-family:Arial">
          <div style="max-width:680px;margin:auto">
            <h2 style="color:#fff;letter-spacing:4px;font-size:12px">
              CONTACT · PORTFOLIO
            </h2>

            <h1 style="color:#fff;font-size:22px;margin-top:10px">
              New inquiry received
            </h1>

            <div style="background:#151515;border-radius:18px;padding:20px;margin-top:24px;color:#fff">
              <p><b>Name:</b><br/>${name}</p>
              <p><b>Email:</b><br/>${email}</p>
              <p><b>Phone:</b><br/>${phone || "-"}</p>

              <div style="margin-top:20px;padding:14px;border-radius:14px;background:#0b0b0b">
                ${message}
              </div>
            </div>

            <p style="margin-top:20px;color:#777;font-size:12px">
              Sent from your website contact form
            </p>
          </div>
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
