import { expect, test } from "@playwright/test";
import { build } from "esbuild";
import { runInNewContext } from "node:vm";

let handlerCode: string;
test.beforeAll(async () => {
  handlerCode = (await build({ entryPoints: ["src/app/api/contact/route.ts"], bundle: true, platform: "node", format: "cjs", write: false })).outputFiles[0].text;
});

test("configured contact handler sends the expected plain-text payload without real email", async () => {
  const calls: RequestInit[] = [];
  const sandboxModule = { exports: {} as { POST: (request: Request) => Promise<Response> } };
  runInNewContext(handlerCode, { module: sandboxModule, exports: sandboxModule.exports, process: { env: { RESEND_API_KEY: "test-only-key", CONTACT_TO_EMAIL: "owner@example.com", CONTACT_FROM_EMAIL: "portfolio@example.com" } }, URL, Response, AbortSignal, fetch: async (_url: string, init: RequestInit) => { calls.push(init); return Response.json({ id: "test-only" }); } });
  const response = await sandboxModule.exports.POST(new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "A visitor", email: "visitor@example.com", topic: "Question", message: "A test-only message about a project.", website: "" }) }));
  expect(response.status).toBe(200);
  expect(calls).toHaveLength(1);
  const payload = JSON.parse(String(calls[0].body));
  expect(payload.to).toEqual(["owner@example.com"]);
  expect(payload.reply_to).toBe("visitor@example.com");
  expect(payload.text).toContain("A test-only message");
});

test("provider failure is returned as failure rather than delivery success", async () => {
  const sandboxModule = { exports: {} as { POST: (request: Request) => Promise<Response> } };
  runInNewContext(handlerCode, { module: sandboxModule, exports: sandboxModule.exports, process: { env: { RESEND_API_KEY: "test-only-key", CONTACT_TO_EMAIL: "owner@example.com", CONTACT_FROM_EMAIL: "portfolio@example.com" } }, URL, Response, AbortSignal, fetch: async () => new Response("Unavailable", { status: 503 }) });
  const response = await sandboxModule.exports.POST(new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "A visitor", email: "visitor@example.com", topic: "Question", message: "A test-only message about a project.", website: "" }) }));
  expect(response.status).toBe(502);
});
