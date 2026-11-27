import { expect, test } from "@playwright/test";

test("compact dock stays centered and whole pages fade on navigation", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({width, height:900});
    const box = (await page.locator(".compact-dock").boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(352);
    expect(Math.abs(box.x + box.width / 2 - width / 2)).toBeLessThan(1);
  }
  await expect(page.locator(".page-fade")).toHaveCSS("animation-name", "page-arrive");
  await page.getByRole("button", {name:"Open menu"}).click();
  await page.locator("#dock-navigation").getByRole("link", {name:"Journey",exact:true}).click();
  await expect(page.locator(".dock-current")).toHaveText("Home");
  await expect(page.locator(".page-fade")).toHaveCSS("animation-name", "page-arrive");
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(page.locator(".page-fade")).toHaveCSS("animation-name", "none");
});

test("bubble icons move freely and pause at their current position", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/expertise");
  const field = page.locator(".technology-cosmos");
  await field.scrollIntoViewIfNeeded();
  await expect(field).toHaveAttribute("data-running", "true");
  const bubble = page.locator(".technology-group li").first();
  const start = await bubble.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => bubble.evaluate(element => getComputedStyle(element).transform)).not.toBe(start);
  await page.getByRole("button", { name: "Pause floating icons" }).click();
  await expect(field).toHaveAttribute("data-running", "false");
  const stopped = await bubble.evaluate(element => getComputedStyle(element).transform);
  await page.waitForTimeout(200);
  expect(await bubble.evaluate(element => getComputedStyle(element).transform)).toBe(stopped);
  await page.getByRole("button", { name: "Resume floating icons" }).click();
  // The resume control may scroll the tall field out of view; motion is intentionally suspended there.
  await field.scrollIntoViewIfNeeded();
  await expect(field).toHaveAttribute("data-running", "true");
});

test("details, milestones, status and tap-driven playground have motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/expertise");
  await page.getByRole("button", { name: "Pause floating icons" }).click();
  await page.locator(".technology-group").getByRole("button", { name: "Java", exact: true }).click();
  await expect(page.locator(".skill-content")).toHaveCSS("animation-name", "content-in");
  await page.goto("/journey");
  const milestone = page.getByRole("button", { name: /Maliyadeva College/ });
  await milestone.click();
  await expect(page.locator("#milestone-school")).toHaveAttribute("data-expanded", "true");
  await expect(page.locator("#milestone-school")).toHaveCSS("transition-duration", "0.35s, 0.3s, 0.35s");
  await page.goto("/playground");
  const shapes = page.getByRole("button", { name: "Rearrange geometric composition" });
  await shapes.click();
  await expect(shapes).toHaveAttribute("aria-pressed", "true");
  await shapes.focus(); await page.keyboard.press("Enter");
  await expect(shapes).toHaveAttribute("aria-pressed", "false");
  await page.goto("/contact");
  await page.locator("#contact-name").fill("A visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("A valid message to prepare without sending.");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.locator(".form-status")).toHaveCSS("animation-name", "content-in");
});
