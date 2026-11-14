import { expect, test } from "@playwright/test";

test("retro computer loads only on request, credits the creator and unloads", async ({ page }) => {
  let requests = 0;
  await page.route("https://sketchfab.com/models/**", route => { requests++; return route.fulfill({ contentType: "text/html", body: '<p>Test-only embedded viewer</p>' }); });
  await page.goto("/");
  const viewer = page.getByRole("group", { name: "Retro computer viewer" });
  await expect(viewer.locator("iframe")).toHaveCount(0);
  await expect(viewer.getByRole("link", { name: "Urpo", exact: true })).toHaveAttribute("href", "https://sketchfab.com/Urpo");
  expect(requests).toBe(0);
  await viewer.getByRole("button", { name: "Load 3D computer" }).click();
  await expect(viewer.locator("iframe")).toHaveAttribute("src", /f844c0357d284fd8baa1435e9ff31bb2\/embed/);
  await expect.poll(() => requests).toBe(1);
  await viewer.getByRole("button", { name: "Close 3D viewer" }).click();
  await expect(viewer.locator("iframe")).toHaveCount(0);
  await viewer.getByRole("button", { name: "Load 3D computer" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(viewer.locator("iframe")).toHaveCount(0);
});
