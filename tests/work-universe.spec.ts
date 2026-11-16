import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";

const sceneSelector = ".work-universe";

test("scroll, keyboard, depth slider and index travel without scrolling the document", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/work");
  const scene = page.locator(sceneSelector);
  await expect(scene).toHaveAttribute("data-enhanced", "true");
  await expect(page.getByRole("heading", { name: /Their own universe/ })).toBeVisible();
  await page.mouse.move(180, 420);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => scene.getAttribute("data-depth")).not.toBe("0");
  await scene.focus();
  await page.keyboard.press("End");
  await expect(scene).toHaveAttribute("data-depth", "3500");
  await expect(page.getByRole("link", { name: "Explore NEX Installer project" })).toBeVisible();
  await page.getByRole("slider", { name: "Universe depth" }).fill("1300");
  await expect(scene).toHaveAttribute("data-depth", "1300");
  await expect(page.getByRole("link", { name: "Explore EatWhat project" })).toBeVisible();
  const index = page.getByRole("button", { name: "Project index", exact: true });
  await index.click();
  await page.keyboard.press("Escape");
  await expect(index).toBeFocused();
  await expect(index).toHaveAttribute("aria-expanded", "false");
  await index.click();
  await page.getByRole("button", { name: "Travel to Campus Slot" }).click();
  await expect(scene).toHaveAttribute("data-depth", "2400");
  await expect(page.getByRole("link", { name: "Explore Campus Slot project" })).toBeVisible();
  expect(await page.evaluate(() => ({ y: scrollY, height: document.documentElement.scrollHeight <= innerHeight }))).toEqual({ y: 0, height: true });
  await page.getByRole("link", { name: "Explore Campus Slot project" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Campus Slot");
  await page.getByRole("link", { name: "All projects", exact: true }).click();
  await expect(scene).toHaveAttribute("data-depth", "2400");
  await page.getByRole("link", { name: "Back to earth" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  expect(errors).toEqual([]);
});

test("pause freezes the canvas and reduced motion still reaches every project", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/work");
  const scene = page.locator(sceneSelector);
  const canvas = page.locator(".universe-stars");
  await page.getByRole("button", { name: "Pause universe animation" }).click();
  await expect(scene).toHaveAttribute("data-running", "false");
  const snapshot = await canvas.evaluate(element => (element as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(150);
  expect(await canvas.evaluate(element => (element as HTMLCanvasElement).toDataURL())).toBe(snapshot);
  await page.getByRole("button", { name: "Resume universe animation" }).click();
  await expect(scene).toHaveAttribute("data-running", "true");
  await expect.poll(() => canvas.evaluate(element => (element as HTMLCanvasElement).toDataURL())).not.toBe(snapshot);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveAttribute("data-running", "false");
  for (const project of projects) {
    await page.getByRole("button", { name: "Project index", exact: true }).click();
    await page.getByRole("button", { name: `Travel to ${project.title}` }).click();
    await expect(page.getByRole("link", { name: `Explore ${project.title} project` })).toBeVisible();
    await expect(page.locator(".universe-intro")).toBeHidden();
  }
});

test("touch gestures move into the universe", async ({ page }) => {
  await page.goto("/work");
  const scene = page.locator(sceneSelector);
  await expect(scene).toHaveAttribute("data-enhanced", "true");
  await scene.evaluate(element => {
    const touch = (y: number) => new Touch({ identifier: 1, target: element, clientX: 100, clientY: y });
    element.dispatchEvent(new TouchEvent("touchstart", { touches: [touch(500)], bubbles: true }));
    element.dispatchEvent(new TouchEvent("touchmove", { touches: [touch(250)], bubbles: true, cancelable: true }));
    element.dispatchEvent(new TouchEvent("touchend", { touches: [], bubbles: true }));
  });
  await expect(scene).toHaveAttribute("data-depth", "1000");
});

test("sound is opt-in, remembered and available inside the universe", async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as typeof window & { tones: number };
    state.tones = 0;
    const create = AudioContext.prototype.createOscillator;
    AudioContext.prototype.createOscillator = function () { state.tones++; return create.call(this); };
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Enable interface sounds" })).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Enable interface sounds" }).click();
  await expect(page.getByRole("button", { name: "Mute interface sounds" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "About Me", exact: true }).hover();
  await expect.poll(() => page.evaluate(() => (window as typeof window & { tones: number }).tones)).toBeGreaterThan(0);
  await page.goto("/work");
  const mute = page.locator(sceneSelector).getByRole("button", { name: "Mute interface sounds" });
  await expect(mute).toHaveAttribute("aria-pressed", "true");
  await mute.click();
  await expect(page.locator(sceneSelector).getByRole("button", { name: "Enable interface sounds" })).toHaveAttribute("aria-pressed", "false");
  const tones = await page.evaluate(() => (window as typeof window & { tones: number }).tones);
  await page.getByRole("button", { name: "Next destination" }).hover();
  expect(await page.evaluate(() => (window as typeof window & { tones: number }).tones)).toBe(tones);
  expect(await page.evaluate(() => localStorage.getItem("portfolio-sound"))).toBe("off");
});

test("every case study remains reachable without JavaScript or Canvas", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: test.info().project.use.baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/work");
    for (const project of projects) {
      const link = page.getByRole("link", { name: `Explore ${project.title} project` });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", `/projects/${project.slug}`);
    }
    await page.getByRole("link", { name: "Explore Paddock Labs project" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Paddock Labs");
  } finally { await context.close(); }
});
