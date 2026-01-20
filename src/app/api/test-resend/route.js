import { Resend } from "resend";

export const runtime = "nodejs";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const data = await resend.emails.send({
    from: "contact@hamzamejd.com",
    to: "mejdhamza25@gmail.com",
    subject: "TEST RESEND OK",
    html: "<strong>Si tu reçois ceci, Resend fonctionne.</strong>",
  });

  return Response.json({ ok: true, data });
}
