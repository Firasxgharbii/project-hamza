import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.CONTACT_TO_EMAIL,
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

            <a href="mailto:${email}"
              style="display:inline-block;margin-top:20px;
              padding:12px 16px;background:#fff;color:#000;
              text-decoration:none;border-radius:12px;
              font-weight:800;letter-spacing:2px">
              REPLY TO CLIENT
            </a>
          </div>

          <p style="margin-top:20px;color:#777;font-size:12px">
            Sent from your website contact form
          </p>
        </div>
      </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
