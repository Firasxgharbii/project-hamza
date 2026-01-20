import mysql from "mysql2/promise";

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

    // ✅ Variables BD (Vercel / .env.local)
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    if (!DB_HOST || !DB_USER || !DB_NAME) {
      return Response.json(
        { success: false, error: "Variables BD manquantes: DB_HOST / DB_USER / DB_NAME" },
        { status: 500 }
      );
    }

    // ✅ Connexion BD
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    // ✅ IP & User-Agent (utile pour logs / spam)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;

    const userAgent = req.headers.get("user-agent") || null;

    // ✅ Insert dans la table
    const [result] = await connection.execute(
      `
      INSERT INTO contact_messages (name, email, phone, message, ip, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [name || null, email, phone || null, message, ip, userAgent]
    );

    await connection.end();

    return Response.json(
      { success: true, id: result?.insertId },
      { status: 200 }
    );
  } catch (err) {
    console.error("API /contact error:", err);
    return Response.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
