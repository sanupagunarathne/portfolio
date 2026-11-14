// Explicit public origin only: never infer a canonical domain from request headers.
export function getSiteOrigin(): URL | null {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return null;
  const configured = process.env.SITE_URL?.trim();
  if (!configured) return null;
  const url = new URL(configured);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    throw new Error("SITE_URL must be the public HTTPS origin, without credentials, path, query or fragment.");
  }
  return url;
}
