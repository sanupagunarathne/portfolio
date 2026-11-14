import { expect, test } from "@playwright/test";
import { build } from "esbuild";
import { runInNewContext } from "node:vm";

async function load(entry: string, env: Record<string, string>) {
  const code = (await build({ entryPoints: [entry], bundle: true, write: false, platform: "node", format: "cjs" })).outputFiles[0].text;
  const sandboxModule = { exports: {} as { default: () => unknown; getSiteOrigin: () => URL | null } };
  runInNewContext(code, { module: sandboxModule, exports: sandboxModule.exports, process: { env }, URL });
  return sandboxModule.exports;
}

test("public origin gates production sitemap, robots and preview indexing", async () => {
  const configured = { SITE_URL: "https://portfolio.example", VERCEL_ENV: "production" };
  const map = (await load("src/app/sitemap.ts", configured)).default() as { url: string }[];
  expect(map.map(entry => entry.url)).toEqual(["https://portfolio.example/", ...["paddock-labs", "eatwhat", "campus-slot", "nex-installer"].map(slug => `https://portfolio.example/projects/${slug}`)]);
  expect((await load("src/app/robots.ts", configured)).default()).toMatchObject({ sitemap: "https://portfolio.example/sitemap.xml", rules: { allow: "/", disallow: "/api/" } });
  for (const env of [{}, { ...configured, VERCEL_ENV: "preview" }]) {
    expect((await load("src/app/sitemap.ts", env)).default()).toHaveLength(0);
    expect((await load("src/app/robots.ts", env)).default()).toMatchObject({ rules: { disallow: "/" } });
  }
  for (const url of ["http://portfolio.example", "https://user:password@portfolio.example", "https://portfolio.example/path", "https://portfolio.example?query=true", "https://localhost"]) {
    const site = await load("src/lib/site.ts", { SITE_URL: url });
    expect(() => site.getSiteOrigin()).toThrow();
  }
});
