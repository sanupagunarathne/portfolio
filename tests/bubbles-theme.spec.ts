import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("bubble field bounds, accessible selection and reduced-motion fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const field = page.locator(".technology-cosmos");
  await field.scrollIntoViewIfNeeded();
  await expect(field).toHaveAttribute("data-bubble-ready", "true");
  await page.getByRole("button", { name: "Pause floating icons" }).click();
  await expect(field).toHaveAttribute("data-running", "false");
  const outside = await field.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    return [...element.querySelectorAll("li")].filter(bubble => { const rect = bubble.getBoundingClientRect(); return rect.left < bounds.left || rect.top < bounds.top || rect.right > bounds.right || rect.bottom > bounds.bottom; }).length;
  });
  expect(outside).toBe(0);
  const java = page.locator(".technology-group").getByRole("button", { name: "Java", exact: true });
  await java.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("region", { name: "Technology details" }).getByRole("heading", { name: "Java", exact: true })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(field).toHaveAttribute("data-bubble-ready", "false");
});

test("dark theme persists, is accessible and can return to light", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(audit.violations).toEqual([]);
  await page.reload();
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toHaveAttribute("aria-pressed", "true");
  await page.goto("/projects/nex-installer");
  const nested = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(nested.violations).toEqual([]);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("case-study sidebar clears header and phrases type on entry", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator("#about-title").scrollIntoViewIfNeeded();
  await expect(page.locator("#about-title")).toHaveAttribute("data-typed", "true");
  await expect(page.locator("#about-title .type-character").first()).toHaveCSS("animation-name", "character-in");
  await page.goto("/projects/nex-installer#stack");
  if (!isMobile) {
    await page.locator("#stack").scrollIntoViewIfNeeded();
    await expect.poll(async () => page.locator(".case-contents").evaluate(element => element.getBoundingClientRect().top - document.querySelector(".site-header")!.getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(20);
    await expect.poll(async () => page.locator(".case-contents").evaluate(element => element.getBoundingClientRect().top - document.querySelector(".site-header")!.getBoundingClientRect().bottom)).toBeLessThanOrEqual(26);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
