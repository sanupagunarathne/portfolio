import { expect, test } from "@playwright/test";

test("free drift moves visuals on both axes while click targets stay still; pause freezes and resume continues", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const cosmos = page.locator(".technology-cosmos");
  const java = cosmos.getByRole("button", { name: "Java", exact: true });
  await java.scrollIntoViewIfNeeded();
  const token = java.locator(".technology-token");
  if (isMobile) {
    await expect(cosmos).toHaveAttribute("data-floating", "paused");
    await expect(token).toHaveCSS("transform", "none");
    await java.tap();
    await expect(page.getByRole("region", { name: "Technology details" }).getByRole("heading", { name: "Java", exact: true })).toBeVisible();
    return;
  }
  await expect(cosmos).toHaveAttribute("data-floating", "running");
  const position = () => token.evaluate(el => {
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { x: m.m41, y: m.m42 };
  });
  const start = await position();
  // Measure within the field so native page scrolling cannot affect the result.
  const targetBox = () => java.evaluate(el => {
    const rect = el.getBoundingClientRect();
    const field = el.closest(".technology-cosmos")!.getBoundingClientRect();
    return { x: rect.x - field.x, y: rect.y - field.y, width: rect.width, height: rect.height };
  });
  const buttonStart = await targetBox();
  await expect.poll(async () => {
    const now = await position();
    return Math.abs(now.x - start.x) > .2 && Math.abs(now.y - start.y) > .2;
  }).toBe(true);
  expect(await targetBox()).toEqual(buttonStart);
  // Hovering the constellation must not freeze the whole field.
  await java.hover();
  await expect(cosmos).toHaveAttribute("data-floating", "running");
  await java.click();
  await expect(java).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Pause floating" }).click();
  await expect(cosmos).toHaveAttribute("data-floating", "paused");
  const frozen = await token.evaluate(el => el.style.transform);
  await page.waitForTimeout(250);
  expect(await token.evaluate(el => el.style.transform)).toBe(frozen);
  await page.getByRole("button", { name: "Resume floating" }).click();
  await expect(cosmos).toHaveAttribute("data-floating", "running");
  await expect.poll(() => token.evaluate(el => el.style.transform)).not.toBe(frozen);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(cosmos).toHaveAttribute("data-floating", "paused");
  const offscreen = await token.evaluate(el => el.style.transform);
  await page.waitForTimeout(200);
  expect(await token.evaluate(el => el.style.transform)).toBe(offscreen);
  await java.scrollIntoViewIfNeeded();
  await expect(cosmos).toHaveAttribute("data-floating", "running");
  await page.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, value: true }); document.dispatchEvent(new Event("visibilitychange")); });
  await expect(cosmos).toHaveAttribute("data-floating", "paused");
  const background = await token.evaluate(el => el.style.transform);
  await page.waitForTimeout(200);
  expect(await token.evaluate(el => el.style.transform)).toBe(background);
  await page.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, value: false }); document.dispatchEvent(new Event("visibilitychange")); });
  await expect(cosmos).toHaveAttribute("data-floating", "running");
});

test("changing motion preference stops drift immediately and category selection remains usable", async ({ page }) => {
  await page.goto("/");
  const java = page.locator(".technology-cosmos").getByRole("button", { name: "Java", exact: true });
  await java.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".technology-cosmos")).toHaveAttribute("data-floating", "paused");
  await expect(java.locator(".technology-token")).toHaveCSS("transform", "none");
  await page.getByRole("group", { name: "Technology category" }).getByRole("button", { name: "Frontend", exact: true }).click();
  const react = page.locator(".technology-cosmos").getByRole("button", { name: "React", exact: true });
  await react.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("region", { name: "Technology details" }).getByRole("heading", { name: "React", exact: true })).toBeVisible();
  await expect(react.locator(".technology-token")).toHaveCSS("transform", "none");
});

test("playground supports keyboard movement, touch activation and reset", async ({ page }) => {
  await page.goto("/");
  const study = page.getByRole("button", { name: /Geometric composition/ });
  await study.scrollIntoViewIfNeeded();
  await study.focus();
  await page.keyboard.press("ArrowRight");
  expect(await study.evaluate(el => el.style.getPropertyValue("--study-x"))).toBe("6px");
  await page.keyboard.press("Enter");
  await expect(study).toHaveClass(/is-turned/);
  await page.keyboard.press("Escape");
  await expect(study).not.toHaveClass(/is-turned/);
  expect(await study.evaluate(el => el.style.getPropertyValue("--study-x"))).toBe("0px");
  await study.click();
  await expect(study).toHaveClass(/is-turned/);
  await page.getByRole("button", { name: "Reset shapes" }).click();
  await expect(study).not.toHaveClass(/is-turned/);
});

test("animated layouts fit small phones through desktop", async ({ page }, testInfo) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator(".technology-cosmos").scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390 || width === 1440) await page.screenshot({ path: testInfo.outputPath(`expertise-${width}.png`) });
  }
});
