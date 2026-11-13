import { expect, test } from "@playwright/test";

test("foundation renders honestly and fits the viewport", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Sanupa Gunarathne/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("feel different");
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(7);
  await expect(page.getByRole("img", { name: /Placeholder reserved/ })).toBeVisible();
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("navigation", { name: "Social links" })).toBeVisible();
  await expect(footer.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/sanupagunarathne");
  await expect(page.getByRole("link", { name: "Explore My Work" })).toHaveAttribute("href", "#work");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("navigation works with keyboard and mobile disclosure", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  if (isMobile) {
    const toggle = page.getByRole("button", { name: /menu$/ });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page.locator("#mobile-navigation").getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.locator("#about")).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  } else {
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/#work$/);
  }
});

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});


test("homepage content and typography experiment work", async ({ page }) => {
  await page.goto("/");
  for (const id of ["hero", "work", "about", "expertise", "journey", "playground", "beyond", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole("heading", { name: "Paddock Labs", exact: true })).toBeVisible();
  await expect(page.locator(".project-entry")).toHaveCount(4);
  await expect(page.locator(".journey-list > li")).toHaveCount(3);
  await expect(page.locator(".interests-gallery figure")).toHaveCount(4);
  await page.getByLabel("A thought, in dots.").fill("build with care");
  await expect(page.locator(".type-preview")).toHaveText("build with care");
  await page.getByRole("slider", { name: "Font weight" }).fill("900");
  await expect(page.locator(".type-preview")).toHaveCSS("font-weight", "900");
  for (const group of await page.locator(".technology-group").all()) await group.scrollIntoViewIfNeeded();
  await expect.poll(async () => page.locator("img").evaluateAll(images =>
    (images as HTMLImageElement[]).filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src)
  )).toEqual([]);
});
