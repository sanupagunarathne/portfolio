import { expect, test } from "@playwright/test";

test("all navigation destinations exist and active section is highlighted", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.locator("header .wordmark")).toHaveText("Sanupa Gunarathne");
  await expect(page.locator("footer .wordmark")).toHaveText("Sanupa Gunarathne");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  const nav = isMobile ? page.locator("#mobile-navigation") : page.locator(".desktop-links");
  for (const link of await nav.getByRole("link").all()) {
    const href = await link.getAttribute("href");
    await expect(page.locator(href!)).toHaveCount(1);
  }
  await nav.getByRole("link", { name: "Technologies", exact: true }).click();
  await expect(page).toHaveURL(/#expertise$/);
  // The sticky header sits above the section; allow smooth scrolling to settle.
  if (isMobile) {
    // Tap the sticky menu at its visible position. Locator.click() calls
    // scrollIntoView, which can move sticky descendants in Chromium mobile.
    const toggle = page.getByRole("button", { name: "Open menu" });
    const bounds = await toggle.boundingBox();
    if (!bounds) throw new Error("Mobile menu is not visible");
    await page.touchscreen.tap(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  }
  await expect(nav.getByRole("link", { name: "Technologies", exact: true })).toHaveAttribute("aria-current", "location");
});

test("contact validates, prepares and downloads a draft without claiming delivery", async ({ page }) => {
  await page.goto("/#contact");
  const form = page.locator(".contact-form");
  await form.getByRole("button", { name: "Prepare message" }).click();
  await expect(form.getByLabel("Your name")).toBeFocused();
  await form.getByLabel("Your name").fill("Alex Example");
  await form.getByLabel("Email address").fill("alex@example.com");
  await form.getByLabel("What's on your mind?").selectOption("Collaboration");
  await form.getByLabel("Your message").fill("I'd like to discuss a creative website collaboration.");
  await form.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.getByRole("status")).toContainText("No message has been sent");
  await expect(page.locator(".message-preview")).toContainText("Alex Example <alex@example.com>");
  await expect(page.locator(".message-preview")).toContainText("Subject: Collaboration");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download draft" }).click();
  expect((await download).suggestedFilename()).toBe("message-for-sanupa.txt");
  await form.getByLabel("Your message").fill("A revised message, so the old draft must be hidden.");
  await expect(page.locator(".message-preview")).toHaveCount(0);
});

test("technology filters, selection, local logos and motion controls work", async ({ page }) => {
  await page.goto("/#expertise");
  const categories = page.getByRole("group", { name: "Technology categories" });
  const logos = page.getByRole("group", { name: "Select a technology" });
  await expect(logos.getByRole("button")).toHaveCount(15);
  await categories.getByRole("button", { name: "Libraries", exact: true }).click();
  await expect(logos.getByRole("button")).toHaveCount(2);
  await logos.getByRole("button", { name: "Three.js", exact: true }).click();
  await expect(page.locator("#technology-details").getByRole("heading", { name: "Three.js", exact: true })).toBeVisible();
  await expect(logos.getByRole("button", { name: "Three.js", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Pause floating" }).click();
  await expect(page.locator(".constellation")).toHaveClass(/is-paused/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await logos.locator(".logo-surface").first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  const images = await logos.locator("img").evaluateAll((items) => items.every((item) => (item as HTMLImageElement).complete && (item as HTMLImageElement).naturalWidth > 0));
  expect(images).toBe(true);
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await expect(page.getByRole("button", { name: "Use 2D view" })).toBeVisible();
  await expect(logos.getByRole("button", { name: "Three.js", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Use 2D view" }).click();
  await expect(page.locator(".technology-canvas")).toHaveCount(0);
});

test("narrow layouts keep the full page within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator("header .wordmark")).toBeVisible();
});
