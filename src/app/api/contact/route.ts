const topics = new Set(["Project idea", "Collaboration", "Question", "Just saying hello"]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required" }, { status: 415 });
  let data: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 12_000) return Response.json({ error: "Message too large" }, { status: 413 });
    const body: unknown = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    data = body as Record<string, unknown>;
  } catch { return Response.json({ error: "Invalid message" }, { status: 400 }); }
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const topic = typeof data.topic === "string" ? data.topic : "";
  if (data.website || name.length < 2 || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(name) || message.length < 10 || message.length > 5000 || !topics.has(topic)) return Response.json({ error: "Check your message fields" }, { status: 400 });
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return Response.json({ error: "Delivery is not configured" }, { status: 503 });
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Portfolio: ${topic}`, text: `From: ${name}\nReply to: ${email}\n\n${message}` }), signal: AbortSignal.timeout(10_000) });
    if (!response.ok) return Response.json({ error: "Delivery failed; please try again" }, { status: 502 });
    return Response.json({ accepted: true });
  } catch { return Response.json({ error: "Delivery is unavailable; please try again" }, { status: 502 }); }
}
