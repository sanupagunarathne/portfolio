import { expect, test } from "@playwright/test";

declare global { interface Window { sceneDraws: number } }

// Exercise the GPU path with Chromium's software renderer on machines without a GPU.
test.use({ launchOptions: {
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
} });

test("reduced motion keeps a static sculpture and the toolkit functional", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const sculpture = page.getByRole("group", { name: "Retro computer", exact: true });
  await sculpture.scrollIntoViewIfNeeded();
  await expect(sculpture.getByRole("img", { name: /Static retro/ })).toBeVisible();
  await expect(sculpture.locator("canvas")).toHaveCount(0);
  await expect(sculpture.getByRole("status")).toContainText("Reduced motion");
  await page.locator(".technology-group").getByRole("button", { name: "Java", exact: true }).click();
  await expect(page.getByRole("region", { name: "Technology details" }).getByRole("heading", { name: "Java", exact: true })).toBeVisible();
});

test("unavailable WebGL falls back without disabling the toolkit", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).startsWith("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const sculpture = page.getByRole("group", { name: "Retro computer", exact: true });
  await sculpture.scrollIntoViewIfNeeded();
  await expect(sculpture.getByRole("status")).toContainText("unavailable");
  await expect(sculpture.locator("canvas")).toHaveCount(0);
  await expect(sculpture.getByRole("img", { name: /Static retro/ })).toBeVisible();
  await page.getByRole("button", { name: "Pause floating icons" }).click();
  await page.locator(".technology-group").getByRole("button", { name: "React", exact: true }).click();
  await expect(page.getByRole("region", { name: "Technology details" }).getByRole("heading", { name: "React", exact: true })).toBeVisible();
});

test("3D loads near the viewport, rotates, pauses, resets and recovers from context loss", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  // Track real renderer draws, so a canvas element alone cannot pass the test.
  await page.addInitScript(() => {
    window.sceneDraws = 0;
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, kind: string, options?: object) {
      // Permit the browser's software renderer for this GPU-independent test.
      const context = original.call(this, kind as "webgl2", { ...options, failIfMajorPerformanceCaveat: false });
      if (kind === "webgl2" && context) {
        const gl = context as WebGL2RenderingContext;
        const draw = gl.drawElements.bind(gl);
        gl.drawElements = (...args) => { window.sceneDraws++; draw(...args); };
      }
      return context;
    } as typeof original;
  });
  await page.goto("/");
  const sculpture = page.getByRole("group", { name: "Retro computer", exact: true });
  await expect(sculpture.locator("canvas")).toHaveCount(0);
  await sculpture.scrollIntoViewIfNeeded();
  await expect(sculpture.getByRole("status")).toContainText("Drag to explore", { timeout: 20_000 });
  const draws = () => page.evaluate(() => window.sceneDraws);
  await expect.poll(draws).toBeGreaterThan(0);
  const initial = await draws();
  await sculpture.getByRole("button", { name: "Rotate sculpture right" }).click();
  await expect.poll(draws).toBeGreaterThan(initial);
  await expect(sculpture.getByRole("button", { name: "Pause", exact: true })).toHaveAttribute("aria-pressed", "true");
  const moving = await draws();
  await expect.poll(draws).toBeGreaterThan(moving);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect.poll(async () => { const before = await draws(); await page.waitForTimeout(200); return (await draws()) - before; }).toBe(0);
  await sculpture.scrollIntoViewIfNeeded();
  const resumed = await draws();
  await expect.poll(draws).toBeGreaterThan(resumed);
  await sculpture.getByRole("button", { name: "Pause", exact: true }).click();
  await expect.poll(async () => { const before = await draws(); await page.waitForTimeout(200); return (await draws()) - before; }).toBe(0);
  await sculpture.getByRole("button", { name: "Reset", exact: true }).click();
  await sculpture.getByRole("button", { name: "Static view", exact: true }).click();
  await expect(sculpture.locator("canvas")).toHaveCount(0);
  await sculpture.getByRole("button", { name: "Interactive view", exact: true }).click();
  await expect(sculpture.getByRole("status")).toContainText("Drag to explore");
  await sculpture.locator("canvas").evaluate(canvas => canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true })));
  await expect(sculpture.getByRole("status")).toContainText("unavailable");
  await expect(sculpture.getByRole("img", { name: /Static retro/ })).toBeVisible();
  await expect(sculpture.locator("canvas")).toHaveCount(0);
});
