import { expect, test } from "@playwright/test";
import { aboutParagraphs } from "../src/data/about";

test("About types, holds for five seconds, fades and advances", async ({ page }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const loop = page.getByRole("region", { name: "About Sanupa paragraphs" });
  await loop.scrollIntoViewIfNeeded();
  await expect(loop).toHaveAttribute("data-running", "true");
  expect(aboutParagraphs).toHaveLength(12);
  await page.clock.pauseAt(new Date(Date.now() + 1000));
  await loop.getByRole("button", { name: "Next About paragraph" }).click();
  await loop.getByRole("button", { name: "Previous About paragraph" }).click();
  await page.clock.runFor([...aboutParagraphs[0]].length * 35 + 20);
  await expect(loop).toHaveAttribute("data-phase", "holding");
  await page.clock.runFor(4900);
  await expect(loop).toHaveAttribute("data-phase", "holding");
  await page.clock.runFor(100);
  await expect(loop).toHaveAttribute("data-phase", "out");
  await expect(loop.locator(".about-paragraph")).toHaveCSS("animation-name", "about-fade-out");
  await page.clock.runFor(450);
  await expect(loop.locator(".about-loop-controls span")).toHaveText("2 / 12");
  await loop.getByRole("button", { name: "Pause About loop" }).click();
  await page.clock.runFor(30_000);
  await expect(loop.locator(".about-loop-controls span")).toHaveText("2 / 12");
});

test("reduced motion stays still and manual navigation wraps", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const loop = page.getByRole("region", { name: "About Sanupa paragraphs" });
  await loop.scrollIntoViewIfNeeded();
  await expect(loop).toHaveAttribute("data-running", "false");
  await loop.getByRole("button", { name: "Previous About paragraph" }).click();
  await expect(loop.locator(".about-loop-controls span")).toHaveText("12 / 12");
  await loop.getByRole("button", { name: "Next About paragraph" }).click();
  await expect(loop.locator(".about-loop-controls span")).toHaveText("1 / 12");
  await expect(loop.locator(".type-character").first()).toHaveCSS("animation-name", "none");
});
