import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const paths = ["/", "/projects/paddock-labs", "/projects/eatwhat", "/projects/campus-slot", "/projects/nex-installer"];

for (const path of paths) {
  test(`WCAG accessibility audit: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(audit.violations).toEqual([]);
  });
}

test("responsive routes, local links, anchors and media remain intact", async ({ page }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of paths) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!).filter(href => href === "#" || !document.getElementById(decodeURIComponent(href.slice(1)))));
    expect(broken, `${path} fragment links`).toEqual([]);
    const local = await page.locator('a[href^="/"]').evaluateAll(links => links.map(link => new URL(link.getAttribute("href")!, location.href).pathname));
    expect(local.filter(target => !paths.includes(target)), `${path} local routes`).toEqual([]);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`).toBe(true);
      await expect(page.getByRole("link", { name: "Sanupa Gunarathne home" })).toBeVisible();
    }
  }
});

test("unconfigured origin avoids fabricated canonical URLs and indexing", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("<loc>");
});

test("floating icons can be paused independently of system preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: "Pause floating icons" }).click();
  await expect(page.getByRole("button", { name: "Resume floating icons" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".technology-cosmos img").first()).toHaveCSS("animation-name", "none");
});

test("expanded technology and hovered actions retain accessible semantics and contrast", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".technology-group").getByRole("button", { name: "Java", exact: true }).click();
  await page.getByRole("link", { name: "Explore My Work" }).hover();
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(audit.violations).toEqual([]);
});
