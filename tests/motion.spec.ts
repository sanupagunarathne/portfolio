import { expect, test } from "@playwright/test";

test("hero words stagger, section content reveals, and reduced motion stays static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const words = page.locator(".hero-word");
  expect(await words.count()).toBeGreaterThan(4);
  const delays = await words.evaluateAll(elements => elements.map(element => parseFloat(getComputedStyle(element).animationDelay)));
  expect(delays.every((delay, index) => index === 0 || delay > delays[index - 1])).toBe(true);
  await expect(page.locator(".portrait-composition")).toHaveCSS("animation-name", "portrait-in");
  await page.locator(".journey-list").scrollIntoViewIfNeeded();
  await expect(page.locator(".journey-list")).toHaveAttribute("data-revealed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(words.first()).toHaveCSS("animation-name", "none");
  await expect(page.locator(".portrait-composition")).toHaveCSS("animation-name", "none");
  expect(await page.locator(".journey-list").evaluate(element => element.getAnimations().filter(animation => animation.playState === "running").length)).toBe(0);
});

test("navigation is centered with equal padding and a moving active marker", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const links = page.locator("#mobile-navigation a");
    const delays = await links.evaluateAll(elements => elements.map(element => parseFloat(getComputedStyle(element).animationDelay)));
    expect(delays[7]).toBeGreaterThan(delays[0]);
    return;
  }
  for (const width of [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const geometry = await page.locator(".desktop-links").evaluate(element => {
      const bounds = element.getBoundingClientRect();
      return { center: bounds.x + bounds.width / 2, padding: [...element.querySelectorAll("a")].map(link => [getComputedStyle(link).paddingLeft, getComputedStyle(link).paddingRight]) };
    });
    expect(Math.abs(geometry.center - width / 2)).toBeLessThan(1);
    expect(new Set(geometry.padding.flat()).size).toBe(1);
  }
  const marker = page.locator(".nav-indicator");
  await expect(marker).toHaveCSS("opacity", "1");
  const start = (await marker.boundingBox())!.x;
  await page.locator(".desktop-links").getByRole("link", { name: "Journey", exact: true }).click();
  await expect.poll(async () => (await marker.boundingBox())!.x).toBeGreaterThan(start + 100);
  await expect.poll(async () => {
    const a = await page.locator('.desktop-links a[aria-current="location"]').boundingBox();
    const b = await marker.boundingBox();
    return Math.abs(a!.x - b!.x);
  }).toBeLessThan(1);
});

test("logos drift in independent directions and the explicit pause stops them", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const vectors = await page.locator(".technology-group").first().locator("button img").evaluateAll(images => images.slice(0, 2).map(image => {
    const animation = image.getAnimations()[0];
    animation.pause();
    const duration = Number(animation.effect!.getTiming().duration);
    animation.currentTime = duration / 2;
    const matrix = new DOMMatrix(getComputedStyle(image).transform);
    return { x: matrix.m41, y: matrix.m42 };
  }));
  expect(vectors[0].x * vectors[1].x).toBeLessThan(0);
  expect(vectors[0].y * vectors[1].y).toBeLessThan(0);
  await page.getByRole("button", { name: "Pause floating icons" }).click();
  await expect(page.locator(".technology-cosmos img").first()).toHaveCSS("animation-name", "none");
  await page.getByRole("button", { name: "Resume floating icons" }).click();
  await expect(page.locator(".technology-cosmos img").first()).toHaveCSS("animation-name", "token-drift");
});

test("details, milestones, status and tap-driven playground have motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator(".technology-group").getByRole("button", { name: "Java", exact: true }).click();
  await expect(page.locator(".skill-content")).toHaveCSS("animation-name", "content-in");
  const milestone = page.getByRole("button", { name: /Maliyadeva College/ });
  await milestone.click();
  await expect(page.locator("#milestone-school")).toHaveAttribute("data-expanded", "true");
  await expect(page.locator("#milestone-school")).toHaveCSS("transition-duration", "0.35s, 0.3s, 0.35s");
  const shapes = page.getByRole("button", { name: "Rearrange geometric composition" });
  await shapes.click();
  await expect(shapes).toHaveAttribute("aria-pressed", "true");
  await shapes.focus(); await page.keyboard.press("Enter");
  await expect(shapes).toHaveAttribute("aria-pressed", "false");
  await page.locator("#contact-name").fill("A visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("A valid message to prepare without sending.");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.locator(".form-status")).toHaveCSS("animation-name", "content-in");
});
